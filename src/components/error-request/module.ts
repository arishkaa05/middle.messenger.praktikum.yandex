import Block from '../../modules/Block';
import { ErrorRequest } from './index';
import { IInputField } from '../../modules/types';

export class ErrorModule extends Block {
    constructor(props: IInputField) {
        super(props);
    }

    render() {
        return this.makeFragment(ErrorRequest, this.props);
    }
}
