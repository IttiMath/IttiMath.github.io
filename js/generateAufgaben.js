function generate_Plus_10() {
    let maxNumber = 10
    let a = Math.floor(Math.random() * maxNumber);
    let b = Math.floor(Math.random() * (maxNumber - a));
    let result = a + b;
    return { a: a, b: b, result: result };
}

function getAufgabenSet() {
    let ret = [];
    let newProblem = null;
    let lastProblem = null;
    for (let i = 0; i < window.NumberProglemsPerSession; i++) {
        newProblem = generateAufgabe();
        if (lastProblem && newProblem.a === lastProblem.a && newProblem.b === lastProblem.b)
            i--; // retry if the new problem is identical to the last one
        else {
            ret.push(newProblem);
            lastProblem = ret[ret.length - 1];
        }
    }
    return ret;
}

function generateAufgabe() {
    let ret = {}
    if (window.operator === "plus")
        ret = generateAufgabePlus()
    if (window.operator === "minus")
        ret = generateAufgabeMinus()
    if (window.operator === "multiply")
        ret = generateAufgabeMultiply()
    if (window.operator === "divide")
        ret = generateAufgabeDivide()
    return ret;
}

function generateAufgabePlus() {
    // random Aufgaabe from 1 to maxNumber
    let a = Math.floor((1 - Math.random()) * (window.maxNumber-1)) + 1;
    let newMaxNumber = window.maxNumber - a;
    let b = Math.floor((1 - Math.random()) * newMaxNumber) + 1;

    let result = a + b;
    return { a: a, b: b, result: result, difficulty: determineDifficulty({a: a, b: b})};
}

function generateAufgabeMinus() {

    let PlusProblem = generateAufgabePlus();
    let CoinFlip = Math.random() < 0.5;
    if (CoinFlip)
        return { a: PlusProblem.result, b: PlusProblem.a, result: PlusProblem.b, difficulty: PlusProblem.difficulty};
    return { a: PlusProblem.result, b: PlusProblem.b, result: PlusProblem.a, difficulty: PlusProblem.difficulty};
}

function generateAufgabeMultiply() {
    let problems = AUFGABENTABELLE["multiply"][window.numberRange];
    // expand: problems with higher weight appear more frequently
    let expandedProblems = [];
    for (let p of problems) {
        for (let i = 0; i < p.weight; i++) {
            expandedProblems.push(p);
        }
    }
    let problem = expandedProblems[Math.floor(Math.random() * expandedProblems.length)];


    let CoinFlip = Math.random() < 0.5;
    if (CoinFlip)
        return { a: problem.b, b: problem.a, result: problem.result, difficulty: determineDifficulty({a: problem.b, b: problem.a})};
    return { a: problem.a, b: problem.b, result: problem.result, difficulty: determineDifficulty({a: problem.a, b: problem.b})};
}

function generateAufgabeDivide() {
    let mP = generateAufgabeMultiply();

    let CoinFlip = Math.random() < 0.5;
    if (CoinFlip)
        return { a: mP.result, b: mP.b, result: mP.a, difficulty: mP.difficulty};
    return { a: mP.result, b: mP.b, result: mP.a, difficulty: mP.difficulty };
}


 function _operator(operator) {
     if (operator === "plus") return "+";
     if (operator === "minus") return "-";
     if (operator === "multiply") return "x";
     if (operator === "divide") return "÷";
     return "";
 }