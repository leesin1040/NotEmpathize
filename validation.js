/*
1. HTML에서 요소 가져오기
2. 인풋값들 유효성검사하기 (욕, 숫자, 특수문자 제한 등)
*/

//비속어 검사
let writer = document.querySelector('#searchinput');
let comments = document.querySelector('.comment-input');
let commentsBtn = document.querySelector('btn btn-info');

let BadWordsArr = new Array(
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
    console.log('잘 쳐진 검색어');
  } else {
    alert('잘못된 입력입니다.');
  }
}

//▼비속어 검사
function BadWordstest() {
  let commetTest = writer.value;
  for (let i = 0; i < BadWordsArr.length; i++) {
    if (commetTest.includes(BadWordsArr[i])) {
      alert('나쁜말 금지');
      writer.value = ''; //비우기
      return;
    }
  }
}
