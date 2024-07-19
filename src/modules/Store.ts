import cloneDeep from '../helpers/cloneDeep';

const SET_USER = 'SET_USER';

type Action = {
  type: string;
  userData?: any;
};

type Reducer<State> = (state: State, action: Action) => State;

type State = {
  userData: {
    first_name: string;
    login: string;
  };
};

const initialState: State = {
    userData: {
        first_name: 'User',
        login: 'login',
    },
};

const reducer: Reducer<State> = (state: State, action: Action) => {
    if (!state) state = initialState;
    switch (action.type) {
    case SET_USER:
        return {
            ...cloneDeep(state),
            userData: action.userData,
        };
    default:
        return state;
    }
};

const createStore = <State>(reducer: Reducer<State>, initialState: State) => {
    const subscribers: Array<(state: State) => void> = [];
    let currentState: State = initialState;

    return {
        getState: () => currentState,
        subscribe: (fn: (state: State) => void) => {
            subscribers.push(fn);
            fn(currentState);
        },
        dispatch: (action: Action) => {
            currentState = reducer(currentState, action);
            subscribers.forEach((fn) => fn(currentState));
        },
    };
};

const store = Object.freeze(createStore(reducer, initialState));

export default store;
