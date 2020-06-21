let userInfo; //유저 정보가 바뀔때 그 정보를 재할당 해주세요~
//예를 들어 좋아요를 누를 때, 북마크를 누를 때, 게시글을 작성할 때, 로그인을 했을 때 등등 데이터베이스에 요청을 보낸 후 재할당 해 주세요! 17~20번 줄을 참고하셔도 좋아요!

function loginDomNodeSettings() {
  const $loginPage = document.querySelector('.login-page');
  const $loginForm = $loginPage.querySelector('.login-form');
  const $signUpForm = $loginPage.querySelector('.sign-up-form');
  const $signUp = $loginPage.querySelector('.sign-up');
  const $returnLoginForm = $loginPage.querySelector('.return-login-form');

  async function signInHandler(e) {
    e.preventDefault();
    const $email = e.target[0].value;
    const $password = e.target[1].value;

    //로그인 시도할 때 로직
    userInfo = await axios.get("/userdatas")
    .then(res => res.data)
    .then(users => users.find(user => user.email === $email && user.password === $password))
    .catch(err => console.error(err));
    if(!userInfo) {
      console.log("일치한 유저 정보가 없음");
    } else {
      console.log("로그인 성공");
    }
  }
  function signUpHandler(e) {
    e.preventDefault();
    const $email = e.target[0].value;
    const $name = e.target[1].value;
    const $nickname = e.target[2].value;
    const $password = e.target[3].value;
    const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //대소문자 구분 안하고 특수문자 -_.@ 사용 시 다음 문자열들 패턴을 추가 비교 
    const passwordPattern = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/; //숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 비교

    //회원가입 시도할 때 로직
    if (!$email.match(emailPattern)) {
      console.log("이메일 패턴 일치하지 않음");
      return;
    }
    if (!$password.match(passwordPattern)) {
      console.log("패스워드 패턴 일치하지 않음");
      return;
    }
  }
  function changePageDisplay(e) {
    $loginPage.classList.toggle('sign-up-check');
  }
  function loginEventBinds() {
    $loginForm.addEventListener('submit', signInHandler);
    $signUpForm.addEventListener('submit', signUpHandler);
    $signUp.addEventListener('click', changePageDisplay)
    $returnLoginForm.addEventListener('click', changePageDisplay)
  }
  loginEventBinds();
}

function init() {
  loginDomNodeSettings();
}
init();