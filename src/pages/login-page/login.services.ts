import { router } from "../../modules/Router";
import store from "../../modules/Store";
import { getChatList } from "../chat-page/chat.services";
import LoginAPI from "./login-page.api";

const signinApi = new LoginAPI();

export async function handleSignIn(inputValues: any) {
  try {
    await signinApi.signInRequest(inputValues);
    await getAuthUser();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getAuthUser() {
  try {
    const response = await signinApi.getAuthUser();
    store.dispatch({ type: "SET_USER", userData: response });
    await getChatList();
    router.go("/messenger");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
