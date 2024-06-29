import Block from '../../modules/Block';
import { Textarea } from './index';
import { IInput } from '../../modules/types';

export class TextareaModule extends Block {
    constructor(props: IInput) {
        super(props);
    }

    render() {
        return this.makeFragment(Textarea, this.props);
    }
}
