import Block from '../../modules/Block';
import { PageTitle } from './index';

export class PageTitleModule extends Block {
    constructor(props: {title: string}) {
        super(props);
    }

    render() {
        return this.makeFragment(PageTitle, this.props);
    }
}
