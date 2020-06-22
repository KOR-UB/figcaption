// import feedInit from './feed';
let userInfo; //유저 정보가 바뀔때 그 정보를 재할당 해주세요~
//예를 들어 좋아요를 누를 때, 북마크를 누를 때, 게시글을 작성할 때, 로그인을 했을 때 등등 데이터베이스에 요청을 보낸 후 재할당 해 주세요! 26~29번 줄을 참고하셔도 좋아요!

const USER_KEY = 'Token';
let loginKey = '';
const strList = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
const charsLength = 16;

async function userKeyGenrator() {
  for (let i = 0; i < charsLength; i++) {
    const randomNum = Math.floor(Math.random() * strList.length);
    loginKey += strList.substring(randomNum, randomNum + 1);
  }
  localStorage.setItem(USER_KEY, loginKey);
  userInfo.loginCheck = loginKey;
  userInfo = await axios.patch(`/userDatas/${userInfo.id}`, userInfo);
}
async function keyPass() {
  userInfo = await axios.get('/userDatas')
    .then(res => res.data)
    .then(users => users.find(user => user.loginCheck === localStorage.getItem(USER_KEY)))
    .catch(err => console.error(err));
  console.log(userInfo);
}

function loginDomNodeSettings() {
  const $loginPage = document.querySelector('.login-page');
  const $loginForm = $loginPage.querySelector('.login-form');
  const $signUpForm = $loginPage.querySelector('.sign-up-form');
  const $signUp = $loginPage.querySelector('.sign-up');
  const $returnLoginForm = $loginPage.querySelector('.return-login-form');

  function removeLoginPage() {
    // feedInit();
    window.location.href = 'index.html';
    // setTimeout(() => {
    //   $loginPage.remove(); //로그인 페이지 제거 
    // }, 2000)
  }
  async function signInHandler(e) {
    e.preventDefault();
    const $email = e.target[0].value;
    const $emailWarning = e.target[0].nextElementSibling;
    const $pw = e.target[1].value;
    const $pwWarning = e.target[1].nextElementSibling;

    //로그인 시도할 때 로직
    userInfo = await axios.get('/userDatas')
      .then(res => res.data)
      .then(users => users.find(user => user.email === $email && user.password === $pw))
      .catch(err => console.error(err));
    if (!userInfo) {
      console.log('일치한 유저 정보가 없음');
    } else {
      console.log('로그인 성공');
      const loadedUser = localStorage.getItem(USER_KEY);
      console.log(loadedUser);
      if (loadedUser === null) {
        userKeyGenrator();
      } else {
        keyPass();
      }
      // removeLoginPage();
    }
  }

  function signUpHandler(e) {
    e.preventDefault();
    console.dir(e);
    const $email = e.target[0].value;
    const $emailWarning = e.target[0].nextElementSibling;
    const $name = e.target[1].value;
    const $nickname = e.target[2].value;
    const $pw = e.target[3].value;
    const $pwWarning = e.target[3].nextElementSibling;
    const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //대소문자 구분 안하고 특수문자 -_.@ 사용 시 다음 문자열들 패턴을 추가 비교 
    const passwordPattern = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/; //숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 비교

    //회원가입 시도할 때 로직
    if (!$email.match(emailPattern)) {
      console.log('이메일 패턴 일치하지 않음');
      return;
    }
    if (!$pw.match(passwordPattern)) {
      console.log('패스워드 패턴 일치하지 않음');
      return;
    }
    //이구간에 포스트 로직을 추가해주세욥!
  }

  function changePageDisplay(e) {
    $loginPage.classList.toggle('sign-up-check');
  }

  function loginEventBinds() {
    $loginForm.addEventListener('submit', signInHandler);
    $signUpForm.addEventListener('submit', signUpHandler);
    $signUp.addEventListener('click', changePageDisplay);
    $returnLoginForm.addEventListener('click', changePageDisplay);
  }
  loginEventBinds();
  // async function autoLogin() {
  //   userInfo = await axios.get('/userDatas')
  //   .then(res => res.data)
  //   .then(users => users.find(user => user.loginCheck))
  //   if(!userInfo || !userInfo.loginCheck) return;
  //   removeLoginPage();
  // }
  // autoLogin(); 
}

function loginInit() {
  loginDomNodeSettings();
}
// export default function userInfoconnect() {
//   return userInfo;
// }
loginInit();