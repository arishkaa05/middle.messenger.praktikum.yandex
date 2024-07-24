import Block from '../../modules/Block';
import { IAvatar } from '../../modules/types';
import { Avatar } from './index';

export class AvatarModule extends Block {
    constructor(props: IAvatar) {
        super(props);
    }

    render() {
        return this.makeFragment(Avatar, this.props);
    }
}
