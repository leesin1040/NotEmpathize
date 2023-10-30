import { movieDetailApi } from './detail.js';

const favMainBtn = document.querySelector('#favoritesHome');
const getfavArr = JSON.parse(localStorage.getItem('favorites'));
let favListArr = [];
let result = '';

// favListArr에 getfavArr 객체 저장
for (let i = 0; i < getfavArr.length; i++) {
    favListArr.push(getfavArr[i]);
}

// favListArr를 result 변수에 누적 저장
for (let i in favListArr) {
    result += `<div class="favModalFlex">`;
    result += `<div class="favListArrTitle">`;
    result += `<p class="favListArr" id="${favListArr[i].id}">${favListArr[i].title}</p>`;
    result += `</div>`;
    result += `<div class="favListArrDel">
    <div class="fa" id="${favListArr[i].id}">x</div>
    </div>`;
    result += `</div>`;
}

// 즐겨찾기 모달 목록에 삽입
const modalBody = document.querySelector('#favContent');
modalBody.innerHTML = result;

// 즐겨찾기 버튼 클릭 이벤트
favMainBtn.addEventListener('click', (e) => {
    e.preventDefault();
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
        // favListDel의 선택된 요소 각각의 자식요소[1번째]의 id값을 favListClkDelEvent 변수에 할당
        const favListClkDelEvent = e.currentTarget.children[0].getAttribute('id');
        console.log('favListClkDelEvent', typeof favListClkDelEvent); // favListClkDelEvent가 문자열인지 숫자인지 type확인
        let favListToNum = Number(favListClkDelEvent); // 확인 해보니 문자열이라 숫자로 바꿔줌
        let deleteAfterArr = getfavArr.filter((element) => element.id !== favListToNum); // getfavArr 배열을 filter로 favListToNum과 같지 않은 값들을 deleteAfterArr에 할당

        if (!confirm('정말 삭제 하시겠습니까?')) {
            return; // true일때
        } else {
            localStorage.setItem('favorites', JSON.stringify(deleteAfterArr)); // false 일 때
            window.location.reload();
        }
    });
});

// 즐겨찾기 목록 전체 삭제
const favListDelAll = document.querySelector('#deleteAll');
favListDelAll.addEventListener('click', (e) => {
    e.preventDefault();

    if (!confirm('정말 삭제 하시겠습니까?')) {
        return;
    } else {
        window.localStorage.removeItem('favorites'); // localstorage의 key 데이터 삭제
        window.location.reload();
    }
});
