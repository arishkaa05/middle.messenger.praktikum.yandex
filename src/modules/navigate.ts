import * as Pages from '../pages/index';
import Block from './Block';
// import { createLoginPage } from '../pages/login-page';

// const pages: any = {
//     signin: [Pages.SigninPage],
//     login: [Pages.LoginPage],
//     chat: [Pages.ChatPage],
//     notFound: [Pages.NotFoundPage],
//     fix: [Pages.FixPage],
//     profile: [Pages.ProfilePage],
//     password: [Pages.PasswordPage],
// };

// const pages: {[key in PagesNames]: Block} = {
//     [PagesNames.LOGIN]: Pages.createLoginPage,
// }

const pages: {[key in string]: Block} = {
    login: Pages.createLoginPage,
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

export default navigate;
