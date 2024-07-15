// @ts-nocheck
import cloneDeep from "../helpers/cloneDeep";
const createStore = (reducer, initialState) => {
    const subscribers = [];
    let currentState = initialState;

    return {
        getState: () => currentState,
        subscribe: (fn) => {
            subscribers.push(fn);
            fn(currentState);
        },
        dispatch: (action) => {
            currentState = reducer(currentState, action); 
            subscribers.forEach((fn) => fn(currentState));
        },
    };
};

const reducer = (state, action) => {
    const newState = cloneDeep(state);
    if (action.type === 'SET_TEXT') {
        console.log('SET_TEXT');
        newState.buttonText = action.buttonText;
        return newState;
    }
    console.log(newState)
    state = newState
    return state;
};

const state = {
    buttonText: 'Авторизоваться',
};

const setTextAction = {
    type: 'SET_TEXT',
    buttonText: '',
};

const store = Object.freeze(createStore(reducer, state));
export default store;
