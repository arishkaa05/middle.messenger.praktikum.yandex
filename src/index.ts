
import Handlebars from 'handlebars';
import * as Components from './components/index';
import * as Pages from './pages/index'; 
import ChatItem from './tools/classes/ChatItem';

const pages: { [key: string]: { source: any; }[] } = {
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

function navigate(page: string) { 
  if (pages.hasOwnProperty(page)) {
    const [ source, args ] = pages[page];
    const handlebarsFunct = Handlebars.compile(source);
    const app = document.getElementById('app')
    if (app) {
      app.innerHTML = handlebarsFunct(args);
    }
    const url = new URL(window.location.href);
    url.pathname = `/${page}`;
    window.history.pushState({}, '', url.toString());
  } else {
    navigate('notFound'); 
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const url = new URL(window.location.href);
  const path = url.pathname.slice(1) || 'login'; 
  navigate(path);
});

document.addEventListener('click', e => {
  const page = (e.target as HTMLElement).getAttribute('page');
  if (page) {
    navigate(page);

      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }
);
