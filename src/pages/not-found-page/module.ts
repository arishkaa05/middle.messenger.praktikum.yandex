import { ErrorModule } from "../../components/error/module";
import { LinkModule } from "../../components/link/module";
import { PageTitleModule } from "../../components/page-title/module";
import Block from "../../modules/Block";
import NotFoundPage from "./not-found-page.hbs?raw";

export class NotFoundPageModule extends Block {
  constructor(props: any) {
    super(props);
  }

  render() {
    return this.makeFragment(NotFoundPage, this.props);
  }
}

export const title = new PageTitleModule({
  title: "Не туда попали",
});

export const errorMessage = new ErrorModule({
  title: "404",
});

export const linkChat = new LinkModule({
  page: "chat",
  text: "На страницу чатов",
});

export const createNotFoundPage = new NotFoundPageModule({
  title,
  errorMessage,
  linkChat,
});
