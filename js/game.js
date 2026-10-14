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


 function _operator(operator) {
     if (operator === "plus") return "+";
     if (operator === "minus") return "-";
     return "";
 }


