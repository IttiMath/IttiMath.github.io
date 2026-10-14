function generate_Plus_10() {
    let maxNumber = 10
    let a = Math.floor(Math.random() * maxNumber);
    let b = Math.floor(Math.random() * (maxNumber - a));
    let result = a + b;
    return { a: a, b: b, result: result };
}



