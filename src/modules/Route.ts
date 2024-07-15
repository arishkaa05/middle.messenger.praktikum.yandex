import isEqual from '../helpers/isEqual';
import { IProps, PlainObject } from './types';



class Route {
    private _pathname: string;

    private _blockClass: any;

    private _block: any;

    private _props: { rootQuery: string; };

    private _root: HTMLElement | null;

    constructor(pathname: string, view: IProps, props: { rootQuery: string }) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
        this._root = document.querySelector(this._props.rootQuery);
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._root) {
            this._root.innerHTML = '';
        } else {
            throw new Error('Root not found');
        }
    }

    match(pathname: string) {
        return isEqual(pathname as unknown as PlainObject, this._pathname as unknown as PlainObject);
    }

    render() {
        if (!this._block) {
            this._block = this._blockClass;
        }
        if (!this._root) {
            throw new Error('Root element for router not found');
        }

        this._root.insertAdjacentElement('beforeend', this._block.getContent());

        this._block.show();
    }
}
export default Route;
