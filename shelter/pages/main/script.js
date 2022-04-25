const headerLogo = document.querySelector('.logo-link');
const nav = document.querySelector('.nav');
const burgerIcon = document.querySelector('.burger-icon');
const shadow = document.querySelector('.shadow');

burgerIcon.addEventListener("click", toggle);
shadow.addEventListener("click", close);
nav.addEventListener("click", (e) => {
    if (e.target.tagName === 'A' || e.target.closest('.logo-nav')) close();
})

function toggle () {
    document.body.classList.toggle('lock');
    headerLogo.classList.toggle('open');
    shadow.classList.toggle('open');
    burgerIcon.classList.toggle('open');
    nav.classList.toggle('open');
}

function close () {
    document.body.classList.remove('lock');
    headerLogo.classList.remove('open');
    shadow.classList.remove('open');
    burgerIcon.classList.remove('open');
    nav.classList.remove('open');
}