window.AufgabenInSession = 8;
window.CurrentAufgabenIndex = 0;
window.AufgabenmHistory = [];

function startNewSession() {
    // Init session parameters
    window.operator = document.querySelector('input[name="name-operation"]:checked').value;
    window.numberRange = document.querySelector('input[name="name-number-range"]:checked').value;
    window.maxNumber = parseInt(window.numberRange.split('-')[1]);
    // Set Title
    document.querySelector('.problem-title').textContent = `${window.operator} | ${window.numberRange}`;
    
    // Progress bar initialization
    const progressSegments = document.querySelectorAll('.progress-segment');
    for (let segment of progressSegments) {
        segment.classList.remove('is-pending', 'is-correct', 'is-incorrect');
        segment.classList.add('is-pending');
    }
    
    // Initialize session history and counters
    window.AufgabenmHistory.push({
        index: window.AufgabenmHistory.length,
        aufgaben: []
    })
    window.AufgabenInSession = 8;
    window.CurrentAufgabenIndex = 0;
}