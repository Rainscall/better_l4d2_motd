import * as utils from './utils'

const base = document.createElement('div');
const config = {
    entryNode: document.body,
    base: base,
}

const entryNode = config.entryNode;
base.id = 'base';
base.classList.add('fullVh');

entryNode.appendChild(base);

utils.resize();
window.addEventListener('resize', e => {
    utils.resize();
});

export default config;