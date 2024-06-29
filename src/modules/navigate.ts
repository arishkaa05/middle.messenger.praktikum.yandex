import * as Pages from '../pages/index';
import Block from './Block';

const pages: {[key in string]: Block} = {
    login: Pages.createLoginPage,
    signin: Pages.createSigninPage,
    fix: Pages.createFixPage,
    notFound: Pages.createNotFoundPage,
    profile: Pages.createProfilePage,
    password: Pages.createPasswordPage,
    chat: Pages.createChatList,
};

const render = (root: HTMLElement, block: Block) => {
    root?.appendChild(block.getContent());
    block.dispatchComponentDidMount();
    return root;
};

const navigate = (page: string) => {
    if (Object.keys(pages).includes(page)) {
        const url = new URL(window.location.href);
        url.pathname = `/${page}`;
        window.history.pushState({}, '', url.toString());
        const app = document.querySelector('#app') as HTMLElement;
        app.innerHTML = '';
        render(app, pages[page]);
    } else {
        navigate('notFound');
    }
};

document.addEventListener('click', (e) => {
    const page = (e.target as HTMLElement).getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});

export default navigate;
