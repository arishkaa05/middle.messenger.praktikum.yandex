import HTTPTransport from "../../servises/HTTPTransort";

export default class ProfileAPI {
  httpTransport: HTTPTransport = new HTTPTransport();

  constructor() {}

  // logout
  logoutRequest = () => {
    return this.httpTransport.post(`/auth/logout`, {});
  };

  //change user profile
  changeUserProfile = (userData: any) => {
    return this.httpTransport.put(`/user/profile`, userData);
  };

  //change user password
  changeUserPassword = (userData: any) => {
    return this.httpTransport.put(`/user/password`, userData);
  };
}
