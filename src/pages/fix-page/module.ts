import { ErrorModule } from "../../components/error/module";
import { LinkModule } from "../../components/link/module";
import { PageTitleModule } from "../../components/page-title/module";
import Block from "../../modules/Block";
import FixPage from "./fix-page.hbs?raw";

export class FixPageModule extends Block {
  constructor(props: any) {
    super(props);
  }

  render() {
    return this.makeFragment(FixPage, this.props);
  }
}

export const title = new PageTitleModule({
  title: "Мы уже фиксим",
});

export const errorMessage = new ErrorModule({
  title: "500",
});

export const linkChat = new LinkModule({
  page: "chat",
  text: "На страницу чатов",
});

export const createFixPage = new FixPageModule({
  title,
  errorMessage,
  linkChat,
});
