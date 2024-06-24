//@ts-nocheck

import EventBus from "./EventBus";
import Handlebars from "handlebars";
import { IBlock, IEventBus } from "./types";

export default class Block implements IBlock {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

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
    // console.log(this)
  }
  props: any;
  children: { [key: string]: string | boolean | any };
  lists: any;
  eventBus: () => EventBus;

  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      console.log(this._element)
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  _registerEvents(eventBus: IEventBus) {
    // console.log(eventBus)
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

  _getChildrenPropsAndProps(propsAndChildren: { [key: string]: string | boolean }) {
    const children: { [key: string]: string | boolean } = {};
    const props: { [key: string]: string | boolean } = {};
    const lists: { [key: string]: string | boolean } = {};
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value) {
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
      if (this._element) this._element.setAttribute(key, value as string); 
    });
  }

  setProps = (nextProps: { [key: string]: string | boolean }) => {
    console.log(nextProps)
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    console.log("Render");
    const propsAndStubs = { ...this.props };
    const _tmpId = Math.floor(100000 + Math.random() * 900000);
    console.log(this.children)
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement("template");
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    //comment if you want to see
    Object.values(this.children).forEach((child) => {
      if (child) {
        const stub = document.querySelector(`[data-id="${child._id}"]`); 
        if (stub) stub.replaceWith(child.getContent()); 
      }
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      const listCont = this._createDocumentElement("template");
      child.forEach((item: { getContent: () => HTMLElement; }) => {
        if (item instanceof Block) {
          // listCont.content.append(item.getContent()); 
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
      stub.replaceWith(listCont.content);
    });

    const newElement = fragment.content.firstElementChild;
    if (this._element) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props ) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop] = value;
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
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
