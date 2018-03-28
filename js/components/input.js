import View from "../flux/view";

export class Input extends View {
    constructor(dispatcher) {
        super(dispatcher);
    }

    _initView() {
        const button = document.querySelector('.view-stub__apply');
        const input = document.querySelector('.view-stub__input');

        button.addEventListener('click', ()=> {
            const value = input.value;
            this._dispatcher.dispatch({
                type: 'set_name',
                name: value
            });
            this._dispatcher.dispatch({
                type: 'event',
                event: `Нажата кнопка, имя ${value}`
            });
        });
    }

    _setData(data) {}

    _redraw() {}
}
