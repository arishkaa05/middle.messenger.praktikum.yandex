import Block from '../../modules/Block';
import { IUserSmall } from '../../modules/types';
import { UserSmall } from './index';

export class UserSmallModule extends Block {
    constructor(props: IUserSmall) {
        super(props);
    }

    render() {
        return this.makeFragment(UserSmall, this.props);
    }
}
