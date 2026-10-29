function NewSession() {
    // Set Title
    _sessionTitle()

    _ResetStarsToZero()
}

function _sessionTitle() {
    document.querySelector('.problem-title').innerHTML = document.getElementById("svg-" + window.operator).outerHTML;
    document.querySelector('.problem-title').innerHTML += `<div class="number-label"> ${window.numberRange}</div>`;
}

function _ResetStarsToZero() {
    document.getElementById("collection-of-stars").innerHTML = "";
}

