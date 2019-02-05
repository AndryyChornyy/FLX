// Your code goes here
const amountOfMoney = parseFloat(prompt("Please, write amount from 0 to 9999999"));
const disc = parseFloat(prompt("Please, write discount from 0 to 99"));

if (amountOfMoney < 0 || amountOfMoney > 9999999 || isNaN(amountOfMoney) || disc < 0 || disc > 99 || isNaN(disc)) {
    alert("Invalid data");
} else {
    let priceWithDiscount = amountOfMoney - (amountOfMoney * disc / 100);
    let savedMoney = amountOfMoney - priceWithDiscount;
    alert(`Price without discount: ${+amountOfMoney.toFixed(2)} \nDiscount: ${+disc.toFixed(2)}%` +
        `\nPrice with discount: ${+priceWithDiscount.toFixed(2)} \nSaved: ${+savedMoney.toFixed(2)}`);
}