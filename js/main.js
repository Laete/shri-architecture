import EventEmitter from "./service/eventEmitter";
import ServerApi from "./api/sendToServer";
import Dispatcher from "./flux/dispatcher";
import Store from "./flux/store";

import reduce from "./flux/reducer"
import {Input} from "./components/input";
import {Events} from "./components/events";
import {Label} from "./components/label";

export default class App {
    constructor() {
        this._globalEmitter = new EventEmitter();

        this._api = new ServerApi(this._globalEmitter);
        this._dispatcher = new Dispatcher();
        this._events = new Events();
        this._label = new Label();

        new Input(this._dispatcher);
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
                    const name = this._store.getData('name');
                    this._api.sendToServer(name);
                    this._dispatcher.dispatch({
                        type: 'event',
                        event: `Отправка на сервер, имя ${name}`
                    });
                    break;
                case 'server_sent':
                    const serverName = this._store.getData('serverName')
                    this._label.reset({ label: serverName });
                    this._dispatcher.dispatch({
                        type: 'event',
                        event: `Установка лейбла, имя ${serverName}`
                    });
                    break;
                case 'event':
                    this._events.reset({ events: this._store.getData('events') });
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
                event: `Данные пришли с сервера, имя ${data.name}`
            });
        })
    }
}

const app = new App();
