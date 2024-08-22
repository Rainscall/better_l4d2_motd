import config from '../config';
import { resize } from '../utils';

export function notFound() {
    let base = document.createElement('div');
    base.innerText = '此页面不存在或正在施工，点击回到主页';
    base.style.fontSize = '2rem';
    base.classList.add('fullVh');
    base.classList.add('notFound');
    base.addEventListener('click', () => {
        location.hash = '';
    })
    config.base.appendChild(base);
    resize();
}