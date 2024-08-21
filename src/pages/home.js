import config from '../config';
import { menu } from './menu';
import { formatNumber, myFetch } from '../utils';

export async function home() {
    let container = document.createElement('div');
    let card = document.createElement('div');
    let subtitle = document.createElement('h2');
    let title = document.createElement('h2');
    let text = document.createElement('div');
    let img = document.createElement('img');
    let header = document.createElement('header');
    let menuIcon = document.createElement('div');

    menuIcon.classList.add('headerButtom');
    menuIcon.classList.add('icon-menu');

    menuIcon.addEventListener('click', menu);

    container.classList.add('fullVh');
    container.classList.add('cardContainer');
    card.id = 'card';
    card.classList.add('shadowBorder');

    title.innerText = '欢迎来到少女波子汽水';
    title.classList.add('title');

    subtitle.innerText = 'Steam组: Imaginari';
    subtitle.classList.add('subtitle');

    text.innerHTML = `
    <a href='https://steamcommunity.com/groups/imaginari'>steam组链接</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href='http://111.180.189.36:88/maplist.html' class='upRight'>三方图支持列表</a><br />
    欢迎来Hatsune的Q群开黑: 723617400<br />
    `
    text.classList.add('text');

    img.src = require('../img/QRcode.jpg');
    img.style.maxWidth = '50%';

    header.appendChild(title);
    header.appendChild(subtitle);
    header.appendChild(menuIcon);
    card.appendChild(header);
    card.appendChild(text);
    card.appendChild(img);
    container.appendChild(card)
    config.base.appendChild(container);

    img.addEventListener('load', () => {
        let t = null;
        resizer();
        window.addEventListener('resize', () => {
            if (t !== null) {
                clearTimeout(t);
            }
            t = setTimeout(resizer, 150);
        });
        function resizer() {
            if (card.clientHeight + card.offsetTop + document.body.clientWidth * 0.3 > document.body.clientWidth) {
                card.style.removeProperty('marginLeft');
                card.style.margin = '1rem';
                return;
            }
            card.style.removeProperty('margin');
            if (card.offsetTop < 16) {
                card.style.margin = `1rem`;
            } else {
                card.style.marginLeft = `${card.offsetTop}px`;
            }
        }
    })

    myFetch(`${config.backend.endpoint}/getTotalZombieKill?backend=${config.backend.id}`)
        .then(r => r.json())
        .then(r => {
            if (r.status != 'SUCCESS') {
                return;
            }
            text.innerHTML += `击杀总数：${formatNumber(r.message.data)}`;
        })
        .catch(e => {
            console.error(e);
        })
}