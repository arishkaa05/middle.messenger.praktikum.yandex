import HTTPTransport from "../../servises/HTTPTransort";

export default class LoginAPI {
  httpTransport: HTTPTransport = new HTTPTransport();

  constructor() {}

  // login
  signInRequest = (body: any) => {
    return this.httpTransport.post(`/auth/signin`, body);
  };

  // get user info
  getAuthUser = () => {
    return this.httpTransport.get(`/auth/user`);
  };
}
