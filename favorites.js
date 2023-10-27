import { movieDetailApi } from './detail.js';
import { options } from './script.js';

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
fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-kr&page=1', options)
    .then((response) => response.json())
    .then((response) => {
        let results = response.results;

        // for (let i = 0; i < getfavArr.length; i++) {
        //     console.log(`getfavArr의 ${[i]}번재 id값 =`, getfavArr[i].id);
        // }

        // // api 리스트 중 id값 불러옴
        // results.forEach((movie) => {
        //     let movieInfoStr = {
        //         titie: movie.title,
        //         id: movie.id,
        //     };
        //     // console.log(movieInfoStr);
        //     movieInfoArr.push(movieInfoStr);
        // });
        // console.log('api id값 불러오기 =>', movieInfoArr);

        // // localsotrage id값과 api id값 비교 후 같은 거 뽑기

        // let compareArr = getfavArr.some((data) => data.id == movieId);
        // console.log('local,api id 교집합 =>', compareArr);
    });

// 즐겨찾기 버튼 클릭 이벤트
favMainBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('local id값 불러오기 =>', getfavArr);
        // const ddd = document.querySelectorAll('.favListArrBox')
    // console.log('ddd',ddd)
    //     ddd.forEach((d)=>{
    //         d.addEventListener('click',(event)=>{
    //             console.log(event.currentTarget.children[0].getAttribute('id'))
    //             movieDetailApi(event.currentTarget.children[0].getAttribute('id'))
    //         })
    // })
});

// 즐겨찾기 목록 페이지 이동 이벤트
const favListClk = document.querySelector('.favListArr');
const favListClkId = document.querySelector('.favListArr').getAttribute('id');
favListClk.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('목록 클릭!', favListClkId);
    movieDetailApi(favListClkId);
});

// 즐겨찾기 목록 삭제 이벤트
const favListDel = document.querySelector('.fa');
const favListDelId = document.querySelector('.fa').getAttribute('id');
favListDel.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('삭제 클릭! =>', favListDelId);
});

// 페이지 이동 시 모달 창 닫기
// function modaldown() {
//     document.querySelector('#favorites-modalBox').style.display = 'none';
//     document.querySelector('#favorites-modalBox').class = 'modal fade';
// }
