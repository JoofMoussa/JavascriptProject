const questions = [
    {
        question: 'Quel est le meilleur language de Programmation en 2022?',
        choix: [
            "Java",
            "C",
            "Python",
            "JavaScript",
        ],
        correct: 3,
    },
    {
        question: 'Quel evenement est relie au click de l utilisateur sur un element HTML?',
        choix: [
            'onmouseover',
            'onclick',
            'onmouseclick',
            'onchange',
        ],
        correct: 1,
    },
    {
        question: 'Quel est la syntaxe correcte pour une boucle pour ?',
        choix: [
            'for (i = 0; i <= 5)',
            'for i = 1 to 5',
            'for (i = 0; i <= 5; i++)',
            'for (i <= 5; i++)',
        ],
        correct: 2,
    },
    {
        question: 'Quel syntaxe permet de dire Si "i" n \'est pas egal a 5?',
        choix: [
            'if i =! 5 then',
            'if (i <> 5)',
            'if (i != 5)',
            'if i <> 5',
        ],
        correct: 2,
    }
];

const quizApp = new Vue({
    el: '#quizApp',
    data: {
        questions: questions,
        currentIndex: 0,
        answers: Array(questions.length).fill(null),
        incorrectAnswersIndex: new Set(),
    },
    methods: {
        getVariantId: function(iq, iv) {
            return `q${iq}_v${iv}`;
        },
        onButtonClick: function() {
            ++this.currentIndex;
        },
        reponsesCorrectes: function() {
          let correctAnswersAmount = 0;
          
          for (let i = 0; i < this.questions.length; ++i) {
            if (this.questions[i].correct === this.answers[i]) {
                ++correctAnswersAmount;
            }
          }

          this.calculateIncorrectAnswersIndex();
          return correctAnswersAmount;
        },
        calculateIncorrectAnswersIndex : function() {
            for (let i = 0; i < this.questions.length; ++i) {
                if (this.questions[i].correct !== this.answers[i]) {
                    this.incorrectAnswersIndex.add(i);
                }
            }
        }
    },
});