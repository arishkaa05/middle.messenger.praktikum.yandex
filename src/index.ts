import navigate from './modules/navigate';

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
