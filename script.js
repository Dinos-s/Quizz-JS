const question = document.querySelector('#question')
const answerBox = document.querySelector('#answers-box')
const quizzContainer = document.querySelector('#quizz-container')
const scoreContainer = document.querySelector('#score-container')

const letters = ['a', 'b', 'c', 'd']

let points = 0
let actualQuestion = 0

//Perguntas
const questions = [
    {
        "question": "PHP foi desenvolvido para qual finalidade?",
        "answers":[
            {
                "answer": "front-end",
                "correct": false
            },
            {
                "answer": "back-end",
                "correct": true
            },
            {
                "answer": "Banco de Dados (BD)",
                "correct": false
            },
            {
                "answer": "Sistema Operacional (OS)",
                "correct": false
            },
        ]
    },

    {
        "question": "Qual é a forma de declarar uma consttante em JS?",
        "answers":[
            {
                "answer": "let",
                "correct": false
            },
            {
                "answer": "@var",
                "correct": false
            },
            {
                "answer": "const",
                "correct": true
            },
            {
                "answer": "function()",
                "correct": false
            },
        ]
    },

    {
        "question": "Qual a defineção da sigla CSS?",
        "answers":[
            {
                "answer": "Cascading Style Sheets",
                "correct": true
            },
            {
                "answer": "Java Script",
                "correct": false
            },
            {
                "answer": "Custom Super Style",
                "correct": false
            },
            {
                "answer": "Common Stylized Stable",
                "correct": false
            },
        ]
    },
]

// Substituição da perguta na tela
function init(){
    console.log('iniciou');
    createQuestion(0)
}

function createQuestion(i) {
    // limpar questão anterior
    const oldButtons = answerBox.querySelectorAll('button')
    oldButtons.forEach(function(btn){
        btn.remove()
    })

    // alternancia dapergunta
    const questionText = question.querySelector('#question-text')
    const questionNumber = question.querySelector("#question-number")

    questionText.textContent = questions[i].question
    questionNumber.textContent = i + 1;

    // Alternativas
    questions[i].answers.forEach(
        function(answer, i) {
            // botão deresposta
            const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

            const letterBtn = answerTemplate.querySelector('.btn-letter')
            const answerText = answerTemplate.querySelector('.question-answer')

            letterBtn.textContent = letters[i]
            answerText.textContent = answer['answer']

            answerTemplate.setAttribute('correct-answer', answer['correct'])

            //Remover hide e classe template
            answerTemplate.classList.remove('hide')
            answerTemplate.classList.remove('answer-template')

            // alternativass na tela
            answerBox.appendChild(answerTemplate);

            // Click no butão
            answerTemplate.addEventListener('click',
                function() {
                    checkAnswer(this)
                }
            )
        }
    )
    // Incrementando o num da questão
    actualQuestion++
}

function checkAnswer(btn){
    // butões selecionados 
    const buttons = answerBox.querySelectorAll('button')

    // add classe de resposta correta no btns
    buttons.forEach(
        function(button) {
            if (button.getAttribute('correct-answer') === 'true') {
                button.classList.add('correct-answer')
                // check se acertou
                if (btn === button) {
                    points++;
                    console.log(points);
                }
            } else{
                button.classList.add('wrong-answer')
            }
        }
    )

    // exibir proxima pergunta
    nextQuestion()
}

function nextQuestion() {
    // verifica as respostas
    setTimeout(function() {
        if(actualQuestion >= questions.length){
            // apresenta a msg de sucesso
            showSuccessMessage()
            return;
        }
        createQuestion(actualQuestion)
    }, 1000);
}


// tela final
function showSuccessMessage() {
    hiderOrShowQuizz()

    // calculo de pontos
    const score = ((points / questions.length) * 100).toFixed(2);
    const displayScore = document.querySelector('#display-score span');
    displayScore.textContent = score.toString()

    // alterar num da perguntas
    const correctAnswers = document.querySelector('#correct-answers');
    correctAnswers.textContent = points

    const totalQuestions = document.querySelector('#questions-qty')
    totalQuestions.textContent = questions.length
}

// Restart Quizz
const restartBtn = document.querySelector('#restart')

restartBtn.addEventListener('click', function(){
    actualQuestion = 0
    points = 0
    hiderOrShowQuizz()
    init()
})

function hiderOrShowQuizz() {
    quizzContainer.classList.toggle('hide')
    scoreContainer.classList.toggle('hide')
}

// Quizz iniciado
init()