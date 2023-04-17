const questionnaires = [
    {
        question: 'Quel est le meilleur language de Programmation en 2022?',
        a:"Java",
        b:"C",
        c:"Python",
        d:"JavaScript",
        correct: "d",
    },
    {
        question: 'Quel evenement est relie au click de l utilisateur sur un element HTML?',
        a:'onmouseover',
        b:'onclick',
        c:'onmouseclick',
        d:'onchange',
        correct: "b",
    },
    {
        question: 'Quel est la syntaxe correcte pour une boucle pour ?',
        a:'for (i = 0; i <= 5)',
        b:'for i = 1 to 5',
        c:'for (i = 0; i <= 5; i++)',
        d:'for (i <= 5; i++)',
        correct: "c",
    },
    {
        question: 'Quel syntaxe permet de dire Si "i" n \'est pas egal a 5?',
        a:'if i =! 5 then',
        b:'if (i <> 5)',
        c:'if (i != 5)',
        d:'if i <> 5',
        correct: "c",
    }
];

const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const reponses = document.querySelectorAll(".reponse");
const questionA = document.getElementById("questionA");
const questionB = document.getElementById("questionB");
const questionC = document.getElementById("questionC");
const questionD = document.getElementById("questionD");

const submit = document.getElementById("submit");

let index = 0;
let score = 0;

chargerQuizz();

function chargerQuizz() {
    reset();// recharger le questionnaire
    const indexQuestion = questionnaires[index];
    question.innerText = indexQuestion.question;
    questionA.innerText = indexQuestion.a;
    questionB.innerText = indexQuestion.b;
    questionC.innerText = indexQuestion.c;
    questionD.innerText = indexQuestion.d;
    // index++;
}

// Recuperer les reponses de l utilisateur
function valeurReponse() {
    const reponses = document.querySelectorAll(".reponse");
    let reponseUtilisateur = undefined;
    reponses.forEach((reponse) => {
        if (reponse.checked) {
            reponseUtilisateur = reponse.id;
        }
    });
    return reponseUtilisateur;
}

function reset() {
    reponses.forEach((reponse) => {
        reponse.checked = false;
    });
}

// formulaire

submit.addEventListener("click", () => {
    const reponseDonnee = valeurReponse();

    if (reponseDonnee) {
        if (reponseDonnee === questionnaires[index].correct) {
            score = score + 1;
        }
        index++;
        if (index < questionnaires.length) {
            chargerQuizz();
        } else {
            quiz.innerHTML = `<h2>Vouz avez trouver ${score}/4 reponses</h2> <button onclick="location.reload()">ReJouer</button>`;
        }
    }
});
