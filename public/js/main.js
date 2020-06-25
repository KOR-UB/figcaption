import "@babel/polyfill";
import loginInit from './login';
import feedInit from './feed';
import uploadInit from './upload';
import header from '../css/header';
import loginStyle from '../css/login-style';
import postStyle from '../css/post-style';

loginInit();
feedInit();
uploadInit();
console.log(header)
console.log(loginStyle)
console.log(postStyle)
