import { avatar, emailInput, lastNameInput, loginInput, nameInput, phoneInput, profilePageContent, userNameInput } from "./module";
import { checkInput, setErrors } from "../../modules/validation";
import { changeUserProfile, changeUserProfileAvatar } from "./profile.services";

export const validateAvatar = (e: Event) => {
  e.preventDefault;
  console.log(e, avatar);
   // Приведение к HTMLInputElement
  const fileInput = e.target as HTMLInputElement;
  const file = fileInput.files && fileInput.files[0];
  
  console.log(file); // Выводим файл для отладки

  if (file) {
    // Создаем FormData и добавляем файл
    const formData = new FormData();
    formData.append('avatar', file); // 'avatar' - это имя поля, под которым файл ожидает сервер
  
    // Отправляем файл на сервер
    changeUserProfileAvatar(formData); 
  }
};


export const validateEmail = (e: Event) => {
  e.preventDefault();
  const input = emailInput.children.input.getContent() as HTMLInputElement;
  const checking = checkInput(input.name, input.value);
  const res = setErrors(emailInput, input.title, checking);
  return res;
};
export const validateLogin = (e: Event) => {
  e.preventDefault();
  const input = loginInput.children.input.getContent() as HTMLInputElement;
  const checking = checkInput(input.name, input.value);
  const res = setErrors(loginInput, input.title, checking);
  return res;
};

export const validateName = (e: Event) => {
  e.preventDefault();
  const input = nameInput.children.input.getContent() as HTMLInputElement;
  const checking = checkInput(input.name, input.value);
  const res = setErrors(nameInput, input.title, checking);
  return res;
};

export const validateLasname = (e: Event) => {
  e.preventDefault();
  const input = lastNameInput.children.input.getContent() as HTMLInputElement;
  const checking = checkInput(input.name, input.value);
  const res = setErrors(lastNameInput, input.title, checking);
  return res;
};

export const validatePhone = (e: Event) => {
  e.preventDefault();
  const input = phoneInput.children.input.getContent() as HTMLInputElement;
  const checking = checkInput(input.name, input.value);
  const res = setErrors(phoneInput, input.title, checking);
  return res;
};

export const validateUserName = (e: Event) => {
  e.preventDefault();
  const input = userNameInput.children.input.getContent() as HTMLInputElement;
  const checking = checkInput(input.name, input.value);
  const res = setErrors(userNameInput, input.title, checking);
  return res;
};

export const submitForm = (e: Event) => {
  e.preventDefault();
  const validations = [validateEmail, validateLogin, validateName, validateLasname, validatePhone, validateUserName];

  const allValid: boolean = validations.every((validate) => validate(e));

  if (allValid) {
    const inputs = Object.values(profilePageContent.children);
    const inputValues = inputs.reduce((result, input) => {
      if (input.children.input) {
        const inputNew = input.children.input.getContent();
        result[inputNew.name] = inputNew.value;
      }
      return result;
    }, {});
    console.log(inputValues);
    changeUserProfile(inputValues);
  }
};
