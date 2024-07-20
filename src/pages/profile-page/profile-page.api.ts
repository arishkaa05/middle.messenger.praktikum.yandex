import HTTPTransport from '../../servises/HTTPTransort';

export default class ProfileAPI {
    httpTransport: HTTPTransport = new HTTPTransport();

    // logout
    logoutRequest = () => this.httpTransport.post('/auth/logout', {});

    // change user profile
    changeUserProfile = (userData: any) => this.httpTransport.put('/user/profile', userData);

    // change user profile avatar 

    changeUserProfileAvatar = (formData: FormData) => 
  this.httpTransport.put('/user/profile/avatar', formData);
    // change user password
    changeUserPassword = (avatar: any) => {
        const form: any = new FormData(avatar);
        this.httpTransport.put('/user/password', form);
    }
}
