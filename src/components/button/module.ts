import Block from '../../modules/Block';
import { Button } from './index';
import { IButton } from '../../modules/types';

export class ButtonModule extends Block {
    constructor(props: IButton) {
        super(props);
    }

    render() {
        return this.makeFragment(Button, this.props);
    }
}
