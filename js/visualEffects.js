function WriteAufgabe() {
    document.getElementById("problem").innerHTML = window.currentProblem.a + " " + _operator(window.operator) + " " + window.currentProblem.b;
    document.getElementById("result").firstElementChild.textContent = "";
    document.getElementById("result").style.color = "";
}

function WriteSVG(id) {
    // find the svg with the id in the current document
    const svgElement = document.getElementById(id);
    if (svgElement) {
        return svgElement.outerHTML;
    }
    return "";
}

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

function ShowNumbersBasedOnMaxNumber() {
    if (window.maxNumber == 5) {
        ShowOnly1To5();
    } else {
        ShowAllNumbers();
    }
}

function ShowOnly1To5() {
   document.getElementById("num1").style.display = "inline-block";
   document.getElementById("num2").style.display = "inline-block";
   document.getElementById("num3").style.display = "inline-block";
   document.getElementById("num4").style.display = "inline-block";
   document.getElementById("num5").style.display = "inline-block";
   document.getElementById("num6").style.display = "none";
   document.getElementById("num7").style.display = "none";
   document.getElementById("num8").style.display = "none";
   document.getElementById("num9").style.display = "none";
   document.getElementById("num0").style.display = "none";
}

function ShowAllNumbers() {
   document.getElementById("num1").style.display = "inline-block";
   document.getElementById("num2").style.display = "inline-block";
   document.getElementById("num3").style.display = "inline-block";
   document.getElementById("num4").style.display = "inline-block";
   document.getElementById("num5").style.display = "inline-block";
   document.getElementById("num6").style.display = "inline-block";
   document.getElementById("num7").style.display = "inline-block";
   document.getElementById("num8").style.display = "inline-block";
   document.getElementById("num9").style.display = "inline-block";
   document.getElementById("num0").style.display = "inline-block";
}