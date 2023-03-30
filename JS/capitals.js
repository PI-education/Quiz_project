const questions = [
  {
    question: "Какой город России называют «северной столицей»?",
    optionA: "Москва",
    optionB: "Новгород",
    optionC: "Новосибирск",
    optionD: "Санкт-Петербург",
    correctOption: "optionD",
  },

  {
    question: "Какой город России называют «южной столицей»?",
    optionA: "Ростов-на-Дону",
    optionB: "Новгород",
    optionC: "Хабаровск",
    optionD: "Екатеринбург",
    correctOption: "optionA",
  },

  {
    question: "Столица республики Гондурас?",
    optionA: "Конакри",
    optionB: "Бисау",
    optionC: "Гватемала",
    optionD: "Тегусигальпа",
    correctOption: "optionD",
  },

  {
    question: "Какой город является столицей Казахстана?",
    optionA: "Алматы",
    optionB: "Караганда",
    optionC: "Астана",
    optionD: "Тараз",
    correctOption: "optionC",
  },

  {
    question: "Какая из европейских столиц выросла на месте поселения Лютеция?",
    optionA: "Лондон",
    optionB: "Париж",
    optionC: "Рим",
    optionD: "Милан",
    correctOption: "optionB",
  },

  {
    question: "В какой из европейских столиц парламент заседает в Вестминистерском дворце?",
    optionA: "Париж",
    optionB: "Афины",
    optionC: "Лондон",
    optionD: "Берлин",
    correctOption: "optionC",
  },

  {
    question: "В каком городе расположен штаб-квартира Евросоюза?",
    optionA: "Брюссель",
    optionB: "Афины",
    optionC: "Париж",
    optionD: "Берн",
    correctOption: "optionA",
  },

  {
    question: "Какой город является столицей США?",
    optionA: "Вашингтон",
    optionB: "Бостон",
    optionC: "Нью-Йорк",
    optionD: "Чикаго",
    correctOption: "optionA",
  },

  {
    question: "В какой город в Африке следует ежегодный трансконтинентальный ралли-марафон из Парижа?",
    optionA: "Браззавиль",
    optionB: "Дакар",
    optionC: "Каир",
    optionD: "Алжир",
    correctOption: "optionB",
  },

  {
    question: "Какой город является столицей Китая?",
    optionA: "Шанхай",
    optionB: "Гонконг",
    optionC: "Пекин",
    optionD: "Шанжао",
    correctOption: "optionC",
  },
];

let shuffledQuestions = []; //пустой массив для хранения перетасованных выбранных вопросов из всех доступных вопросов

function handleQuestions() {
  // функция для перемешивания и отправки 10 вопросов в массив shuffledQuestions
  // приложение будет обрабатывать 10 вопросов за раз
  while (shuffledQuestions.length <= 9) {
    const random = questions[Math.floor(Math.random() * questions.length)];
    if (!shuffledQuestions.includes(random)) {
      shuffledQuestions.push(random);
    }
  }
}

let questionNumber = 1; //содержит текущий номер вопроса
let playerScore = 0; // хранит счет игрока
let indexNumber = 0; //будет использоваться при отображении следующего вопроса

// функция для отображения следующего вопроса в массиве для dom
//также обрабатывает отображение информации об игроках и викторинах для dom
function NextQuestion(index) {
  handleQuestions();
  const currentQuestion = shuffledQuestions[index];
  document.getElementById("question-number").innerHTML = questionNumber;
  document.getElementById("right-answers").innerHTML = playerScore;
  document.getElementById("display-question").innerHTML =
    currentQuestion.question;
  document.getElementById("option-one-label").innerHTML =
    currentQuestion.optionA;
  document.getElementById("option-two-label").innerHTML =
    currentQuestion.optionB;
  document.getElementById("option-three-label").innerHTML =
    currentQuestion.optionC;
  document.getElementById("option-four-label").innerHTML =
    currentQuestion.optionD;
}

function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber]; //gets current Question
  const currentQuestionAnswer = currentQuestion.correctOption; //gets current Question's answer
  const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
  let correctOption = null;

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
      //получаем правильный радиовход с правильным ответом
      correctOption = option.labels[0].id;
    }
  });

  //checking to make sure a radio input has been checked or an option being chosen
  if (
    options[0].checked === false &&
    options[1].checked === false &&
    options[2].checked === false &&
    options[3].checked == false
  ) {
    document.getElementById("option-modal").style.display = "flex";
  }
  //   вот эту хуйню надо УБРАТЬ НАХУЙ

  // проверяем, совпадает ли отмеченный переключатель с ответом
  options.forEach((option) => {
    if (option.checked === true && option.value === currentQuestionAnswer) {
      playerScore++; //adding to player's score
      indexNumber++; //adding 1 to index so has to display next question..
      //set to delay question number till when next question loads
      setTimeout(() => {
        questionNumber++;
      }, 100);
      //   вот эту хуйню надо УБРАТЬ НАХУЙ
    } else if (option.checked && option.value !== currentQuestionAnswer) {
      indexNumber++;
      //set to delay question number till when next question loads
      setTimeout(() => {
        questionNumber++;
      }, 100);
    }
  });
}

//вызывается при вызове следующей кнопки
function handleNextQuestion() {
  checkForAnswer(); //check if player picked right or wrong option
  unCheckRadioButtons();
  //delays next question displaying for a second just for some effects so questions don't rush in on player
  setTimeout(() => {
    if (indexNumber <= 9) {
      //displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
      NextQuestion(indexNumber);
    } else {
      handleEndGame(); //ends game if index number greater than 9 meaning we're already at the 10th question
    }
    resetOptionBackground();
  }, 100);
}

//сбрасывает фон ответа обратно на ноль после отображения правильных/неправильных цветов
function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
    document.getElementById(option.labels[0].id).style.backgroundColor = "";
  });
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

// function for when all questions being answered
function handleEndGame() {
  let remark = null;
  let remarkColor = null;

  // Оценка результатов пользователя
  if (playerScore <= 3) {
    remark = "Очень плохо!";
    remarkColor = "red";
  } else if (playerScore >= 4 && playerScore < 7) {
    remark = "Неплохой результат, но вы можете лучше!";
    remarkColor = "orange";
  } else if (playerScore >= 7) {
    remark = "Отличный результат!";
    remarkColor = "green";
  }

  //данные для отображения на табло
  document.getElementById("remarks").innerHTML = remark;
  document.getElementById("remarks").style.color = remarkColor;
  document.getElementById("right-answers").innerHTML = playerScore;
  document.getElementById("score-modal").style.display = "flex";
}

//закрывает модальное окно счета, сбрасывает игру и перетасовывает вопросы
function closeScoreModal() {
  questionNumber = 1;
  playerScore = 0;
  indexNumber = 0;
  shuffledQuestions = [];
  NextQuestion(indexNumber);
  document.getElementById("score-modal").style.display = "none";
}

//функция закрытия модального окна предупреждения
function closeOptionModal() {
  document.getElementById("option-modal").style.display = "none";
}
