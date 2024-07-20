import { router } from './modules/Router';
import * as Pages from './pages/index';

router
    .use('/', Pages.createLoginPage)
    .use('/sign-up', Pages.createSigninPage)
    .use('/messenger', Pages.createChatList)
    .use('/settings', Pages.createProfilePage)
    .use('/error', Pages.createNotFoundPage)
    .use('/fix', Pages.createFixPage)
    .start();
