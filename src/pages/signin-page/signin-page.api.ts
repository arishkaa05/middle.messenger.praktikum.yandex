import { IUser } from '../../modules/types';
import HTTPTransport from '../../servises/HTTPTransort';

export default class SigninAPI {
    httpTransport: HTTPTransport = new HTTPTransport();

    // create user
    signUpRequest = (body: IUser) => this.httpTransport.post('/auth/signup', body);
}
