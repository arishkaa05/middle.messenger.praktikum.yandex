import Block from '../../modules/Block';
import { Input } from './index';
import { IInput } from '../../modules/types';

export class InputModule extends Block {
    constructor(props: IInput) {
        super(props);
    }

    render() {
        return this.makeFragment(Input, this.props);
    }
}
