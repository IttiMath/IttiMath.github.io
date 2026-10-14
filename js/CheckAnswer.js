let Aufgaben = []
let AufgabenIndex = 0

function checkAnswer() {
    let akutellAufgabe = Aufgaben[AufgabenIndex]

    document.getElementById("id-aufgabe").innerHTML = 
        akutellAufgabe.aufgabe

    if (document.getElementById("id-ergebnis").value == akutellAufgabe.ergebnis) {
        document.getElementById("id-check").classList.add("correct")
        document.getElementById("id-check").innerHTML = 'Korrekt!'
        setTimeout(() => {
            generateProblem();
        }, 1000); 
    } else {
        document.getElementById("id-check").classList.add("incorrect")
        document.getElementById("id-check").innerHTML = 'Leider Falsch'
    }

    AufgabenIndex += 1
}