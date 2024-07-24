import Block from "../../modules/Block";
import { IUserSmall } from "../../modules/types";
import { Sender } from "./index";

export class SenderModule extends Block {
  constructor(props: IUserSmall) {
    super(props);
  }

  render() {
    return this.makeFragment(Sender, this.props);
  }
}
