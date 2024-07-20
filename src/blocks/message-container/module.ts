import Block from "../../modules/Block";
import store from "../../modules/Store";
import { IMessageContainer } from "../../modules/types";
import { getChatToken } from "../../pages/chat-page/chat.services";
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
    try {
      const messageData = JSON.parse(event.data);
      console.log(messageData);
      const newMessage = {
        id: messageData.id,
        isOwn: false,
        message: messageData.content,
        time: messageData.time,
      };
      let currentMessages = store.getState().userMessagesList;
      currentMessages.push(newMessage);
      store.dispatch({
        type: "SET_NEW_MSG",
        userMessagesList: currentMessages,
      });
    } catch (error) {
      console.error("Ошибка при парсинге JSON:", error);
    }
  });

  socket.addEventListener("error", (event: any) => {
    console.log("Ошибка", event.message);
  });

  console.log(chatId, userId, token);
};
