export default class View {
    constructor(emitter, dispatcher) {
        this._dispatcher = dispatcher;
        this._emitter = emitter;
        this._initView();
    }

    reset(data) {
        this._setData(data);
        this._redraw();
    }
}
