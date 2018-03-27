export default function reduce(store, action) {
    const newStore = reduce(store, action);
    newStore.events.unshift('Изменен стор');
    return newStore;
}

function reduce(store, action) {
    switch(action.type) {
        case 'set_name':
            return {
                ...store,
                name: action.name,
            };
        case 'server_sent':
            return {
                ...store,
                serverName: action.name
            };
        case 'event':
            return {
                ...store,
                events: [action.event].concat(store.events)
            };
        default:
            return store;
    }
}
