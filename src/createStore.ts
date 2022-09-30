import { useState, useMemo } from './hook';
type GlobalStorage = [currentState: any, setNewStateCallback: Function]



class EventEmiiter extends EventTarget {
    emit(key) {
        this.dispatchEvent(new Event(key));
    }
}

export const createAppStore = (initialState: object = {}) => {
    const instance = new EventEmiiter();

    return (key: string): GlobalStorage => {
        const [, setCount] = useState(0);

        useMemo(() => {
            instance.addEventListener(key, () => {
                setCount((c) => (c + 1) & Number.MAX_SAFE_INTEGER);
            });
        }, [key]);

        return [
            initialState[key],
            (cb: Function) => {
                initialState[key] = cb(initialState[key]);
                instance.emit(key);
            },
        ];
    };
};
