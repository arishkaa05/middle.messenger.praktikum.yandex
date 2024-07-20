import { formatDate } from "../../helpers/formatDate";
import Block from "../../modules/Block";
import store from "../../modules/Store";
import { IMessageContainer } from "../../modules/types";
import { getChatToken } from "../../pages/chat-page/chat.services";
import { hostWS } from "../../servises/BaseAPI";
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

  const socket = new WebSocket(`${hostWS}/${userId}/${chatId}/${token.token}`);
  socket.addEventListener("open", () => {
    socket.send(
      JSON.stringify({
        content: "Моё первое сообщение миру!",
        type: "message",
      })
    );
  });

  socket.addEventListener("close", (event) => {
    if (event.wasClean) {
    } else {
      store.dispatch({ type: "SET_ERROR", error: "Обрыв соединения" });
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener("message", (event) => {
    try {
      const messageData = JSON.parse(event.data);
      const newMessage = {
        id: messageData.id,
        isOwn: false,
        message: messageData.content,
        time: formatDate(messageData.time),
      };
      let currentMessages = store.getState().userMessagesList;
      currentMessages.push(newMessage);
      store.dispatch({
        type: "SET_NEW_MSG",
        userMessagesList: currentMessages,
      });
    } catch (error) {}
  });

  socket.addEventListener("error", (event: any) => {
    store.dispatch({ type: "SET_ERROR", error: event.message });
  });
};
