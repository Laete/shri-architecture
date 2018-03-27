export default class Dispatcher {
    constructor() {
        this._callbacks = [];
    }

    register(callback) {
        this._callbacks.push(callback)
    }

    dispatch(action) {
        this._callbacks.forEach(callback => {
            callback(action);
        });
    }
}
