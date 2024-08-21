import config from '../config';
import { resize } from '../utils';

export async function menu() {
    try {
        document.getElementById('menuDialog').remove();
    } catch (error) { }
    let base = document.createElement('div');
    let card = document.createElement('div');

    let header = document.createElement('header');
    let title = document.createElement('h2');
    let close = document.createElement('div');
    close.style.fontSize = '1rem';

    let content = document.createElement('div');

    content.innerText = '此功能正在施工.......';
    content.style.height = '8rem'

    close.classList.add('headerButtom');
    close.classList.add('icon-close');

    close.addEventListener('click', closeWindow);
    base.addEventListener('click', closeWindow);
    card.addEventListener('click', e => {
        e.stopPropagation();
    })

    title.innerText = '菜单';

    card.classList.add('card');

    base.id = 'menuDialog';
    base.classList.add('fullVh');

    header.appendChild(title);
    title.appendChild(close);

    card.appendChild(header);
    card.appendChild(content);

    base.appendChild(card);
    config.entryNode.prepend(base);
    resize();
    function closeWindow() {
        document.getElementById('menuDialog').remove();
    }
}
