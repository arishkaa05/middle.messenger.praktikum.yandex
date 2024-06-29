import Block from '../../modules/Block';
import { Search } from './index';
import { ISearch } from '../../modules/types';

export class SearchModule extends Block {
    constructor(props: ISearch) {
        super(props);
    }

    render() {
        return this.makeFragment(Search, this.props);
    }
}
