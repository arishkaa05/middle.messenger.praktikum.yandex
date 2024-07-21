import Block from '../../modules/Block';
import { IMessage } from '../../modules/types';
import { UserMessage } from './index';

export class UserMessageModule extends Block {
    constructor(props: IMessage) {
        super(props);
    }

    render() {
        return this.makeFragment(UserMessage, this.props);
    }
}
