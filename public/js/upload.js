const $header = document.querySelector('header');
const $main = document.querySelector('main');
const $postAdd = document.querySelector('.post-add');
const $post = document.querySelector('.post');
const $btnCancle = document.querySelector('.btn-cancle');
const $postArea1 = document.querySelector('.post-area1');
const $btnFileWrap = document.querySelector('.btn-img');
const $btnFile = document.querySelector('.btn-img-file');
const $postMsg = document.querySelector('.post-warning-msg');
const $removePost = document.querySelector('.removePost')
let fileList = [];

console.log($btnFile);
$btnFile.addEventListener('change', (e) => {
  fileList = [...fileList, ...e.target.files];
  console.log('체인지 이벤트 확인');
  console.log(fileList);
  if (!fileList.length) {
    $postMsg.innerHTML = 'No files selected!';
  } else if (fileList.length < 6) {
    console.log('출력 화면이라고 가정해보자.');
    handleFiles([...e.target.files]);
  }

  if (fileList.length >= 5) {
    $btnFileWrap.disabled = true;
    $btnFileWrap.classList.toggle("btn-img-max")
  }
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

  }
})

//버튼 누르면 삭제됨
let matchedNum = 0;
let postImg
let postList
let removeList

function handleFiles(files) {

  for (let i = 0; i < files.length; i++) {
    const file = files[i];


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
      };
    })(postImg);
    reader.readAsDataURL(file);

  }
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