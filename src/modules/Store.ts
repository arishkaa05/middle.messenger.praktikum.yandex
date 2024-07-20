import { openMessageContainer } from '../blocks/message-container/module'; 
import { MessageModule } from '../components/message/module'; 
import cloneDeep from '../helpers/cloneDeep';
import { getChatList } from '../pages/chat-page/chat.services';
import { IMessage } from './types';

const SET_USER = 'SET_USER';
const SET_CHAT_LIST = 'SET_CHAT_LIST';
const SET_ACTIVE_CHAT = 'SET_ACTIVE_CHAT';
const SET_NEW_MSG = 'SET_NEW_MSG';

type Action = { type: string; [key: string]: any };
type Reducer = (state: State, action: Action) => State;

type State = {
  [key: string]: any;
};
const messageModuleTest: any = new MessageModule({
    id: 0,
    unread_count: false,
    title: 'Привет! Как дела?',
    time: '10.43',
    name: 'Андрей',
    count: 2,
    events: {
        click: () => openChat(messageModuleTest.props),
    },
});

const initialState: State = {
    userData: {
        first_name: 'User',
        login: 'login',
        phone: '234',
    },
    chatList: [],
    activeChat: {
        title: 'Заголовок',
        id: 0,
    },
    userMessagesList: undefined,
    //   userMessagesList: new UserMessageListModule({
    //     messages: [
    //       new UserMessageModule({
    //         id: 3,
    //         isOwn: false,
    //         message: "Привет! Как де43334ла?",
    //         time: "10:43",
    //         count: 2,
    //       }),
    //     ],
    //   }),
};

const reducer: Reducer = (state, action) => {
    if (!state) state = initialState;
    switch (action.type) {
    case SET_USER:
        return {
            ...cloneDeep(state),
            userData: action.userData,
        };
    case SET_CHAT_LIST:
        return {
            ...cloneDeep(state),
            chatList: action.chatList,
        };
    case SET_ACTIVE_CHAT:
        return {
            ...cloneDeep(state),
            activeChat: action.activeChat,
        };
    case SET_NEW_MSG:
        return {
            ...cloneDeep(state),
            userMessagesList: action.userMessagesList,
        };
    default:
        return state;
    }
};

const createStore = (reducer: Reducer, initialState: State) => {
    const subscribers: Array<(state: State) => void> = [];
    let currentState: State = initialState;

    return {
        getState: () => currentState,
        subscribe: (fn: (state: State) => void) => {
            subscribers.push(fn);
            fn(currentState);
        },
        dispatch: (action: Action) => {
            currentState = reducer(currentState, action);
            subscribers.forEach((fn) => fn(currentState));
        },
    };
};

const store = Object.freeze(createStore(reducer, initialState));

export const openChat = async (chat: IMessage) => {
    store.dispatch({ type: 'SET_ACTIVE_CHAT', activeChat: chat });
    // getChatList();
    // const chatUsers = await getChatUsers(chat.id)
    // console.log(chatUsers)
    openMessageContainer();
};
export default store;
