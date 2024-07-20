import Block from '../../modules/Block';
import { IMessageList } from '../../modules/types';

export class UserMessageListModule extends Block {
    addMessage() {
        throw new Error('Method not implemented.');
    }

    constructor(props: IMessageList) {
        super(props);
        this.props.messages = props.messages;
    }

    render() {
        return this.makeFragment("<div class='message-container__list'>{{{ messages }}}</div>", this.props);
    }
}
