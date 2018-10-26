const HEADER = document.getElementById('header');
document.addEventListener('scroll', (e) => {
    const height = 300;
    if (window.scrollY <= height) {
        const deg = 360 * (window.scrollY / height);
        const mt = height - 40;
        const top = mt * (window.scrollY / height);
        const size = 1 - 0.5 * (window.scrollY / height);
        HEADER.style.position = 'relative';
        HEADER.style.top = '-8px';
        HEADER.style.left = '-8px';
        HEADER.style.transform = ' scale('+size+')';
        HEADER.style.marginTop = (top) + 'px';
    } else if (window.scrollY >= 323) {
        HEADER.style.position = 'fixed';
        HEADER.style.left = '50%';
        HEADER.style.marginTop = '0';
        HEADER.style.margin = '';
        HEADER.style.transform = 'translateX(-50%) scale(0.5)';
        HEADER.style.top = '-75px';
    }

});