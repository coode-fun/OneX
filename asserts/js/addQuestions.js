
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// 
function myModelFunction(test_id , i){

  const editQuestion = document.querySelector('#edit-question');
  const editOption1 = document.querySelector('#edit-option1');
  const editOption2 = document.querySelector('#edit-option2');
  const editOption3 = document.querySelector('#edit-option3');
  const editOption4 = document.querySelector('#edit-option4');
  const editAnswer = document.querySelector('#edit-answer');
  const editQuestionIndex = document.querySelector('#edit-questionIndex');

  let url = '../../questions/getQuestion/' + test_id + '$' + i;
  console.log(url);
  fetch(url)
  .then(response => response.json())
  .then((data) => {

    editQuestion.innerHTML = data.question;
    editOption1.innerHTML = data.options[0];
    editOption2.innerHTML = data.options[1];
    editOption3.innerHTML = data.options[2];
    editOption4.innerHTML = data.options[3];
    editAnswer.innerHTML = data.answer;
    editQuestionIndex.value = i;
    
    modal.style.display = "block";
  });
}

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}