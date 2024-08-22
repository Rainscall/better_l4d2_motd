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

    (() => {
        const lang = {
            'SteamID': 'Steam ID',
            'Name': '名称',
            'Point': '积分',
            'Melee': '出门近战',
            'KillCI': '普僵击杀',
            'KillSI': '特感击杀',
            'KillTank': '坦克击杀',
            'KillWitch': '女巫击杀',
            'HeadShotCount': '爆头数',
            'FFCount': '黑枪',
            'GotFFCount': '被黑',
            'PillPass': '递药',
            'InCapCount': '倒地',
            'MissionLost': '团灭',
            'Revive': '帮助队友',
            'Protect': '保护队友',
            'CatAlarm': '打警报车',
            'Campaign': '完成战役',
            'Time': '游玩时长',
        }

        const errorCode = {
            'NOT FOUND': '用户不存在',
            'RATE LIMITED': '触发速率限制',
            'NOT ONLINE': '后端服务器不在线',
        }
        let lock = false;
        let base = document.createElement('div');
        let title = document.createElement('h3');
        let form = document.createElement('form');
        let input = document.createElement('input');
        let resultArea = document.createElement('div');
        base.classList.add('input');
        title.innerText = '查询Steam ID';
        resultArea.style.marginTop = '1rem';
        input.maxLength = '17';
        input.minLength = '17';

        input.placeholder = '00000000000000000000000';

        form.appendChild(input)
        base.appendChild(title)
        base.appendChild(form)
        base.appendChild(resultArea)
        content.appendChild(base);

        form.addEventListener('submit', async e => {
            e.preventDefault();
            console.log(input.value);
            if (lock) {
                return;
            }
            if (!/^\d{17}$/.test(input.value)) {
                resultArea.innerText = `仅支持17位纯数字的Steam ID`;
                return;
            }
            lock = true;
            input.disabled = 'disabled';
            let result = await myFetch(`${config.backend.endpoint}/getDetail/${input.value}?backend=${config.backend.id}`)
                .then(r => r.json())
                .catch(e => {
                    resultArea.innerText = `网络错误`;
                })
            console.log(result);
            if (result.status != 'SUCCESS') {
                resultArea.innerText = `错误: ${errorCode[result.status] || result.status}`;
                return;
            }
            result = result.message.data[0];

            const k = Object.keys(result);
            const v = Object.values(result);
            console.log(k);
            console.log(v);

            let ul = document.createElement('ul');
            for (let i = 0; i < k.length; i++) {
                let li = document.createElement('li');
                li.innerHTML = `<div>${lang[k[i]] || k[i]}</div><div>${v[i]}</div>`;
                ul.appendChild(li);
            }
            resultArea.innerHTML = '';
            resultArea.appendChild(ul);
            lock = false;
            input.removeAttribute('disabled');
            input.value = '';
        })
    })();

    close.classList.add('headerButtom');
    close.classList.add('icon-close');

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
        let element = document.getElementById('menuDialog');
        element.parentElement.removeChild(element);
    }

    close.addEventListener('click', closeWindow);
    base.addEventListener('click', closeWindow);
    card.addEventListener('click', e => {
        e.stopPropagation();
    })
}

menu()