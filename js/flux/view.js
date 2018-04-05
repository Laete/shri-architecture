export default class View {
    constructor(emitter, dispatcher) {
        this._dispatcher = dispatcher;
        this._emitter = emitter;
    }

    reset(data) {
        this._setData(data);
        this._redraw();
    }
}
