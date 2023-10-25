/*
1. HTML에서 요소 가져오기
2. 인풋값들 유효성검사하기 (욕, 숫자, 특수문자 제한 등)
*/

//비속어 검사
let writer = document.querySelector('#searchinput');
let comments = document.querySelector('.comment-input');
let commentsBtn = document.querySelector('btn btn-info');

let BadWordsArr = new Array( //나쁜말 어레이....
  '개똥',
  '멍멍이',
  '졸작',
  '망작',
  'ASMR',
  '수면제',
  '나쁜말',
  '별로',
  '병맛',
  '나락'
);

//▼작성자 이름 테스트
function nameCeck() {
  let writerCheck = /^[가-힣a-zA-Z0-9]+$/;
  if (writerCheck.test(searchTxt.value)) {
    console.log('작성자명이 확인되었습니다.');
  } else {
    alert('잘못된 입력입니다.');
    searchTxt.value = ''; //비우기
    return;
  }
}

//▼비속어 검사
function BadWordstest() {
  let commetTest = searchTxt.value;
  for (let i = 0; i < BadWordsArr.length; i++) {
    if (commetTest.includes(BadWordsArr[i])) {
      alert('나쁜말 금지');
      searchTxt.value = ''; //비우기
      return;
    }
  }
}
