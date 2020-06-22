/* eslint-disable no-case-declarations */
// import userInfoConnect from './login';

let slidePos = 0;
function feedDomNodeSettings() {
  const $postContainer = document.querySelector('.post-container');

  function touchHandler(e) {
    if (e.target.matches($postContainer.classList)) return;
    switch (e.target.className) {
      case 'post-img':
        console.log(e);
        const $parent = e.target.parentNode;
        $parent.parentNode.querySelector(".active").classList.remove("active");
        // $parent.parentNode.classList
        if(e.clientX < e.target.offsetWidth / 2) {
          if($parent.style.left === '0%') return;
          $parent.style.left = `${++slidePos * 100}%`;
        } else {
          if($parent.style.left === '-200%') return;
          $parent.style.left = `${--slidePos * 100}%`;
        }
      break;
    }
  }

  function feedEventBinds() {
    $postContainer.addEventListener('click', touchHandler);
  }
  feedEventBinds();
}

function postRender() {

}
// export default 
function feedInit() {
  // userInfo = userInfoConnect();
  // console.log(userInfo);
  feedDomNodeSettings();
  postRender();
}
feedInit();




// setTimeout(() => {
//   document.querySelector(".login-page").classList.add("active");
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