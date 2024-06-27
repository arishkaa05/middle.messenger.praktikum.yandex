import { IEventBus, IProps } from './types';

export default class EventBus implements IEventBus {
    public listeners: { [event: string]: Array<(...args: IProps[]) => void> } = {};

    constructor() {
        this.listeners = {};
    }

    on(event: string | number, callback: (...args: IProps[]) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string | number, callback: (...args: IProps[]) => void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }

    emit(event: string, ...args: IProps[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}
