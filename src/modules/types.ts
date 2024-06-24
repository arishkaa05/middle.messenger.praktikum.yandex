export interface IEventBus {
  listeners: { [event: string | number]: Array<(...args: any[]) => void> };
  on(event: string | number, callback: (...args: any[]) => void): void;
  off(event: string | number, callback: (...args: any[]) => void): void;
  emit(event: string | number, ...args: any[]): void;
}

export interface IBlock {
  _element: HTMLElement | null;
  _id: number;
  props: any;
  children: any;
  lists: any;
  eventBus: () => IEventBus;

  _getChildrenPropsAndProps(propsWithChildren: any): { props: any; children: any; lists: any };
  _makePropsProxy(props: any): any;
  _registerEvents(eventBus: IEventBus): void;
}
