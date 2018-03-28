export default class ServerApi {
    constructor(emitter) {
        this._emitter = emitter;
    }

    sendToServer(data) {
        console.log(`Отправляем на сервер имя ${data}`);

        this._emitter.trigger('dataIsSent', { name: data })
    }
}
