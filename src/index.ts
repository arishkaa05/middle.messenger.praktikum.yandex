import Handlebars from 'handlebars';
import * as Components from './components/index.js';
import * as Pages from './pages/index.js'

const pages = {
  'signin': [ Pages.SigninPage ],
  'login': [ Pages.LoginPage ],
  'chat': [ Pages.ChatPage ],
  'notFound': [ Pages.NotFoundPage ],
  'fix': [ Pages.FixPage ],
  'profile': [ Pages.ProfilePage ],
  'password': [ Pages.PasswordPage ]
}; 

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page) { 
  if (pages.hasOwnProperty(page)) {
    const [ source, args ] = pages[page];
    const handlebarsFunct = Handlebars.compile(source);
    document.body.innerHTML = handlebarsFunct(args);

    const url = new URL(window.location.href);
    url.pathname = `/${page}`;
    window.history.pushState({}, '', url.toString());
  } else {
    navigate('notFound'); 
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const url = new URL(window.location.href);
  const path = url.pathname.slice(1) || 'login'; // Получаем путь из URL-адреса
  navigate(path);
});

document.addEventListener('click', e => {
  if (e && e.target && e.target instanceof HTMLElement) {
    const page = e.target.getAttribute('page');
    if (page) {
      navigate(page);

      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }
});
