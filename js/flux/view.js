export default class View {
    constructor(dispatcher) {
        this._dispatcher = dispatcher;
        this._initView();
    }

    setLabel(label) {
        document.querySelector('.view-stub__label').innerHTML = `Меня зовут ${label}`;
    }

    setEventLog(events) {
        document.querySelector('.log__list').innerHTML = events.map(event => {
            return `<li>${event}</li>`;
        }).join('');
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
                event: 'Нажата кнопка'
            });
        });
    }
}
