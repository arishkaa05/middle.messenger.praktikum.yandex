import { MessageListModule } from '../blocks/message-list/module';
import { UserSmallModule } from '../blocks/user-small/module';
import { ButtonModule } from '../components/button/module';
import { InputFieldModule } from '../components/input-field/module';
import { MessageModule } from '../components/message/module';
import { NewMessageModule } from '../components/new-message/module';
import Block from './Block';

export interface IEventBus {
  listeners: { [event: string | number]: Array<(...args: IProps[]) => void> };
  on(event: string | number, callback: (...args: IProps[]) => void): void;
  off(event: string | number, callback: (...args: IProps[]) => void): void;
  emit(event: string | number, ...args: IProps[]): void;
}

export type PlainObject<T = any> = {
  [k in string]: T;
};

export type HTTPMethod = (
  url: string,
  options?: { method?: string; data?: {}; headers?: { [key: string]: string }; timeout?: number },
  timeout?: number
) => Promise<unknown>;

export interface IList {
  lists: HTMLElement[];
}
export interface IRouteProps {
  rootQuery: string;
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
  className?: string;
  error?: string;
  type?: string;
}
export interface IInputField extends IProps {
  title: string;

  error?: string;
}

export interface ILoginPageContent extends IProps {
  loginInput: InputFieldModule;
  passwordInput?: InputFieldModule;
  submitBtn: ButtonModule;
}

export interface IProfilePageContent extends IProps {
  emailInput: InputFieldModule;
  loginInput: InputFieldModule;
  nameInput: InputFieldModule;
  lastNameInput: InputFieldModule;
  phoneInput: InputFieldModule;
  userNameInput?: InputFieldModule;
  submitBtn: ButtonModule;
}

export interface ISigninPageContent extends IProps {
  emailInput: InputFieldModule;
  loginInput: InputFieldModule;
  nameInput: InputFieldModule;
  lastNameInput: InputFieldModule;
  phoneInput: InputFieldModule;
  passwordInput?: InputFieldModule;
  submitBtn: ButtonModule;
}

export interface IMessageContainer extends IProps {
  sender: UserSmallModule;
  userMessagesList?: MessageListModule;
  newMessage: NewMessageModule;
}

export interface IPasswordPageContent extends IProps {}

export interface IForm extends IProps {
  className?: string;
  content: Block | Block[];
}

export interface IButton extends IProps {
  text: string;
  type: string;
}

export interface ILink extends IProps {
  url?: string;
  className?: string;
  text: string;
}

export interface IMessage extends IProps {
  id: number;
  name?: string;
  time?: string;
  unread_count?: boolean;
  title?: string;
  count?: number;
  message?: string;
}

export interface IMessageList {
  messages: MessageModule[];
}

export interface ISearch extends IProps {
  name?: string;
  title?: string;
  value?: string;
  type?: string;
}
export interface IUserSmall extends IProps {
  name: string;
  info?: string;
}
