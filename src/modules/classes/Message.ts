import Block from "../Block";
import Handlebars from "handlebars";
import { UserMessage } from "../../components/user-message";

class Message extends Block {
  props: {
    isOwn: boolean;
    message: string;
    time: string
  };

  constructor(props: { message: string; isOwn: boolean, time: string }) {
    super(props);
    this.props = props;
  }

  render() { 
    const template = Handlebars.compile(UserMessage); 
    const html = template(this.props);
    return html;
  }
}

export default Message;
