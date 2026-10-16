window.operator = "+";
window.numberRange = "1-10";
window.maxNumber = 10;
window.currentProblem = {};


function startGame() {
    startNewSession()

    generateAufgabe();

    selectScreen('game');
}

function generateAufgabe() {
    if (window.operator === "plus")
        window.currentProblem = generateAufgabePlus()
    if (window.operator === "minus")
        window.currentProblem = generateAufgabeMinus()
    if (window.operator === "multiply")
        window.currentProblem = generateAufgabeMultiply()
    if (window.operator === "divide")
        window.currentProblem = generateAufgabeDivide()

    document.getElementById("problem").innerHTML = window.currentProblem.a + " " + _operator(window.operator) + " " + window.currentProblem.b;
    document.getElementById("result").firstElementChild.textContent = "";
    document.getElementById("result").style.color = "";
}

function generateAufgabePlus() {
    let a = Math.floor(Math.random() * window.maxNumber);
    let b = Math.floor(Math.random() * (window.maxNumber - a));
    let result = a + b;
    return { a: a, b: b, result: result };
}

function generateAufgabeMinus() {
    let minNumber = 0;
    if (window.maxNumber == 20) minNumber = 10;
    if (window.maxNumber == 50) minNumber = 20;
    if (window.maxNumber == 100) minNumber = 50;
    let a = Math.floor(Math.random() * (window.maxNumber - minNumber)) + minNumber;
    let b = Math.floor(Math.random() * a);
    let result = a - b;
    return { a: a, b: b, result: result };
}
function generateAufgabeMultiply() {
    let problems = SubsetFrom_Aufgabentabelle()
    let randomProblem = problems[Math.floor(Math.random() * problems.length)];
    return randomProblem;
}

function generateAufgabeDivide() {
    let problems = SubsetFrom_Aufgabentabelle()
    let randomProblem = problems[Math.floor(Math.random() * problems.length)];
    return randomProblem;
}


 function _operator(operator) {
     if (operator === "plus") return "+";
     if (operator === "minus") return "-";
     if (operator === "multiply") return "x";
     if (operator === "divide") return "÷";
     return "";
 }


 function SubsetFrom_Aufgabentabelle() {
    let subset = AUFGABENTABELLE[window.operator];
    let minNumber = 0;
    if (window.maxNumber == 20) minNumber = 10;
    if (window.maxNumber == 50) minNumber = 20;
    if (window.maxNumber == 100) minNumber = 50;
    if (window.operator === "multiply") {
        subset = subset.filter(item =>  minNumber <= item.result && item.result <= window.maxNumber);
    }

    if (window.operator === "divide") {
        subset = subset.filter(item =>  minNumber <= item.a && item.a <= window.maxNumber 
            && item.b != 1);
    }
    return subset;
 }

