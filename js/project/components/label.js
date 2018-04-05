import View from "../../flux/view";

export class Label extends View {
    constructor(emitter, dispatcher) {
        super(emitter, dispatcher);
        this._label = undefined;

        emitter.on('storeChanged', (data) => {
            if (data.actionType === 'server_sent') {
                const serverName = data.serverName;
                this.reset({ label: serverName });
                dispatcher.dispatch({
                    type: 'event',
                    event: `Установка лейбла, имя ${serverName}`
                });
            }
        })
    }

    _setData(data) {
        this._label = data.label ? data.label : this._label;
    }

    _redraw() {
        document.querySelector('.view-stub__label').innerHTML = `Меня зовут ${this._label}`
    }
}
