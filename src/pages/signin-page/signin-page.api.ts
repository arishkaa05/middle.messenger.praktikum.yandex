import HTTPTransport from '../../servises/HTTPTransort';

export default class SigninAPI {
    httpTransport: HTTPTransport = new HTTPTransport();

    // create user
    signUpRequest = (body: any) => this.httpTransport.post('/auth/signup', body);
}
