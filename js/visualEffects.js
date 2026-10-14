function ErrorShake(element, color = "var(--color-incorrect)") {
    element.classList.add("error-shake");
    if (color) {
        element.style.color = color;
    }
    setTimeout(() => {
        element.classList.remove("error-shake");
    }, 1000);
}

function SuccessJump(element, color = "var(--color-correct)") {
    element.classList.add("success-jump");
    if (color) {
        element.style.color = color;
    }
    setTimeout(() => {
        element.classList.remove("success-jump");
    }, 1000);
}