const questions = [
    {
        text: 'Inside which HTML element do we put the JavaScript?',
        variants: [
            '<javascript>',
            '<js>',
            '<script>',
            '<scripting>',
        ],
        correct: 2,
    },
    {
        text: 'What is the correct way to write a JavaScript array?',
        variants: [
            'var colors = "red", "green", "blue"',
            'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
            'var colors = (1:"red", 2:"green", 3:"blue")',
            'var colors = ["red", "green", "blue"]  ',
        ],
        correct: 3,
    },
    {
        text: 'Which event occurs when the user clicks on an HTML element?',
        variants: [
            'onmouseover',
            'onclick',
            'onmouseclick',
            'onchange',
        ],
        correct: 1,
    },
    {
        text: 'What will the following code return: Boolean(10 > 9)',
        variants: [
            'true',
            'false',
            'NaN',
        ],
        correct: 0,
    },
    {
        text: 'How does a FOR loop start?',
        variants: [
            'for (i = 0; i <= 5)',
            'for i = 1 to 5',
            'for (i = 0; i <= 5; i++)',
            'for (i <= 5; i++)',
        ],
        correct: 2,
    },
    {
        text: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        variants: [
            'if i =! 5 then',
            'if (i <> 5)',
            'if (i != 5)',
            'if i <> 5',
        ],
        correct: 2,
    },
    {
        text: 'Is JavaScript case-sensitive?',
        variants: [
            'No',
            'Yes',
        ],
        correct: 1,
    },
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
        getCorrectAnswersAmount: function() {
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