export default class ServerApi {
    constructor(emitter, dispatcher) {
        this._dispatcher = dispatcher;

        emitter.on('storeChanged', (data) => {
            if (data.actionType === 'set_name') {
                const name = data.name;
                this.sendToServer(name);
                dispatcher.dispatch({
                    type: 'event',
                    event: `Отправка на сервер, имя ${name}`
                });
            }
        })
    }

    sendToServer(data) {
        console.log(`Отправляем на сервер имя ${data}`);

        this._dispatcher.dispatch({
            type: 'server_sent',
            name: data
        });
        this._dispatcher.dispatch({
            type: 'event',
            event: `Данные пришли с сервера, имя ${data}`
        });
    }
}
