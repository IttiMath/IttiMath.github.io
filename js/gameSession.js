function NewSession() {
    // Set Title
    _sessionTitle()
}

function _sessionTitle() {
    document.querySelector('.problem-title').innerHTML = document.getElementById("svg-" + window.operator).outerHTML;
    document.querySelector('.problem-title').innerHTML += `<div class="number-label"> ${window.numberRange}</div>`;
}

