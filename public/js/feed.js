/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
// import userInfoConnect from './login';
const $postContainer = document.querySelector('.post-container');
let slidePos = 0;
let user;
function feedDomNodeSettings() {
  function sliderHandler($PP, pos) {
    const $sliderPosIcons = $PP.parentNode.nextElementSibling.querySelectorAll('.item-light');
    $sliderPosIcons[0].parentNode.querySelector(".active").classList.remove('active');
    $PP.style.left = `${pos * 100}%`;
    if (pos === 0) {
      $PP.nextElementSibling.querySelector(".slider-left-btn").style.visibility = 'hidden';
      $PP.nextElementSibling.querySelector(".slider-right-btn").style.visibility = 'visible';
    } else if (pos === -1) {
      $PP.nextElementSibling.querySelector(".slider-left-btn").style.visibility = 'visible';
      $PP.nextElementSibling.querySelector(".slider-right-btn").style.visibility = 'visible';
    } else {
      $PP.nextElementSibling.querySelector(".slider-left-btn").style.visibility = 'visible';
      $PP.nextElementSibling.querySelector(".slider-right-btn").style.visibility = 'hidden';
    }
    const $classNode = $sliderPosIcons[-pos];
    $classNode.classList.add('active');     
  } 

  async function touchHandler(e) {
    if (e.target.matches($postContainer.classList)) return;
    let $parentPreviouss = e.target.parentNode.previousElementSibling;
    console.log(e.target.className);
    switch (e.target.className) {
      case 'slider-left-btn':
        if($parentPreviouss.style.left === '0%') return;
        sliderHandler($parentPreviouss, ++slidePos);
      break;
      case 'slider-right-btn':
        if($parentPreviouss.style.left === '-200%') return;
        sliderHandler($parentPreviouss, --slidePos);
      break;
      case 'heart':
      case 'heart active':
        user.boards[0].likeCheck = user.boards[0].likeCheck ? false : true;
        user = await axios.patch(`/userDatas/${user.id}`, user)
        .then(res => res.data)
        .catch(err => console.error(err));
        e.target.classList.toggle('active');
        if (user.boards[0].likeCheck) {
          console.log("!");
          e.target.querySelector('svg > path').setAttribute('d',
            'M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z');
        } else {
          console.log("?");
          e.target.querySelector('svg > path').setAttribute('d', 'M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z');
        }
     
      break;
      case 'msg': 
        console.log('메시지');
      break;
    }
  }

  function feedEventBinds() {
    $postContainer.addEventListener('click', touchHandler);
  }
  feedEventBinds();
}

function createNode(tag, _class = '') {
  const node = document.createElement(tag);
  node.className = _class;
  return node;
}

function postRender(board, user) {
  console.log(board);
  const { imgList } = board;
  console.log(imgList);
  console.log(user);
  const $postCard = createNode('li', 'post-card'),

  $postHeader = createNode('div', 'post-header'),
  $profile = createNode('img', 'profile'),
  $postNickName = createNode('p', 'post-nickname'),

  $postImgContainer = createNode('div', 'post-img-container'),
  $postImgbox = createNode('div', 'post-imgbox'),
  // $postImg = createNode('img', 'post-img'),

  $slideController = createNode('div', 'slide-controller'),
  $sliderLeftBtn = createNode('button', 'slider-left-btn'),
  $sliderRightBtn = createNode('button', 'slider-right-btn'),

  $postContent = createNode('div', 'post-content'),
  $postIconContainer = createNode('div', 'post-icon-container'),
  
  $leftIcon = createNode('div', 'left-icon'),
  $heart = createNode('button', 'heart'),
  $heartSvg = createNode('svg'),
  $heartPath = createNode('path'),

  $msg = createNode('button', 'msg'),
  $msgSvg = createNode('svg'),
  $msgPath = createNode('path'),

  $centerIcon = createNode('div', 'center-icon'),
  // $itemLight = createNode('div', 'item-light'),

  $rightIcon = createNode('div', 'right-icon'),
  $mark = createNode('button', 'mark'),
  $markSvg = createNode('svg'),
  $markPath = createNode('path'),

  $postTextContainer = createNode('div', 'post-text-container'),
  $heartText = createNode('p', 'heart-text'),
  $count = createNode('span', 'count'),
  $nick = createNode('p', 'nick'),
  $hash = createNode('span', 'hash'),
  $plusText = createNode('span', 'plus-text'),
  $longText = createNode('div', 'long-text');


  
  $postHeader.appendChild($profile);
  $postHeader.appendChild($postNickName);
  
  $postImgContainer.appendChild($postImgbox);
  imgList.forEach(img => {
    const $postImg = createNode('img', 'post-img');
    $postImg.src = img.src;
    $postImgbox.appendChild($postImg); //img
  })


  $slideController.appendChild($sliderLeftBtn);
  $slideController.appendChild($sliderRightBtn);
  $postImgContainer.appendChild($slideController);
  $heartSvg.appendChild($heartPath);
  $heart.appendChild($heartSvg);
  $msgSvg.appendChild($msgPath);
  $msg.appendChild($msgSvg);
  $leftIcon.appendChild($heart);
  $leftIcon.appendChild($msg);  
  $postIconContainer.appendChild($leftIcon);

  imgList.forEach(() => {
    if (imgList.length === 1) return;
    const $itemLight = createNode('div', 'item-light');
    $centerIcon.appendChild($itemLight); //pos;
    $centerIcon.firstElementChild.classList.add("active");
  })
  
  $postIconContainer.appendChild($centerIcon);

  $markSvg.appendChild($markPath);
  $mark.appendChild($markSvg)
  $rightIcon.appendChild($mark);
  $postIconContainer.appendChild($rightIcon);

  $postContent.appendChild($postIconContainer);

  $postTextContainer.appendChild($heartText);
  $heartText.appendChild($count);
  $postTextContainer.appendChild($nick);
  $nick.appendChild($hash);
  $nick.appendChild($plusText);
  $postTextContainer.appendChild($longText);
  $postContent.appendChild($postTextContainer);

  $postCard.appendChild($postHeader);
  $postCard.appendChild($postImgContainer);
  $postCard.appendChild($postContent);

  $postContainer.appendChild($postCard);
  // console.log();

  const { nickName, boards } = user;
  // const { likeCheck } = boards;
}
// export default 
async function feedInit() {
  // userInfo = userInfoConnect();
  // console.log(userInfo);
  const Token = localStorage.getItem('Token');
  user = await axios.get('/userDatas')
  .then(res => res.data)
  .then(users => users.find(user => user.loginCheck === Token))
  .catch(err => console.error(err));
  if(!user) window.location.href = './login.html';
  console.log(user);
  feedDomNodeSettings();
  user.boards.forEach(board => {
    postRender(board, user);
  })
 
}
feedInit();




// setTimeout(() => {
//   document.querySelector('.login-page").classList.add("active");
// }, 1000);

// let userinfo;
// axios.get("./userDatas")
//   .then(res => res.data)
//   .then(users => {
//     if (users.some(user => user.loginCheck)) {
//       console.log("로그인 성공");
//       userinfo = users.find(user => user.loginCheck);
//       console.log(userinfo);

//       setTimeout(() => {
//         document.querySelector(".page-load").remove();
//       }, 1000);
//     } else {
//       console.log("로그인 실패");
//       document.body.classList = "error-login"
//       setTimeout(() => {
//         document.querySelector(".page-load").remove();
//         // document.body.innerHTML = "<button class='return-page'>로그인 하러가기</button>";
//         // document.querySelector(".return-page").addEventListener("click", e => {
//         //   window.location.href = "../";
//         // })
//       }, 1000)
//     }
//   })
//   .catch(err => console.error(err));

// document.querySelector(".plus-text").addEventListener("click", e => {
//   e.target.remove();
//   document.querySelector(".long-text").style.height = document.querySelector(".long-text").scrollHeight + "px";
// })
// let num = 0;

// function imgTouch(e) {
//   $postImgbox.removeEventListener("click", imgTouch);
//   num++;
//   // axios.get()
//   const $count = document.querySelector(".count");
//   $count.textContent = num;
//   const $heartAnim = document.createElement("div");
//   $heartAnim.classList = "icon-heart active"
//   $heartAnim.innerHTML = `
//     <svg viewBox="-5 -28 521.00002 512" xmlns="http://www.w3.org/2000/svg">
//       <path
//         d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0" />
//       </svg>`
//   const $heart = $postImgbox.parentNode.querySelector(".heart > path");
//   $heart.parentNode.classList.toggle("active")
//   $heart.setAttribute("d",
//     "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
//     );
//   $postImgbox.appendChild($heartAnim);
//   setTimeout(() => {
//     $heartAnim.remove();
//     $postImgbox.addEventListener("click", imgTouch);
//   }, 1500)
// }
// const $postImgbox = document.querySelector(".post-imgbox");
// $postImgbox.addEventListener("click", imgTouch);
// window.addEventListener("unload", () => {
//   userinfo.loginCheck = false;
//   axios.patch("./userDatas", userinfo)
//   .catch(err => console.error(err));
// });