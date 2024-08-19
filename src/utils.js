export function resize() {
    const element = document.getElementsByClassName('fullVh');
    for (let i = 0; i < element.length; i++) {
        element[i].style.minHeight = `${window.innerHeight}px`;
    }
}