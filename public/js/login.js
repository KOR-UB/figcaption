/* eslint-disable no-undef */
// import feedInit from './feed';
let userInfo; //유저 정보가 바뀔때 그 정보를 재할당 해주세요~
//예를 들어 좋아요를 누를 때, 북마크를 누를 때, 게시글을 작성할 때, 로그인을 했을 때 등등 데이터베이스에 요청을 보낸 후 재할당 해 주세요! 26~29번 줄을 참고하셔도 좋아요!

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
  const $loginSignIn = document.querySelector('.sign-in');
  const $loginEmail = document.querySelector('#login-email');
  const $loginEmailWarning = $loginEmail.nextElementSibling;
  const $loginPw = document.querySelector('#login-pw');
  const $loginPwWarning = $loginPw.nextElementSibling;

  function removeLoginPage() {
    // feedInit();
    window.location.href = 'index.html';
  }

  // disabled가 false이면 로그인 가능함
  let emailState = false;
  let pwState = false;

  // 이메일 형식체크
  $loginEmail.onkeyup = () => {
    console.log('blur : 블러이벤트 일어남');
    $loginSignIn.disabled = true;
    if (!$loginEmail.value.match(emailPattern)) {
      $loginEmailWarning.setAttribute('style', 'display: block;');
      $loginEmailWarning.textContent = '올바른 이메일 형식으로 입력해주세요.';    
    }else {
      emailState = true; 
      if (emailState && pwState) {
        $loginSignIn.disabled = false;
      }
      $loginEmailWarning.setAttribute('style', 'visibility:hidden;');
    }
  };

  // 비밀번호 형식체크
  $loginPw.onkeyup = () => {
    console.log('keyup : 이벤트 일어남');
    $loginSignIn.disabled = true;

    if (!$loginPw.value.match(passwordPattern) || !$loginPw.value) {
      console.log('비밀번호 형식 일치하지 않음');
      $loginPwWarning.setAttribute('style', 'display: block;');
      $loginPwWarning.textContent = '영문/숫자/특수문자를 조합하여 8자리 이상 입력해주세요.';
    }else {
      $loginPwWarning.setAttribute('style', 'visibility:hidden;');
      pwState = true; 
      if (emailState && pwState) {
        $loginSignIn.disabled = false;
      }
    }
  };

  
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
    e.preventDefault();
    console.dir(e);
    const $email = e.target[0].value;
    const $emailWarning = e.target[0].nextElementSibling;
    const $name = e.target[1].value;
    const $nickname = e.target[2].value;
    const $pw = e.target[3].value;
    const $pwWarning = e.target[3].nextElementSibling;


    //회원가입 시도할 때 로직
    // 수정필요
    if (!$email.match(emailPattern)) {
      console.log('이메일 패턴 일치하지 않음');
      return;
    }
    if (!$pw.match(passwordPattern)) {
      console.log('패스워드 패턴 일치하지 않음');
      // 숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 비교
      $pwWarning.setAttribute('style', 'display: block;');
      $pwWarning.textContent = '영문/숫자/특수문자를 조합하여 8자리 이상 입력해주세요.';
      return;
    }
    //이구간에 포스트 로직을 추가해주세욥!
    async function joinKeyPass() {
      let uf = [];

      uf = await axios.get('/userDatas')
        .then(res => res.data)
        .then(users => users.filter(user => {
          return user.email === $email && user.nickName === $nickname;
        }))
        .catch(err => console.error(err));

      if (uf.length > 0) {
        console.log('중복된 이메일 입니다.')
      } else {
        const loadedUser = localStorage.getItem(USER_KEY);
        if (loadedUser === null) {
          userKeyGenerator();
        } else {
          keyPass();
        }
        uf = await axios.post('/userDatas', addUserData($email, $pw, $name, $nickname, localStorage.getItem(USER_KEY)));
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
      boards: [{
        id: 0,
        likeCount: 0,
        likeCheck: false,
        markCheck: false,
        content: '',
        createTime: {
          day: '',
          h: '',
          m: '',
          s: ''
        },
        imgList: [{
          id: 0,
          src: ''
        }],
        hashList: [{
          id: 0,
          value: ''
        }]
      }]
    }
    return payload;
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

function loginInit() {
  loginDomNodeSettings();

}
// !!지우지 말것!!
// export default function userInfoconnect() {
//   return userInfo;
// }
loginInit();