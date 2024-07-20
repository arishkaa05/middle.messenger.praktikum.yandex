import Block from "../../modules/Block";
import { IMessageList } from "../../modules/types";

export class MessageListModule extends Block {
  constructor(props: IMessageList) {
    super(props);
    this.props.messages = props.messages;
  }

  render() {
    return this.makeFragment("<div>{{ messages }}</div>", this.props);
  }
}
