import Handlebars from 'handlebars';
import Block from '../Block';
import { Message } from '../../blocks/message';
import { IProps } from '../types';

class ChatItem extends Block {
    props: IProps;

    constructor(props: IProps) {
        super(props);
        this.props = props;
    }

    render() {
        const template = Handlebars.compile(Message);
        const html = template(this.props);
        return html;
    }
}

export default ChatItem;
