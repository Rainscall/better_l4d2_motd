const base = document.createElement('div');
const config = {
    entryNode: document.body,
    base: base,
}

const entryNode = config.entryNode;
base.id = 'base';

entryNode.appendChild(base);

base.style.minHeight = `${window.innerHeight}px`
window.addEventListener('resize', e => {
    base.style.minHeight = `${window.innerHeight}px`
});

export default config;