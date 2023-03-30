const questions = [
  {
    question: "Какой первый город является первым по течению Волги?",
    optionA: "Ржев",
    optionB: "Осташов",
    optionC: "Тверь",
    optionD: "Кимры",
    correctOption: "optionA",
  },

  {
    question: "Как называется самое глубокое озеро не только в нашей стране, но и во всем мире?",
    optionA: "Восток",
    optionB: "Байкал",
    optionC: "Байконур",
    optionD: "Аральское",
    correctOption: "optionB",
  },

  {
    question: "Какое неизвестное озеро мы можем встретить в рассказе Виктора Астафьева?",
    optionA: "Алешкино",
    optionB: "Беличье",
    optionC: "Васюткино",
    optionD: "Мертвое",
    correctOption: "optionC",
  },

  {
    question: "На каком озере находится знаменитый музей-заповедник Кижи?",
    optionA: "Ладожском",
    optionB: "Онежском",
    optionC: "Пещерном",
    optionD: "Ленинградском",
    correctOption: "optionB",
  },

  {
    question: "По какому озеру проходил единственный транспортный путь в Ленинград во время его блокады?",
    optionA: "Лесному",
    optionB: "Онежскому",
    optionC: "Ладожскому",
    optionD: "Босфор",
    correctOption: "optionC",
  },

  {
    question: "Уникальное озеро Мурманской области. Соленая и пресная вода там находится в некотором равновесии. Как называется это озеро?",
    optionA: "Могильное",
    optionB: "Мертвое",
    optionC: "Соленое",
    optionD: "Оранжевое",
    correctOption: "optionA",
  },

  {
    question: "Количество озер на территории Российской Федерации: ",
    optionA: "1 000",
    optionB: "больше миллиона",
    optionC: "2 000 000",
    optionD: "больше двух миллионов",
    correctOption: "optionD",
  },

  {
    question: "Озеро на западе Новгородской области, название которого стало нарицательным. Им обозначают заросшие тростником и камышом небольшие низменные места разливов рек или «умирающие» озера.",
    optionA: "Ильмень",
    optionB: "Истра",
    optionC: "Чудское",
    optionD: "Таймыр",
    correctOption: "optionA",
  },

  {
    question: "На какой реке началась история российского кораблестроения?",
    optionA: "Печора",
    optionB: "Северная Двина",
    optionC: "Онега",
    optionD: "Днепр",
    correctOption: "optionB",
  },

  {
    question: "Самая чистая река не только в нашей стране, но и на планете?",
    optionA: "Лена",
    optionB: "Иртыш",
    optionC: "Волга",
    optionD: "Вонча",
    correctOption: "optionD",
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
  const currentQuestion = shuffledQuestions[indexNumber]; //получает текущий вопрос
  const currentQuestionAnswer = currentQuestion.correctOption; //получает ответ на текущий вопрос
  const options = document.getElementsByName("option"); //получает все элементы в dom с именем 'option' (в данном случае радиовходы)
  let correctOption = null;

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
      //получаем правильный радиовход с правильным ответом
      correctOption = option.labels[0].id;
    }
  });

  //проверка, чтобы убедиться, что установлен флажок радиовхода или выбрана опция
  if (
    options[0].checked === false &&
    options[1].checked === false &&
    options[2].checked === false &&
    options[3].checked == false
  ) {
    document.getElementById("option-modal").style.display = "flex";
  }

  // проверяем, совпадает ли отмеченный переключатель с ответом
  options.forEach((option) => {
    if (option.checked === true && option.value === currentQuestionAnswer) {
      playerScore++; //добавление к счету игрока
      indexNumber++; //добавление 1 к индексу, таким образом, должно отобразить следующий вопрос
      //установите задержку номера вопроса до загрузки следующего вопроса
      setTimeout(() => {
        questionNumber++;
      }, 100);
    } else if (option.checked && option.value !== currentQuestionAnswer) {
      indexNumber++;
      //установили задержку номера вопроса до загрузки следующего вопроса
      setTimeout(() => {
        questionNumber++;
      }, 100);
    }
  });
}

//вызывается при вызове следующей кнопки
function handleNextQuestion() {
  checkForAnswer(); //проверяем, выбрал ли игрок правильный или неправильный вариант
  unCheckRadioButtons();
  //задерживает отображение следующего вопроса на секунду только для некоторых эффектов, чтобы вопросы не сыпались на игрока
  setTimeout(() => {
    if (indexNumber <= 9) {
      //отображает следующий вопрос до тех пор, пока номер индекса не превысит 9
      NextQuestion(indexNumber);
    } else {
      handleEndGame(); //игра заканчивается, если число индекса больше 9, что означает, что мы уже подошли к 10-му вопросу
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

// снимимаем все переключатели для следующего вопроса (также можно выполнить с помощью map или foreach loop)
function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

// функция для получения ответов на все вопросы
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
