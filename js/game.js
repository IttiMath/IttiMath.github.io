window.operator = "+";
window.numberRange = "1-100";
window.maxNumber = 100;
window.currentProblem = {};

var IHaveSeenZero = false;


function startGame() {
    startNewSession()
    selectGameScreen()
    
    ShowNumbersBasedOnMaxNumber();
    
    window.currentProblem = generateAufgabe()
    
    WriteAufgabe();
    
}

function generateAufgabe() {
    let ret = {}
    let safetyCount = 0;
    while (AufgabeSeenInSession(ret) || 
            Object.keys(ret).length === 0 ||
            window.operator === "multiply" && window.maxNumber < 11 ||
            window.operator === "divide" && window.maxNumber < 11 ||
            safetyCount < 100) {
                
        if (safetyCount >= 100) {
            console.warn("Safety count exceeded 100 iterations while generating problem.");
            break;
        }
        safetyCount++;
        if (window.operator === "plus")
            ret = generateAufgabePlus()
        if (window.operator === "minus")
            ret = generateAufgabeMinus()
        if (window.operator === "multiply")
            ret = generateAufgabeMultiply()
        if (window.operator === "divide")
            ret = generateAufgabeDivide()
    }
    return ret;
}

function generateAufgabePlus() {
    // random Aufgaabe from 1 to maxNumber
    let a = Math.floor((1 - Math.random()) * (window.maxNumber-1)) + 1;
    let newMaxNumber = window.maxNumber - a;
    let b = Math.floor((1 - Math.random()) * newMaxNumber) + 1;

    let result = a + b;
    return { a: a, b: b, result: result };
}

function generateAufgabeMinus() {
    let minNumber = 0;
    if (window.maxNumber == 20) minNumber = 10;
    if (window.maxNumber == 50) minNumber = 20;
    if (window.maxNumber == 100) minNumber = 50;
    let a = Math.floor(Math.random() * (window.maxNumber - minNumber - 1)) + minNumber + 1;
    let b = Math.floor(Math.random() * a);
    let result = a - b;
    return { a: a, b: b, result: result };
}
function generateAufgabeMultiply() {
    // 1-math = ]0; 1], die unteren Grenze minFator würde also nie erreicht
    // "+1" vergrßert den Bereich, aus dem die Zufallszahlen gewählt werden, sodass die unteren Grenzen erreicht werden können.
    
    let minFactor = 2;
    if (window.maxNumber < 11) minFactor = 1;
   
    let maxA = Math.floor(Math.sqrt(window.maxNumber));
    let a = Math.floor((1 - Math.random()) * (maxA - minFactor+1)) + minFactor;
    let maxB = Math.floor(window.maxNumber / a) // this is not an integer
    let b = Math.floor((1 - Math.random()) * (maxB - minFactor+1)) + minFactor;
    let result = a * b;
    return { a: a, b: b, result: result };
}

function generateAufgabeDivide() {
    let multiplyProblem = generateAufgabeMultiply();
    // inverses Problem: a / b = result
    let a = multiplyProblem.result;
    let b = multiplyProblem.b;
    let result = multiplyProblem.a;
    return { a: a, b: b, result: result };
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

