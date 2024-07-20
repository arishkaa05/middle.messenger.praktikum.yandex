import Block from '../../modules/Block';
import { ErrorRequest } from './index';
import { IInputField } from '../../modules/types';
import store from '../../modules/Store';

export class ErrorModule extends Block {
    constructor(props: IInputField) {
        super(props);
    }

    render() {
        return this.makeFragment(ErrorRequest, this.props);
    }
}

export const errorRequest = new ErrorModule({
    title: '',
    error: store.getState().error,
    events: {
    // mouseover: () => store.dispatch({ type: "SET_ERROR", error: "" }),
    },
});
