const base = document.createElement('div');
const config = {
    entryNode: document.body,
    base: base,
}

const entryNode = config.entryNode;
base.id = 'base';

entryNode.appendChild(base);

export default config;