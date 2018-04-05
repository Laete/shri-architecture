import View from "../../flux/view";

export class Events extends View {
    constructor(emitter) {
        super(emitter);
        this._events = undefined;
        emitter.on('storeChanged', (data) => {
            this.reset({ events: data.events });
        })
    }
    _setData(data) {
        this._events = data.events ? data.events : this._events;
    }

    _redraw() {
        document.querySelector('.log__list').innerHTML = this._events.map(event => {
            return `<li>${event}</li>`;
        }).join('');
    }
}
