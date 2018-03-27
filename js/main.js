import EventEmitter from "./service/eventEmitter";
import ServerApi from "./api/sendToServer";

export default class App {
    constructor() {
        this._globalEmitter = new EventEmitter();
        this._api = new ServerApi(this._globalEmitter);
    }
}

const app = new App();
