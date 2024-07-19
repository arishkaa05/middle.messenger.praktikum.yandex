import Block from '../../modules/Block';
import { DeleteButton } from './index';
import { IButton } from '../../modules/types';

export class DeleteButtonModule extends Block {
    constructor(props: IButton) {
        super(props);
    }

    render() {
        return this.makeFragment(DeleteButton, this.props);
    }
}
