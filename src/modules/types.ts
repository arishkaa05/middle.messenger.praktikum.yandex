export interface IEventBus {
  listeners: { [event: string | number]: Array<(...args: any[]) => void> };
  on(event: string | number, callback: (...args: any[]) => void): void;
  off(event: string | number, callback: (...args: any[]) => void): void;
  emit(event: string | number, ...args: any[]): void;
}

export interface IProps {
  [key: string]: string | boolean | any;
}
 
export interface IList {
  lists: HTMLElement[];
} 
