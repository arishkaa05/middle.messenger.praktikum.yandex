import Block from '../../modules/Block';
import { PageTitle } from './index';
import { IPageTitle } from '../../modules/types';

export class PageTitleModule extends Block {
    constructor(props: IPageTitle) {
        super(props);
    }

    render() {
        return this.makeFragment(PageTitle, this.props);
    }
}
