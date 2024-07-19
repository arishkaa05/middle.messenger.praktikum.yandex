import Block from '../../modules/Block';
import { NewChat } from './index';
import { ISearch } from '../../modules/types';

export class NewChatModule extends Block {
    constructor(props: ISearch) {
        super(props);
    }

    render() {
        return this.makeFragment(NewChat, this.props);
    }
}
