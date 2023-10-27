import { movieDetailApi } from './detail.js';

const favMainBtn = document.querySelector('#favoritesHome');
const getfavArr = JSON.parse(localStorage.getItem('favorites'));
let favListArr = [];
let result = '';

// favListArr에 getfavArr 객체 저장
for (let i = 0; i < getfavArr.length; i++) {
    favListArr.push(getfavArr[i]);
}
console.log('favListArr =>', favListArr);

// favListArr를 result 변수에 누적 저장
for (let i in favListArr) {
    result += `<div>`;
    result += `<div class="favListArrTitle">`;
    result += `<p class="favListArr" id="${favListArr[i].id}">${favListArr[i].title}</p>`;
    result += `</div>`;
    result += `<div class="favListArrDel">
    <div class="fa" id="${favListArr[i].id}">x</div>
    </div>`;
    result += `</div>`;
}
console.log('result =>', result);

// 즐겨찾기 모달 목록에 삽입
const modalBody = document.querySelector('#favContent');
modalBody.innerHTML = result;

// 즐겨찾기 버튼 클릭 이벤트
favMainBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('local id값 불러오기 =>', getfavArr);
});

// 즐겨찾기 목록 페이지 이동 이벤트
const favListClk = document.querySelectorAll('.favListArrTitle');
console.log('favListClk', favListClk);
favListClk.forEach((clk) => {
    clk.addEventListener('click', (e) => {
        e.preventDefault();
        const favListClkEvent = e.currentTarget.children[0].getAttribute('id');
        // console.log('favlistclkevent', favListClkEvent);
        // console.log(favListClkEvent);
        movieDetailApi(favListClkEvent);
    });
});

// 즐겨찾기 목록 삭제 이벤트
const favListDel = document.querySelectorAll('.favListArrDel');
console.log('favListDel', favListDel);
favListDel.forEach((clk) => {
    clk.addEventListener('click', (e) => {
        e.preventDefault();
        const favListClkDelEvent = e.currentTarget.children[0].getAttribute('id');
        console.log('favListClkDelEvent', typeof favListClkDelEvent);
        let favListToNum = Number(favListClkDelEvent);
        let deleteAfterArr = getfavArr.filter((element) => element.id !== favListToNum);
        console.log(deleteAfterArr);
        if (!confirm('정말 삭제 하시겠습니까?')) {
            return;
        } else {
            localStorage.setItem('favorites', JSON.stringify(deleteAfterArr));
            window.location.reload();
        }
    });
});
