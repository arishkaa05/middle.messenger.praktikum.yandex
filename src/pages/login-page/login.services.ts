import { router } from "../../modules/Router";
import store from "../../modules/Store"; 
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
    sessionStorage.setItem("userData", JSON.stringify(response)); 
    store.dispatch({ type: "SET_USER", userData: response });
    router.go("/messenger");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
