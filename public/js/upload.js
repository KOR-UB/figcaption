/* eslint-disable no-undef */
// const $header = document.querySelector('header');
// const $main = document.querySelector('main');

let userInfo;
let postBoards;
export default function uploadInit() {
  const $postAdd = document.querySelector('.post-add');
  const $post = document.querySelector('.post');
  const $btnCancle = $post.querySelector('.btn-cancle');
  const $postArea1 = $post.querySelector('.post-area1');
  const $btnFileWrap = $post.querySelector('.btn-img');
  const $btnFile = $post.querySelector('.btn-img-file');
  const $postMsg = $post.querySelector('.post-warning-msg');
  const $btnOk = $post.querySelector('.btn-ok');
  const $postContent = $post.querySelector('.post-content');
  const $slideControl = $post.querySelector('.slide-control');
  const $slideControlPrev = $post.querySelector('.slide-control .prev');
  const $slideControlNext = $post.querySelector('.slide-control .next');
  
  let slideBtnCnt = 0;
  // const $removePost = document.querySelector('.removePost')
  let fileList = [];
  // let userInfo;
  
  async function getUser() {
    userInfo = await axios.get('/userDatas')
      .then(res => res.data)
      .then(users => users.find(user => user.loginCheck === localStorage.getItem('Token'))) //로컬 스토리지 정보와 일치한지 확인한 후 있으면 userInfo에 객체로 할당
      .catch(err => console.error(err));
  }
  async function getBoard() {
    postBoards = await axios.get('/boardDatas') //보드 데이터 가져와서 할당
    .then(res => res.data)
    .catch(err => console.error(err));
  }
  getUser();
  getBoard();
  
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
    //얼럿은 한번만 동작하는 오류가 있다.
    // const size = e.target.files[0].size;
    // if(size > 1000000) {
    //   alert('이미지 크기를 초과했습니다.')
    //   return;
    // }
    fileList = [...fileList, ...e.target.files];
    $postArea1.onclick = e => {
      if (!e.target.matches('.removePost')) return;
      e.target.parentNode.remove();
      fileList = fileList.filter(file => {
        return file.name != e.target.id;
      });
      checkImgLength();
      // 슬라이드
      makeImgSlide(e);
      $slideControlPrev.click();
    }
    checkImgLength();
    handleFiles([...e.target.files]);
    $slideControlNext.classList.remove('hidden');
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
  
  
  function makeImgSlide(e) {
    if (e.target.className === 'prev') {
      --slideBtnCnt;
      $postArea1.setAttribute('style', `transform: translateX(-${140 * slideBtnCnt}px)`);
    }
    if (e.target.className === 'next') {
      ++slideBtnCnt;
      $postArea1.setAttribute('style', `transform: translateX(-${140 * slideBtnCnt}px)`);
    }
    // 버튼 노출
    let slideLength = $postArea1.querySelectorAll('.slide').length;
    // < 불가능
    if (slideBtnCnt <= 0 || slideLength > 2) {
      $slideControlPrev.classList.add('hidden');
      $slideControlNext.classList.remove('hidden');
    }
    // < > 둘다가능
    if (slideBtnCnt > 0) {
      $slideControlPrev.classList.remove('hidden');
      $slideControlNext.classList.remove('hidden');
    }
    // > 불가능
    if (slideBtnCnt === 5 || (slideLength - 3) < slideBtnCnt) {
      $slideControlNext.classList.add('hidden');
    }
  }
  $slideControl.onclick = e => {
    makeImgSlide(e);
  };
  
  function _idGenerator() {
    return postBoards.length ? Math.max( ...postBoards.map(board => board.id)) + 1 : 1;
  }
  let _imgList = []
  function _defaultHandler() {
    fileList = [];
    _imgList = [];
    document.querySelectorAll("li.slide").forEach(item => {
      item.classList.contains('plus') ? true : item.remove();
    });
    $postContent.value = '';
  }
  $btnOk.onclick = () => {
    document.querySelectorAll('.newPreview').forEach(item => {
      _imgList = [..._imgList, {
        src: item.src
      }];
    })
    const payload = {
      id: _idGenerator(),
      by: userInfo.nickName,
      likeCount: 0,
      content: $postContent.value,
      imgList: _imgList,
      likeList: [
        {
          user: "",
          check: false
        }
      ]
    }
    axios.post('/boardDatas', payload);
    window.location.reload();
  }
  
  
  $postAdd.onclick = () => {
    togglePopup();
  }
  $btnCancle.onclick = () => {
    _defaultHandler();
    togglePopup();
  }
  
  function togglePopup() {
    $post.classList.toggle('post-active')
  }
}