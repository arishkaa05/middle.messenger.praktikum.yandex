import Block from '../../modules/Block';
import { Form } from './index';
import { IForm } from '../../modules/types';

export class FormModule extends Block {
    constructor(props: IForm) {
        super(props);
    }

    render() {
        return this.makeFragment(Form, this.props);
    }
}
