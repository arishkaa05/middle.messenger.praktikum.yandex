import Block from '../../modules/Block';
import { InputField } from './index';
import { IInputField } from '../../modules/types';

export class InputFieldModule extends Block {
    constructor(props: IInputField) {
        super(props);
    }

    render() {
        return this.makeFragment(InputField, this.props);
    }
}
