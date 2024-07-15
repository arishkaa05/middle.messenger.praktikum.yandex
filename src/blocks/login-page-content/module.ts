import Block from '../../modules/Block';
import { ILoginPageContent } from '../../modules/types';
import { LoginPageContent } from './login-page-content';

export class LoginPageContentModule extends Block { 
    constructor(props: ILoginPageContent) {
        super(props); 
    }

    render() {
        return this.makeFragment(LoginPageContent, this.props);
    }
}
