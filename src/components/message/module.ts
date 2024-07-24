import Block from '../../modules/Block';
import { Message } from './index';
import { IMessage } from '../../modules/types'; 

export class MessageModule extends Block {
    constructor(props: IMessage) {
        super(props);
    }

    render() {
        return this.makeFragment(Message, this.props);
    }
} 
