import * as Pages from "../pages/index";
import Handlebars from "handlebars";

const pages: { [key: string]: string[] } = {
  signin: [Pages.SigninPage],
  login: [Pages.LoginPage],
  chat: [Pages.ChatPage],
  notFound: [Pages.NotFoundPage],
  fix: [Pages.FixPage],
  profile: [Pages.ProfilePage],
  password: [Pages.PasswordPage],
};

const navigate = (page: string) => {
  if (pages.hasOwnProperty(page)) {
    const [source, args] = pages[page];
    const handlebarsFunct = Handlebars.compile(source);
    const app = document.getElementById("app");
    if (app) {
      app.innerHTML = handlebarsFunct(args);
    }
    const url = new URL(window.location.href);
    url.pathname = `/${page}`;
    window.history.pushState({}, "", url.toString());
  } else {
    navigate("notFound");
  }
};

export default navigate;
