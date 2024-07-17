import { loginInput, passwordInput, loginPageContent } from "./module";
import { checkInput, setErrors } from "../../modules/validation";
import LoginAPI from "./login-page.api";

export const validatePassword = (e: Event) => {
  e.preventDefault();
  const input = passwordInput.children.input.getContent() as HTMLInputElement;
  const checking = checkInput(input.name, input.value);
  const res = setErrors(passwordInput, input.title, checking);
  return res;
};

export const validateLogin = (e: Event) => {
  e.preventDefault();
  const input = loginInput.children.input.getContent() as HTMLInputElement;
  const checking = checkInput(input.name, input.value);
  const res = setErrors(loginInput, input.title, checking);
  return res;
};

export const submitForm = (e: Event) => {
  e.preventDefault();
  const passwordIsValid = validatePassword(e);
  const loginIsValid = validateLogin(e);

  if (passwordIsValid && loginIsValid) {
    const inputs = Object.values(loginPageContent.children);
    const inputValues = inputs.reduce((result, input) => {
      if (input.children.input) {
        const inputNew = input.children.input.getContent();
        result[inputNew.name] = inputNew.value;
      }
      return result;
    }, {});
    console.log(inputValues);
    const signinApi = new LoginAPI();
    signinApi
      .signInRequest(inputValues)
      .then((response: any) => {
        // Handle the response from the GET request
        console.log("Response from server:", response);
      })
      .catch((error: any) => {
        // Handle any errors that occurred during the request
        console.error("Error fetching data:", error);
      });
  }
};
