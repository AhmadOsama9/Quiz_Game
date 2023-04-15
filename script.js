const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
    {
      question: "What is the capital of Iceland?",
      answers: [
        { text: "Reykjavik", correct: true },
        { text: "Oslo", correct: false },
        { text: "Helsinki", correct: false },
        { text: "Stockholm", correct: false }
      ]
    },
    {
      question: "What is the largest country in the world by land area?",
      answers: [
        { text: "Canada", correct: false },
        { text: "United States", correct: false },
        { text: "Russia", correct: true },
        { text: "China", correct: false }
      ]
    },
    {
      question: "Which planet in our solar system is the hottest?",
      answers: [
        { text: "Venus", correct: true },
        { text: "Mars", correct: false },
        { text: "Mercury", correct: false },
        { text: "Jupiter", correct: false }
      ]
    },
    {
      question: "What is the largest organ in the human body?",
      answers: [
        { text: "Liver", correct: false },
        { text: "Brain", correct: false },
        { text: "Heart", correct: false },
        { text: "Skin", correct: true }
      ]
    }
  ];
  