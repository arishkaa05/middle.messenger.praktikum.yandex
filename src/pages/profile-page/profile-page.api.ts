import HTTPTransport from '../../servises/HTTPTransort';

export default class ProfileAPI {
    httpTransport: HTTPTransport = new HTTPTransport();

    // logout
    logoutRequest = () => this.httpTransport.post('/auth/logout', {});

    // change user profile
    changeUserProfile = (userData: any) => this.httpTransport.put('/user/profile', userData);

    // change user password
    changeUserPassword = (userData: any) => this.httpTransport.put('/user/password', userData);
}
