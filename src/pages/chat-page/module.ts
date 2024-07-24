import { UserSmallModule } from "../../blocks/user-small/module";
import { MessageListModule } from "../../blocks/message-list/module";
import { NewMessageModule } from "../../components/new-message/module";
import Block from "../../modules/Block";
import ChatPage from "./chat-page.hbs?raw";
import { MessageContainerModule } from "../../blocks/message-container/module";
import { IProps } from "../../modules/types";
import { validateMessage, submitForm, validateChatTitle, onDeleteChat, onDeleteUser, validateAvatar } from "./validate";
import { TextareaModule } from "../../components/textarea/module";
import { CircleButtonModule } from "../../components/circle-button/module";
import store, { openChat } from "../../modules/Store";
import { connect } from "../../modules/Hoc";
import { InputFieldModule } from "../../components/input-field/module";
import { InputModule } from "../../components/input/module";
import { MessageModule } from "../../components/message/module";
import { DeleteButtonModule } from "../../components/delete-button/module";
import { addUserContent } from "../../blocks/add-user-modal/module";
import { router } from "../../modules/Router";
import { UserMessageModule } from "../../components/user-message/module";
import { getChatList } from "./chat.services";
import { ErrorModule } from "../../components/error-request/module";
import { SenderModule } from "../../blocks/sender/module";
import { SmallAvatarModule } from "../../components/small-avatar/module";

export class ChatPageModule extends Block {
  constructor(props: IProps) { 
    getChatList();
    super(props);
  }

  render() {
    return this.makeFragment(ChatPage, this.props);
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.userData !== newProps.userData) {
      userMain.setProps({ avatar: `https://ya-praktikum.tech/api/v2/resources${newProps.userData.avatar}` });

      userMain.setProps({ name: newProps.userData.first_name, info: newProps.userData.login });
    }
    if (oldProps.userMessagesList !== newProps.userMessagesList) {
      userMessagesList.setProps({ messages: newProps.userMessagesList.map((message: any) => new UserMessageModule(message)) });
    }
    if (oldProps.error !== newProps.error) {
      errorChatRequest.setProps({ error: newProps.error });
    }
    if (oldProps.activeChat !== newProps.activeChat) {  
      sender.setProps({ name: newProps.activeChat.title });
      avatar.setProps({ avatar: newProps.activeChat.avatar });
      sender.setProps({ countUser: newProps.activeChat.users ? newProps.activeChat.users.length - 1 : 0 });
      createMessagesContainer.setProps({ active: newProps.activeChat.id });
    }
    if (oldProps.chatList !== newProps.chatList) {
      chatList.setProps({
        messages: newProps.chatList.map((chat: any) => {
          const chatModule = new MessageModule(chat);
          chatModule.props.events = {
            click: () => openChat(chat),
          };
          return chatModule;
        }),
      });
    }
    return true;
  }
}

export const chatList = new MessageListModule({
  messages: store.getState().chatList.map((chat: any) => {
    const chatModule = new MessageModule(chat);
    chatModule.props.events = {
      click: () => openChat(chat),
    };
    return chatModule;
  }),
});

export const userMessagesList = new MessageListModule({
  messages: store.getState().userMessagesList.map((message: any) => new UserMessageModule(message)),
});

export const deleteUserButton = new DeleteButtonModule({
  type: "submit",
  text: "Удалить пользователя",
  events: {
    click: () => onDeleteUser(store.getState().activeChat.id),
  },
});

export const deleteChatButton = new DeleteButtonModule({
  type: "submit",
  text: "Удалить чат", 
  events: {
    click: () => onDeleteChat(store.getState().activeChat.id),
  },
});

export const userMain = new UserSmallModule({
  name: store.getState().userData.first_name,
  avatar: store.getState().userData.avatar,
  info: store.getState().userData.login,
  events: {
    click: () => router.go("/settings"),
  },
});

export const avatar = new SmallAvatarModule({
  avatar: store.getState().userData.avatar,
  events: {
      input: (e: Event) => validateAvatar(e),
  },
});

export const sender = new SenderModule({
  name: store.getState().activeChat.title,
  info: "online",
  countUser:  store.getState().activeChat.users ? store.getState().activeChat.users.length - 1 : 0,
  avatar,
  deleteChatButton,
  deleteUserButton,
  addUserContent,
});

export const teatarea = new TextareaModule({
  name: "message",
  value: "",
  title: "Сообщение",
  type: "text",
  events: {
    blur: (e: Event) => validateMessage(e),
  },
});

export const circleButton = new CircleButtonModule({
  type: "submit",
  text: "",
  events: {
    click: submitForm,
  },
});

export const newMessage = new NewMessageModule({
  teatarea,
  circleButton,
});

export const createChatBtn = new CircleButtonModule({
  type: "submit",
  text: "",
  events: {
    click: (e: Event) => validateChatTitle(e),
  },
});

export const chatTitleInput = new InputFieldModule({
  title: "Новый чат",
  input: new InputModule({
    type: "text",
    name: "message",
    title: "Новый чат",
    value: "",
  }),
});

const ConnectedChatPage = connect(ChatPageModule, (state) => ({
  userData: state.userData,
  error: state.error,
  chatList: state.chatList.map((chat: any) => {
    const chatModule = new MessageModule(chat);
    chatModule.props.events = {
      click: () => openChat(chat),
    };
    return chatModule;
  }),
  activeChat: state.activeChat,
  userMessagesList: state.userMessagesList.map((message: any) => new UserMessageModule(message)),
}));

const ConnectedCreateMessagesContainer = connect(MessageContainerModule, (state) => ({
  userData: state.userData,
  chatList: state.chatList.map((chat: any) => {
    const chatModule = new MessageModule(chat);
    chatModule.props.events = {
      click: () => openChat(chat),
    };
    return chatModule;
  }),
  activeChat: state.activeChat,
  userMessagesList: state.userMessagesList.map((message: any) => new UserMessageModule(message)),
}));

export const createMessagesContainer = new ConnectedCreateMessagesContainer({
  sender,
  userMessagesList,
  newMessage,
  active: store.getState().activeChat.id,
});

export const errorChatRequest = new ErrorModule({
  title: "",
  error: store.getState().error,
  events: {
    mouseover: () => store.dispatch({ type: "SET_ERROR", error: "" }),
  },
});

export const createChatList = new ConnectedChatPage({
  chatList,
  newMessage,
  errorChatRequest,
  chatTitleInput,
  createChatBtn,
  userMain,
  createMessagesContainer,
});
