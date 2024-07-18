import { newPasswordInput, oldPasswordInput, passwordPageContent, passwordRepeateInput } from "./module";
import { checkInput, setErrors } from "../../modules/validation";
import { changeUserPassword } from "../profile-page/profile.services";

export const validateOldPassword = (e: Event) => {
  e.preventDefault();
  const input = oldPasswordInput.children.input.getContent() as HTMLInputElement;
  const checking = checkInput("password", input.value);
  const res = setErrors(oldPasswordInput, input.title, checking);
  return res;
};
export const validateNewPassword = (e: Event) => {
  e.preventDefault();
  const input = newPasswordInput.children.input.getContent() as HTMLInputElement;
  const checking = checkInput("password", input.value);
  const res = setErrors(newPasswordInput, input.title, checking);
  return res;
};
export const validateRepeatePassword = (e: Event) => {
  e.preventDefault();
  const input = newPasswordInput.children.input.getContent() as HTMLInputElement;
  const inputRepeate = passwordRepeateInput.children.input.getContent() as HTMLInputElement;
  const checking = checkInput("password", input.value);
  if (checking) {
    if (input.value !== inputRepeate.value) {
      passwordRepeateInput.setProps({ error: "Пароли не совпадают" });
      return false;
    }
    passwordRepeateInput.setProps({ error: "" });
    return true;
  }
  return true;
};

export const submitForm = (e: Event) => {
  e.preventDefault();
  const validations = [validateOldPassword, validateNewPassword, validateRepeatePassword];

  const allValid: boolean = validations.every((validate) => validate(e));

  if (allValid) {
    const inputs = Object.values(passwordPageContent.children);
    const inputValues = inputs.reduce((result, input) => {
      if (input.children.input) {
        const inputNew = input.children.input.getContent();
        result[inputNew.name] = inputNew.value;
      }
      return result;
    }, {});
    console.log(inputValues);
    changeUserPassword(inputValues);
  }
};
