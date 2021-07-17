
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


//
function myModelFunction(test_id){

  const editDepartment = document.querySelector('#edit-department');
  const editYear = document.querySelector('#edit-year');
  const ediDate = document.querySelector('#edit-date');
  const editStart = document.querySelector('#edit-start');
  const editEnd = document.querySelector('#edit-end');
  const editTestCode = document.querySelector('#edit-t_code');
  const editTestId = document.querySelector('#edit-testId');
  
  let url = '../getTest/' + test_id;
  
  console.log(url);
  fetch(url)
  .then(response => response.json())
  .then((data) => {
    
    editDepartment.value = data.department;
    editYear.value = data.year;
    ediDate.value= data.date;
    editStart.value = data.start;
    editEnd.value = data.end;
    editTestCode.value= data.t_code;
    editTestId.value = test_id;

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