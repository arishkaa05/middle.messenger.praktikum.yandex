import { UserSmallModule } from "../../blocks/user-small/module";
import { MessageListModule } from "../../blocks/message-list/module";
import { MessageModule } from "../../components/message/module";
import { NewMessageModule } from "../../components/new-message/module";
import { SearchModule } from "../../components/search/module";
import Block from "../../modules/Block";
import ChatPage from "./chat-page.hbs?raw";
import { UserMessageListModule } from "../../blocks/user-message-list/module";
import { UserMessageModule } from "../../components/user-message/module";
import { MessageContainerModule } from "../../blocks/message-container/module";
import { IProps } from "../../modules/types";
import { validateMessage, submitForm } from "./validate";
import { TextareaModule } from "../../components/textarea/module";
import { CircleButtonModule } from "../../components/circle-button/module";
import store from "../../modules/Store";
import { connect } from "../../modules/Hoc";
import Router from "../../modules/Router";
const router = new Router("#app");

export class ChatPageModule extends Block {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return this.makeFragment(ChatPage, this.props);
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.userData !== newProps.userData) {
      userMain.setProps({ name: newProps.userData.first_name, info: newProps.userData.login });
    }
    return true;
  }
}

export const chatList = new MessageListModule({
  messages: [
    new MessageModule({
      isOwn: false,
      message: "Привет! Как дела?",
      time: "10.43",
      name: "Андрей",
      count: 2,
    }),
    new MessageModule({
      isOwn: true,
      message: "Хорошо, я на связи",
      time: "10.48",
      name: "Елена",
    }),
    new MessageModule({
      isOwn: true,
      message: "Загружаю файл...",
      time: "11.03",
      name: "Максим",
    }),
    new MessageModule({
      isOwn: false,
      message: "Может, в кино сходим? Новый фильм про супергероев вышел.",
      time: "11.23",
      name: "Ольга",
      count: 1,
    }),
    new MessageModule({
      isOwn: true,
      message: "Это важно. Давай обсудим",
      time: "11.27",
      name: "Иван",
    }),
    new MessageModule({
      isOwn: false,
      message: "Тогда в 19:00 у кинотеатра?",
      time: "11.32",
      name: "Дмитрий",
      count: 5,
    }),
    new MessageModule({
      isOwn: true,
      message: "Как дела?",
      time: "11.34",
      name: "Екатерина",
    }),
  ],
});

export const searchInput = new SearchModule({
  title: "Поиск",
  type: "text",
  name: "search",
  value: "",
});

export const userMain = new UserSmallModule({
  name: store.getState().userData.first_name,
  info: store.getState().userData.login,
  events: {
    click: () => router.go("/settings"),
  },
});

export const sender = new UserSmallModule({
  name: "Андрей",
  info: "online",
});

export const userMessagesList = new UserMessageListModule({
  messages: [
    new UserMessageModule({
      isOwn: false,
      message: "Привет! Как дела?",
      time: "10:43",
      count: 2,
    }),
    new UserMessageModule({ isOwn: true, message: "Привет, Андрей! У меня все хорошо, спасибо.", time: "10:45" }),
    new UserMessageModule({ isOwn: true, message: "А как у тебя дела?", time: "10:46" }),
    new UserMessageModule({
      isOwn: false,
      message: "Все отлично! Слушай, я тут подумал, может, в кино сходим? Вышел новый фильм про супергероев.",
      time: "10:50",
      name: "Андрей",
    }),
    new UserMessageModule({ isOwn: true, message: "Звучит интересно! Когда ты предлагаешь сходить?", time: "10:52" }),
    new UserMessageModule({
      isOwn: false,
      message: "Как насчет сегодня в 19:00 у кинотеатра?",
      time: "10:54",
    }),
    new UserMessageModule({ isOwn: true, message: "Отлично, договорились! Я приду.", time: "10:56" }),
    new UserMessageModule({ isOwn: true, message: "Кстати, как у тебя дела на работе?", time: "10:58" }),
    new UserMessageModule({
      isOwn: false,
      message: "Да все нормально, разбираюсь понемногу. А у тебя как?",
      time: "11:00",
    }),
    new UserMessageModule({ isOwn: true, message: "У меня тоже все хорошо, работы много, но я справляюсь.", time: "11:02" }),
    new UserMessageModule({ isOwn: true, message: "Ладно, увидимся позже в кино, пока!", time: "11:04" }),
    new UserMessageModule({
      isOwn: false,
      message: "Отлично, до встречи!",
      time: "11:05",
    }),
  ],
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

export const createMessagesContainer = new MessageContainerModule({
  sender,
  userMessagesList,
  newMessage,
});

const ConnectedChatPage = connect(ChatPageModule, (state) => ({ userData: state.userData }));

export const createChatList = new ConnectedChatPage({
  chatList,
  searchInput,
  userMain,
  createMessagesContainer,
});
