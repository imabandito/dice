/*Game variables*/
let activePlayer = 0,
    scores = [0, 0],
    roundScore = 0,
    dice = Math.floor((Math.random() * 6)) + 1;

let winnings = new Map();
winnings.set('player1', 0);
winnings.set('player2', 0);

/*UI elements*/
console.log('client height = ' + document.querySelector('body').clientHeight);
let uNewGame = document.querySelector('.new_game_wrapper'),
    uRoll = document.querySelector('.roll_wrapper'),
    uHold = document.querySelector('.hold_wrapper');

let uActivePlayer = document.querySelector('.active'),
    uScores = document.querySelector('.active>.player_count'),
    uRoundScore = document.querySelector('.active>.current_count'),
    uResult = document.querySelector('.result');

uNewGame.addEventListener('click', function(e) {
    newGame();
});
uRoll.addEventListener('click', function(e) {
    roll();
});
uHold.addEventListener('click', function(e) {
    hold();
});


function newGame() {
    console.log('new');
    uScores = document.querySelectorAll('.player_count'),
        uRoundScore = document.querySelectorAll('.current_count');
    for (let index = 0; index < uScores.length; index++) {
        uScores[index].textContent = '0';
        uRoundScore[index].textContent = '0';
        scores = 0;
        roundScore = 0;
    }
    let cells = document.querySelectorAll('.cell');
    for (let index = 0; index < cells.length; index++) {
        //console.log(cell[index]);
        cells[index].remove();
    }

}

function roll() {
    console.log('Roll');
    uActivePlayer = document.querySelector('.active');
    uScores = document.querySelector('.active>.player_count');
    uRoundScore = document.querySelector('.active .current_count');
    //console.log(uRoundScore);
    dice = Math.floor((Math.random() * 6)) + 1;
    if (dice > 1) {
        roundScore += dice;
        console.log(roundScore, dice);
        uRoundScore.textContent = +roundScore;
        uResult.style.visibility = 'visible';
        let uDicePic = document.querySelector('.result_img img');
        uDicePic.setAttribute('src', `img/dice${dice}.png`);
        //console.log(uDicePic.getAttribute('src'));
        setTimeout(() => { uResult.style.visibility = 'hidden'; }, 200);

    } else {
        roundScore = 0;
        scores = 0;
        uRoundScore.textContent = '0';
        uActivePlayer.classList.remove('active');
        if (activePlayer == 0) {
            document.querySelector('.player2').classList.add('active');

            activePlayer = 1;
        } else {
            activePlayer = 0;
            document.querySelector('.player1').classList.add('active');
        }
        let playersTitles = document.querySelectorAll('.player_title');
        for (let i = 0; i < playersTitles.length; i++) {
            playersTitles[i].classList.toggle('player_cell');
        }


    }



}

function hold() {
    console.log('hold');
    if (activePlayer == 0) {

        document.querySelector('.player2').classList.add('active');
        let uPlayer = document.querySelector('.player1');
        uPlayer.classList.remove('active');
        uPlayer.querySelector('.player_count').textContent = parseInt(uPlayer.querySelector('.player_count').textContent) +
            parseInt(uPlayer.querySelector('.current_count').textContent);
        if (parseInt(uPlayer.querySelector('.current_count').textContent) > 9) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            uPlayer.querySelector('.health').append(cell);
            //console.log(cell);
            winnings.set('player1', uPlayer.querySelectorAll('.cell').length);
        }
        uPlayer.querySelector('.current_count').textContent = '0';
        activePlayer = 1;
    } else {
        document.querySelector('.player1').classList.add('active');
        let uPlayer = document.querySelector('.player2');
        uPlayer.classList.remove('active');
        uPlayer.querySelector('.player_count').textContent = parseInt(uPlayer.querySelector('.player_count').textContent) +
            parseInt(uPlayer.querySelector('.current_count').textContent);
        if (parseInt(uPlayer.querySelector('.player_count').textContent) > 9) {

            let cell = document.createElement('div');
            cell.classList.add('cell');
            uPlayer.querySelector('.health').append(cell);
            console.log(cell);
            winnings.set('player2', uPlayer.querySelectorAll('.cell').length);
        }
        uPlayer.querySelector('.current_count').textContent = '0';
        activePlayer = 0;

    }
    roundScore = 0;
    scores = 0;
    let playersTitles = document.querySelectorAll('.player_title');
    for (let i = 0; i < playersTitles.length; i++) {
        playersTitles[i].classList.toggle('player_cell');
    }

}