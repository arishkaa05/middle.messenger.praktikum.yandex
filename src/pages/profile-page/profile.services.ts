import { router } from '../../modules/Router';
import store from '../../modules/Store';
import ProfileAPI from './profile-page.api';

const profileApi = new ProfileAPI();

export async function handleLogout() {
    try {
        await profileApi.logoutRequest(); 
        sessionStorage.removeItem("userData");
        router.go('/');
    } catch (error) {
        store.dispatch({ type: "SET_ERROR", error: error })
    }
}

export async function changeUserProfile(userData: any) {
    try {
        await profileApi.changeUserProfile(userData);
        router.go("/messenger"); 
    } catch (error) {
        store.dispatch({ type: "SET_ERROR", error: error })
    }
}

export async function changeUserProfileAvatar(formData: FormData) {
    try {
        const response = await profileApi.changeUserProfileAvatar(formData);
        store.dispatch({ type: 'SET_USER', userData: response });
        router.go("/messenger"); 
    } catch (error) {
        store.dispatch({ type: "SET_ERROR", error: error })
    }
}

export async function changeUserPassword(userData: any) {
    try {
        profileApi.changeUserPassword(userData);
        router.go('/messenger');
    } catch (error) {
        store.dispatch({ type: "SET_ERROR", error: error })
    }
}
