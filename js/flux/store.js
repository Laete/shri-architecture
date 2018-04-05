export default class Store {
    constructor(defaultStore, reducer, dispatcher, emitter) {
        let store = defaultStore;

        dispatcher.register((action) => {
            store = reducer(store, action);
            emitter.trigger('storeChanged', { actionType: action.type, ...store });
        });
    }
}
