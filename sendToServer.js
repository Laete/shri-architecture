function sendToServer(data) {
    console.log(data);

    var event = new CustomEvent('dataIsSent', { detail: data });

    document.dispatchEvent(event);
}


// Пример обработки события dataIsSent. Рекомендуется изменить API модуля так,
// чтобы вызова события через document не было

// function test() {
//     document.addEventListener('dataIsSent', function(event) {
//         console.log('event got ' + event.detail);
//     });
//     sendToServer('mydata');
// }
