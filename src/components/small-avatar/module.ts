import Block from '../../modules/Block';
import { IAvatar } from '../../modules/types';
import { SmallAvatar } from './index';

export class SmallAvatarModule extends Block {
    constructor(props: IAvatar) {
        super(props);
    }

    render() {
        return this.makeFragment(SmallAvatar, this.props);
    }
}
