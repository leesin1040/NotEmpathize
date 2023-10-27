import { movieDetailApi } from './detail.js';

const favMainBtn = document.querySelector('#favoritesHome');
const getfavArr = JSON.parse(localStorage.getItem('favorites'));
const toNumber = getfavArr.map((i) => Number(i));
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
    result += `<div class="favListArrBox"><p class="favListArr" id="${favListArr[i].id}">${favListArr[i].title}</p>
    <div class="fa" id="${favListArr[i].id}">x</div>`;
    // result += `<p style="display:none">${favListArr[i].id}</p>`;
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
const favListClk = document.querySelectorAll('.favListArrBox');
console.log('favListClk', favListClk);
favListClk.forEach((clk) => {
    clk.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log(e.currentTarget.children[0].getAttribute('id'));
        movieDetailApi(e.currentTarget.children[0].getAttribute('id'));
    });
});

function listDeleteFunc(del) {
    console.log(favListDelId);
    console.log('콜백 함수 =>', del.id);
    return del.id !== favListDelId;
}
// 즐겨찾기 목록 삭제 이벤트
const favListDel = document.querySelector('.fa');
const favListDelId = document.querySelector('.fa').getAttribute('id');
favListDel.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('삭제 클릭! =>', favListDelId);
});
