import Block from './Block';

export interface IEventBus {
  listeners: { [event: string | number]: Array<(...args: IProps[]) => void> };
  on(event: string | number, callback: (...args: IProps[]) => void): void;
  off(event: string | number, callback: (...args: IProps[]) => void): void;
  emit(event: string | number, ...args: IProps[]): void;
}

export interface IList {
  lists: HTMLElement[];
}

export interface IProps {
  __id?: string;

  events?: { [key: string]: (e: Event) => void };
  lists?: Block[];
  attr?: {
    [key: string]: string;
  };
  [key: string]: any;
}

export interface IInput extends IProps {
  name?: string;
  title?: string;
  value?: string;
  type?: string;
}
export interface IInputField extends IProps {
  title: string;

  error?: string;
}

export interface ILoginPageContent {}

export interface IForm extends IProps {
  className?: string;
  content: Block | Block[];
}

export interface IButton extends IProps {
  text: string;
  type: string
}

export interface ILink extends IProps {
  url?: string;
  page: string;
  text: string
}

export interface IPageTitle {
  title: string
}
