import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';
import { IEventBus, IProps } from './types';

export default class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_CDUM: 'flow:component-did-unmount',
        FLOW_RENDER: 'flow:render',
    };

    props: IProps;

    children: IProps;

    firstRender = false;

    lists: IProps;

    eventBus: () => EventBus;

    _element: HTMLElement = document.createElement('div');

    _id = makeUUID();

    constructor(propsWithChildren = {}) {
        const eventBus = new EventBus();
        const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
        this.children = children;
        this.lists = this._makePropsProxy({ ...lists }) as typeof this.lists;
        this.props = this._makePropsProxy({ ...props, __id: this._id });
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    _registerEvents(eventBus: IEventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDUM, this._componentDidUnmount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount(props: IProps) {
        this.componentDidMount(props);
        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
        if (!this.firstRender) {
            this.firstRender = true;
        }
    }

    componentDidMount(props: IProps) {
        if (!props) {
            return false;
        }
        return true;
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props);
    }

    dispatchComponentDidUpdate() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    _componentDidUpdate(oldProps: IProps, newProps: IProps) {
        if (oldProps?.events) {
            const { events } = oldProps;
            Object.keys(events).forEach((eventName) => {
                this._element.removeEventListener(eventName, events[eventName]);
            });
        }

        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
        if (!oldProps || !newProps) {
            return false;
        }
        return true;
    }

    _componentDidUnmount() {
        this.componentDidUnmount(this.props);
        if (this.children) {
            Object.values(this.children).forEach((child) => {
                if (!child._isListItem) { 
                    child.dispatchComponentDidUnmount();
                }
            });
        }
        if (this.lists) {
            Object.values(this.lists).forEach((list) => {
                list.forEach((child: { dispatchComponentDidUnmount: () => void; }) => {
                    if (child instanceof Block) { 

                        child.dispatchComponentDidUnmount();
                    }
                });
            });
        }
    }

    dispatchComponentDidUnmount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDUM, this.props);
    }

    componentDidUnmount(props: IProps) {
        if (!props) { return false; }
        return true;
    }

    _removeEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element.removeEventListener(eventName, events[eventName]);
        });
    }

    _getChildrenPropsAndProps(propsAndChildren: IProps) {
        const children: { [key: string]: Block } = {};
        const props: IProps = {};
        const lists: { [key: string]: Block[] } = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value)) {
                lists[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props, lists };
    }

    addAttributes() {
        const { attr = {} } = this.props;

        Object.entries(attr).forEach(([key, value]) => {
            this._element.setAttribute(key, value);
        });
    }

    setProps = (nextProps: IProps) => {
        if (!nextProps) {
            return;
        }
        const { props, lists } = this._getChildrenPropsAndProps(nextProps);
        Object.assign(this.props, props);
        Object.assign(this.lists, lists);
    };

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();
        this._removeEvents();
        this._element.innerHTML = '';
        if (this._element) {
            this._element.replaceWith(block);
        }
        this._element = block;
        this._addEvents();
        this.addAttributes();
    }

    makeFragment(template: string, props: IProps) {
        const propsAndStubs: IProps = { ...props };
        const _tmpId = makeUUID();
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child.props.__id}"></div>`;
        });

        Object.entries(this.lists).forEach(([key]) => {
            propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
        });

        const fragment: HTMLTemplateElement = this._createDocumentElement('template') as HTMLTemplateElement;
        fragment.setAttribute('data-id', this._id);
        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs).trim();

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child.props.__id}"]`);
            if (stub) stub.replaceWith(child.getContent());
        });

        Object.entries(this.lists).forEach(([key]) => {
            const child = this.lists[key];
            const listCont = document.createElement('template') as HTMLTemplateElement;
            child.forEach((item: { getContent: () => string | Node }) => {
                if (item instanceof Block) {
                    listCont.content.append(item.getContent());
                } else {
                    const element = document.createElement('div');
                    element.textContent = `${key} - ${item}`;
                    listCont.content.append(element);
                }
            });
            const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
            if (stub) stub.replaceWith(listCont.content);
        }); 
        return fragment.content.firstElementChild as HTMLElement;
    }

    render(): HTMLElement {
        return this.getContent();
    }

    getContent() {
        return this._element;
    }

    _makePropsProxy(props: IProps) {
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop as string];
                return typeof value === 'function' ? (value as Function).bind(target) : value;
            },
            set: (target, prop: string | symbol, value: unknown) => {
                const oldProps = { ...target };

                target[prop as string] = value;

                this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...oldProps }, { ...target });
                return true;
            },
            deleteProperty() {
                throw new Error('No access');
            },
        });
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    show() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'block';
        }
    }

    hide() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'none';
        }
    }
}
