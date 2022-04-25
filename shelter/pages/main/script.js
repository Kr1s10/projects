// burger

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

// carousel

const sliderWrapper = document.querySelector('.slider-wrapper');
const prevBtn = document.querySelector('.slider-btn-left');
const nextBtn = document.querySelector('.slider-btn-right');
let currWidth;
let currCards = checkCurrWidth();
let pets = [];

await getPets(pets)
showCards()

prevBtn.addEventListener('click', leftMove);
nextBtn.addEventListener('click', rightMove);
window.addEventListener('resize', () => {
    if (checkCurrWidth().length !== currCards.length) {
        currCards = checkCurrWidth();
        showCards();
    }
})

async function getPets(arr) {
    const res = await fetch('../../assets/json/pets.json');
    const data = await res.json();

    for (let pet of data) {
        arr.push(pet);
    }

    pets = shuffleCards(arr);
}

function createCard(index) {
    return `
    <div class="slider-card" data-pet="${index}">
        <img class="slider-photo" src="${pets[index].img}" alt="${pets[index].name}">
        <h3 class="slider-card-title">${pets[index].name}</h3>
        <button class="slider-card-btn">Learn more</button>
    </div>
    `
}

function showCards() {
    sliderWrapper.innerHTML = '';
    const slider = document.createElement('div');
    slider.className = 'slider-cards';

    for (let card of currCards) {
        slider.insertAdjacentHTML("beforeend", createCard(card));
    }
    sliderWrapper.append(slider);
}

function checkCurrWidth() {
    if (document.documentElement.clientWidth >= 1280) {
        currWidth = 1280;
        return [0, 1, 2, 3, 4, 5, 6, 7, 0];
    } 

    if (document.documentElement.clientWidth >= 768) {
        currWidth = 768;
        return [0, 1, 2, 3, 4, 5];
    }

    currWidth = 320;
    return [0, 1, 2];
}

function shuffleCards(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function getUniqueCards (newArr, currArr, n) {
    for (let i = 0; i < n; i++) {
        let newItem = Math.floor(Math.random() * 8);

        if (currArr.includes(newItem) || newArr.includes(newItem)) {
            i--;
        } else {
            newArr.push(newItem);
        }
    }

    return newArr;
}

function getLeftCards (currCards, newArr, n) {
    for (let i = 0; i < n; i++) {
        currCards.pop();
        currCards.unshift(newArr[i]);
    }
}

function getRightCards (currCards, newArr, n) {
    for (let i = 0; i < n; i++) {
        currCards.shift();
        currCards.push(newArr[i]);
    }
}

function caseForPrev (currArr, newArr, n) {
    currArr = currCards.slice(0,n);
    newArr = getUniqueCards(newArr, currArr, n);
    getLeftCards(currCards, newArr, n);
}

function caseForNext (currArr, newArr, n) {
    currArr = currCards.slice(n * 2);
    newArr = getUniqueCards(newArr, currArr, n);
    getRightCards(currCards, newArr, n);
}

function rightMove () {
    let slider = document.querySelector('.slider-cards');
    let currArr = [];
    let newArr = [];

    switch (currWidth) {
        case 1280:
            caseForNext (currArr, newArr, 3);
            break;
        case 768:
            caseForNext (currArr, newArr, 2);
            break;
        case 320:
            caseForNext (currArr, newArr, 1);
            break;
    }

    slider.classList.add('move-right');
    setTimeout(() => showCards(), 500);
}

function leftMove () {
    let slider = document.querySelector('.slider-cards');
    let currArr = [];
    let newArr = [];

    switch (currWidth) {
        case 1280:
            caseForPrev(currArr, newArr, 3);
            break;
        case 768:
            caseForPrev(currArr, newArr, 2);
            break;
        case 320:
            caseForPrev(currArr, newArr, 1);
            break;
    }

    slider.classList.add('move-left');
    setTimeout(() => { showCards()}, 500);
}


