import store from '../../modules/Store';
import ChatAPI from './chat-page.api';

const chatApi = new ChatAPI();

export async function getChatList() {
    try {
        const response: any = await chatApi.getChats();
        store.dispatch({ type: 'SET_CHAT_LIST', chatList: response });
    } catch (error) {
        store.dispatch({ type: 'SET_ERROR', error });
    }
}

export async function createChat(title: string) {
    try {
        const body: { title: string } = {
            title,
        };
        await chatApi.createChatRequest(body);
        await getChatList();
    } catch (error) {
        store.dispatch({ type: 'SET_ERROR', error });
    }
}

export async function deleteChatRequest(chatId: number) {
    try {
        const body = {
            chatId,
        };
        await chatApi.deleteChatRequest(body);
        store.dispatch({
            type: 'SET_ACTIVE_CHAT',
            activeChat: {
                title: 'Заголовок',
                id: 0,
            },
        });
        await getChatList();
    } catch (error) {
        store.dispatch({ type: 'SET_ERROR', error });
    }
}

export async function deleteUserFromChat(chatId: number, userId: number) {
    try {
        const body = {
            users: [userId],
            chatId,
        };
        await chatApi.deleteUserFromChat(body);
        store.dispatch({
            type: 'SET_ACTIVE_CHAT',
            activeChat: {
                title: 'Заголовок',
                id: 0,
            },
        });
        await getChatList();
    } catch (error) {
        store.dispatch({ type: 'SET_ERROR', error });
    }
}

export async function searcUserForChat(login: string) {
    try {
        const body = {
            login,
        };
        const response = await chatApi.userSearch(body);
        return response;
    } catch (error) {
        store.dispatch({ type: 'SET_ERROR', error });
        throw error;
    }
}

export async function addUserToChat(userId: number, chatid: number) {
    try {
        const body = {
            users: [userId],
            chatId: chatid,
        };
        const response = await chatApi.addUserToChat(body);
        store.dispatch({
            type: 'SET_ACTIVE_CHAT',
            activeChat: {
                title: 'Заголовок',
                id: 0,
            },
        });
        return response;
    } catch (error) {
        store.dispatch({ type: 'SET_ERROR', error });
        throw error;
    }
}

export async function getChatUsers(chatId: number) {
    try {
        const response: any = await chatApi.getChatUsers(chatId);
        return response;
    } catch (error) {
        store.dispatch({ type: 'SET_ERROR', error });
    }
}

export async function getChatToken(chatId: number) {
    try {
        const response: any = await chatApi.getChatToken(chatId);
        return response;
    } catch (error) {
        store.dispatch({ type: 'SET_ERROR', error });
    }
}

export async function changeChatAvatar(formData: FormData) {
    try {
        await chatApi.changeChatAvatar(formData);
        store.dispatch({
            type: 'SET_ACTIVE_CHAT',
            activeChat: {
                title: 'Заголовок',
                id: 0,
            },
        });
        getChatList();
    } catch (error) {
        store.dispatch({ type: 'SET_ERROR', error });
    }
}
