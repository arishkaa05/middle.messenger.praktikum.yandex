import HTTPTransport from "../../servises/HTTPTransort";

export default class SigninAPI {
  httpTransport: HTTPTransport = new HTTPTransport();

  constructor() {}

  // create user
  signUpRequest = (body: any) => {
    return this.httpTransport.post(`/auth/signup`, body);
  };
}
