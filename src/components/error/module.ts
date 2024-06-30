import Block from '../../modules/Block';
import { Error } from './index';

export class ErrorModule extends Block {
    constructor(props: { title: string }) {
        super(props);
    }

    render() {
        return this.makeFragment(Error, this.props);
    }
}
