import config from '../config';

export async function host() {
    let container = document.createElement('div');

    container.classList.add('fullVh');
    container.classList.add('host');

    config.base.appendChild(container);
}