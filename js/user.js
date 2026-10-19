function appendToResult(content) {
    let resultElement = document.getElementById("result");
    if (resultElement.style.color === "var(--color-incorrect)") {
        resultElement.style.color = "";
        resultElement.firstElementChild.textContent = "";
    }

    if (resultElement.textContent.length > 4) return;
    resultElement.firstElementChild.textContent += content;
}

function clearResult() {
    let resultElement = document.getElementById("result");
    resultElement.firstElementChild.textContent = "";
}

async function checkResult() {
    // get the user's answer and the current problem
    let resultElement = document.getElementById("result");
    let userAnswer = parseInt(resultElement.firstElementChild.textContent);
    let problem = window.currentProblem;

    // store the user's answer in the session history
    window.AufgabenHistory[window.AufgabenHistory.length - 1].aufgaben.push({ ...problem, userAnswer: userAnswer });
    window.CurrentAufgabenIndex += 1;

    // update the progress bar
    let nextProgressSegment = document.querySelector('.progress-segment.is-pending');
    nextProgressSegment.classList.remove('is-pending');
    if (userAnswer === problem.result) {
        nextProgressSegment.classList.add('is-correct');
        SuccessJump(resultElement)
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for the success jump animation to complete
        window.currentProblem = generateAufgabe()
        WriteAufgabe();
    } else {
        nextProgressSegment.classList.add('is-incorrect');
        ErrorShake(resultElement)
    }

    if (window.CurrentAufgabenIndex >= window.AufgabenInSession) {
        startGame();
    }
}

