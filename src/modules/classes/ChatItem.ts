import Block from "../Block";
import Handlebars from "handlebars";
import { Chat } from "../../blocks/chat";

class ChatItem extends Block {
  props: {
    name: string;
    message: string;
    isMe: boolean;
    time: string;
    count: number;
    [key: string]: number | string | boolean;
  };

  constructor(props: { name: string; message: string; isMe: boolean; time: string; count: number; [key: string]: number | string | boolean }) {
    super(props);
    this.props = props;
  }

  render() {
    const template = Handlebars.compile(Chat);
    const html = template(this.props);
    return html;
  }
}

export default ChatItem;
