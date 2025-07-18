import config from '../config';
import { menu } from './menu';
import { formatNumber, myFetch, resize } from '../utils';

export async function list() {
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

    title.innerText = '排行榜 Lite';
    title.classList.add('title');

    subtitle.innerText = '完整版：https://www.kitasoda.com/#/list';
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

    content.addEventListener('mousewheel', e => {
        e.preventDefault();
        const stepLength = 50;
        let offset = (e.wheelDelta > 0 ? -1 : 1) * stepLength;
        let x = e.wheelDeltaX != 0;

        if (x) {
            content.scrollLeft += offset;
        } else {
            content.scrollTop += offset;
        }

        console.log(offset);
    })

    let r = await myFetch(`${config.backend.endpoint}/list?backend=${config.backend.id}`, {
        method: 'POST',
        body: JSON.stringify({
            "page": 0,
            "orderBy": "KillCI",
            "seq": "desc"
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(r => r.json())
        .catch(e => {
            console.error(e);
            content.innerHTML = '网络错误';
        })

    r = r.message.data;

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let fields = [
        '序号',
        '名称',
        '普感击杀',
        '特感击杀',
        '坦克击杀',
        '妹子击杀',
        '黑枪',
        '被黑',
        '爆头数',
        'Steam ID',
        '游戏时长',
    ];

    fields.forEach(e => {
        let th = document.createElement('th');
        th.innerText = e;
        thead.appendChild(th);
    })
    table.appendChild(thead);

    let n = 1;
    r.forEach((e, i) => {
        let tr = document.createElement('tr');
        let data = {
            n: n++,
            name: e.Name,
            ci: e.KillCI,
            si: e.KillSI,
            tank: e.KillTank,
            witch: e.KillWitch,
            ff: e.FFCount,
            ffGot: e.GotFFCount,
            headShot: e.HeadShotCount,
            id: e.SteamID,
            time: e.Time,
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