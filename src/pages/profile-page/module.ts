import { ProfilePageContentModule } from '../../blocks/profile-page-content/profile-page-content';
import { AvatarModule } from '../../components/avatar/module';
import { ButtonModule } from '../../components/button/module';
import { ErrorModule } from '../../components/error-request/module';
import { InputFieldModule } from '../../components/input-field/module';
import { InputModule } from '../../components/input/module';
import { LinkModule } from '../../components/link/module';
import { userAuthCheck } from '../../helpers/userAuthCheck';
import Block from '../../modules/Block';
import { connect } from '../../modules/Hoc';
import { router } from '../../modules/Router';
import store from '../../modules/Store';
import ProfilePage from './profile-page.hbs?raw';
import { handleLogout } from './profile.services';
import {
    submitForm, validateAvatar, validateEmail, validateLasname, validateLogin, validateName, validatePhone, validateUserName,
} from './validate';

export class ProfilePageModule extends Block {
    constructor(props: any) {
        userAuthCheck();
        super(props);
    }

    render() {
        return this.makeFragment(ProfilePage, this.props);
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if (oldProps.userData !== newProps.userData) {
            inputPhone.setProps({ value: newProps.userData.phone });
            inputName.setProps({ value: newProps.userData.first_name });
            inputUserName.setProps({ value: newProps.userData.display_name });
            inputLastName.setProps({ value: newProps.userData.second_name });
            logInput.setProps({ value: newProps.userData.login });
            mailInput.setProps({ value: newProps.userData.email });
            avatar.setProps({ avatar: `https://ya-praktikum.tech/api/v2/resources/${newProps.userData.avatar}` });
        }
        if (oldProps.error !== newProps.error) {
            errorProfileRequest.setProps({ error: newProps.error });
        }
        return true;
    }
}

export const avatar = new AvatarModule({
    avatar: store.getState().userData.avatar,
    events: {
        input: (e: Event) => validateAvatar(e),
    },
});

const mailInput = new InputModule({
    type: 'text',
    name: 'email',
    title: 'Почта',
    value: store.getState().email,
    events: {
        blur: (e: Event) => validateEmail(e),
    },
});

export const emailInput = new InputFieldModule({
    className: 'input__element--align-right',
    title: 'Почта',
    input: mailInput,
});

const logInput = new InputModule({
    type: 'text',
    name: 'login',
    title: 'Логин',
    value: store.getState().login,
    events: {
        blur: (e: Event) => validateLogin(e),
    },
});

export const loginInput = new InputFieldModule({
    className: 'input__element--align-right',
    title: 'Логин',
    input: logInput,
});

const inputName = new InputModule({
    type: 'text',
    name: 'first_name',
    title: 'Имя',
    value: store.getState().userData.first_name,
    events: {
        blur: (e: Event) => validateName(e),
    },
});
export const nameInput = new InputFieldModule({
    className: 'input__element--align-right',
    title: 'Имя',
    input: inputName,
});

const inputUserName = new InputModule({
    type: 'text',
    name: 'display_name',
    title: 'Имя в чате',
    value: store.getState().userData.display_name,
    events: {
        blur: (e: Event) => validateUserName(e),
    },
});
export const userNameInput = new InputFieldModule({
    className: 'input__element--align-right',
    title: 'Имя в чате',
    input: inputUserName,
});
const inputLastName = new InputModule({
    type: 'text',
    name: 'second_name',
    title: 'Фамилия',
    value: store.getState().userData.second_name,
    events: {
        blur: (e: Event) => validateLasname(e),
    },
});

export const lastNameInput = new InputFieldModule({
    className: 'input__element--align-right',
    title: 'Фамилия',
    input: inputLastName,
});
const inputPhone = new InputModule({
    type: 'text',
    name: 'phone',
    title: 'Телефон',
    value: store.getState().userData.phone,
    events: {
        blur: (e: Event) => validatePhone(e),
    },
});

export const phoneInput = new InputFieldModule({
    className: 'input__element--align-right',
    title: 'Телефон',
    input: inputPhone,
});

export const submitBtn = new ButtonModule({
    text: 'Сохранить данные',
    type: 'submit',
});

export const linkLogout = new LinkModule({
    className: 'text-red',
    text: 'Выйти',
    events: {
        click: () => handleLogout(),
    },
});

export const linkChat = new LinkModule({
    text: 'На страницу чатов',
    events: {
        click: () => router.go('/messenger'),
    },
});

export const linkPassword = new LinkModule({
    className: 'text-blue',
    page: 'password',
    text: 'Изменить пароль',
    events: {
        click: () => router.go('/password'),
    },
});

export const errorProfileRequest = new ErrorModule({
    title: '',
    error: store.getState().error,
    events: {
        mouseover: () => store.dispatch({ type: 'SET_ERROR', error: '' }),
    },
});

export const profilePageContent = new ProfilePageContentModule({
    emailInput,
    avatar,
    errorProfileRequest,
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

const ConnectedProfilePage = connect(ProfilePageModule, (state) => ({
    userData: state.userData,
    error: state.error,
}));

export const createProfilePage = new ConnectedProfilePage({
    profilePageContent,
    errorProfileRequest,
    linkLogout,
    linkPassword,
    linkChat,
});
