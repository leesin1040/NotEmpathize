import { getMovieApi } from './script.js';

export const pageButtonAdd = () => {
    const wrap = document.querySelector('#wrap')
    const pageBtnWrap = document.createElement('div');
    pageBtnWrap.id = "pageBtn"
    const buttonHtml = `
        <button class="pageBtn prevButton">prev</button>
        <div class="page-button-group">
            <button class="pageBtn">1</button>
            <button class="pageBtn">2</button>
            <button class="pageBtn">3</button>
            <button class="pageBtn">4</button>
            <button class="pageBtn">5</button>
        </div>
        <button class="pageBtn nextButton">next</button>
    `
    pageBtnWrap.innerHTML = buttonHtml;
    wrap.appendChild(pageBtnWrap)
    const pageButtons = document.querySelectorAll('.page-button-group .pageBtn')
    
    // prev 버튼 클릭 이벤트
    document.querySelector('.pageBtn.prevButton').addEventListener('click',()=>{
        const lastChild = pageButtons[4];
        const firstChild = pageButtons[0].innerText;

        if(+firstChild === 1) return alert('첫번째 페이지입니다.');

        buttonDisable(true,lastChild);
        buttonDisable(false);
        pageButtons.forEach((button,i) =>{
            button.innerText = +firstChild - 5 + i +1
        })
        getMovieApi(lastChild.innerText);
    }) 
    // next 버튼 클릭 이벤트
    document.querySelector('.pageBtn.nextButton').addEventListener('click',(event)=>{
        const lastChild = pageButtons[4];
        const lastValue = pageButtons[4].innerText;

        buttonDisable(true,lastChild);
        buttonDisable(false);
        pageButtons.forEach((button,i) =>{
            button.innerText = +lastValue + i
        })
        getMovieApi(lastValue);
    }) 

    // 페이지 버튼 클릭 이벤트
    pageButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const disableButton = document.querySelector('#pageBtn button.disabled');

            if (disableButton) {
                disableButton.disabled = false;
                disableButton.className = 'pageBtn';
            }
            event.currentTarget.disabled = true;
            event.currentTarget.className += " disabled";
            getMovieApi(event.currentTarget.innerText);
            window.scrollTo(0,0,'smooth')
        });
    });
}

function buttonDisable(booleanType,button = document.querySelector('#pageBtn button.disabled')){
    button.disabled = booleanType;
    if(booleanType) button.classList.add('disabled')
    else button.classList.remove('disabled')
    
}




