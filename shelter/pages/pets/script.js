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

// pagination 

const pagination = document.querySelector('.pagination');
const allCards = document.querySelector('.pets-cards');
const numberOfPage = document.querySelector('[data-btn="number"]');
const firstBtn = document.querySelector('[data-btn="first"]');
const prevBtn = document.querySelector('[data-btn="prev"]');
const nextBtn = document.querySelector('[data-btn="next"]');
const lastBtn = document.querySelector('[data-btn="last"]');

let currWidth = 1280;
let numberOfCards = checkCurrWidth();
let currPage = 1;
let contentOfPages = [];
let pets = [];
let startPets = [];
    
await preloadPets(startPets);
createCommonArr();
showCards(numberOfCards, currPage);

window.addEventListener('resize', () => {
    if (checkCurrWidth() !== numberOfCards) {
        numberOfCards = checkCurrWidth();
        showCards(numberOfCards, currPage);
    }
})

pagination.addEventListener('click', e => {
    if (e.target.disabled) return;
    switch (e.target.dataset.btn) {
        case 'first':
            currPage = 1;
            break; 
        case 'prev':
            currPage--;
            break;
        case 'next':
            currPage++;
            break;
        case 'last':
            currPage = 48 / numberOfCards;
            break;
    }

    numberOfPage.textContent = currPage;
    checkDisabledBtn();
    showCards(numberOfCards, currPage);
})

async function preloadPets(arr) {
    const res = await fetch('../../assets/json/pets.json');
    const data = await res.json();

    for (let pet of data) {
        arr.push(pet);
    }

    pets = shuffleCards(arr);
}

function checkDisabledBtn () {
    if (currPage === 1) {
        firstBtn.disabled = true;
        prevBtn.disabled = true;
        nextBtn.disabled = false;
        lastBtn.disabled = false;
    }else if (currPage === 48 / numberOfCards) {
        firstBtn.disabled = false;
        prevBtn.disabled = false;
        nextBtn.disabled = true;
        lastBtn.disabled = true;
    } else {
        firstBtn.disabled = false;
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        lastBtn.disabled = false;
    }
}

function createCard(index) {
    return `
    <div class="pet-card" data-pet="${index}">
        <img class="pet-photo" src="${pets[index].img}" alt="${pets[index].name}">
        <h3 class="pet-card-title">${pets[index].name}</h3>
        <button class="pet-card-btn" data-btn="${index}">Learn more</button>
    </div>
    `
}

function showCards(n, currPage) {
    allCards.innerHTML = '';
    for (let i = 0; i < n; i++) {
        allCards.insertAdjacentHTML("beforeend", createCard(contentOfPages[numberOfCards*(currPage-1)+i]));
    }
}

function checkCurrWidth() {
    if (document.documentElement.clientWidth >= 1280) return 8;
    if (document.documentElement.clientWidth >= 768) return 6;

    return 3;
}

function shuffleCards(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function createOnePage() {
    let firstPart = [0, 1, 2, 3];
    let secondPart = [4, 5, 6, 7];
    const onePageArr = [];

    onePageArr.push(shuffleCards(firstPart));
    onePageArr.push(shuffleCards(secondPart));

    return onePageArr.flat();
}

function createCommonArr() {
    const commonArr = [];
    for (let i = 0; i < 6; i++) {
        commonArr.push(createOnePage());
    }
    contentOfPages = commonArr.flat();
}

