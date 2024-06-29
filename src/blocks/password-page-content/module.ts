import Block from '../../modules/Block';
import { IPasswordPageContent } from '../../modules/types';
import { PasswordPageContent } from './password-page-content';

export class PasswordPageContentModule extends Block {
    constructor(props: IPasswordPageContent) {
        super(props);
    }

    render() {
        return this.makeFragment(PasswordPageContent, this.props);
    }
}
