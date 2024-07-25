import store from '../../modules/Store';
import { getAuthUser } from '../login-page/login.services';
import SigninAPI from './signin-page.api';

const signinApi = new SigninAPI();

async function handleSignUp(inputValues: any) {
    try {
        signinApi.signUpRequest(inputValues);
        await getAuthUser();
    } catch (error) {
        store.dispatch({ type: 'SET_ERROR', error });
    }
}

export default handleSignUp;
