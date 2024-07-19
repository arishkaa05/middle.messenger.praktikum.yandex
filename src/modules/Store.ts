import { MessageListModule } from "../blocks/message-list/module";
import { MessageModule } from "../components/message/module";
import cloneDeep from "../helpers/cloneDeep";
import { getChatList } from "../pages/chat-page/chat.services";
import { IMessage } from "./types";

const SET_USER = "SET_USER";
const SET_CHAT_LIST = "SET_CHAT_LIST";
const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";

type Action = { type: string; [key: string]: any };
type Reducer = (state: State, action: Action) => State;

type State = {
  [key: string]: any;
};
let messageModuleTest: any = new MessageModule({
  id: 1,
  unread_count: false,
  title: "Привет! Как дела?",
  time: "10.43",
  name: "Андрей",
  count: 2,
  events: {
    click: () => openChat(messageModuleTest.props),
  },
});

const initialState: State = {
  userData: {
    first_name: "User",
    login: "login",
  },
  chatList: [messageModuleTest],
  activeChat: {
    title: "Заголовок",
    id: 1,
  },
};

export const openChat = (user: IMessage) => {
  const noChat = document.getElementById("noChat");
  const selectedChat = document.getElementById("selectedChat");
  if (selectedChat) selectedChat.style.display = "flex";
  if (noChat) {
    noChat.style.display = "none";
  }
  store.dispatch({ type: "SET_ACTIVE_CHAT", activeChat: user });
  getChatList();
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

export default store;
