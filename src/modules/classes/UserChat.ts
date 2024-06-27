import Handlebars from 'handlebars';
import Block from '../Block';
import { UserSmall } from '../../blocks/user-small';

class UserChat extends Block {
    props: {
    name: string;
    message: string;
  };

    constructor(props: { name: string; message: string }) {
        super(props);
        this.props = props;
    }

    render() {
        const template = Handlebars.compile(UserSmall);

        const data = {
            name: this.props.name,
            message: this.props.message,
        };
        let html = '<div class="message-page__sender">';
        html += template(data);
        html += '</div>';
        return html;
    }
}

export default UserChat;
