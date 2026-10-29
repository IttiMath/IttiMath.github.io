function user_Start() {
    _GetHomeParameters();

    NewSession() 

    startNewGame()

}

function _GetHomeParameters() {
    window.operator = document.querySelector('input[name="name-operation"]:checked').value;
    window.numberRange = document.querySelector('input[name="name-number-range"]:checked').value;
    window.maxNumber = parseInt(window.numberRange);
}