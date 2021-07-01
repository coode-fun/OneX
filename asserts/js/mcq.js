const questionNo = document.querySelector('.questionNo');
const question = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const nextButton = document.querySelector('.nextButton');
const previousButton = document.querySelector('.previousButton');
const saveAndNextButton = document.querySelector('.saveAndNextButton');
const status = document.querySelector('.status');

data = JSON.parse(data);

var questionNumber = data.counter;
var questions = data.test.questions;
var totalQuestion =questions.length;


function showStatus(){
        var isAttempted = data.answer.isAttempted;

        for(let i = 0; i < totalQuestion; i++){
                if(isAttempted[questions[i]._id]){
                        var qId ="#Q"+i;
                        var obj = document.querySelector(qId)
                        obj.style.color="#00FF00";
                        
                }
        }
}

function markStatus(id){

        var qId ="#Q"+id;
        var obj = document.querySelector(qId)
        obj.style.color="#00FF00";

}

showStatus();
function hidePreviousButton(){
        if(questionNumber == 0)
                previousButton.style.visibility = 'hidden';
        else    
                previousButton.style.visibility = 'visible';
}
function hideNextButton(){
        if(questionNumber == (totalQuestion -1)){
                nextButton.style.visibility = 'hidden';
                saveAndNextButton.innerHTML = "Save";
        }
        else{
                nextButton.style.visibility = 'visible';
                saveAndNextButton.innerHTML = "Save And Next";
        }                 
}

function nextQuestion(){

        questionNo.innerHTML = questions[questionNumber].question;
        question.innerHTML = questions[questionNumber].question;
        option1.innerHTML = questions[questionNumber].options[0];
        option2.innerHTML = questions[questionNumber].options[1];
        option3.innerHTML = questions[questionNumber].options[2];
        option4.innerHTML = questions[questionNumber].options[3];
        
        hidePreviousButton();
        hideNextButton();
} 


if(totalQuestion > 0){
    nextQuestion();
}

function move(questionId){

        questionNumber = questionId;
        nextQuestion();
}
function getOption(){

        var obj = document.querySelector('input[name="option"]:checked');
        if(obj == null){
                return null;
        }
        var option =obj.value;
        console.log(option);
        return option;
}

function unCheck(){
        
        var option = document.getElementsByName('option');

        for(i = 0; i < option.length; i++) {
               option[i].checked = false;       
        }
}
function toggle(id){
        
        if(id.dataset.state == 'true'){
                id.checked =false;
            
                id.dataset.state = false;
        
        }else{
                id.checked =true;
                id.dataset.state = true;
        }
}
saveAndNextButton.addEventListener("click",async ()=>{
        var optionSelected = getOption();
       
        if(optionSelected){
                unCheck();

                let url = '../saveAnswer';
                const params = {
                        enrolledTestId : data._id,
                        questionId : questions[questionNumber]._id,
                        optionSelected : optionSelected,
                        counter : questionNumber
                }
                
                console.log(params);

                fetch(url, {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
                })
                .then((response)=>{
                        // console.log(response);
                })
                .catch((err)=>{
                        console.log(err);
                })
        }
        

        // Move to next question
        if(questionNumber != totalQuestion - 1){
                markStatus(questionNumber);
                questionNumber++;
                nextQuestion();
        }
        
});

nextButton.addEventListener("click", ()=>{
        unCheck();
        
        questionNumber++;
        document.querySelector('input[name="option"]').checked =false;
        nextQuestion();
});

previousButton.addEventListener("click", ()=>{
        unCheck();
        questionNumber--;
        nextQuestion();
});

console.log(data);