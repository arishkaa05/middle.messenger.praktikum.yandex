import { formatDate } from '../../helpers/formatDate';
import Block from '../../modules/Block';
import store from '../../modules/Store';
import { IMessageContainer } from '../../modules/types';
import { getChatToken } from '../../pages/chat-page/chat.services';
import { hostWS } from '../../servises/BaseAPI';
import { MessageContainer } from './index';

export class MessageContainerModule extends Block {
    constructor(props: IMessageContainer) {
        super(props);
        this.props.messages = props.messages;
    }

    render() {
        return this.makeFragment(MessageContainer, this.props);
    }
}

export const openMessageContainer = async () => {
    const chatId = store.getState().activeChat.id;
    const userId = store.getState().userData.id;
    const token = await getChatToken(chatId);
    store.dispatch({ type: 'SET_TOKEN', token: token.token });

    const socket = new WebSocket(`${hostWS}/${userId}/${chatId}/${token.token}`);
    socket.addEventListener('open', () => {
        socket.send(
            JSON.stringify({
                content: '20',
                type: 'get old',
            }),
        );
    });

    socket.addEventListener('close', (event) => {
        if (!event.wasClean) {
            store.dispatch({ type: 'SET_ERROR', error: 'Обрыв соединения' });
        }
    });

    socket.addEventListener('message', (event) => {
        try {
            const messageData = JSON.parse(event.data);
            if (messageData instanceof Array) {
                const newMessages = messageData.map((message: {
                    chat_id: number;
                    content: string;
                    file: null;
                    id: number;
                    is_read: boolean;
                    time: string;
                    type: string;
                    user_id: number;
                  }) => ({
                    id: message.id,
                    isOwn: store.getState().userData.id === message.user_id,
                    message: message.content,
                    time: formatDate(message.time),
                }));
                store.dispatch({
                    type: 'SET_NEW_MSG',
                    userMessagesList: newMessages,
                });
            }
            const newMessage = {
                id: messageData.id,
                isOwn: false,
                message: messageData.content,
                time: formatDate(messageData.time),
            };
            const currentMessages = store.getState().userMessagesList;
            currentMessages.push(newMessage);
            store.dispatch({
                type: 'SET_NEW_MSG',
                userMessagesList: currentMessages,
            });
        } catch (error) {
            store.dispatch({ type: 'SET_ERROR', error });
        }
    });

    socket.addEventListener('error', (event: any) => {
        store.dispatch({ type: 'SET_ERROR', error: event.message });
    });
};
