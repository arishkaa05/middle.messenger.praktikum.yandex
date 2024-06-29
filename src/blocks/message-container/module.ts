import Block from '../../modules/Block';
import { IMessageContainer } from '../../modules/types';
import { MessageContainer } from './index';

export class MessageContainerModule extends Block {
    constructor(props: IMessageContainer) {
        super(props);
        this.props.messages = props.messages;
    }

    render() {
        return this.makeFragment(MessageContainer, this.props);
    }
}
