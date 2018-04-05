import EventEmitter from "./service/eventEmitter";
import ServerApi from "./project/api/sendToServer";
import Dispatcher from "./flux/dispatcher";
import Store from "./flux/store";

import reduce from "./project/reducers/reducer"
import {Input} from "./project/components/input";
import {Events} from "./project/components/events";
import {Label} from "./project/components/label";

export default class App {
    constructor() {
        this._globalEmitter = new EventEmitter();
        this._dispatcher = new Dispatcher();

        this._initStore();
    }

    _initViews() {
        this._events = new Events(this._globalEmitter);
        this._label = new Label(this._globalEmitter);

        new Input(this._globalEmitter, this._dispatcher);
    }

    _initStore() {
        const defaultStore = {
            name: '',
            serverName: '',
            events: []
        };
        this._store = new Store(defaultStore, reduce, this._dispatcher, this._globalEmitter);
    }
}

const app = new App();
