import { MessageModule } from "../../components/message/module";
import store, { openChat } from "../../modules/Store";
import { IMessage } from "../../modules/types";
import ChatAPI from "./chat-page.api";

const chatApi = new ChatAPI();

export async function getChatList() {
  try {
    const response: any = await chatApi.getChats();
    const wrappedChatList = response.map((chat: IMessage) => {
      const temp: any = new MessageModule({
        ...chat,
        events: {
          click: () => openChat(temp.props),
        },
      });
      return temp;
    });
    store.dispatch({ type: "SET_CHAT_LIST", chatList: wrappedChatList });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function createChat(title: string) {
  try {
    let body = {
      title: title,
    };
    const response = await chatApi.createChatRequest(body);
    await getChatList();
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function deleteChatRequest(chatId: number) {
  try {
    let body = {
      chatId: chatId,
    };
    const response = await chatApi.deleteChatRequest(body);
    store.dispatch({
      type: "SET_ACTIVE_CHAT",
      activeChat: {
        title: "Заголовок",
        id: 1,
      },
    });
    const noChat = document.getElementById("noChat");
    const selectedChat = document.getElementById("selectedChat");
    if (selectedChat) selectedChat.style.display = "none";
    if (noChat) {
      noChat.style.display = "flex";
    }
    await getChatList();
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
