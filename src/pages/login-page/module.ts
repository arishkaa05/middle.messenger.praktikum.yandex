import { LoginPageContentModule } from '../../blocks/login-page-content/module';
import { ButtonModule } from '../../components/button/module';
import { errorRequest } from '../../components/error-request/module';
import { InputFieldModule } from '../../components/input-field/module';
import { InputModule } from '../../components/input/module';
import { LinkModule } from '../../components/link/module';
import { PageTitleModule } from '../../components/page-title/module';
import Block from '../../modules/Block';
import { connect } from '../../modules/Hoc';
import { router } from '../../modules/Router';
import LoginPage from './login-page.hbs?raw';
import { submitForm, validateLogin, validatePassword } from './validate';

export class LoginPageModule extends Block {
    constructor(props: any) {
        super(props);
    }

    render() {
        return this.makeFragment(LoginPage, this.props);
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
    title: 'Вход',
});

export const loginInput = new InputFieldModule({
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

export const passwordInput = new InputFieldModule({
    className: 'input-field__element',
    title: 'Пароль',
    input: new InputModule({
        type: 'password',
        title: 'Пароль',
        name: 'password',
        value: '',
        events: {
            blur: (e: Event) => validatePassword(e),
        },
    }),
});

export const submitBtn = new ButtonModule({
    text: 'Авторизоваться',
    type: 'submit',
});

export const linkSignUp = new LinkModule({
    text: 'Нет аккаунта?',
    events: {
        click: () => router.go('/sign-up'),
    },
});

export const loginPageContent = new LoginPageContentModule({
    loginInput,
    passwordInput,
    submitBtn,
    events: {
        submit: (e: Event) => submitForm(e),
    },
});

const ConnectedLoginPage = connect(LoginPageModule, (state) => ({
    error: state.error,
}));

export const createLoginPage = new ConnectedLoginPage({
    title,
    errorRequest,
    loginPageContent,
    linkSignUp,
});
