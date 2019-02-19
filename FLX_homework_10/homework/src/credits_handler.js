/* Your code goes here */
function userCard(token) {
    let cardInfo = {
        balance: 100,
        transactionLimit: 100,
        historyLogs: [],
        key: token
    };

    const getCardOptions = function () {
        return cardInfo;
    };

    const putCredits = function (credits) {
        cardInfo.balance = cardInfo.balance + credits;
        gethistoryLogs('Received credits', credits);
    };

    const takeCredits = function (credits) {
        if (credits <= cardInfo.balance && credits <= cardInfo.transactionLimit) {
            cardInfo.balance = cardInfo.balance - credits;
            gethistoryLogs('Withdrawal of credits', credits);
        } else {
            console.error('Transaction error not enough money on Your card');
        }
    };

    const setTransactionLimit = function (credits) {
        cardInfo.transactionLimit = credits;
        gethistoryLogs('Transaction limit change', credits);
    };

    const transferCredits = function (money, nameCard) {
        let tax = 0.005;
        let transferMoney = money + money * tax;
        if (transferMoney > cardInfo.balane && transferMoney > cardInfo.transactionLimit) {
            console.error('Transaction error not enough money on Your card');
        } else {
            this.takeCredits(transferMoney);
            nameCard.putCredits(money);
        }
    }

    const gethistoryLogs = function (operationType, credits) {
        let logOut = {
            operationType,
            credits,
            operationTime: new Date().toLocaleTimeString('en-GB')
        }
        cardInfo.historyLogs.push(logOut);
    }

    return {
        getCardOptions,
        putCredits,
        takeCredits,
        setTransactionLimit,
        transferCredits
    };
}

class UserAccount {
    constructor(name) {
        this.name = name;
        this.cards = [];
    }
    addCard() {
        let cardsLimit = 3;
        if (this.cards.length > cardsLimit) {
            console.error("Can't create card, you have too many cards");
        } else {
            this.cards.push(userCard(this.cards.length + 1));
        }
    }
    getCardByKey(key) {
        return this.cards[key - 1];
    }
}


let userCard2 = 2;
let putValue = 500;
let limitValue = 800;
let transferValue = 300;
let takeValue = 50;

let user = new UserAccount('Bob');
user.addCard();
user.addCard();


let card1 = user.getCardByKey(1);
let card2 = user.getCardByKey(userCard2);

card1.putCredits(putValue);
card1.setTransactionLimit(limitValue);
card1.transferCredits(transferValue, card2);

card2.takeCredits(takeValue);

console.log(card1.getCardOptions());