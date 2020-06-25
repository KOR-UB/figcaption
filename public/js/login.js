/* eslint-disable no-undef */
// import feedInit from './feed';
let userInfo;

const USER_KEY = 'Token';
let loginKey = '';
const strList = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
const charsLength = 16;
// 비밀번호 정규표현식
// 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 비교
const passwordPattern = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;
// 이메일 정규표현식
const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //대소문자 구분 안하고 특수문자 -_.@ 사용 시 다음 문자열들 패턴을 추가 비교 

async function userKeyGenerator() {
  for (let i = 0; i < charsLength; i++) {
    const randomNum = Math.floor(Math.random() * strList.length);
    loginKey += strList.substring(randomNum, randomNum + 1);
  }
  localStorage.setItem(USER_KEY, loginKey);
  userInfo = await axios.get('/userDatas')
    .then(res => res.data)
    .then(users => users.find(user => user.loginCheck === localStorage.getItem(USER_KEY)))
    .catch(err => console.error(err));
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
  const $loginSignIn = document.querySelector('.sign-in');
  const $signUpCheck = document.querySelector('.sign-up-check');
  const $loginEmail = document.querySelector('#login-email');
  const $loginPw = document.querySelector('#login-pw');
  // 회원가입
  const $joinEmail = document.querySelector('#join-email');
  const $joinPw = document.querySelector('#join-pw');

  function removeLoginPage() {
    // feedInit();
    window.location.href = 'index.html';
  }

  // disabled가 false이면 로그인 가능함
  let emailState = false;
  let pwState = false;
  let joinEmailState = false;
  let joinPwState = false;

  // 이메일 형식체크
  function emailPatternChk(e, input) {
    console.log('blur : 블러이벤트 일어남');
    $loginSignIn.disabled = true;
    $signUpCheck.disabled = true;
    // 엔터 누를때만 깜빡깜빡 나타나는 현상
    if (!input.value.match(emailPattern)) {
      input.nextElementSibling.setAttribute('style', 'display: block;');
      input.nextElementSibling.textContent = '올바른 이메일 형식으로 입력해주세요.';    
    }else {
      if (e.keyCode === 13) return;
      
      if (input.parentNode.classList.contains('login-form')) {
        emailState = true; 
        if (emailState && pwState) {
          $loginSignIn.disabled = false;
        }
        input.nextElementSibling.setAttribute('style', 'visibility:hidden;');
      }
      
      if (input.parentNode.classList.contains('sign-up-form')) {
        joinEmailState = true; 
        if (joinEmailState && joinPwState) {
          $signUpCheck.disabled = false;
        }
        input.nextElementSibling.setAttribute('style', 'visibility:hidden;');
      }
    }
  }

  // 비밀번호 형식체크
  function pwPatternChk(e, input) {
    console.log('keyup : 이벤트 일어남');
    $loginSignIn.disabled = true;
    $signUpCheck.disabled = true;

    if (!input.value.match(passwordPattern) || !input.value) {
      console.log('비밀번호 형식 일치하지 않음');
      input.nextElementSibling.setAttribute('style', 'display: block;');
      input.nextElementSibling.textContent = '영문/숫자/특수문자를 조합하여 8자리 이상 입력해주세요.';
    }else {
      // 엔터 누를때만 깜빡깜빡 나타나는 현상
      if (e.keyCode === 13) return;

      if (input.parentNode.classList.contains('login-form')) {
        input.nextElementSibling.setAttribute('style', 'visibility:hidden;');
      
        pwState = true; 
        if (emailState && pwState) {
          $loginSignIn.disabled = false;
        }
      }

      if (input.parentNode.classList.contains('sign-up-form')) {
        input.nextElementSibling.setAttribute('style', 'visibility:hidden;');
      
        joinPwState = true; 
        if (joinEmailState && joinPwState) {
          $signUpCheck.disabled = false;
        }
      }
    }
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
      .then(users => {
        users.every(user => {
          console.log('1');
          // 아이디 false
          // 0623 :: 민지 수정 (find할 시, 이메일이 있는경우에도 비밀번호 틀렸을때 존재하지않는 이메일이라뜸)
          if (user.email !== $email) {
            $emailWarning.setAttribute('style', 'visibility:visible;');
            $pwWarning.setAttribute('style', 'visibility:hidden;');
            $emailWarning.textContent = '존재하지 않는 이메일 입니다.';
          }
        });
        users.find(user => {
          console.log('2');
          // 아이디 true / 비밀번호 false
          if (user.email === $email && user.password !== $pw) {
            $emailWarning.setAttribute('style', 'visibility:hidden;');
            $pwWarning.setAttribute('style', 'visibility:visible;');
            $pwWarning.textContent = '비밀번호가 올바르지 않습니다.';
            // 비밀번호 초기화 해줄 시
            // $loginPw.value = '';
          }

          // 아이디 true / 비밀번호 true
          if (user.email === $email && user.password === $pw) {
            console.log('3');
            console.log('로그인 성공');
            $emailWarning.setAttribute('style', 'visibility:hidden;');
            $pwWarning.setAttribute('style', 'visibility:hidden;');
            const loadedUser = localStorage.getItem(USER_KEY);
            console.log(loadedUser);
            if (loadedUser === null) {
              console.log('4');
              // userKeyGenerator();
              localStorage.setItem(USER_KEY, user.loginCheck);
            } else {
              console.log('5');
              keyPass();
            }
            removeLoginPage();
          }
        });

      })
      .catch(err => console.error(err));
      console.log('userInfo', userInfo);
    // if (!userInfo) {
    //   console.log(userInfo);
    // } else {
    //   console.log('로그인 성공');
    // }
  }

  function signUpHandler(e) {
    console.log('join on');
    e.preventDefault();
    console.dir(e);
    const $email = e.target[0].value;
    const $emailWarning = e.target[0].nextElementSibling;
    const $name = e.target[1].value;
    const $nickname = e.target[2].value;
    const $nicknameWarning = e.target[2].nextElementSibling;
    const $pw = e.target[3].value;


    //회원가입 시도할 때 로직    
    async function joinKeyPass() {
      console.log('joinKeyPass');
      let userEamilFind = [];
      let userNickFind = [];

      userEamilFind = await axios.get('/userDatas')
        .then(res => res.data)
        .then(users => users.filter(user => {
          return user.email === $email;
        }))
        .catch(err => console.error(err));

      userNickFind = await axios.get('/userDatas')
      .then(res => res.data)
      .then(users => users.filter(user => {
        return user.nickName === $nickname;
      }))
      .catch(err => console.error(err));
      
      console.log('uf', userEamilFind);
      if (userEamilFind.length > 0) {
        $emailWarning.setAttribute('style', 'display: block;');
        $emailWarning.textContent = '중복된 아이디 입니다.';
        return;
      } else if (userNickFind.length > 0) {
        $nicknameWarning.setAttribute('style', 'display: block;');
        $nicknameWarning.textContent = '중복된 닉네임 입니다.';
        return;
      } else {
        console.log('else');
        const loadedUser = localStorage.getItem(USER_KEY);
        if (loadedUser === null) {
          userKeyGenerator();
        } else {
          keyPass();
        }
        userEamilFind = await axios.post('/userDatas', addUserData($email, $pw, $name, $nickname, localStorage.getItem(USER_KEY)));
        removeLoginPage();
      }
    }
    joinKeyPass();
  }

  function addUserData(email, password, userName, nickName, loginCheck) {
    const payload = {
      email,
      password,
      userName,
      nickName,
      loginCheck,
      boardsCount: 0,
      marksCount: 0,
      readBoards: [
      ]
    }
    return payload;
  }

  function changePageDisplay () {
    $loginPage.classList.toggle('sign-up-check');
  }

  function loginEventBinds() {
    $loginForm.addEventListener('submit', signInHandler);
    $signUpForm.addEventListener('submit', signUpHandler);
    $signUp.addEventListener('click', changePageDisplay);
    $returnLoginForm.addEventListener('click', changePageDisplay);
    // 로그인/회원가입시 이메일, 비밀번호 패턴 체크
    $loginEmail.onkeyup = e => {
      emailPatternChk(e, $loginEmail);
    };
    $joinEmail.onkeyup = e => {
      emailPatternChk(e, $joinEmail);
    };
    $loginPw.onkeyup = e => {
      pwPatternChk(e, $loginPw);
    };
    $joinPw.onkeyup = e => {
      pwPatternChk(e, $joinPw);
    };
  }
  loginEventBinds();
  async function autoLogin() {
    userInfo = await axios.get('/userDatas')
      .then(res => res.data)
      .then(users => users.find(user => user.loginCheck === localStorage.getItem(USER_KEY)))
      .catch(err => console.error(err));
    if (!userInfo || !userInfo.loginCheck) return;
    removeLoginPage();
  }
  autoLogin();
}

export default function loginInit() {
  loginDomNodeSettings();
}
// !!지우지 말것!!
// export default function userInfoconnect() {
//   return userInfo;
// }
// loginInit();