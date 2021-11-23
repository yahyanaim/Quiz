const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
let countdownElement = document.querySelector('.countdown');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let countdownInterval

let selectedChoice = ""
let classToApply = ""
let questions = [
    {
        img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
        question: "Dans quel pays peut-on trouver la Catalogne, l’Andalousie et la Castille?",
        choice1: "Le Portugal",
        choice2: "La France",
        choice3: "L'Espagne",
        choice4: "L'Italie",
        answer: 3,
    },

    {
        question: "Quel pays a remporté la coupe du monde de football en 2014",
        choice1: "Le Brésile",
        choice2: "L'Allemagne",
        choice3: "L'Italie",
        choice4: "L'Argentine",
        answer: 2,
    },

    {
        question: "Qui était le dieu de la guerre dans la mythologie grecque ?",
        choice1: "Hadès",
        choice2: "Appolon",
        choice3: "Hermès",
        choice4: "Arès",
        answer: 4,
    },

    {
        question: "Parmi les animaux suivants, lequel peut se déplacer le plus rapidement",
        choice1: "Le chervreuil",
        choice2: "Le magbobe",
        choice3: "Le léopard",
        choice4: "Le srpingbok",
        answer: 4,
    },

    {
        question: "Le drapeau russe est blanc, bleu et…?",
        choice1: "Le Rouge",
        choice2: "Le Noir",
        choice3: "Le vert",
        choice4: "Le Jaune",
        answer: 1,
    }
 
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 4


startGame = () => {

    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    // qCount = availableQuestions.length
    countdown(5);
    getNewQuestion()
  
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
       localStorage.setItem('mostRecentScore', score)
       return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length) 
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })

        availableQuestions.splice(questionsIndex, 1)

        acceptingAnswers = true 

}

choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if(!acceptingAnswers) return 

            acceptingAnswers = false
             selectedChoice = e.target 
            const selectedAnswer = selectedChoice.dataset['number']

             classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

            if (classToApply === 'correct')
            {
              incrementScore(SCORE_POINTS)  
            }
            selectedChoice.parentElement.classList.add(classToApply)
    })
})

    incrementScore = num => {
        score +=num
        scoreText.innerText = score 
    }

 
    function countdown(duration) {
     
          let minutes, seconds;

          setInterval(function () {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
      
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            countdownElement.innerHTML = `${minutes}:${seconds}`;

            if (--duration < 0) {
                duration = 5
                getNewQuestion()
                selectedChoice.parentElement.classList.remove(classToApply) 
            } 
          }, 1000);
       
      }

    startGame()

 

    