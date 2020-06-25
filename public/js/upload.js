/* eslint-disable no-undef */
// const $header = document.querySelector('header');
// const $main = document.querySelector('main');
const $postAdd = document.querySelector('.post-add');
const $post = document.querySelector('.post');
const $btnCancle = document.querySelector('.btn-cancle');
const $postArea1 = document.querySelector('.post-area1');
const $btnFileWrap = document.querySelector('.btn-img');
const $btnFile = document.querySelector('.btn-img-file');
const $postMsg = document.querySelector('.post-warning-msg');
const $btnOk = document.querySelector('.btn-ok');
const $postContent = document.querySelector('.post-content');
// const $removePost = document.querySelector('.removePost')
let fileList = [];
// let userInfo;

async function getUser() {
  userInfo = await axios.get('/userDatas')
  .then(res => res.data)
  .then(users => users.find(user => user.loginCheck === localStorage.getItem('Token'))) //로컬 스토리지 정보와 일치한지 확인한 후 있으면 userInfo에 객체로 할당
  .catch(err => console.error(err));
}
getUser();
function checkImgLength() {
  if (!fileList.length) {
    $postMsg.textContent = 'No files selected!';
    $btnFileWrap.classList.remove("btn-img-max");
    $btnOk.disabled = true;
  }
  if (fileList.length) {
    $postMsg.textContent = '';
    $btnOk.disabled = false;
    $btnFileWrap.classList.remove("btn-img-max");
  }
  if (fileList.length === 5) {
    $btnFileWrap.disabled = false;
    $btnFileWrap.classList.add("btn-img-max");
    $postMsg.textContent = '최대 5개의 사진을 포함할 수 있습니다.';
  }
}
checkImgLength();
$btnFile.addEventListener('change', (e) => {
  const size = e.target.files[0].size;
  if(size > 1000000) {
    alert('이미지 크기를 초과했습니다.')
    return;
  }

  fileList = [...fileList, ...e.target.files];
  console.log('체인지 이벤트 확인');
  console.log(fileList);

  $postArea1.onclick = e => {
    if (!e.target.matches('.removePost')) return;
    console.log('온클릭 이벤트 확인');
    e.target.parentNode.remove();
    fileList = fileList.filter(file => {
      console.log(file.name);
      return file.name != e.target.id;
    });
    console.log('필터 지나온 지점');
    console.log(fileList);
    checkImgLength();
  }
  checkImgLength();
  handleFiles([...e.target.files]);
})

//버튼 누르면 삭제됨

let postImg
let postList
let removeList

function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    //업로드 알람버튼 타입,경고 
    if (!file.type.startsWith('image/')) {
      continue
    }
    postImg = document.createElement("img");
    postList = document.createElement("li")
    removeList = document.createElement("button");

    postList.classList.add("slide")
    removeList.id = file.name;


    postImg.classList.add("newPreview");
    postImg.file = file;
    removeList.classList.add("removePost"); //removePost css style 아직 안만들었음
    postList.appendChild(postImg);
    postList.appendChild(removeList)
    $postArea1.appendChild(postList); // "preview"가 결과를 보여줄 div 출력이라 가정.

    const reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
        //상태 배열의 객체들에게 결과(64)를 키와 벨류로 넣어놓음

      };
    })(postImg);
    reader.readAsDataURL(file);

  }
}

function _idGenerator() {
  return postBoards.length ? Math.max( ...postBoards.map(board => board.id)) + 1 : 1;
}
function _defaultHandler() {
  document.querySelectorAll("li.slide").forEach(item => {
    item.classList.contains('plus') ? true : item.remove();
  });
  $postContent.value = '';
}
let _imgList = []
$btnOk.onclick = () => {
  document.querySelectorAll('.newPreview').forEach(item => {
    _imgList.push({src: item.src});
  })
  const payload = {
    id: _idGenerator(),
    by: userInfo.nickName,
    likeCount: 0,
    content: $postContent.value,
    imgList: _imgList
  }
  axios.post('/boardDatas', payload);
  postRender(payload);
  _defaultHandler();
  togglePopup();
}


$postAdd.onclick = () => {
  togglePopup();
}
$btnCancle.onclick = () => {
  togglePopup();
}

function togglePopup() {
  $post.classList.toggle('post-active')
}

//if startsWith="/img"
// export function bindEvent() {
//   const $inputFile = $main.querySelector(".input-file");
//   $inputFile.addEventListener("change", e => {
//     readURL(e.target);
//   })
// }