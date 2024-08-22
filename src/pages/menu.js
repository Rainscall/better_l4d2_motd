import config from '../config';
import { myFetch, resize } from '../utils';

export async function menu() {
    if (document.getElementById('menuDialog')) {
        closeWindow();
    }

    let base = document.createElement('div');
    let card = document.createElement('div');

    let header = document.createElement('header');
    let title = document.createElement('h2');
    let close = document.createElement('div');
    close.style.fontSize = '1rem';

    let content = document.createElement('div');

    let list = [
        {
            'name': '主页',
            'path': '/',
        },
        {
            'name': '排行榜 Lite',
            'path': '/list',
        },
        {
            'name': '服务器列表 Lite',
            'path': '/servers',
        },
    ]

    let ul = document.createElement('ul');
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        let li = document.createElement('li');
        li.innerHTML = `<div>${item.name}</div><div>${item.path.replace('/', '')}</div>`;

        li.addEventListener('click', () => {
            location.hash = `${item.path}`;
            closeWindow();
        })

        ul.appendChild(li);
    }

    close.classList.add('headerButtom');
    close.classList.add('icon-close');

    title.innerText = '菜单';

    card.classList.add('card');

    base.id = 'menuDialog';
    base.classList.add('fullVh');

    content.appendChild(ul);

    header.appendChild(title);
    title.appendChild(close);

    card.appendChild(header);
    card.appendChild(content);

    base.appendChild(card);
    config.entryNode.prepend(base);
    resize();

    function closeWindow() {
        let element = document.getElementById('menuDialog');
        element.parentElement.removeChild(element);
    }

    close.addEventListener('click', closeWindow);
    base.addEventListener('click', closeWindow);
    card.addEventListener('click', e => {
        e.stopPropagation();
    })
}