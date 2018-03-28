import View from "../flux/view";

export class Events extends View {
    constructor() {
        super();
        this._events = undefined;
    }

    _initView() {}

    _setData(data) {
        this._events = data.events ? data.events : this._events;
    }

    _redraw() {
        document.querySelector('.log__list').innerHTML = this._events.map(event => {
            return `<li>${event}</li>`;
        }).join('');
    }
}
