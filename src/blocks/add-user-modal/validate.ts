import { loginInput, addUserContent } from './module';
import { checkInput, setErrors } from '../../modules/validation';
import store from '../../modules/Store';
import { addUserToChat, searcUserForChat } from '../../pages/chat-page/chat.services';

export const validateLogin = (e: Event) => {
    e.preventDefault();
    const input = loginInput.children.input.getContent() as HTMLInputElement;
    const checking = checkInput(input.name, input.value);
    const res = setErrors(loginInput, input.title, checking);
    return res;
};

export const submitForm = async (e: Event) => {
    e.preventDefault();
    const loginIsValid = validateLogin(e);

    if (loginIsValid) {
        const inputs = Object.values(addUserContent.children);
        const inputValues = inputs.reduce((result, input) => {
            if (input.children.input) {
                const inputNew = input.children.input.getContent();
                result[inputNew.name] = inputNew.value;
            }
            return result;
        }, {});
        const response = await searcUserForChat(inputValues.login);
        if (response && response instanceof Array) {
            if (response.length === 0) {
                loginInput.setProps({ error: 'Пользователь не найден' });
            } else if (response.length > 1) {
                loginInput.setProps({ error: 'Введите точный логин' });
            } else if (response.length === 1) {
                loginInput.setProps({ error: '' });
                addUserToChat(response[0].id, store.getState().activeChat.id);
            }
        }
    }
};
