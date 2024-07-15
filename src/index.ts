import Router from './modules/Router';
import * as Pages from './pages/index';

const router = new Router('#app');
router
    .use('/', Pages.createLoginPage)
    .use('/sign-up', Pages.createSigninPage)
    .use('/settings', Pages.createProfilePage)
    .use('/password', Pages.createPasswordPage)
    .use('/messenger', Pages.createChatList)
    .use('/fix', Pages.createFixPage)
    .use('/error', Pages.createNotFoundPage)
    .start();
