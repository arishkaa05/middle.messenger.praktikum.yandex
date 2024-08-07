import { IUser } from '../../modules/types';
import HTTPTransport from '../../servises/HTTPTransort';

export default class ProfileAPI {
    httpTransport: HTTPTransport = new HTTPTransport();

    // logout
    logoutRequest = () => this.httpTransport.post('/auth/logout', {});

    // change user profile
    changeUserProfile = (userData: IUser) => this.httpTransport.put('/user/profile', userData);

    // change user profile avatar
    changeUserProfileAvatar = (formData: FormData) => this.httpTransport.put('/user/profile/avatar', formData);

    // change user password
    changeUserPassword = (password: {
        "oldPassword": "string",
        "newPassword": "string"
      }) => {
        this.httpTransport.put('/user/password', password);
    };
}
