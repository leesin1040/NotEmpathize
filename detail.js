import { options } from "./script.js"


export const movieDetailApi = async (movieId) => {
  await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&language=ko-KR`, options)
    .then((response) => response.json())
    .then((response) => {
      console.log('디테일 api', response)
      detailPage(response)
    })
}

export const movieVideoApi = async (movieId) => {
  try {
    const result = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)

    return result.json();
  } catch (err) {
    console.log('무비 비디오 에러', err)
  }
}


// 감독 정보 찾기
const findDirector = (arr) => {
  const res = arr.find((crew) => crew.job === "Director");
  if (res) return res.name;
  else return "정보 없음";
}

// 상세 페이지 생성 함수
function detailPage(detail) {
  const { id, release_date, runtime, status, tagline, title, video, genres, overview, credits, backdrop_path, poster_path } = detail;
  const backImage = backdrop_path ? backdrop_path : poster_path;
  console.log(detail)
  let html;
  html = `
    <div class="detail-container">
      <div class="detail-back">
        <button type="button" class="btn btn-secondary">
          <a href="/">뒤로 가기</a>
        </button>
      </div>
      <div class="content">
        <div class="detail-backdrop">
          <img src="https://image.tmdb.org/t/p/original${backImage}" alt="포스터">
        </div>
        <div class="info">
          <h1 class="title">${title ? title.replace(/[:\n]/g, ':<br>') : original_title}</h1>
          <div class="desc">
            <p class="genres">장르: ${genres.map((genre) => genre.name)}</p>
            <p class="release">개봉 연도: ${release_date.slice(0, 4)}</p>
            <p class="director">감독: ${findDirector(credits.crew)}</p>
            <p class="actor">출연 배우: ${credits.cast[0].original_name}, ${credits.cast[1].original_name}, ${credits.cast[2].original_name}</p>
            <p class="overview">${overview.replace(/[ ][ ]/g, '<br>')}</p>
          </div>
        </div>
        <div class="use">
          <button id="clipBtn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#video-modalBox" data-id="${id}">
            <i class="fa-solid fa-video fa-2xl" style="color: #ffffff;"></i>
          </button>
          <div class="comment">
            <button id="clipBtn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#comment-modalBox" data-id="${id}">
              <i class="fa-regular fa-comment fa-2xl" style="color: #ffffff;"></i>
            </button>
          </div>
          <div class="favorites">
          <button id="favoritesBtn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#favorites-detail-modalBox" data-id="${id}">
          <i class="fa-regular fa-star fa-2xl" style="color: #ffffff;"></i>
          </div>
        </div>
      </div>
      <section class="related">
        <h2>관련 영화</h2>
        <!-- 관련 영화 목록 -->
      </section>
      <section class="reviews">
        <h2>리뷰</h2>
        <!-- 리뷰 목록 -->
      </section>
    </div>
  `;

  // 메인 섹션 화면에 상세 페이지 삽입
  document.querySelector('#movieCards').innerHTML = html;
}

const videoModalBox = document.querySelector('#video-modalBox');
const commentModalBox = document.querySelector('#comment-modalBox');
const favLocalUp = document.querySelector('#favorites-detail-modalBox');



// 모달이 활성화되면 유튜브 비디오를 로드합니다.
if (videoModalBox) {
  videoModalBox.addEventListener('show.bs.modal', async function () {
    const modalBtn = document.querySelector('#clipBtn');
    const movieId = modalBtn.getAttribute('data-id');
    const response = await movieVideoApi(movieId);

    const fi = response.results.find((da) => da.site === 'YouTube');
    const iframe = document.querySelector('#youtubeFrame');
    iframe.src = `https://www.youtube.com/embed/${fi.key}`;
  });

  // 모달이 닫히면 유튜브 비디오를 초기화합니다.
  videoModalBox.addEventListener('hide.bs.modal', async function () {
    const iframe = document.querySelector('#youtubeFrame');
    iframe.src = "";
  });
}


if (commentModalBox) {
  commentModalBox.addEventListener('show.bs.modal', async function () {
    const movieId = document.querySelector('#clipBtn').getAttribute('data-id');

    console.log('코멘트 모달', movieId);
  });

  // 모달이 닫히면 유튜브 비디오를 초기화합니다.
  commentModalBox.addEventListener('hide.bs.modal', async function () {

  });
}

// 즐겨찾기 버튼 클릭 시 이벤트
favLocalUp.addEventListener('click', async function () {
  const movieId = document.querySelector('#clipBtn').getAttribute('data-id');
  const checkLocalStorage = localStorage.getItem(movieId);
  
  // console.log("즐겨찾기 click =>", movieId)

  if (checkLocalStorage === null) {
    localStorage.setItem(movieId, movieId);
    // console.log(checkLocalStorage)
  } else {
    alert("이미 즐겨찾기에 추가 했습니다.")
  }
})
