window.onload = function() {
    // 画面表示関数を呼び出し
    dispFields("");
};

class Character {
    constructor(name, hp) {
      this.name = name;
      this.hp = hp;
    }
    
    attack() {
      const attackPoint = Math.floor(Math.random() * 10);
      return attackPoint;
    }  
}

//主人公のクラスを作成する
class Hero extends Character {
    constructor(name, hp) {
        super(name, hp);
        this.superAttackPoint = 0;
    }

    // 攻撃（主人公の場合は、通常攻撃3回ごとに必殺技を使える）
    attack() {
        this.superAttackPoint++;
        return super.attack();
    }
    // 必殺技を実行するメソッド
    superAttack() {
        if (this.superAttackPoint < 3) {
            return -1;
        }

        // 必殺技を使ったら、必殺技ポイントはリセットされる
        this.superAttackPoint = 0;

        //　必殺技は、通常攻撃の2倍
        const superAttackPoint = super.attack() * 2;
        return superAttackPoint;
    }
}

  //敵のクラスを作成する
class Enemy extends Character {
    // 獲得できるポイント（経験値）
    getPoint() {}
    
}

// 主人公を生成する
const hero = new Hero("勇者", 30);

function dispFields(message) {
    // メッセージエリア表示
    const messageArea = $('#messagearea');
    messageArea.text(message);

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
            dispFields("");
        });
    });
}

function encount() {
    // 敵の画像を表示する
    const bgArea = $('#bgarea');
    bgArea.text("");
    const img = $('<img>', {
        src: 'img/84263.jpg',
        id: 'background'
    });
    bgArea.append(img);

    // 敵を生成する
    const enemy = new Enemy('普通の敵', 15);

    // メッセージを表示する
    const messageArea = $('#messagearea');
    messageArea.text('敵が現れた！');

    // 戦闘用のボタンを表示する
    // 通常攻撃のボタンを表示する
    const leftArea = $('#left');
    leftArea.text("");
    const attackBtn = $('<button>', {
        text:'通常攻撃'
    });
    attackBtn.on('click', () => {
        // 主人公が攻撃をする
        const heroAp = hero.attack();
        enemy.hp = enemy.hp - heroAp;

        if (enemy.hp <= 0) {
            // 敵が倒せたら通常のフィールドを表示する
            dispFields("敵を倒した。");
        } else {
            // 敵に攻撃したら、主人公の与えたダメージを表示する。
            messageArea.text(`勇者は${heroAp}のダメージを与えた。`);
        }

    });
    leftArea.append(attackBtn);

    // 必殺技攻撃のボタンを表示する
    const centerArea = $('#center');
    centerArea.text("");
    const superAttackBtn = $('<button>', {
        text:'必殺技'
    });
    superAttackBtn.on('click', () => {
        // 主人公が必殺技攻撃をする
        const heroAp = hero.superAttack();

        if (heroAp < 0) {
            // 攻撃ポイントがマイナスの場合、必殺技は使えないメッセージを表示する
            messageArea.text("必殺技はまだ使えない。");
            return;
        }
        enemy.hp = enemy.hp - heroAp;

        if (enemy.hp <= 0) {
            // 敵が倒せたら通常のフィールドを表示する
            dispFields("敵を倒しました。");
        } else {
            // 敵に攻撃したら、主人公の与えたダメージを表示する。
            messageArea.text(`勇者は必殺技で${heroAp}のダメージを与えた。`);
        }
    });
    centerArea.append(superAttackBtn);

    // 逃げるボタンを表示する
    const rightArea = $('#right');
    rightArea.text("");
    const escapeBtn = $('<button>', {
        text:'逃げる'
    });
    escapeBtn.on('click', () => {
        // 通常のフィールドを表示する
        dispFields("敵から逃げられた。");
    });
    rightArea.append(escapeBtn);
}