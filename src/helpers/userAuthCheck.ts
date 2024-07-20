import { router } from '../modules/Router';
import store from '../modules/Store';

export const userAuthCheck = (): boolean => {
    if (!store.getState().userData.id) {
        const userDataString = sessionStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            store.dispatch({ type: 'SET_USER', userData });
            return true;
        }
        router.go('/');
        return false;
    }
    return true;
};
