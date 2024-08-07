import { PasswordPageContentModule } from '../../blocks/password-page-content/password-page-content';
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
import { IPasswordProps, State } from '../../modules/types';
import PasswordPage from './password-page.hbs?raw';
import {
    submitForm, validateNewPassword, validateOldPassword, validateRepeatePassword,
} from './validate';

export class PasswordPageModule extends Block {
    constructor(props: IPasswordProps) {
        userAuthCheck();
        super(props);
    }

    render() {
        return this.makeFragment(PasswordPage, this.props);
    }

    componentDidUpdate(oldProps: State, newProps: State): boolean {
        if (oldProps.error !== newProps.error) {
            errorPasswordRequest.setProps({ error: newProps.error });
        }
        return true;
    }
}

export const oldPasswordInput = new InputFieldModule({
    className: 'input-field__element',
    title: 'Старый пароль',
    input: new InputModule({
        type: 'password',
        title: 'Старый пароль',
        name: 'oldPassword',
        events: {
            blur: (e: Event) => validateOldPassword(e),
        },
    }),
});

export const newPasswordInput = new InputFieldModule({
    className: 'input-field__element',
    title: 'Новый пароль',
    input: new InputModule({
        type: 'password',
        title: 'Новый пароль',
        name: 'newPassword',
        events: {
            blur: (e: Event) => validateNewPassword(e),
        },
    }),
});

export const passwordRepeateInput = new InputFieldModule({
    className: 'input-field__element',
    title: 'Повторите новый пароль',
    input: new InputModule({
        type: 'password',
        title: 'Новый пароль (еще раз)',
        name: 'newPassword',
        events: {
            blur: (e: Event) => validateRepeatePassword(e),
        },
    }),
});

export const submitBtn = new ButtonModule({
    text: 'Сохранить данные',
    type: 'submit',
});

const ConnectedPasswordPage = connect(PasswordPageContentModule, (state) => ({
    error: state.error,
}));

export const passwordPageContent = new ConnectedPasswordPage({
    oldPasswordInput,
    newPasswordInput,
    passwordRepeateInput,
    submitBtn,
    events: {
        submit: (e: Event) => submitForm(e),
    },
});

export const errorPasswordRequest = new ErrorModule({
    title: '',
    error: store.getState().error,
    events: {
        mouseover: () => store.dispatch({ type: 'SET_ERROR', error: '' }),
    },
});

export const linkChat = new LinkModule({
    text: 'На страницу чатов',
    events: {
        click: () => router.go('/messenger'),
    },
});

export const createPasswordPage = new PasswordPageModule({
    passwordPageContent,
    errorPasswordRequest,
    linkChat,
});
