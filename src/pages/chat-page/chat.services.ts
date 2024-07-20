import store from "../../modules/Store";
import ChatAPI from "./chat-page.api";

const chatApi = new ChatAPI();

export async function getChatList() {
  try {
    const response: any = await chatApi.getChats();

    store.dispatch({ type: "SET_CHAT_LIST", chatList: response });
  } catch (error) {
    store.dispatch({ type: "SET_ERROR", error: error })
  }
}

export async function createChat(title: string) {
  try {
    const body = {
      title,
    };
    await chatApi.createChatRequest(body);
    await getChatList();
  } catch (error) {
    store.dispatch({ type: "SET_ERROR", error: error })
  }
}

export async function deleteChatRequest(chatId: number) {
  try {
    const body = {
      chatId,
    };
    await chatApi.deleteChatRequest(body);
    store.dispatch({
      type: "SET_ACTIVE_CHAT",
      activeChat: {
        title: "Заголовок",
        id: 0,
      },
    });
    const noChat = document.getElementById("noChat");
    const selectedChat = document.getElementById("selectedChat");
    if (selectedChat) selectedChat.style.display = "none";
    if (noChat) {
      noChat.style.display = "flex";
    }
    await getChatList(); 
  } catch (error) {
    store.dispatch({ type: "SET_ERROR", error: error })
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
    store.dispatch({ type: "SET_ERROR", error: error })
    return error;
  }
}

export async function addUserToChat(userId: number, chatid: string) {
  try {
    const body = {
      users: [userId],
      chatId: chatid,
    };
    const response = await chatApi.addUserToChat(body);
    return response;
  } catch (error) {
    store.dispatch({ type: "SET_ERROR", error: error })
    return error;
  }
}

export async function getChatUsers(chatId: number) {
  try {
    const response: any = await chatApi.getChatUsers(chatId);
    return response;
  } catch (error) {
    store.dispatch({ type: "SET_ERROR", error: error })
  }
}

export async function getChatToken(chatId: number) {
  try {
    const response: any = await chatApi.getChatToken(chatId);
    return response;
  } catch (error) {
    store.dispatch({ type: "SET_ERROR", error: error })
  }
}
