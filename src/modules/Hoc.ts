import Block from "./Block";
import store from "./Store";
import isEqual from "../helpers/isEqual";

export function connect(Component: typeof Block, mapStateToProps: (state: any) => any) {
  return class extends Component {
    constructor(props: any) {
      let state = mapStateToProps(store.getState());
      super({ ...props, ...state });

      store.subscribe(() => {
        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }
        state = newState;
      });
    }
  };
}
