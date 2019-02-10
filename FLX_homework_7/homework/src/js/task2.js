let userChoice = confirm('Do you want to play a game?');
let attempt = 3;
let wins = 0;
let userNum, randomNum, onsetCurrentWins;
let currentWins = 10;
let rangeNum = 5;

if (userChoice) {
    while (attempt) {
        if (attempt === 3) {
            onsetCurrentWins = currentWins;
        }
        randomNum = Math.floor(Math.random() * (rangeNum + 1));
        userNum = parseInt(prompt(' Enter a number from 0 to ' +
            (rangeNum) + '\r\n Attempts left: ' + (attempt--) + '\r\n Total prize: ' +
            wins + '\r\n Possible prize on current attempt: ' + currentWins, ''));
        if (randomNum === userNum) {
            rangeNum *= 2;
            wins += currentWins;
            currentWins = onsetCurrentWins * 3;
            attempt = 3;
            alert('Congratulation! Your prize is: ' + wins + ' Do you want to continue?')
        } else {
            currentWins = Math.floor(currentWins / 2);
        }
        if (attempt === 0) {
            alert('Thank you for a game. Your prize is: ' + wins);
            userChoice = confirm('Do you want to play again?');
            if (userChoice) {
                attempt = 3;
                wins = 0;
                rangeNum = 5;
                currentWins = 10;
            }
        }
    }
} else {
    alert('You did not become a millionaire, but can');
}