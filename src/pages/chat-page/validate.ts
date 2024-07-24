import { chatTitleInput, teatarea } from "./module";
import { checkInput, setErrors } from "../../modules/validation";
import { changeChatAvatar, createChat, deleteChatRequest, deleteUserFromChat } from "./chat.services";
import { hostWS } from "../../servises/BaseAPI";
import store from "../../modules/Store";
import { formatDate } from "../../helpers/formatDate";

export const validateMessage = (e: Event) => {
  e.preventDefault();
  const input = teatarea.getContent() as HTMLInputElement;
  const inputValue = (teatarea.getContent() as HTMLInputElement).value;
  teatarea.setProps({ value: inputValue });
  const checking = checkInput(input.name, input.value);
  const res = setErrors(teatarea, input.title, checking);
  return res;
};

export const validateChatTitle = (e: Event) => {
  e.preventDefault();
  const input = chatTitleInput.children.input.getContent() as HTMLInputElement;
  const checking = checkInput(input.name, input.value);
  const res = setErrors(chatTitleInput, input.title, checking);
  if (checking) {
    createChat(input.value);
  }
  return res;
};

export const submitForm = (e: Event) => {
  e.preventDefault();
  const isValid = validateMessage(e);
  if (isValid) {
    const inputValue = (teatarea.getContent() as HTMLInputElement).value;
    const socket = new WebSocket(`${hostWS}/${store.getState().userData.id}/${store.getState().activeChat.id}/${store.getState().token}`);
    socket.addEventListener("open", () => {
      socket.send(
        JSON.stringify({
          content: inputValue,
          type: "message",
        })
      );
      const newMessage = {
        isOwn: true,
        message: inputValue,
        time: formatDate(),
      };
      const currentMessages = store.getState().userMessagesList;
      currentMessages.push(newMessage);
      store.dispatch({
        type: "SET_NEW_MSG",
        userMessagesList: currentMessages,
      });
    });
  }
};

export const onDeleteChat = (chatId: number) => {
  if (chatId) deleteChatRequest(chatId);
};

const findNextId = (id: number): number => {
  const filteredUsers = store.getState().activeChat.users.filter((user: { id: number }) => user.id !== id);
  if (filteredUsers.length > 0) {
    return filteredUsers[0].id;
  }
  return -1;
};

export const onDeleteUser = (chatId: number) => {
  const userId = findNextId(store.getState().userData.id);
  if (userId !== -1) deleteUserFromChat(chatId, userId);
  else store.dispatch({ type: "SET_ERROR", error: "Пользователь не найден" });
};

export const validateAvatar = (e: Event) => {
  e.preventDefault;
  const fileInput = e.target as HTMLInputElement;
  const file = fileInput.files && fileInput.files[0];

  if (file) {
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("chatId", store.getState().activeChat.id);
    changeChatAvatar(formData);
  }
};
