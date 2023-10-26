import { options } from './script.js';
import { badWordstest, nameCheck } from './validation.js';

export const movieDetailApi = async (movieId) => {
    await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&language=ko-KR`, options)
        .then((response) => response.json())
        .then((response) => {
            console.log('디테일 api', response);
            detailPage(response);
        });
};

export const movieVideoApi = async (movieId) => {
    try {
        const result = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options);

        return result.json();
    } catch (err) {
        console.log('무비 비디오 에러', err);
    }
};

// 감독 정보 찾기
const findDirector = (arr) => {
    const res = arr.find((crew) => crew.job === 'Director');
    if (res) return res.name;
    else return '정보 없음';
};

// 상세 페이지 생성 함수
function detailPage(detail) {
    const {
        id,
        release_date,
        runtime,
        status,
        tagline,
        title,
        video,
        genres,
        overview,
        credits,
        backdrop_path,
        poster_path,
    } = detail;
    const backImage = backdrop_path ? backdrop_path : poster_path;
    console.log(detail);
    let html;
    html = `
    <div class="detail-container">
      <div class="detail-back">
        <button type="button" class="btn btn-secondary detail-modal-back">
          <a href="/"><i class="fa-solid fa-arrow-right fa-rotate-180 fa-xl" style="color: #3b4359;"></i></a>
        </button>
      </div>
      <div class="content">
        <div class="detail-backdrop">
          <img src="https://image.tmdb.org/t/p/original${backImage}" alt="포스터">
        </div>
        <div class="info">
          <h1 id="favtitle" class="title" data-title="${title}">${
        title ? title.replace(/[:\n]/g, ':<br>') : original_title
    }</h1>
          <div class="desc">
            <p class="genres">장르: ${genres.map((genre) => genre.name)}</p>
            <p class="release">개봉 연도: ${release_date.slice(0, 4)}</p>
            <p class="director">감독: ${findDirector(credits.crew)}</p>
            <p class="actor">출연 배우: ${credits.cast[0].original_name}, ${credits.cast[1].original_name}, ${
        credits.cast[2].original_name
    }</p>
            <p class="actor">출연 배우: ${credits.cast[0].original_name}, ${credits.cast[1].original_name}, ${
        credits.cast[2].original_name
    }</p>
            <p class="overview">${overview.replace(/[ ][ ]/g, '<br>')}</p>
          </div>
        </div>
        <div class="use">
          <button id="clipBtn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#video-modalBox" data-id="${id}">
            <i class="fa-solid fa-video fa-2xl" style="color: #0d3b66;"></i>
          </button>
          <div class="comment">
            <button id="clipBtn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#comment-modalBox" data-id="${id}">
              <i class="fa-regular fa-comment fa-2xl" style="color: #0d3b66;"></i>
            </button>
          </div>
          <div class="favorites">
            <button id="favoritesBtn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#favorites-detail-modalBox" data-id="${id}">
            <i class="fa-regular fa-star fa-2xl" style="color: #0d3b66;"></i>
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
const favLocalUp = document.querySelector('.modal-footer button');
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
        iframe.src = '';
    });
}

const initStarInsert = () => {
    let html = [];
    const empty = `<stop offset="100%" stop-color="grey" stop-opacity="1" />`;
    const half = `<stop offset="50%" stop-color="yellow" />
                <stop offset="50%" stop-color="grey" stop-opacity="1" />`;
    const fill = `<stop offset="100%" stop-color="yellow" />`;
    for (let i = 0; i < 5; i++) {
        html.push(`
      <div class="star-wrap ${i}">
        <div class="left"></div>
        <div class="right"></div>
        <svg class="star-svg-${i}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="800px" width="800px"
          version="1.1" id="Capa_1" viewBox="0 0 47.94 47.94" xml:space="preserve">
          <defs>
            <linearGradient id="half-${i}">
              ${i === 0 ? half : empty}
            </linearGradient>
          </defs>
          <path fill="url(#half-${i})"
            d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757  c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042  c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685  c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528  c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956  C22.602,0.567,25.338,0.567,26.285,2.486z" />
        </svg>
      </div>
    `);
    }

    const star = document.querySelector('.input-star');
    star.innerHTML = html.join('');
    console.log(typeof temp);
    const starWrap = document.querySelectorAll(`.input-star .star-wrap`);

    starWrap.forEach((t, i) => {
        const left = t.children[0];
        const right = t.children[1];

        left.addEventListener('click', (event) => {
            const starSvg = document.querySelector(`.star-wrap .star-svg-${i}`);
            const d = starSvg.firstElementChild.children[0];
            console.log(`왼 ${i}.5`);
            star.setAttribute('data-star', `${i}.5`);
            for (let j = 0; j < i; j++) {
                const prevStar = document.querySelector(`.star-wrap .star-svg-${j}`);
                const p = prevStar.firstElementChild.children[0];
                p.innerHTML = fill;
            }

            for (let j = i + 1; j < 5; j++) {
                const nextStar = document.querySelector(`.star-wrap .star-svg-${j}`);
                const p = nextStar.children[0].children[0];
                p.innerHTML = empty;
            }
            d.innerHTML = half;
        });
        right.addEventListener('click', (event) => {
            const starSvg = document.querySelector(`.star-wrap .star-svg-${i}`);
            const d = starSvg.firstElementChild.children[0];
            d.innerHTML = fill;

            console.log(`오 ${i + 1}`);
            star.setAttribute('data-star', `${i + 1}`);
            for (let j = 0; j < i; j++) {
                const prevStar = document.querySelector(`.star-wrap .star-svg-${j}`);
                const p = prevStar.firstElementChild.children[0];
                p.innerHTML = fill;
            }

            for (let j = i + 1; j < 5; j++) {
                const nextStar = document.querySelector(`.star-wrap .star-svg-${j}`);
                const p = nextStar.children[0].children[0];
                p.innerHTML = empty;
            }
        });
    });
};

const commentStarInsert = (num, index) => {
    let temp_html = '';
    const d = num / 2;
    const empty = `<stop offset="100%" stop-color="grey" stop-opacity="1" />`;
    const half = `<stop offset="50%" stop-color="yellow" />
                <stop offset="50%" stop-color="grey" stop-opacity="1" />`;
    const fill = `<stop offset="100%" stop-color="yellow" />`;

    for (let i = 0; i < 5; i++) {
        console.log(i, d);

        console.log(`${i < d ? (d - i === 0.5 ? '빈공간' : '꽉참') : '반쪽'}`);
        temp_html += `
      <div class="comment-star-wrap">
        <svg class="comment-star-svg-${i}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="800px" width="800px"
          version="1.1" id="Capa_1" viewBox="0 0 47.94 47.94" xml:space="preserve">
          <defs>
            <linearGradient id="comment-half-${index}-${i}">
              ${i < d ? (d - i === 0.5 ? half : fill) : empty}
            </linearGradient>
          </defs>
          <path fill="url(#comment-half-${index}-${i})"
            d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757  c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042  c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685  c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528  c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956  C22.602,0.567,25.338,0.567,26.285,2.486z" />
        </svg>
      </div>
    `;
    }

    return temp_html;
};

const commentForm = document.querySelector('.comment-form');
// comment-content
const commentDraw = (movieId) => {
    const comments = localStorage.getItem(`comment-${movieId}`)
        ? JSON.parse(localStorage.getItem(`comment-${movieId}`))
        : [];
    console.log('코멘트들', comments);
    const commentHTML = comments.map((comment, index) => {
        return `
      <div class="comment-item" data-index="${index}">
        <div>
          <span class="comment-star">${commentStarInsert(comment.star, index)}</span>
          <span>작성자 : </span>
          <span>${comment.name}</span>
        </div>
        <div class="cmt">
          <span>${comment.comment}</span>
          <button type="button" class="comment-delete-btn btn btn-outline-dark">삭제</button>
        </div>
      </div>
    `;
    });
    const nonReview = `<div class='non-review'>작성된 리뷰가 없습니다.</div>`;

    if (comments.length === 0) document.querySelector('.comment-content').innerHTML = nonReview;
    else document.querySelector('.comment-content').innerHTML = commentHTML.join('');

    const commentDeleteBtn = document.querySelectorAll('.comment-delete-btn');
    commentDeleteBtn.forEach((btn) => {
        deleteComment(btn);
    });

    initStarInsert();
};

const deleteComment = (btn) => {
    btn.addEventListener('click', (event) => {
        console.log('댓글 삭제');
        const movieId = commentModalBox.getAttribute('data-id');
        const deleteIndex = event.currentTarget.parentElement.parentElement.getAttribute('data-index');
        const load = JSON.parse(localStorage.getItem(`comment-${movieId}`));
        const checkPw = prompt('삭제 비밀번호 입력');

        if (checkPw === load[deleteIndex].password) {
            load.splice(deleteIndex, 1);
            localStorage.setItem(`comment-${movieId}`, JSON.stringify(load));
            commentDraw(movieId);

            alert('삭제 완료');
        } else {
            alert('비밀번호 다름');
        }
    });
};

if (commentForm) {
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (nameCheck() && badWordstest()) {
            const movieId = commentModalBox.getAttribute('data-id');
            const name = document.querySelector('.comment-form .name-input');
            const comment = document.querySelector('.comment-form .comment-input');
            const star = document.querySelector('.input-star').getAttribute('data-star') * 2;
            const password = prompt('비밀번호를 입력하세요.');
            const prevLocal = localStorage.getItem(`comment-${movieId}`);
            if (password) {
                const load = prevLocal ? JSON.parse(prevLocal) : [];
                load.push({ name: name.value, comment: comment.value, password, star });
                localStorage.setItem(`comment-${movieId}`, JSON.stringify(load));
                name.value = null;
                comment.value = null;
                commentDraw(movieId);
            }
        }
    });
}

commentModalBox.addEventListener('show.bs.modal', async function () {
    const movieId = document.querySelector('#clipBtn').getAttribute('data-id');
    commentModalBox.setAttribute('data-id', movieId);
    commentDraw(movieId);

    console.log('코멘트 모달', movieId);
});

// 모달이 닫히면 유튜브 비디오를 초기화합니다.
commentModalBox.addEventListener('hide.bs.modal', async function () {});

// // 즐겨찾기
// // 즐겨찾기 버튼 클릭 시 이벤트
// favLocalUp.addEventListener('click', async function () {
//     const movieTitle = document.querySelector('#favtitle').getAttribute('data-title');
//     const movieId = document.querySelector('#clipBtn').getAttribute('data-id');
//     const getfav = JSON.parse(localStorage.getItem('favorites'));
//     let arr = [];
//     let favStr = {
//         title: movieTitle,
//         id: movieId,
//     };

//     const setFavList = () => {
//         localStorage.setItem('favorites', JSON.stringify(arr));
//     };
//     // console.log(getfav);

//     if (getfav !== null) {
//         if (getfav.includes(movieId)) {
//             alert('이미 즐겨찾기에 존재 합니다.');
//             return;
//         } else {
//             for (let item of getfav) {
//                 arr.push(item);
//                 // console.log(item);
//             }
//             arr.push(movieId);
//             setFavList();
//         }
//     } else if (getfav === null) {
//         arr.push(movieId);
//         setFavList();
//     }
//     arr.push(movieId);
// });

// 즐겨찾기
// 즐겨찾기 버튼 클릭 시 이벤트
favLocalUp.addEventListener('click', async function () {
    const movieTitle = document.querySelector('#favtitle').getAttribute('data-title');
    const movieId = document.querySelector('#clipBtn').getAttribute('data-id');
    const getfav = JSON.parse(localStorage.getItem('favorites'));
    let toNumId = Number(movieId);
    let arr = [];
    let favStr = {
        title: movieTitle,
        id: toNumId,
    };

    const setFavList = () => {
        localStorage.setItem('favorites', JSON.stringify(arr));
    };

    if (getfav !== null) {
        if (getfav.some((data) => data.id == movieId)) {
            alert('이미 즐겨찾기에 존재 합니다.');
            return;
        } else {
            for (let item of getfav) {
                arr.push(item);
                // console.log(item);
            }
            arr.push(favStr);
            setFavList();
            window.location.reload();
        }
    } else if (getfav === null) {
        arr.push(favStr);
        setFavList();
        window.location.reload();
    }
    arr.push(favStr);
});
