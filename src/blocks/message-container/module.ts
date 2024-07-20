import { UserMessageModule } from "../../components/user-message/module";
import Block from "../../modules/Block";
import store from "../../modules/Store";
import { IMessageContainer } from "../../modules/types";
import { getChatToken } from "../../pages/chat-page/chat.services";
import { UserMessageListModule } from "../user-message-list/module";
import { MessageContainer } from "./index";

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
  console.log(chatId);

  store.dispatch({
    type: "SET_NEW_MSG",
    messageList: [
      new UserMessageModule({
        id: 3,
        isOwn: false,
        message: "Привет! Как дела?",
        time: "10:43",
        count: 2,
      }),
    ],
  });
  const token = await getChatToken(chatId);
  const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token.token}`);
  socket.addEventListener("open", () => {
    console.log("Соединение установлено");

    socket.send(
      JSON.stringify({
        content: "Моё первое сообщение миру!",
        type: "message",
      })
    );
  });

  socket.addEventListener("close", (event) => {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener("message", (event) => {
    // console.log(event);
    // console.log("Получены данные", event.data);
    try {
      const messageData = JSON.parse(event.data);
    //   console.log(store.getState().userMessagesList);
      if (!store.getState().userMessagesList) {
        // const userMessagesList = new UserMessageListModule({
        //   messages: [
        //     new UserMessageModule({
        //       id: messageData.id,
        //       isOwn: false,
        //       message: messageData.content,
        //       time: messageData.time,
        //     }),
        //   ],
        // });
        // console.log(userMessagesList)
        const test = new UserMessageListModule({
            messages: [
              new UserMessageModule({
                id: 3,
                isOwn: false,
                message: "dак dgла?",
                time: "10:43",
                count: 2,
              }),
            ],
          })
        // store.dispatch({ type: "SET_NEW_MSG", userMessagesList: test });
        console.log(store.getState().userMessagesList);
      }
    } catch (error) {
      console.error("Ошибка при парсинге JSON:", error);
    }
  });

  socket.addEventListener("error", (event: any) => {
    console.log("Ошибка", event.message);
  });

  console.log(chatId, userId, token);
};
