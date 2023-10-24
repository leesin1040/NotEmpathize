/*
1. HTML에서 요소 가져오기
2. 인풋값들 유효성검사하기 (욕, 숫자, 특수문자 제한 등)
*/

//비속어 검사
let writer = document.getElementById('writerInput');
let comments = document.getElementById('WritedComments');
let commentsBtn = document.getElementById('commentBtn');

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

let wordCeck =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
