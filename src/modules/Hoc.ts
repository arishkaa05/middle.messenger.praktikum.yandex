// @ts-nocheck
import store from './Store';

export function connect(Component) {
    return class extends Component {
        constructor(...args) {
            super(...args);
            store.subscribe(() => {
                console.log('We are in store subscription');
                this.setProps({ ...store.getState() });
            });
        }
    };
}
