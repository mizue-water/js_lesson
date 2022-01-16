window.onload = function() {
    // 画面表示関数を呼び出し
    dispFields();
};

function dispFields() {
    // 左矢印ボタン作成
    const leftButton = $('<button>', {
        text: '←'
    });
    // 中央矢印ボタン作成
    const centerButton = $('<button>', {
        text: '↑'
    });
    // 右矢印ボタン作成
    const rightButton = $('<button>', {
        text: '→'
    });

    // 作成したボタンをHTMLに追加する
    // 左矢印ボタンをHTMLに追加
    const leftArea = $('#left');
    leftArea.text("");
    leftArea.append(leftButton);
    // 中央矢印ボタンをHTMLに追加
    const centerArea = $('#center');
    centerArea.text("");
    centerArea.append(centerButton);
    // 右矢印ボタンをHTMLに追加
    const rigthArea = $('#right');
    rigthArea.text("");
    rigthArea.append(rightButton);

    // ランダムに画像を表示する
    const imgAry = ['7210_1.jpg', '25335.jpg', '31966.jpg', '36563.jpg', '38719.jpg'];
    const imgIndex = Math.floor(Math.random() * imgAry.length);
    const imgSrc = imgAry[imgIndex];
    const bgArea = $('#bgarea');
    bgArea.text("");
    // 画像タグを作成
    const img = $('<img>', {
        src: 'img/' + imgSrc,
        id: 'background'
    });
    bgArea.append(img);

    // ボタン自体を配列に格納する
    const btnArray = [leftButton, centerButton, rightButton];
    // 用意したボタンの分だけ、indexを配列に設定する
    const countArray = [];
    for (i = 0; i < btnArray.length; i++) {
        countArray.push(i);
    }
    // ボタンにランダムにイベントを設定する関数を呼び出す
    addButtonEvent(btnArray, countArray);
}

/**
 * 複数のボタンに対し、ランダムにイベントを設定する
 * ボタンの内、一つは敵に遭遇する
 * それ以外のボタンは、敵とは遭遇せず先に進める
 * @param {*} buttonArray イベントを設定したいボタンの配列
 * @param {*} indexArray ボタンの配列のindexの配列
 */
function addButtonEvent(buttonArray, indexArray) {
    // ランダムにボタンを一つ選んで、敵に遭遇したイベントを設定する
    const encountIndex = Math.floor(Math.random() * buttonArray.length);
    const encountButton = buttonArray[encountIndex];
    encountButton.on('click', () => {
        encount();
    })

    // 上記で選ばれたボタン以外には、先に進んだイベントを設定する
    const deleteIndex = indexArray.indexOf(encountIndex);
    indexArray.splice(deleteIndex, 1);
    indexArray.forEach(element => {
        const btn = buttonArray[element];
        btn.on('click', () => {
            dispFields();
        });
    });
}

function encount() {
    // 全ての矢印ボタンはHTMLから表示を消す
    const leftArea = $('#left');
    leftArea.text("");
    const centerArea = $('#center');
    centerArea.text("");
    const rigthArea = $('#right');
    rigthArea.text("");

    // 敵の画像を表示する
    const bgArea = $('#bgarea');
    bgArea.text("");
    const img = $('<img>', {
        src: 'img/84263.jpg',
        id: 'background'
    });
    bgArea.append(img);

    // ゲームを最初からスタートさせるボタンを表示する。
    const restartBtn = $('<button>', {
        text:'最初に戻る'
    });
    restartBtn.on('click', () => {
        dispFields();
    });
    centerArea.append(restartBtn);
}