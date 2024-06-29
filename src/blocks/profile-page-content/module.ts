import Block from '../../modules/Block';
import { IProfilePageContent } from '../../modules/types';
import { ProfilePageContent } from './profile-page-content';

export class ProfilePageContentModule extends Block {
    constructor(props: IProfilePageContent) {
        super(props);
    }

    render() {
        return this.makeFragment(ProfilePageContent, this.props);
    }
}
