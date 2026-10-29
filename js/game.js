function startNewGame() {   
    _InitGame() 
    _InitProgressbar()
    _NewProblemSet()

    ShowNumbersBasedOnMaxNumber();
    
    WriteAufgabe();
    
    selectGameScreen()
}

function _InitGame() {
    window.GameIndex += 1;
    window.ProblemIndex = -1;
    window.sessionProblems = [];
}

function _InitProgressbar() {
    const progressSegments = document.querySelectorAll('.progress-segment');
    for (let segment of progressSegments) {
        segment.classList.remove('is-pending', 'is-correct', 'is-incorrect');
        segment.classList.add('is-pending');
    }
}

function _NewProblemSet() {
    window.ProblemsInGame = getAufgabenSet();
    window.SessionHistory.push({
        index: window.SessionHistory.length,
        aufgaben: window.ProblemsInGame
    })
}