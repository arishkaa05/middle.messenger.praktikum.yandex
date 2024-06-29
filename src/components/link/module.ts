import Block from '../../modules/Block';
import { Link } from './index';
import { ILink } from '../../modules/types';

export class LinkModule extends Block {
    constructor(props: ILink) {
        super(props);
    }

    render() {
        return this.makeFragment(Link, this.props);
    }
}
