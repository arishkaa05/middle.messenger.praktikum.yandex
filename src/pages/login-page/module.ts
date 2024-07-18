import { LoginPageContentModule } from "../../blocks/login-page-content/module";
import { ButtonModule } from "../../components/button/module";
import { InputFieldModule } from "../../components/input-field/module";
import { InputModule } from "../../components/input/module";
import { LinkModule } from "../../components/link/module";
import { PageTitleModule } from "../../components/page-title/module";
import Block from "../../modules/Block";
import { connect } from "../../modules/Hoc";
import store from "../../modules/Store";
import LoginPage from "./login-page.hbs?raw";
import { submitForm, validateLogin, validatePassword } from "./validate";

export class LoginPageModule extends Block {
  constructor(props: any) {
    super(props);
  }

  render() {
    return this.makeFragment(LoginPage, this.props);
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.buttonText !== newProps.buttonText) {
      submitBtn.setProps({ text: newProps.buttonText });
    }
    return true;
  }
}

export const title = new PageTitleModule({
  title: "Вход",
});

export const loginInput = new InputFieldModule({
  title: "Логин",
  input: new InputModule({
    type: "text",
    name: "login",
    title: "Логин",
    value: "",
    events: {
      blur: (e: Event) => validateLogin(e),
      change: (e: any) => {
        store.dispatch({ type: "SET_TEXT", buttonText: e.target.value });
      },
    },
  }),
});

export const passwordInput = new InputFieldModule({
  className: "input-field__element",
  title: "Пароль",
  input: new InputModule({
    type: "password",
    title: "Пароль",
    name: "password",
    events: {
      blur: (e: Event) => validatePassword(e),
    },
  }),
});

export const submitBtn = new ButtonModule({
  text: store.getState().buttonText,
  type: "submit",
});

export const linkSignUp = new LinkModule({
  page: "sign-up",
  text: "Нет аккаунта?",
});

export const loginPageContent = new LoginPageContentModule({
  loginInput,
  passwordInput,
  submitBtn,
  events: {
    submit: (e: Event) => submitForm(e),
  },
});
const connectedSigninPage = connect(LoginPageModule, (state) => ({ buttonText: state.buttonText }));

export const createLoginPage = new connectedSigninPage({
  title,
  loginPageContent,
  linkSignUp,
});
