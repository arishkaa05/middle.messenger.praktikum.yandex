import { IProps, PlainObject } from './types';

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
      && value !== null
      && value.constructor === Object
      && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

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
