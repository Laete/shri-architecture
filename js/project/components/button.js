import View from "../../flux/view";

export class Button extends View {
    constructor(emitter, dispatcher) {
        super(dispatcher);
        const button = document.querySelector('.view-stub__apply');
        const input = document.querySelector('.view-stub__input');

        button.addEventListener('click', ()=> {
            const value = input.value;
            dispatcher.dispatch({
                type: 'set_name',
                name: value
            });
            dispatcher.dispatch({
                type: 'event',
                event: `Нажата кнопка, имя ${value}`
            });
        });
    }
    _setData(data) {}

    _redraw() {}
}
