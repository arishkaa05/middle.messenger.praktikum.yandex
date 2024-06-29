import Block from '../../modules/Block';
import { CircleButton } from './index';
import { IButton } from '../../modules/types';

export class CircleButtonModule extends Block {
    constructor(props: IButton) {
        super(props);
    }

    render() {
        return this.makeFragment(CircleButton, this.props);
    }
}
