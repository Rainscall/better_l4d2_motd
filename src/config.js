import * as utils from './utils'

const base = document.createElement('div');
const config = {
    entryNode: document.body,
    base: base,
    backend: {
        endpoint: 'https://motd.kitaserver.site/backend',
        id: 0,
    },
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