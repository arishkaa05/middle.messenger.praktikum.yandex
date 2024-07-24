import Block from '../../modules/Block';
import { SmallAvatar } from './index';

export class SmallAvatarModule extends Block {
    constructor(props: any) {
        super(props);
    }

    render() {
        return this.makeFragment(SmallAvatar, this.props);
    }
}
