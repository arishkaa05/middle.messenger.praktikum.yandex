import Handlebars from 'handlebars';
import * as Components from './components/index';
import * as Blocks from './blocks/index';
import navigate from './modules/navigate';

Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
});

Object.entries(Blocks).forEach(([name, block]) => {
    Handlebars.registerPartial(name, block);
});

document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const path = url.pathname.slice(1) || 'login';
    navigate(path);
});

document.addEventListener('click', (e) => {
    const page = (e.target as HTMLElement).getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
