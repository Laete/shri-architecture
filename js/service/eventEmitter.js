export default class EventEmitter {
    constructor() {
        this._listeners = {};
    }

    on(eventName, callback) {
        if (!this._listeners[eventName]) {
            this._listeners[eventName] = [];
        }

        this._listeners[eventName].push(callback);
    };

    trigger(eventName, data) {
        let listeners = this._listeners[eventName];

        listeners.forEach(callback => {
            callback(data);
        });
    };
}
