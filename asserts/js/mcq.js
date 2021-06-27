const questionNo = document.querySelector('.questionNo');
const question = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const nextButton = document.querySelector('.nextButton');
const previousButton = document.querySelector('.previousButton');
const saveAndNextButton = document.querySelector('.saveAndNextButton');


data = JSON.parse(data);

var questionNumber = data.counter;
var questions = data.test.questions;
var totalQuestion =questions.length;

function nextQuestion(){

        questionNo.innerHTML = questions[questionNumber].question;
        question.innerHTML = questions[questionNumber].question;
        option1.innerHTML = questions[questionNumber].options[0];
        option2.innerHTML = questions[questionNumber].options[1];
        option3.innerHTML = questions[questionNumber].options[2];
        option4.innerHTML = questions[questionNumber].options[3];

} 


if(totalQuestion > 0){
    nextQuestion();
}

function getOption(){
        var option = document.querySelector('input[name="option"]:checked').value;
        document.querySelector('input[name="option"]').checked =false;
       
        return option;
}

saveAndNextButton.addEventListener("click",async ()=>{
        var optionSelected = getOption();
        console.log(optionSelected);
       

        questionNumber++;
        nextQuestion();

        return ;
        let url = '../saveAnswer';
        const params = {
                testId: "60d6e06acc06d8295c94810a",

              }
              
        fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
        })
        .then((response)=>{
                console.log(response);
        })
        .catch((err)=>{
                console.log(err);
        })
});

nextButton.addEventListener("click", ()=>{
        questionNumber++;
        nextQuestion();
});
previousButton.addEventListener("click", ()=>{
        questionNumber--;
        nextQuestion();
});

console.log(data);