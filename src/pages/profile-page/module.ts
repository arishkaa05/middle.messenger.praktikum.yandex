import { ProfilePageContentModule } from "../../blocks/profile-page-content/profile-page-content";
import { ButtonModule } from "../../components/button/module";
import { InputFieldModule } from "../../components/input-field/module";
import { InputModule } from "../../components/input/module";
import { LinkModule } from "../../components/link/module";
import Block from "../../modules/Block";
import Router from "../../modules/Router";
import ProfilePage from "./profile-page.hbs?raw";
import { handleLogout } from "./profile.services";
import { submitForm, validateEmail, validateLasname, validateLogin, validateName, validatePhone, validateUserName } from "./validate";

const router = new Router("#app");

export class ProfilePageModule extends Block {
  constructor(props: any) {
    super(props);
  }

  render() {
    return this.makeFragment(ProfilePage, this.props);
  }
}

export const emailInput = new InputFieldModule({
  className: "input__element--align-right",
  title: "Почта",
  input: new InputModule({
    type: "text",
    name: "email",
    title: "Почта",
    value: "pochta@yandex.ru",
    events: {
      blur: (e: Event) => validateEmail(e),
    },
  }),
});

export const loginInput = new InputFieldModule({
  className: "input__element--align-right",
  title: "Логин",
  input: new InputModule({
    type: "text",
    name: "login",
    title: "Логин",
    value: "ivanivanov",
    events: {
      blur: (e: Event) => validateLogin(e),
    },
  }),
});

export const nameInput = new InputFieldModule({
  className: "input__element--align-right",
  title: "Имя",
  input: new InputModule({
    type: "text",
    name: "first_name",
    title: "Имя",
    value: "Иван",
    events: {
      blur: (e: Event) => validateName(e),
    },
  }),
});

export const userNameInput = new InputFieldModule({
  className: "input__element--align-right",
  title: "Имя в чате",
  input: new InputModule({
    type: "text",
    name: "display_name",
    title: "Имя в чате",
    value: "Иван",
    events: {
      blur: (e: Event) => validateUserName(e),
    },
  }),
});

export const lastNameInput = new InputFieldModule({
  className: "input__element--align-right",
  title: "Фамилия",
  input: new InputModule({
    type: "text",
    name: "second_name",
    title: "Фамилия",
    value: "",
    events: {
      blur: (e: Event) => validateLasname(e),
    },
  }),
});

export const phoneInput = new InputFieldModule({
  className: "input__element--align-right",
  title: "Телефон",
  input: new InputModule({
    type: "text",
    name: "phone",
    title: "Телефон",
    value: "+7 (909) 967 30 30",
    events: {
      blur: (e: Event) => validatePhone(e),
    },
  }),
});

export const submitBtn = new ButtonModule({
  text: "Сохранить данные",
  type: "submit",
});

export const linkLogout = new LinkModule({
  className: "text-red",
  text: "Выйти",
  events: {
    click: () => handleLogout(),
  },
});

export const linkPassword = new LinkModule({
  className: "text-blue",
  page: "password",
  text: "Изменить пароль",
  events: {
    click: () => router.go("/password"),
  },
});

export const profilePageContent = new ProfilePageContentModule({
  emailInput,
  loginInput,
  nameInput,
  lastNameInput,
  userNameInput,
  phoneInput,
  submitBtn,
  events: {
    submit: (e: Event) => submitForm(e),
  },
});

export const createProfilePage = new ProfilePageModule({
  profilePageContent,
  linkLogout,
  linkPassword,
});
