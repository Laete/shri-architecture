export default class EventEmitter {
    constructor() {
        this._listeners = {};
    }

    on(eventName, callback) {
        if (!this._listeners[eventName]) {
            this._listeners[eventName] = [];
        }

        this._listeners[eventName].push(callback);

        return this;
    };

    off(eventName) {
        if (this._listeners[eventName]) {
            delete this._listeners[eventName]
        }

        return this;
    }

    trigger(eventName, data) {
        let listeners = this._listeners[eventName];

        listeners.forEach(callback => {
            callback(data);
        });
    };
}
