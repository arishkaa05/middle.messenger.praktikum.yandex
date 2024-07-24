import { router } from "../../modules/Router";
import store from "../../modules/Store";
import ProfileAPI from "./profile-page.api";

const profileApi = new ProfileAPI();

export async function handleLogout() {
  try {
    await profileApi.logoutRequest();
    sessionStorage.removeItem("userData");
    router.go("/");
  } catch (error) {
    store.dispatch({ type: "SET_ERROR", error });
    throw error;
  }
}

export async function changeUserProfile(userData: any) {
  try {
    await profileApi.changeUserProfile(userData);
    userData.avatar = store.getState().userData.avatar;
    sessionStorage.setItem("userData", JSON.stringify(userData));
    store.dispatch({ type: "SET_USER", userData: userData });
    router.go("/messenger");
  } catch (error) {
    store.dispatch({ type: "SET_ERROR", error });
    throw error;
  }
}

export async function changeUserProfileAvatar(formData: FormData) {
  try {
    let resopnce = await profileApi.changeUserProfileAvatar(formData);
    store.dispatch({ type: "SET_USER", userData: resopnce });
    sessionStorage.setItem("userData", JSON.stringify(resopnce));
    router.go("/messenger");
  } catch (error) {
    store.dispatch({ type: "SET_ERROR", error });
    throw error;
  }
}

export async function changeUserPassword(userData: any) {
  try {
    profileApi.changeUserPassword(userData);
    router.go("/messenger");
  } catch (error) {
    store.dispatch({ type: "SET_ERROR", error });
    throw error;
  }
}
