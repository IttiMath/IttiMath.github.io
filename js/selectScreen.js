function selectScreen(element) {
    // switch to active screen
    const name = element.title.trim().toLowerCase();
    document.querySelectorAll('.screen').forEach(_screen => {
        _screen.classList.remove('active');
    });
    const targetScreen = document.getElementById('id-section-' + name.toLowerCase());
    if (targetScreen) {
        targetScreen.classList.add('active');
    }

    document.querySelectorAll('nav a').forEach(_navItem => {
        _navItem.classList.remove('active');
    });
    element.classList.add('active');
}


function selectGameScreen(element) {
    // switch to active screen
    document.querySelectorAll('.screen').forEach(_screen => {
        _screen.classList.remove('active');
    });
    document.getElementById("id-section-game").classList.add('active');
}