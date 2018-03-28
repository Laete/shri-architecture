import View from "../flux/view";

export class Label extends View {
    constructor() {
        super();
        this._label = undefined;
    }

    _initView() {}

    _setData(data) {
        this._label = data.label ? data.label : this._label;
    }

    _redraw() {
        document.querySelector('.view-stub__label').innerHTML = `Меня зовут ${this._label}`
    }
}
