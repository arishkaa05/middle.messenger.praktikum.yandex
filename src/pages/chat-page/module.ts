import { UserSmallModule } from '../../blocks/user-small/module';
import { MessageListModule } from '../../blocks/message-list/module';
import { NewMessageModule } from '../../components/new-message/module';
import Block from '../../modules/Block';
import ChatPage from './chat-page.hbs?raw';
import { UserMessageListModule } from '../../blocks/user-message-list/module';
import { MessageContainerModule } from '../../blocks/message-container/module';
import { IMessage, IProps } from '../../modules/types';
import {
    validateMessage, submitForm, validateChatTitle, onDeleteUser,
} from './validate';
import { TextareaModule } from '../../components/textarea/module';
import { CircleButtonModule } from '../../components/circle-button/module';
import store, { openChat } from '../../modules/Store';
import { connect } from '../../modules/Hoc';
import Router from '../../modules/Router';
import { InputFieldModule } from '../../components/input-field/module';
import { InputModule } from '../../components/input/module';
import { MessageModule } from '../../components/message/module';
import { DeleteButtonModule } from '../../components/delete-button/module';
import { addUserContent } from '../../blocks/add-user-modal/module';

const router = new Router('#app');

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
        if (oldProps.userMessagesList !== newProps.userMessagesList) {
            userMessagesList.setProps({ userMessagesList: newProps.userMessagesList });
        }
        if (oldProps.activeChat !== newProps.activeChat) {
            sender.setProps({ name: newProps.activeChat.title });
            createMessagesContainer.setProps({ active: newProps.activeChat.id });
        }
        if (oldProps.chatList !== newProps.chatList) {
            const wrappedChatList = newProps.chatList.map((chat: IMessage) => {
                const temp: any = new MessageModule({
                    ...chat,
                    events: {
                        click: () => openChat(temp.props),
                    },
                });
                return temp;
            });
            chatList.setProps(wrappedChatList);
        }
        return true;
    }
}

export const chatList = new MessageListModule({
    messages: store.getState().chatList,
});

export const deleteUserButton = new DeleteButtonModule({
    type: 'submit',
    text: '',
    events: {
        click: () => onDeleteUser(store.getState().activeChat.id),
    },
});

export const userMain = new UserSmallModule({
    name: store.getState().userData.first_name,
    info: store.getState().userData.login,
    events: {
        click: () => router.go('/settings'),
    },
});

export const sender = new UserSmallModule({
    name: store.getState().activeChat.title,
    info: 'online',
    deleteUserButton,
    addUserContent,
});

export const { userMessagesList } = store.getState();

// export const userMessagesList = new UserMessageListModule({
//   messages:
//    store.getState().messageList,
// //   [
// //     new UserMessageModule(
// //     {
// //       id: 3,
// //       isOwn: false,
// //       message: "Привет! Как дела?",
// //       time: "10:43",
// //       count: 2,
// //     },
// //     ),
// //   ],
// //   // new UserMessageModule({ isOwn: true, message: "Привет, Андрей! У меня все хорошо, спасибо.", time: "10:45" }),
// //   // new UserMessageModule({ isOwn: true, message: "А как у тебя дела?", time: "10:46" }),
// //   // new UserMessageModule({
// //   //   isOwn: false,
// //   //   message: "Все отлично! Слушай, я тут подумал, может, в кино сходим? Вышел новый фильм про супергероев.",
// //   //   time: "10:50",
// //   //   name: "Андрей",
// //   // }),
// //   // new UserMessageModule({ isOwn: true, message: "Звучит интересно! Когда ты предлагаешь сходить?", time: "10:52" }),
// //   // new UserMessageModule({
// //   //   isOwn: false,
// //   //   message: "Как насчет сегодня в 19:00 у кинотеатра?",
// //   //   time: "10:54",
// //   // }),
// //   // new UserMessageModule({ isOwn: true, message: "Отлично, договорились! Я приду.", time: "10:56" }),
// //   // new UserMessageModule({ isOwn: true, message: "Кстати, как у тебя дела на работе?", time: "10:58" }),
// //   // new UserMessageModule({
// //   //   isOwn: false,
// //   //   message: "Да все нормально, разбираюсь понемногу. А у тебя как?",
// //   //   time: "11:00",
// //   // }),
// //   // new UserMessageModule({ isOwn: true, message: "У меня тоже все хорошо, работы много, но я справляюсь.", time: "11:02" }),
// //   // new UserMessageModule({ isOwn: true, message: "Ладно, увидимся позже в кино, пока!", time: "11:04" }),
// //   // new UserMessageModule({
// //   //   isOwn: false,
// //   //   message: "Отлично, до встречи!",
// //   //   time: "11:05",
// //   // }),
// //   // ],
// });

export const teatarea = new TextareaModule({
    name: 'message',
    value: '',
    title: 'Сообщение',
    type: 'text',
    events: {
        blur: (e: Event) => validateMessage(e),
    },
});

export const circleButton = new CircleButtonModule({
    type: 'submit',
    text: '',
    events: {
        click: submitForm,
    },
});

export const newMessage = new NewMessageModule({
    teatarea,
    circleButton,
});

export const createChatBtn = new CircleButtonModule({
    type: 'submit',
    text: '',
    events: {
        click: (e: Event) => validateChatTitle(e),
    },
});

export const chatTitleInput = new InputFieldModule({
    title: 'Новый чат',
    input: new InputModule({
        type: 'text',
        name: 'message',
        title: 'Новый чат',
        value: '',
    }),
});

export const createMessagesContainer = new MessageContainerModule({
    sender,
    userMessagesList,
    newMessage,
    active: store.getState().activeChat.id,
});

const ConnectedChatPage = connect(ChatPageModule, (state) => ({
    userData: state.userData,
    chatList: state.chatList,
    activeChat: state.activeChat,
    userMessagesList: state.userMessagesList,
}));

export const createChatList = new ConnectedChatPage({
    chatList,
    newMessage,
    chatTitleInput,
    createChatBtn,
    userMain,
    createMessagesContainer,
});
