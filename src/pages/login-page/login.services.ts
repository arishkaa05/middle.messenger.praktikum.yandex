import { router } from '../../modules/Router';
import store from '../../modules/Store';
import { getChatList } from '../chat-page/chat.services';
import LoginAPI from './login-page.api';

const signinApi = new LoginAPI();

export async function handleSignIn(inputValues: any) {
    try {
        await signinApi.signInRequest(inputValues);
        await getAuthUser();
    } catch (error) {
        if (error instanceof Error) {
            const errorStr = error.message;
            if (errorStr.includes('Ошибка: 400 User already in system')) getAuthUser();
            else {
                store.dispatch({ type: 'SET_ERROR', error });
                throw error;
            }
        }
    }
}

export async function getAuthUser() {
    try {
        const response = await signinApi.getAuthUser();
        sessionStorage.setItem('userData', JSON.stringify(response));
        store.dispatch({ type: 'SET_USER', userData: response });
        getChatList();
        router.go('/messenger');
    } catch (error) {
        store.dispatch({ type: 'SET_ERROR', error });
        throw error;
    }
}
