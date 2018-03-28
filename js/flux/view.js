export default class View {
    constructor(dispatcher) {
        this._dispatcher = dispatcher;
        this._initView();
    }

    reset(data) {
        this._setData(data);
        this._redraw();
    }
}
