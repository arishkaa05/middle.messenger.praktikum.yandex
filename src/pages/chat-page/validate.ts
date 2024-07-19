import { chatTitleInput, teatarea } from "./module";
import { checkInput, setErrors } from "../../modules/validation";
import { createChat, deleteChatRequest } from "./chat.services";

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
    console.log({ message: inputValue });
  }
};

export const onDeleteUser = (chatId: number) => {
  console.log(chatId);
  if (chatId) deleteChatRequest(chatId);
};
