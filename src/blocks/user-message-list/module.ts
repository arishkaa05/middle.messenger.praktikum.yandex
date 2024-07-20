import { UserMessageModule } from '../../components/user-message/module';
import Block from '../../modules/Block';
import { IMessage, IMessageList } from '../../modules/types';

export class UserMessageListModule extends Block {
    constructor(props: IMessageList) {
        super(props);
        this.props.messages = props.messages;
    }

    render() {
        return this.makeFragment("<div class='message-container__list'>{{{ messages }}}</div>", this.props);
    }
}
