questionQueueSize=20;

beginnerLevel=0;
mediumLevel=100;
expertLevel=300;

dataPath = "static/data/russian_english.json";

questionPool = {};
questionQueue = [];

answerCpt=0;
correctAnswerCpt=0;
levelPoint=0;
userLevel=0;

answered=false;


$(document).ready(function(){
  $.getJSON(dataPath , function( data ) {
    questionPool = data;
    generateQuestionQueue();
    updatePracticeHeader();
    initQuestion();
  });

  // Trigger flipping when clicking on help
  $('.question_check').click(function(){
    checkAnswer();
    updatePracticeHeader();
  });

  $('.next_btn').click(function(){
    loadNextQuestion();
  });
});

function resetPractice(){
  questionQueue = [];

  answerCpt=0;
  correctAnswerCpt=0;
  generateQuestionQueue();
  updatePracticeHeader();
}

function getCurrentQuestion(){
  return questionQueue[answerCpt];
}

function generateQuestionQueue(){
  for(var i=0; i < questionQueueSize; i++){
    var rand = parseInt(Math.random(rand)*100);
    var randType = rand%2;
    questionType = questionPool[Object.keys(questionPool)[randType]]
    switch (userLevel) {
      case 0:
        var poolSize = Object.keys(questionType["beginner"]).length;
        var question = questionType["beginner"][Object.keys(questionType["beginner"])[rand%poolSize]]
        questionQueue.push(question);

        break;
      case 1:
        var poolSize = Object.keys(questionType["medium"]).length;
        var question = questionType["medium"][Object.keys(questionType["medium"])[rand%poolSize]]
        questionQueue.push(question);
        break;
      case 2:
      default:
        var poolSize = Object.keys(questionType["expert"]).length;
        var question = questionType["expert"][Object.keys(questionType["expert"])[rand%poolSize]]
        questionQueue.push(question);
        break;

    }
  }
}

function loadNextQuestion(){
  var question = findNextQuestion();
  if($(".container_flip_wrapper").hasClass("flip")){
    var containerToPrepare = $("div.container_flip_wrapper > .front");
    var previousContainer = $("div.container_flip_wrapper > .back");
  } else {
    var containerToPrepare = $("div.container_flip_wrapper > .back");
    var previousContainer = $("div.container_flip_wrapper > .front");
  }
  setQuestion(containerToPrepare, question);
  previousContainer.find("div.answer_wrapper").toggleClass('flip');
  $("div.container_flip_wrapper").toggleClass('flip');

  previousContainer.find(".answer_textarea").val("");

  answered=false;
}

function findNextQuestion(){
  return questionQueue[answerCpt];
}

function initQuestion(){
  // var question = findNextQuestion();
  var question = questionQueue[answerCpt];
  var containerToPrepare = $("div.container_flip_wrapper > .front");
  setQuestion(containerToPrepare, question);
}

function setQuestion(containerToSet, question){
  containerToSet.find(".question_sentence").html(question.question);
  containerToSet.find(".information").html(question.information);
  containerToSet.find(".correct > .correct_answer").html(question.answer);
  containerToSet.find(".incorrect > .correct_answer").html(question.answer);
}

function updatePracticeHeader(){
  updateLevel();
  updateProgression();
  updateProgressionBar();
  updateAccuracy();
}

function updateProgression(){
  var progression = answerCpt.toString() + "/" + questionQueueSize.toString();
  $("div.practice_progression").html(progression);
}

function updateProgressionBar(){
  if(questionQueueSize <= 0){
    var progressionPercentage = 100;
  } else {
    if(answerCpt <= 0){
      var progressionPercentage = 0;
    } else if(answerCpt > questionQueueSize){
      var progressionPercentage = 100;
    } else {
      var progressionPercentage = answerCpt / questionQueueSize * 100;
    }
  }
  $("div.progression_bar_current").css("width",progressionPercentage.toString()+"%");
}

function updateLevel(){
  if(levelPoint <= mediumLevel){
    userLevel=0
    $("div.practice_level span").attr("class","beginner");
    $("div.practice_level span").html("Beginner");
  } else if(levelPoint <= expertLevel){
    userLevel=1
    $("div.practice_level span").attr("class","medium");
    $("div.practice_level span").html("Medium");
  } else {
    userLevel=2
    $("div.practice_level span").attr("class","expert");
    $("div.practice_level span").html("Expert");
  }
}

function updateAccuracy(){
  if(answerCpt <= 0){
    var accuracy = 100;
  } else {
    if(correctAnswerCpt <= 0){
      var accuracy = 0;
    } else {
      var accuracy = correctAnswerCpt / answerCpt * 100;
    }
  }
  accuracy = Math.round(accuracy).toString()+"%";
  $("div.practice_accuracy span.accuracy_high").html(accuracy)
}

function checkAnswer(){
  if($(".container_flip_wrapper").hasClass("flip")){
    var containerToPrepare = $("div.container_flip_wrapper > .back");
  } else {
    var containerToPrepare = $("div.container_flip_wrapper > .front");
  }
  if(!answered){
    var question = getCurrentQuestion();
    answered=true;
    answerCpt++;
    expectedAnswer = question.answer;
    answer = containerToPrepare.find(".answer_textarea").val();
    if(expectedAnswer.toLowerCase() == answer.toLowerCase()){
      containerToPrepare.find("span.correct").removeClass("hidden");
      containerToPrepare.find("span.incorrect").addClass("hidden");
      correctAnswerCpt++;
      levelPoint++;
    } else {
      containerToPrepare.find("span.incorrect").removeClass("hidden");
      containerToPrepare.find("span.correct").addClass("hidden");
    }
  }
  if(answerCpt >= questionQueueSize){
    resetPractice();
  }
  containerToPrepare.find("div.answer_wrapper").toggleClass('flip');
}