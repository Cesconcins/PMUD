let firstCard = null;
let secondCard = null;
let lockBoard = false;

function init() {
    let n = 16;
    let cardNumbers = new Array(n).fill(0).map((e, i) => Math.floor(i/2) + 1).sort(() => Math.random() - 0.5);
    
    let images = document.querySelectorAll('.memory-board .card img');
    
    images.forEach((img, index) => {
        let cardNum = cardNumbers[index];
        img.src = `img${cardNum}.svg`;
        img.classList.add('hidden');
    });
}

function revealCard(cardElement) {
    if (lockBoard) return;
    
    let imgElement = cardElement.querySelector('img');
    
    if (imgElement.classList.contains('hidden')) {
        imgElement.classList.remove('hidden');
        
        if (!firstCard) {
            firstCard = imgElement;
        } else if (!secondCard && imgElement !== firstCard) {
            secondCard = imgElement;
            checkForMatch();
        }
    }
}

function checkForMatch() {
    if (firstCard.src === secondCard.src) {
        resetCards();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            resetCards();
        }, 500);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}