// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


//
function myModelFunction(subjectId){

  const editSubjectCode = document.querySelector('#edit-subject_code');
  const editSubjectName = document.querySelector('#edit-subjectName');
  const editSubjectId = document.querySelector('#edit-subjectId');

  let url = '/tests/getSubject/' + subjectId;

  console.log(url);

  fetch(url)
  .then(response => response.json())
  .then((data) => {
    
    editSubjectCode.value = data.s_code;
    editSubjectName.value = data.s_name;
    editSubjectId.value = subjectId;
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