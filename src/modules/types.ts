import { LoginPageContentModule } from '../blocks/login-page-content/login-page-content';
import { MessageListModule } from '../blocks/message-list/module';
import { PasswordPageContentModule } from '../blocks/password-page-content/module';
import { ProfilePageContentModule } from '../blocks/profile-page-content/module';
import { SigninPageContentModule } from '../blocks/signin-page-content/module';
import { UserSmallModule } from '../blocks/user-small/module';
import { ButtonModule } from '../components/button/module';
import { ErrorModule } from '../components/error-request/module';
import { InputFieldModule } from '../components/input-field/module';
import { LinkModule } from '../components/link/module';
import { MessageModule } from '../components/message/module';
import { NewMessageModule } from '../components/new-message/module';
import { PageTitleModule } from '../components/page-title/module';
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

export interface IRequestBody {
  [key: string]: string | number | boolean | any | FormData;
}

export type HTTPMethod = (
  url: string,
  body?: IRequestBody,
  options?: { method?: string; data?: {}; headers?: { [key: string]: string }; timeout?: number;},
  timeout?: number,
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

export type IStringIndexed = Record<string, any>;

export interface IAvatar extends IProps {
  avatar: string;
}

export interface ILink extends IProps {
  url?: string;
  className?: string;
  text: string;
}

export interface IMessage extends IProps {
  id?: number;
  name?: string;
  time?: string;
  unread_count?: boolean;
  title?: string;
  count?: number;
  message?: string;
  avatar?: string
}

export interface IRequestOptions {
  headers?: { [key: string]: string },
  timeout?: number;
  method?: string,
  data?: Record<string, unknown> | FormData,
  withCredentials?: boolean,
  responseType?: XMLHttpRequestResponseType
}
export interface IMessageList {
  messages: MessageModule[];
}

export interface IUser
{
  'id'?: 123,
  'first_name': 'Petya',
  'second_name': 'Pupkin',
  'display_name'?: 'Petya Pupkin',
  'phone': '+79001001100',
  'login': 'userLogin',
  'avatar': '/path/to/avatar.jpg',
  'email': 'string@ya.ru'
}

export interface ISigninProps {
  error: string,
  errorSingninRequest: ErrorModule,
  linkSignUp: LinkModule,
  SigninPageContentModule: SigninPageContentModule
  title: PageTitleModule
}
export type State = {
  [key: string]: any;
};
export interface IProfileProps {
  error: string,
  errorProfileRequest: ErrorModule,
  linkChat: LinkModule,
  linkLogout: LinkModule,
  linkPassword: LinkModule,
  profilePageContent: ProfilePageContentModule

}

export interface IPasswordrops {
  error: string,
  errorPasswordRequest: ErrorModule,
  linkChat: LinkModule,
  lpasswordPageContent: PasswordPageContentModule

}
export interface ISearch extends IProps {
  name?: string;
  title?: string;
  value?: string;
  type?: string;
}

export interface IError extends IProps {
  errorMessage: ErrorModule;
  linkChat: LinkModule,
  title?: PageTitleModule;
}

export interface ILoginPage extends IProps {
  error
:
'',
errorLoginRequest
:
ErrorModule,
linkSignUp
:
LinkModule,
loginPageContent
:
LoginPageContentModule,
title
:
PageTitleModule
}
export interface IUserSmall extends IProps {
  name: string;
  info?: string;
}

export interface IMessageData { id: number; isOwn: boolean; message: string; time: string }
