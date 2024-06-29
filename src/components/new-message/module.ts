import Block from '../../modules/Block';
import { NewMessage } from './index';
import { IInput } from '../../modules/types';

export class NewMessageModule extends Block {
    constructor(props: IInput) {
        super(props);
    }

    render() {
        return this.makeFragment(NewMessage, this.props);
    }
}
