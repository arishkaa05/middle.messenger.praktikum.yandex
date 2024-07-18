import { getAuthUser } from "../login-page/login.services";
import SigninAPI from "./signin-page.api";

const signinApi = new SigninAPI();

async function handleSignUp(inputValues: any) {
  try {
    const response = await signinApi.signUpRequest(inputValues);
    console.log("Response from server:", response);
    await getAuthUser();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default handleSignUp;
