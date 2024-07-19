import HTTPTransport from "../../servises/HTTPTransort";

export default class ChatAPI {
  httpTransport: HTTPTransport = new HTTPTransport();

  // get chats
  getChats = () => this.httpTransport.get("/chats");

  // create chat request
  createChatRequest = (body: any) => this.httpTransport.post("/chats", body);

  // delete user chat
  deleteChatRequest = (body: any) => this.httpTransport.delete("/chats", body);
}
