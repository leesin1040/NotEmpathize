/*
1. HTML에서 요소 가져오기
2. 인풋값들 유효성검사하기 (욕, 숫자, 특수문자 제한 등)
*/

//비속어 검사
let BadWordsArr = [
  '개똥',
  '멍멍이',
  '졸작',
  '망작',
  'ASMR',
  '수면제',
  '나쁜말',
  '별로',
  '병맛',
  '나락',
];

//▼작성자 이름 테스트
export function nameCheck() {
  let writerCheck = /^[가-힣a-zA-Z0-9]+$/;
  let nameInput = document.querySelector('.comment-form .name-input');
  if (writerCheck.test(nameInput.value)) {
    console.log('작성자명 확인완료');
    return true;
  } else {
    nameInput.value = null; //비우기
    alert('작성자 이름에 특수문자를 사용할 수 없습니다');
    return false;
  }
}

//▼비속어 검사
export function badWordstest() {
  const comment = document.querySelector('.comment-form .comment-input');
  let flag = false;
  for (let i = 0; i < BadWordsArr.length; i++) {
    if (comment.value.includes(BadWordsArr[i])) {
      comment.value = null; //비우기
      alert('나쁜말 금지');
      return true;
    }
  }
  return flag;
}

//▼검색창이 비어있을 경우 alert
export function searchempty() {
  let searchTxt = document.getElementById('searchinput');
  if (searchTxt.value !== '') {
  } else {
    alert('검색어를 입력해주세요.');
  }
}
