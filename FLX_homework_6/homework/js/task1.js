// Your code goes here
const a = parseFloat(prompt('Enter a value'));
const b = parseFloat(prompt('Enter b value'));
const c = parseFloat(prompt('Enter c value'));
const D = (b * b) - 4 * (a * c);

if (D < 0) {
    alert("No solution!")
} else if (!isNaN(D)) {
    let x1 = (-b + Math.sqrt(D)) / (a * 2);
    let x2 = (-b - Math.sqrt(D)) / (a * 2);

    if (D === 0) {
        alert(`x1, x2 = ${x1}`);
    } else {
        alert(`x2 = ${x1} and x2 = ${x2}`);
    }
} else {
    alert('Invalid input data');
}