import HTTPTransport from '../../servises/HTTPTransort';

export default class LoginAPI {
    httpTransport: HTTPTransport = new HTTPTransport();

    // login
    signInRequest = (body: any) => this.httpTransport.post('/auth/signin', body);

    // get user info
    getAuthUser = () => this.httpTransport.get('/auth/user');
}
