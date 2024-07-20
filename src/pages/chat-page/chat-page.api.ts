import HTTPTransport from '../../servises/HTTPTransort';

export default class ChatAPI {
    httpTransport: HTTPTransport = new HTTPTransport();

    // get chats
    getChats = () => this.httpTransport.get('/chats');

    // create chat request
    createChatRequest = (body: any) => this.httpTransport.post('/chats', body);

    // delete user chat
    deleteChatRequest = (body: any) => this.httpTransport.delete('/chats', body);

    // search for user by login
    userSearch = (body: any) => this.httpTransport.post('/user/search', body);

    // add user to chat
    addUserToChat = (body: any) => this.httpTransport.put('/chats/users', body);

    // get chat users
    getChatUsers = (chatId: number) => this.httpTransport.get(`/chats/${chatId}/users`);

    // Request token to connect to messages server
    getChatToken = (chatId: number) => this.httpTransport.post(`/chats/token/${chatId}`, {});
}
