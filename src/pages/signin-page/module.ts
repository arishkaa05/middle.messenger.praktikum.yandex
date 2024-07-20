import { SigninPageContentModule } from '../../blocks/signin-page-content/signin-page-content';
import { ButtonModule } from '../../components/button/module';
import { errorRequest } from '../../components/error-request/module';
import { InputFieldModule } from '../../components/input-field/module';
import { InputModule } from '../../components/input/module';
import { LinkModule } from '../../components/link/module';
import { PageTitleModule } from '../../components/page-title/module';
import Block from '../../modules/Block';
import { connect } from '../../modules/Hoc';
import { router } from '../../modules/Router';
import SigninPage from './signin-page.hbs?raw';
import {
    submitForm, validateEmail, validateLasname, validateLogin, validateName, validatePassword, validatePhone,
} from './validate';

export class SigninPageModule extends Block {
    constructor(props: any) {
        super(props);
    }

    render() {
        return this.makeFragment(SigninPage, this.props);
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if (oldProps.error !== newProps.error) {
            console.log(newProps.error);
            errorRequest.setProps({ error: newProps.error });
        }
        return true;
    }
}

export const title = new PageTitleModule({
    title: 'Регистрация',
});

export const emailInput = new InputFieldModule({
    className: 'input-field__element',
    title: 'Почта',
    input: new InputModule({
        type: 'text',
        name: 'email',
        title: 'Почта',
        value: '',
        events: {
            blur: (e: Event) => validateEmail(e),
        },
    }),
});

export const loginInput = new InputFieldModule({
    className: 'input-field__element',
    title: 'Логин',
    input: new InputModule({
        type: 'text',
        name: 'login',
        title: 'Логин',
        value: '',
        events: {
            blur: (e: Event) => validateLogin(e),
        },
    }),
});

export const nameInput = new InputFieldModule({
    className: 'input-field__element',
    title: 'Имя',
    input: new InputModule({
        type: 'text',
        name: 'first_name',
        title: 'Имя',
        value: '',
        events: {
            blur: (e: Event) => validateName(e),
        },
    }),
});

export const lastNameInput = new InputFieldModule({
    className: 'input-field__element',
    title: 'Фамилия',
    input: new InputModule({
        type: 'text',
        name: 'second_name',
        title: 'Фамилия',
        value: '',
        events: {
            blur: (e: Event) => validateLasname(e),
        },
    }),
});

export const phoneInput = new InputFieldModule({
    className: 'input-field__element',
    title: 'Телефон',
    input: new InputModule({
        type: 'text',
        name: 'phone',
        title: 'Телефон',
        value: '',
        events: {
            blur: (e: Event) => validatePhone(e),
        },
    }),
});

export const passwordInput = new InputFieldModule({
    className: 'input-field__element',
    title: 'Пароль',
    input: new InputModule({
        type: 'password',
        title: 'Пароль',
        name: 'password',
        events: {
            blur: (e: Event) => validatePassword(e),
        },
    }),
});

export const submitBtn = new ButtonModule({
    text: 'Зарегистрироваться',
    type: 'submit',
});

export const linkSignUp = new LinkModule({
    text: 'Войти',
    events: {
        click: () => router.go('/'),
    },
});

export const singinPageContent = new SigninPageContentModule({
    emailInput,
    loginInput,
    nameInput,
    lastNameInput,
    phoneInput,
    passwordInput,
    submitBtn,
    events: {
        submit: (e: Event) => submitForm(e),
    },
});

const ConnectedSigninPage = connect(SigninPageModule, (state) => ({
    error: state.error,
}));

export const createSigninPage = new ConnectedSigninPage({
    title,
    errorRequest,
    singinPageContent,
    linkSignUp,
});
