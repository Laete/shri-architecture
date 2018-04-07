import EventEmitter from "./service/eventEmitter";
import ServerApi from "./project/api/sendToServer";
import Dispatcher from "./flux/dispatcher";
import Store from "./flux/store";

import reduce from "./project/reducers/reducer"
import {Button} from "./project/components/button";
import {Events} from "./project/components/events";
import {Label} from "./project/components/label";

export default class App {
    constructor() {
        this._globalEmitter = new EventEmitter();
        this._dispatcher = new Dispatcher();
        new ServerApi(this._globalEmitter, this._dispatcher);

        this._initViews();
        this._initStore();
    }

    _initViews() {
        new Events(this._globalEmitter);
        new Label(this._globalEmitter, this._dispatcher);
        new Button(this._globalEmitter, this._dispatcher);
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




export default class Model extends EventEmitter {
    constructor() {
        super();
        this._fields = {};
    }

    getField(fieldName) {
        return this._fields[fieldName];
    }

    setField(fieldName, value) {
        this._fields[fieldName] = value;
        this.trigger('modelChanged', { fieldName: value });
    }
}

export default class View {
    constructor(presenter) {
        this._presenter = presenter;
        presenter.on('modelChanged', (data) => {
            this._updateView(data);
        })
    }

    _performAction(data) {
        this._presenter.trigger('changeModel', data);
    }
}

export default class Presenter extends EventEmitter {
    constructor(model, view) {
        super();

        model.on('modelChanged', (data)=> {
            this.trigger('modelChanged', data);
        });

        view.on('changeModel', (data) => {
            model.setField(data.fieldName, data.value);
        })
    }
}
