function appendToResult(content) {
    let resultElement = document.getElementById("result");
    if (resultElement.style.color === "var(--color-incorrect)") {
        resultElement.style.color = "";
        resultElement.firstElementChild.textContent = "";
    }

    if (resultElement.textContent.length > 4) {
        ErrorShake(resultElement);
        return;
    }
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
    let problem = window.ProblemsInGame[window.ProblemIndex];

    // update the progress bar
    let nextProgressSegment = document.querySelector('.progress-segment.is-pending');
    nextProgressSegment.classList.remove('is-pending');
    if (userAnswer === problem.result) {
        nextProgressSegment.classList.add('is-correct');
        SuccessJump(resultElement)
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for the success jump animation to complete
        let numberOfStars = problem.difficulty;
        for (let i = 0; i < numberOfStars; i++) {
            document.getElementById("collection-of-stars").innerHTML += WriteSVG("svg-star-filled");
        }

    } else {
        nextProgressSegment.classList.add('is-incorrect');
        ErrorShake(resultElement)
    }

    if (window.ProblemIndex + 1 < window.ProblemsInGame.length) {
        WriteAufgabe();
    } else {
        startNewGame()
    }
}

// EVENTLISTENER

// add event listener for the difficulty selection
const starInputs = document.querySelectorAll('input[name="name-difficulty"]');
starInputs.forEach((input, index) => {
    input.addEventListener('change', () => {
        // Wir gehen alle Sterne durch
        starInputs.forEach((el, i) => {
            // Alle bis zum aktuellen (und der aktuelle selbst) werden checked gesetzt
            if (i <= index) {
                el.checked = true;
                // Optional: Füge hier eine CSS-Klasse für das Design hinzu (z. B. für den dunklen Hintergrund wie bei "100")
                el.closest('.star-label').classList.add('selected');
            } else {
                el.checked = false;
                el.closest('.star-label').classList.remove('selected');
            }
        });
    });
});