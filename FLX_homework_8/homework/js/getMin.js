function getMin() {
  let a = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    let b = arguments[i];
    if (b < a) {
      a = b;
    }
  }
  return a;
}
getMin(3, 0, -3);