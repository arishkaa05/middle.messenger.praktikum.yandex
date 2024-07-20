import Router from '../../modules/Router';
import store from '../../modules/Store';
import ProfileAPI from './profile-page.api';

const profileApi = new ProfileAPI();
const router = new Router('#app');

export async function handleLogout() {
    try {
        const response = await profileApi.logoutRequest();
        console.log('Response from server:', response);
        router.go('/');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function changeUserProfile(userData: any) {
    try {
        const response = await profileApi.changeUserProfile(userData);
        console.log('Response from server:', response);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function changeUserProfileAvatar(formData: FormData) {
    try {
        const response = await profileApi.changeUserProfileAvatar(formData);

        store.dispatch({ type: 'SET_USER', userData: response });
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
