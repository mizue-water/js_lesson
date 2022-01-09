window.onload = function() {
    const leftButton = $('<button>', {
        text: '←'
    });
    const centerButton = $('<button>', {
        text: '↑'
    });
    const rightButton = $('<button>', {
        text: '→'
    });
    const btnArray = [leftButton, centerButton, rightButton];

    const countArray = [];
    for (i = 0; i < btnArray.length; i++) {
        countArray.push(i);
    }

    const leftArea = $('#left');
    leftArea.append(leftButton);
    const centerArea = $('#center');
    centerArea.append(centerButton);
    const rigthArea = $('#right');
    rigthArea.append(rightButton);
    addButtonEvent(btnArray, countArray);
};

function addButtonEvent(buttonArray, indexArray) {
    const randNumber = Math.floor(Math.random() * buttonArray.length);
    const deleteIndex = indexArray.indexOf(randNumber);
    indexArray.splice(deleteIndex, 1);
    const eventButton = buttonArray[randNumber];
    eventButton.on('click', () => {
        alert('敵が現れました！');
    })

    indexArray.forEach(element => {
        const avoidButton = buttonArray[element];
        avoidButton.on('click', () => {
        alert('先に進みました。');
    })
    });
}