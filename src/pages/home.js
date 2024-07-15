import config from '../config';

export async function home() {
    config.base.innerHTML = '';
    let card = document.createElement('div');
    let subtitle = document.createElement('h2');
    let title = document.createElement('h2');
    let text = document.createElement('div');
    let img = document.createElement('img');

    card.id = 'card';
    card.classList.add('shadowBorder');

    title.innerText = '欢迎来到少女波子汽水';
    title.classList.add('title');

    subtitle.innerText = '服务器所属的steam组: Imaginari';
    subtitle.classList.add('subtitle');

    text.innerHTML = `
    <a href='https://steamcommunity.com/groups/imaginari'>steam组链接</a><br />
    <a href='http://111.180.189.36:88/maplist.html' class='upRight'>三方图支持列表</a><br />
    欢迎来Hatsune的猪圈群开黑:Q群723617400<br />
    `
    text.classList.add('text');

    img.src = require('../img/QRcode.jpg');
    img.style.maxWidth = '50%';

    text.appendChild(img);

    card.appendChild(title);
    card.appendChild(subtitle);
    card.appendChild(text);
    config.base.appendChild(card);
}