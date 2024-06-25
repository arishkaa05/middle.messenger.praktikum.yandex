import EventBus from "./EventBus";
import Handlebars from "handlebars";
import { IEventBus, IProps } from "./types";

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };
  props: IProps;
  children: IProps;
  lists: IProps;
  eventBus: () => EventBus;
  _element: HTMLElement | null = null;
  _id = Math.floor(100000 + Math.random() * 900000);

  constructor(propsWithChildren = {}) {
    const eventBus = new EventBus();
    const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      let element: HTMLElement;
      if (this._element) {
        element = this._element;
        if (element) element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  _registerEvents(eventBus: IEventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate() {
    return true;
  }

  _getChildrenPropsAndProps(propsAndChildren: IProps) {
    const children: IProps = {};
    const props: IProps = {};
    const lists: IProps = {};

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
      let element: HTMLElement;
      if (this._element) {
        element = this._element;
        if (element) element.setAttribute(key, value as string);
      }
    });
  }

  setProps = (nextProps: IProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const propsAndStubs: IProps = { ...this.props };
    const _tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    });

    const fragment: HTMLTemplateElement = this._createDocumentElement("template") as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    //comment if you want to see
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) stub.replaceWith(child.getContent());
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      const listCont: HTMLTemplateElement = this._createDocumentElement("template") as HTMLTemplateElement;
      child.forEach((item: { getContent: () => string | Node }) => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent());
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
      if (stub) stub.replaceWith(listCont.content);
    });

    const newElement = fragment.content.firstElementChild;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    if (newElement) this._element = newElement as HTMLElement;
    this._addEvents();
    this.addAttributes();
  }

  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: IProps) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as string];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget: IProps = { ...target } as IProps;
        target[prop as string] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("No access");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    const content = this.getContent();
    if (content) {
      content.style.display = "block";
    }
  }

  hide() {
    const content = this.getContent();
    if (content) {
      content.style.display = "none";
    }
  }
}
