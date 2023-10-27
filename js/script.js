import { apiFetch } from './apiHandler.js';
import { movieDetailApi } from './detail.js';
import { pageButtonAdd } from './page.js';
import { searchempty } from './validation.js';

//▼API 사이트에서 복붙
export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjIyNTE0M2EzNTg3OGQxY2FkYTdmNjk4YmYwZWZhMCIsInN1YiI6IjY1MmY5OThjYTgwMjM2MDBjMzE2NWQ0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vMiFt7pND4DpoUQnFLKQbI03hux5EyIse35JoMwpfTA',
    },
};

let topMovies;
let movieMap = new Map();
let movieCardpPost = document.getElementById('movieCards');

export function getMovieApi(page = 1) {
    apiFetch(`https://api.themoviedb.org/3/movie/top_rated?language=ko-kr&page=${page}`)
    .then((response) => {
        let movies = response['results']; //가져온 json자료들을 movies에 할당
        topMovies = response['results']; // map으로 할당

        movieCardpPost.innerHTML = '';
        //▼불러온 results 배열들을 돌리면서 각각 카드 만들기
        movies.forEach((a) => {
            createMovieCard(a);
        });
        
    });
}

getMovieApi();
pageButtonAdd();
//▼HTML의 ID값 가져오기

//▼카드 만들기
function createMovieCard(a) {
    //▼필요한 변수에 response의 key값 할당 (사실 안해도 상관없음)
    let movieId = a['id'];
    let movieTitle = a['title'];
    let movieOverview = a['overview'];
    let movieAverage = a['vote_average'];
    let moviePoster = a['poster_path'];

    //▼HTML에서 div요소 새로 만들고 Class 부여하기
    let movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    //▼movieCard가 만드는 div요소 내부에 HTML 넣기
    movieCard.innerHTML = `
        <div class="card">
        <img src="https://image.tmdb.org/t/p/w200/${moviePoster}" class="card-img-top" alt="..."/>
        <p id="cardtitle"> ${movieTitle} </p>
        <p class="stars">Scores <span class="starscolor">${movieAverage}</span></p>
        <p class="overview">${movieOverview}</p>
        </div>`;

    //▼위에서 만들어진 movieCard들을 movieCardPost에 Child로 만들기
    movieCardpPost.appendChild(movieCard);

    //▼영화 제목과 카드를 Map 키값으로 만들기 []
    movieMap.set(movieTitle, movieCard);

    //▼만들어진 카드를 클릭하면 해당 영화의 ID값 가져오기
    movieCard.addEventListener('click', () => {
        const pageBtn = document.querySelector('#pageBtn');
        pageBtn.remove()
        movieDetailApi(movieId);
    });
}

// ▼검색기능 구현을 위해 HTML의 Searchbar ID가져오기
const searchBtn = document.getElementById('searchyellow');
let searchTxt = document.getElementById('searchinput');

function search() {
    let text = searchTxt.value;
    topMovies.forEach((a) => {
        let movieTitle = a['title'];
        //▼검색어를 모두 소문자 취급하고 카드와 매치
        if (movieTitle.toLowerCase().includes(text.toLowerCase())) {
            //▼검색한 텍스트가 포함된 카드는 보이게
            movieMap.get(movieTitle).style.display = 'block';
        } else {
            //▼검색한 텍스트가 없는 카드는 안보이게
            movieMap.get(movieTitle).style.display = 'none';
        }
    });
}

//▼Search 버튼 클릭시 'search'함수 실행
searchBtn.addEventListener('click', () => {
    searchempty();
    search();
});
//▼Search Input에 Text 작성 후 Enter 누르면 'search'함수 실행
searchTxt.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        searchempty();
        search();
    }
});
//▼새로고침 시 Search Input Focus상태
searchTxt.focus();
