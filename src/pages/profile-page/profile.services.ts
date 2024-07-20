import { router } from '../../modules/Router';
import store from '../../modules/Store';
import ProfileAPI from './profile-page.api';

const profileApi = new ProfileAPI();

export async function handleLogout() {
    try {
        const response = await profileApi.logoutRequest();
        console.log('Response from server:', response);
        sessionStorage.removeItem("userData");
        router.go('/');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function changeUserProfile(userData: any) {
    try {
        const response = await profileApi.changeUserProfile(userData);
        router.go("/messenger");
        console.log('Response from server:', response);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function changeUserProfileAvatar(formData: FormData) {
    try {
        const response = await profileApi.changeUserProfileAvatar(formData);

        store.dispatch({ type: 'SET_USER', userData: response });
        router.go("/messenger");
        console.log('Response from server:', response);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function changeUserPassword(userData: any) {
    try {
        const response = await profileApi.changeUserPassword(userData);
        console.log('Response from server:', response);
        router.go('/messenger');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
