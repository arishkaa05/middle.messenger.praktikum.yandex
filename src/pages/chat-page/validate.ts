import { chatTitleInput, teatarea } from './module';
import { checkInput, setErrors } from '../../modules/validation';
import { createChat, deleteChatRequest } from './chat.services';
import { hostWS } from '../../servises/BaseAPI';
import store from '../../modules/Store';
import { formatDate } from '../../helpers/formatDate';

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
            console.log("Соединение установлено");
        
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
              let currentMessages = store.getState().userMessagesList;
              currentMessages.push(newMessage);
              store.dispatch({
                type: "SET_NEW_MSG",
                userMessagesList: currentMessages,
              });
          });
 
    }
};

export const onDeleteUser = (chatId: number) => {
    console.log(chatId);
    if (chatId) deleteChatRequest(chatId);
};
