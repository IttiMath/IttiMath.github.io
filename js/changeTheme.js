window.color = 'blue'; // Default-Farbe
window.theme = "light"; // Default-Theme

function changeColor(color) {
    window.color = color;
    changeLook();
}

function changeTheme(theme) {
    window.theme = theme;
    changeLook();
}

function changeLook() {
    const body = document.body;
    body.className = `${window.theme} ${window.color}`;

    // Update the selected radio button based on the current color
    const homeRadios = document.querySelectorAll('\
        input[name="name-operation"],\
        input[name="name-number-range"]\
        ');
        
    homeRadios.forEach(radio => {
        radio.nextElementSibling.classList.remove('gray', 'blue', 'pink', 'green');
        radio.nextElementSibling.classList.add(window.color);
    });
}