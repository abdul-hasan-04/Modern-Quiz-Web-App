let quizAppContianer = document.querySelector(".quiz-content");
let quizQuestion = document.querySelector(".question");
let quizAnswers = document.querySelector(".answers");
let checkBtn = document.querySelector(".check-btn");
let result = document.querySelector(".result");
let startBtn = document.querySelector(".start-quiz");
let headQuiz = document.querySelector(".header");
let alarm = document.querySelector(".alarm");
let time_container = document.querySelector(".time-count");
let timerCountSpan = document.querySelector(".timer");
let scoreContainer = document.querySelector(".score-container");
let restartBtn = scoreContainer.querySelector(".btn");
let askPermissionContainer = document.querySelector(".ask-permission");
let progressAnimation = document.querySelector(".progress");
let userUessBtn;
let userTellMeBtn;

let questions = [
  {
    question: "Which country has the largest population in the world?",
    options: ["India", "USA", "China", "Russia"],
    correct: 0,
  },
  {
    question: "Who was the first president of the United States?",
    options: [
      "George Washington",
      "Abraham Lincoln",
      "John Adams",
      "Thomas Jefferson",
    ],
    correct: 0,
  },
  {
    question: "In which year did World War II end?",
    options: ["1942", "1945", "1939", "1950"],
    correct: 1,
  },
  {
    question: "Which ancient civilization built the pyramids?",
    options: ["Romans", "Greeks", "Egyptians", "Mayans"],
    correct: 2,
  },
  {
    question: "Who was known as the Napoleon of Africa?",
    options: [
      "Nelson Mandela",
      "Samori Ture",
      "Haile Selassie",
      "Kwame Nkrumah",
    ],
    correct: 1,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    correct: 2,
  },
  {
    question: "What is the capital city of Canada?",
    options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    correct: 2,
  },
  {
    question: "Which desert is the largest in the world?",
    options: ["Sahara", "Gobi", "Kalahari", "Arabian"],
    correct: 0,
  },
  {
    question: "What is the basic unit of life?",
    options: ["Atom", "Cell", "Molecule", "Organ"],
    correct: 1,
  },
  {
    question: "Which organ pumps blood in the human body?",
    options: ["Brain", "Lungs", "Heart", "Liver"],
    correct: 2,
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correct: 2,
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Brain", "Skin", "Liver"],
    correct: 2,
  },
  {
    question: "What planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 1,
  },
  {
    question: "What force keeps us on the ground?",
    options: ["Magnetism", "Gravity", "Friction", "Energy"],
    correct: 1,
  },
  {
    question: "What is H2O commonly known as?",
    options: ["Oxygen", "Hydrogen", "Water", "Salt"],
    correct: 2,
  },
  {
    question: "What part of the atom has a positive charge?",
    options: ["Electron", "Neutron", "Proton", "Nucleus"],
    correct: 2,
  },
  {
    question: "Who wrote Romeo and Juliet?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Mark Twain",
      "Leo Tolstoy",
    ],
    correct: 1,
  },
  {
    question: "What is the fastest land animal?",
    options: ["Lion", "Cheetah", "Tiger", "Horse"],
    correct: 1,
  },
  {
    question: "Which language has the most native speakers in the world?",
    options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
    correct: 0,
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correct: 2,
  },
];

// Global state
let quizIndex = 0;
let currentQuestion = questions[quizIndex];
let lastQuestion = 0;
let trackQuestion = null;
let selectedAnswerElement = null;
let selectedIndexElement = null;

let score = 0;

let defaultAnswerDuration = 20;
let timerInterval = null;
let runningTime = defaultAnswerDuration;


// askagin with smart //
const askAgain = () => {
  askPermissionContainer.classList.remove("active");
  quizAnswers.classList.add("reverse");
  clearInterval(timerInterval);
  timerInterval = null;
  restartTimer();
  // restart prgress //
  progressAnimation.offsetHeight;
  progressAnimation.style.animation = "none";
  progressAnimation.style.animation = "width 20s linear";
}
// help to answer the question //
const helpUser = () => {
  askPermissionContainer.classList.remove("active");


  let answers = quizAnswers.querySelectorAll("li");
  answers.forEach((ans, index) => {
    if(index !== currentQuestion.correct){
      ans.classList.add("incorrect");

    }else{
      ans.classList.add("correct");

    }
  })


  setTimeout(() => {
     clearInterval(timerInterval);
     timerInterval = null;
     nexQuestion();
  }, 2000);
}


// go to next question //
const nexQuestion = () => {
  if (quizIndex >= questions.length - 1) {
      setTimeout(() => {
      endQuiz();
    }, 1000);
  
  } else {
    qnumber++;
    quizIndex++;
    restartTimer();
    progressAnimation.style.animation = "none";
    progressAnimation.offsetHeight;
    progressAnimation.style.animation = "width 20s linear";
    loadQuestion();
  }
};

// handleUserAnswers //
const checkuserAnswers = () => {
  //  check if the answeruser clicked by user is correct or not // check if it has index number that is same to its correct //
  if (selectedAnswerElement === null) {
    alert("please, select answer first.");
    return;
  }
  if (selectedIndexElement === currentQuestion.correct) {
    selectedAnswerElement.classList.add("correct");
    // increase score // because user get correct answer //
    score++;
    setTimeout(() => {
      nexQuestion();
    }, 1500);
  } else {
    // add incorrect class //
    selectedAnswerElement.classList.add("incorrect");
    // disable to click answers btn, becuzu no chance when user clicked checkbtn //
    let answers = quizAnswers.querySelector("li");
    answers.style.pointerEvents = "none";
    answers.classList.add("correct");
    
    // answers.classList.remove("selected");
    // after delay go to next question //
    setTimeout(() => {
      nexQuestion();
    }, 2500);
  }
};

// renderFunction //
const renderQuestion = (currentQuestion) => {
  quizAnswers.innerHTML = "";
  // first render question
  if(!currentQuestion) return;

  quizQuestion.textContent = `${qnumber} . ${currentQuestion.question}`;
  // render answers//
  currentQuestion.options.forEach((answer, index) => {
    // display answer text object to li html element //
    let listAnswerElement = document.createElement("li");
    listAnswerElement.textContent = answer;
    // so now in this block we have 4 list element textcontent is there object answer // || append their parent
    quizAnswers.append(listAnswerElement); // means now i have question and its possible answer from array of object || questions
    // now we are ready to listen user interaction and do somethings //
    listAnswerElement.addEventListener("click", () => {
      // stop timer //
      stoptimerFunction();
      selectedAnswerElement = listAnswerElement; // this makes i can access globally the element clicked by user.
      selectedIndexElement = index; // and it's index;
      let answers = quizAnswers.querySelectorAll("li");
      stoptimerFunction();
      progressAnimation.style.animationPlayState = "paused";
      answers.forEach((answ) => answ.classList.remove("selected")); // it removes selected class all list answers elements, every click happens //
      listAnswerElement.classList.add("selected"); // it adds selected class to only answer which is clicked lastly.
      //  disbale checkbtn //
      checkBtn.disabled = false;
      checkBtn.classList.remove("disable");
    });
  });
};


const askPermission = () => {
  askPermissionContainer.classList.add("active");
  askPermissionContainer.innerHTML = `  <div class="ask">
            <p>Sorry, quiz time is up!</p>
            <span>your estimated time has end, did you get the answer?</span>
            <div class="ask-btns">
              <button class="btn yess">Yess</button>
              <button class="btn no">Tell me</button>
           </div>
      </div>`;
let askBox = askPermissionContainer.querySelector(".ask");
let yessBtn = askBox.querySelector(".yess");
let tellMeBtn = askBox.querySelector(".no");
yessBtn.addEventListener("click", askAgain);

tellMeBtn.addEventListener("click", helpUser);

}           
// quiz end || function //
const endQuiz = () => {
  // hide quiz content // first //
  quizAppContianer.style.display = "none";
  // display score container //
  scoreContainer.style.display = "flex";
  // get score text, and restarbtn //
  let scoreTex = scoreContainer.querySelector(".number");
  let restartBtn = scoreContainer.querySelector(".restart-quiz");
  scoreTex.textContent = `${score}/${questions.length}`;

  restartBtn.addEventListener("click", () => {
    // hide score container // and display quiz content //
    setTimeout(() => {
      quizAppContianer.style.display = "block";
      // display score container //
      scoreContainer.style.display = "none";
      startQuiz();
    }, 2000);
  });
};
// load function //
const loadQuestion = () => {
  qnumber = qnumber;
  currentQuestion = questions[quizIndex];
  // first when question are rendred // disbale checkbtn, becz user did not reach answer choosing
  // this checks whether question is there or not //
  renderQuestion(currentQuestion); // render => is the who makes sense, because it creates the question and answer using dom and it renders to page //
  checkBtn.disabled = true;
  checkBtn.classList.add("disable");
};

// start function || initializer //
const startQuiz = () => {
  // this function restarts everything //
  quizQuestion.innerHTML = "";
  quizAnswers.innerHTML = "";
  // display hidden elements and hide unwanted elements//
  headQuiz.style.display = "none";
  quizAppContianer.style.display = "block";
  time_container.style.display = "flex";
  quizIndex = 0;
  qnumber = 1;
  startTimer();
  loadQuestion(); // the function that makes question to display > check > decsiom or it makes the quiz end //
};

// timer function // || all suporting functions of this timer function //

const startTimer = () => {
  // before i start this block i have to ensure is there previous startimer is running
  if (timerInterval !== null) return; // this means previous startimer did not stop, so dont try to start another one. wait till interval has come to an end //
  timerInterval = setInterval(() => {
    timerCountSpan.textContent = runningTime;
    runningTime--;
    alarm.style.display = "flex";
    if (runningTime < 0) {
      clearInterval(timerInterval);
      alarm.style.display = "none";
      askPermission();
      return;
    }
  }, 1000);
};
// stopTimer funciton //
const stoptimerFunction = () => {
  clearInterval(timerInterval);
  timerInterval = null;
};
const restartTimer = () => {
  runningTime = defaultAnswerDuration;
  timerCountSpan.textContent = defaultAnswerDuration;
  startTimer();
};
startBtn.addEventListener("click", startQuiz);
checkBtn.addEventListener("click", checkuserAnswers);




