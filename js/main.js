import EventEmitter from "./service/eventEmitter";
import ServerApi from "./api/sendToServer";
import Dispatcher from "./flux/dispatcher";
import Store from "./flux/store";

import reduce from "./flux/reducer"
import View from "./flux/view";

export default class App {
    constructor() {
        this._globalEmitter = new EventEmitter();

        this._api = new ServerApi(this._globalEmitter);
        this._dispatcher = new Dispatcher();
        this._view = new View(this._dispatcher);

        const defaultStore = {
            name: '',
            serverName: '',
            events: []
        };
        this._store = new Store(defaultStore, reduce, this._dispatcher, this._globalEmitter);
        this._initStoreEvents();
    }

    _initStoreEvents() {
        this._globalEmitter.on('storeChanged', (data) => {
            switch (data.actionType) {
                case 'set_name':
                    this._api.sendToServer(this._store.getData('name'));
                    this._dispatcher.dispatch({
                        type: 'event',
                        event: 'Отправка на сервер'
                    });
                    break;
                case 'server_sent':
                    this._view.setLabel(this._store.getData('serverName'));
                    this._dispatcher.dispatch({
                        type: 'event',
                        event: 'Установка лейбла'
                    });
                    break;
                case 'event':
                    this._view.setEventLog(this._store.getData('events'));
                    break;
                default:
                    return;
            }
        });
        this._globalEmitter.on('dataIsSent', (data) => {
            this._dispatcher.dispatch({
                type: 'server_sent',
                ...data
            });
            this._dispatcher.dispatch({
                type: 'event',
                event: 'Данные пришли с сервера'
            });
        })
    }
}

const app = new App();
