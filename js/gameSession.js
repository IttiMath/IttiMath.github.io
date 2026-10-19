window.AufgabenInSession = 8;
window.CurrentAufgabenIndex = 0;
window.AufgabenHistory = [];

function startNewSession() {
    // Init session parameters
    window.operator = document.querySelector('input[name="name-operation"]:checked').value;
    window.numberRange = document.querySelector('input[name="name-number-range"]:checked').value;
    window.maxNumber = parseInt(window.numberRange);
    // Set Title
    document.querySelector('.problem-title').innerHTML = document.getElementById("svg-" + window.operator).outerHTML;
    document.querySelector('.problem-title').innerHTML += `<div class="number-label"> ${window.numberRange}</div>`;

    
    
    // Progress bar initialization
    const progressSegments = document.querySelectorAll('.progress-segment');
    for (let segment of progressSegments) {
        segment.classList.remove('is-pending', 'is-correct', 'is-incorrect');
        segment.classList.add('is-pending');
    }
    
    // Initialize session history and counters
    window.AufgabenHistory.push({
        index: window.AufgabenHistory.length,
        aufgaben: []
    })
    window.AufgabenInSession = 8;
    window.CurrentAufgabenIndex = 0;
}

function AufgabeSeenInSession(aufgabe) {
    if (aufgabe == {} || aufgabe == null || Object.keys(aufgabe).length === 0) return false;

    let currentSession = window.AufgabenHistory[window.AufgabenHistory.length - 1];
    for (let a of currentSession.aufgaben) {
        if (a.a === aufgabe.a && a.b === aufgabe.b && a.result === aufgabe.result) {
            return true;
        }
    }
    return false;
}