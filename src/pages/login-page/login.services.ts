import LoginAPI from "./login-page.api";

const signinApi = new LoginAPI();

export async function handleSignIn(inputValues: any) {
  try {
    const response = await signinApi.signInRequest(inputValues);
    console.log("Response from server:", response);

    await getAuthUser();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getAuthUser() {
  try {
    const response = await signinApi.getAuthUser();
    console.log("Response from server:", response);
    window.location.href = "messenger";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
