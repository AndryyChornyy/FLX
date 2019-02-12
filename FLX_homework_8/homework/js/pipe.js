function addOne(x) {
    return x + 1;
}

function pipe() {
    let y = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        y = arguments[i](y);
    }
    return y;
}

pipe(1, addOne);