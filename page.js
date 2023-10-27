import { getMovieApi } from "./script.js";

const buttonDiv = document.querySelectorAll('#pageBtn button');

buttonDiv.forEach((button) => {
  button.addEventListener('click',(event) =>{
    const disableButton = document.querySelector('#pageBtn button.disabled');

    if(disableButton){
      disableButton.disabled = false;
      disableButton.className = '';
    }
    event.currentTarget.disabled = true;
    event.currentTarget.className = 'disabled'
    getMovieApi(event.currentTarget.innerText)
  })

})


console.log('버튼 디브',buttonDiv)
