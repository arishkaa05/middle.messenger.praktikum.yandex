import Block from '../../modules/Block';
import { ISigninPageContent } from '../../modules/types';
import { SigninPageContent } from './signin-page-content';

export class SigninPageContentModule extends Block {
    constructor(props: ISigninPageContent) {
        super(props);
    }

    render() {
        return this.makeFragment(SigninPageContent, this.props);
    }
}
