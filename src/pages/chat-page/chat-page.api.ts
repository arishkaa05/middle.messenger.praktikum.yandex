import HTTPTransport from '../../servises/HTTPTransort';

export default class ChatAPI {
    httpTransport: HTTPTransport = new HTTPTransport();

    // get chats
    getChats = () => this.httpTransport.get('/chats');

    // create chat request
    createChatRequest = (body: { title: string }) => this.httpTransport.post('/chats', body);

    // delete user chat
    deleteChatRequest = (body: { chatId: number }) => this.httpTransport.delete('/chats', body);

    // search for user by login
    userSearch = (body: { login: string }) => this.httpTransport.post('/user/search', body);

    // add user to chat
    addUserToChat = (body: { users: number[]; chatId: number }) => this.httpTransport.put('/chats/users', body);

    // get chat users
    getChatUsers = (chatId: number) => this.httpTransport.get(`/chats/${chatId}/users`);

    // Request token to connect to messages server
    getChatToken = (chatId: number) => this.httpTransport.post(`/chats/token/${chatId}`, {});

    // delete user from chat
    deleteUserFromChat = (body: { users: number[]; chatId: number }) => this.httpTransport.delete('/chats/users', body);

    // change user profile avatar
    changeChatAvatar = (body: FormData) => this.httpTransport.put('/chats/avatar', body);
}
