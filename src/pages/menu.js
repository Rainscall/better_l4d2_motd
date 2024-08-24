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

    let start;
    try {
        start = performance.now();
    } catch (error) {
        start = Date.now(); //傻逼chrome18，raf的参数和现在的不一样，polyfill也不能用
    }
    const duration = 235; // ms

    // 缓动函数：先加速后减速
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 初始位置（左下角）
    const startX = 0;
    const startY = viewportHeight - card.offsetHeight;

    // 目标位置（正中间）
    const endX = (viewportWidth - card.offsetWidth) / 2;
    const endY = (viewportHeight - card.offsetHeight) / 2;

    function animate(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutQuad(progress);

        const currentX = startX + (endX - startX) * easedProgress;
        const currentY = startY + (endY - startY) * easedProgress;

        card.style.left = `${currentX}px`;
        card.style.top = `${currentY}px`;
        card.style.opacity = easedProgress;
        card.style.position = 'absolute';

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            card.style.left = ``;
            card.style.top = ``;
            card.style.opacity = '1';
            card.style.position = '';
            //chrome18似乎没有办法删掉属性

            card.removeAttribute('style');
        }
    }

    requestAnimationFrame(animate);
}