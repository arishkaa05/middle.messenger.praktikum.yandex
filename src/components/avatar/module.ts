import Block from '../../modules/Block';
import { Avatar } from './index';

export class AvatarModule extends Block {
    constructor(props: any) {
        super(props);
    }

    render() {
        return this.makeFragment(Avatar, this.props);
    }
}
