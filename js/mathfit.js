let num1, num2
let operator = "+"
let maxNumber = 11
let userAnswer = "";
let currentScore = 0
let currentScoreRed = 0


function SetPlus10() {SetMaxNumber(10)}
function SetPlus20() {SetMaxNumber(20)}
function SetPlus50() {SetMaxNumber(50)}
function SetPlus100() {SetMaxNumber(100)}
function SetPlus1000() {SetMaxNumber(1000)}

function SetMinus10() {SetMaxNumber(10, "-")}
function SetMinus20() {SetMaxNumber(20, "-")}
function SetMinus50() {SetMaxNumber(50, "-")}
function SetMinus100() {SetMaxNumber(100, "-")}
function SetMinus1000() {SetMaxNumber(1000, "-")}



function SetMaxNumber(n) {
    if (n == 5) {
        for (let id of ['num6', 'num7', 'num8', 'num9']) {
            document.getElementById(id).style.display = 'none'
        }
    }

    if (n > 5) {
        for (let id of ['num6', 'num7', 'num8', 'num9']) {
            document.getElementById(id).style.display = 'inline-block';
        }
    }
    document.getElementById("aufgabe").innerHTML = "1 - " + String(n) + " (" + operatorWord(operator) + ")"

    maxNumber = n + 1;
    
    generateProblem();
}

function SetOperator(op) {
    operator = op;
    document.getElementById("aufgabe").innerHTML = "1 - " + String(maxNumber-1) + " (" + operatorWord(operator) + ")"
    generateProblem();
}

function generateProblem() {
    switch (operator) {
        case "+":
            num1 = Math.floor(Math.random() * maxNumber);
            num2 = Math.floor(Math.random() * (maxNumber-num1));
            break;
        case "-":
            for (let x = 0; x<100; x++) {
                num1 = Math.floor(Math.random() * maxNumber);
                num2 = Math.floor(Math.random() * maxNumber);
                if (num1 > num2) break
                }
            break;
        case "*":
            [num1, num2] = FromProblemTable("*", maxNumber-1);
            if (num1 != null) break;

            for (let x = 0; x < 100; x++) {
                num1 = Math.floor(Math.pow(Math.random() * maxNumber * maxNumber, 0.25));   // square->random -> root again. this way higher number are more likely
                num2 = Math.floor(Math.pow(Math.random() * maxNumber * maxNumber, 0.25));
                if (num1 * num2 <= maxNumber) break;
            }
            break;
        case "/":
            for (let x = 0; x < 100; x++) {
                num1 = Math.floor(Math.pow(Math.random() * maxNumber * maxNumber, 0.25));   // square->random -> root again. this way higher number are more likely
                num2 = Math.floor(Math.pow(Math.random() * maxNumber * maxNumber, 0.25));
                if (num1 * num2 <= maxNumber) {
                    num1 = num1 * num2
                    break; }
            }
            break;
    }

  document.getElementById("problem").innerHTML = num1 + " " + _operator(operator) + " " + num2;
  userAnswer = "";
  document.getElementById("result").textContent = "";
}

function _operator(operator) {
    if(operator == "*") return "×";
    if(operator == "/") return ":";
    return operator;
}

function operatorWord(operator) {
    switch (operator) {
        case "+":
            return "Plus";
        case "-":
            return "Minus";
        case "*":
            return "Multiply";
        case "/":
            return "Divide";
        default:
            return "";
    }
}


function appendToResult(number) {
    if (document.getElementById("check").innerHTML == 'Leider Falsch') {
        userAnswer = "";
        document.getElementById("check").innerHTML = ''
        clearCheck()}
    userAnswer += number;
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = userAnswer;

    // Highlight the result
    resultDiv.classList.add("highlight");
    setTimeout(() => {
        resultDiv.classList.remove("highlight");
    }, 300); // Remove the highlight after 300ms (0.3 seconds)
}

function clearr(divID){
    document.getElementById(divID).innerHTML = "";
}

function clearResult(){
    userAnswer = "";
    clearr("result")
}

function clearCheck(){
    let check = document.getElementById("check")
    check.innerHTML = ""
    check.classList.remove("correct", "incorrect");
}

function checkAnswer() {
    let correctAnswer;
    switch (operator) {
        case "+":
            correctAnswer = num1 + num2;
            break;
        case "-":
            correctAnswer = num1 - num2;
            break;
        case "*":
            correctAnswer = num1 * num2;
            break;
        case "/":
            correctAnswer = num1 / num2;
            break;
    }

    let check = document.getElementById("check")
    clearCheck()

    if (parseInt(userAnswer) === correctAnswer) {
        check.classList.add("correct")
        score("+")
        check.innerHTML = 'Korrekt!'
        setTimeout(() => {
            generateProblem();
            clearr('check')
        }, 1000); 
        
    } else {
        check.classList.add("incorrect")
        score("-")
        check.innerHTML = 'Leider Falsch'
    }
}


// scoring
function score(w) {
    if (w == "+") _score_Green()
    if (w == "-") _score_Red()
    }

function _score_Green() {
    currentScore += 1
    if (currentScore % 4 === 0) {
        _score_Grid(currentScore / 4 )}
    else {
        _score_Check()
    }

    if (currentScore == 16) _score_Win()
}

function _score_Red() {
    currentScoreRed += 1
    let div = document.createElement('div')
    div.classList.add('inline-block', 'red')
    // div.innerHTML = b_svg('svg-icon-discard', 48)
    div.innerHTML = clsSVG.getCode("icon-discard", 48, 48, "red")
    document.getElementById('scoreRed').appendChild(div)

    if (currentScoreRed == 3) _score_GameOver()
}

function _score_Grid(n) {
    document.getElementById('scoreGreen').innerHTML = ""
    for (let i = 0; i < n; i++) {
        let div = document.createElement('div')
        div.classList.add('inline-block', 'green')
        // div.innerHTML = b_svg('svg-icon-grid', 48)
        div.innerHTML = clsSVG.getCode("icon-grid", 48, 48, "color: transparent; fill:green")
        document.getElementById('scoreGreen').appendChild(div)
        }
}

function _score_Check() {
    let div = document.createElement('div')
    div.classList.add('inline-block', 'green')
    // div.innerHTML = b_svg('svg-icon-check', 48)
    div.innerHTML = clsSVG.getCode("icon-check", 48, 48, "green")
    document.getElementById('scoreGreen').appendChild(div)
}

function _score_GameOver() {
    document.getElementById('scoreGreen').innerHTML = "Game "
    document.getElementById('scoreRed').innerHTML = "Over"
    setTimeout(() => {score_newGame()}, 1000); 
}

function _score_Win() {
    document.getElementById('scoreGreen').innerHTML = "!!! Gewon"
    document.getElementById('scoreRed').innerHTML = "nen !!!"
    setTimeout(() => {score_newGame()}, 1000); 
}

function score_newGame() {
    currentScore = 0
    currentScoreRed = 0
    document.getElementById('scoreGreen').innerHTML = ""
    document.getElementById('scoreRed').innerHTML = ""
    clearCheck()
    document.getElementById("check").innerHTML = "Neues Spiel!"
}

// region level

generateProblem(); // Initial problem