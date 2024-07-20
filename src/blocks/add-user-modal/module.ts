import { ButtonModule } from '../../components/button/module';
import { InputFieldModule } from '../../components/input-field/module';
import { InputModule } from '../../components/input/module';
import Block from '../../modules/Block';
import { ILoginPageContent } from '../../modules/types';
import { AddUserModal } from '.';
import { submitForm, validateLogin } from './validate';

export class AddUserModalModule extends Block {
    constructor(props: ILoginPageContent) {
        super(props);
    }

    render() {
        return this.makeFragment(AddUserModal, this.props);
    }
}

export const loginInput = new InputFieldModule({
    title: 'Логин',
    input: new InputModule({
        type: 'text',
        name: 'login',
        title: 'Логин',
        value: 'testlogin',
        events: {
            blur: (e: Event) => validateLogin(e),
        },
    }),
});

export const submitBtn = new ButtonModule({
    text: 'Добавить пользователя',
    type: 'submit',
});

export const addUserContent = new AddUserModalModule({
    loginInput,
    submitBtn,
    events: {
        submit: (e: Event) => submitForm(e),
    },
});
