export default class Store {
    constructor(defaultStore, reducer, dispatcher, emitter) {
        this._store = defaultStore;
        this._reduce = reducer;
        this._emitter = emitter;

        dispatcher.register((action) => {
            this._store = this._reduce(this._store, action);
            this._emitter.trigger('storeChanged', { actionType: action.type });
        });
    }

    getData(fieldName) {
        return this._store[fieldName];
    }
}
