export default class ServerApi {
    constructor(emitter) {
        this._emitter = emitter;
    }

    sendToServer(data) {
        console.log(data);

        this._emitter.trigger('dataIsSent', { data: data })
    }
}
