export default class EventEmitter {
    constructor() {
        this._listeners = {};
    }

    on(eventName, callback) {
        let listeners = this._listeners[eventName];
        if (!listeners) {
            listeners = [];
        }

        listeners.push(callback);
    };

    trigger(eventName, data) {
        let listeners = this._listeners[eventName];

        listeners.forEach(callback => {
            callback(data);
        });
    };
}
