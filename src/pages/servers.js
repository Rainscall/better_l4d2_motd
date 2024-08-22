import config from '../config';
import { menu } from './menu';
import { formatNumber, myFetch, resize } from '../utils';

export async function servers() {
    let container = document.createElement('div');
    let card = document.createElement('div');
    let subtitle = document.createElement('h2');
    let title = document.createElement('h2');
    let content = document.createElement('div');
    let header = document.createElement('header');
    let menuIcon = document.createElement('div');

    menuIcon.classList.add('headerButtom');
    menuIcon.classList.add('icon-menu');

    menuIcon.addEventListener('click', menu);

    container.classList.add('fullVh');
    container.classList.add('cardContainer');
    container.classList.add('boxCenter');
    card.id = 'card';
    card.classList.add('shadowBorder');
    card.style.maxWidth = '90%';

    title.innerText = '服务器列表 Lite';
    title.classList.add('title');

    subtitle.innerText = '完整版：https://list.kitaserver.site/#/0/serverList';
    subtitle.classList.add('subtitle');

    content.classList.add('text');
    content.classList.add('tableContainer');
    content.classList.add('fullVhMax');
    content.dataset.vhMax = '70';

    header.appendChild(title);
    header.appendChild(subtitle);
    header.appendChild(menuIcon);
    card.appendChild(header);
    card.appendChild(content);
    container.appendChild(card)
    config.base.appendChild(container);

    let r = await myFetch(`${config.backend.endpoint}/getServerDetailAll?backend=${config.backend.id}`)
        .then(r => r.json())
        .catch(e => {
            console.error(e);
            content.innerHTML = '网络错误';
        })

    console.log(r);
    r = r.message;

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let fields = [
        '名称',
        '地址',
        '人数',
        '地图',
        '难度',
    ];

    fields.forEach(e => {
        let th = document.createElement('th');
        th.innerText = e;
        thead.appendChild(th);
    })
    table.appendChild(thead);

    r.forEach((e, i) => {
        let tr = document.createElement('tr');
        if (e.status != 'SUCCESS') {
            return;
        }
        let data = {
            name: e.name,
            address: e.address,
            players: `${e.numPlayers}/${e.maxPlayers}`,
            map: e.map,
            difficulty: e.difficulty,
        }

        for (let i = 0; i < fields.length; i++) {
            const element = Object.values(data)[i];
            let td = document.createElement('td');
            td.innerText = element;
            tr.appendChild(td);
        }

        if (i % 2 == 1) {
            tr.classList.add('odd');
        }

        tbody.appendChild(tr);
    })

    table.appendChild(tbody);
    content.appendChild(table);
    resize();
}