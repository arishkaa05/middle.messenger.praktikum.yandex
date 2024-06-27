export interface IEventBus {
  listeners: { [event: string | number]: Array<(...args: IProps[]) => void> };
  on(event: string | number, callback: (...args: IProps[]) => void): void;
  off(event: string | number, callback: (...args: IProps[]) => void): void;
  emit(event: string | number, ...args: IProps[]): void;
}

export interface IProps {
  [key: string]: string | boolean | number | any;
}

export interface IList {
  lists: HTMLElement[];
}
