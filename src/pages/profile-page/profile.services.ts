import ProfileAPI from "./profile-page.api";

const profileApi = new ProfileAPI();

export async function handleLogout() {
  try {
    const response = await profileApi.logoutRequest();
    console.log("Response from server:", response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function changeUserProfile(userData: any) {
  try {
    const response = await profileApi.changeUserProfile(userData);
    console.log("Response from server:", response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function changeUserPassword(userData: any) {
  try {
    const response = await profileApi.changeUserPassword(userData);
    console.log("Response from server:", response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
