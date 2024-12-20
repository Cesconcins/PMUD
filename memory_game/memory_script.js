let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
let totalPairs = 0;
let moves = 0;
let timer;
let seconds = 0;
let minutes = 0;

$(document).ready(function() {
    $('#card-count').on('change', init);
    init();
});

function init() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchesFound = 0;
    moves = 0;
    seconds = 0;
    minutes = 0;

    $('#moves-counter').text(moves);
    $('#timer').text('00:00');

    clearInterval(timer);
    startTimer();

    let n = parseInt($('#card-count').val());
    totalPairs = n / 2;

    let $board = $('.memory-board');
    $board.empty();

    let cardImages = [];
    for (let i = 1; i <= totalPairs; i++) {
        cardImages.push(i);
        cardImages.push(i);
    }
    cardImages.sort(() => Math.random() - 0.5);

    cardImages.forEach((cardNum) => {
        let $card = $('<div>').addClass('card').on('click', function() {
            revealCard($(this));
        });

        let $img = $('<img>').addClass('hidden').attr('src', `img${cardNum}.svg`).attr('alt', `Card ${cardNum}`);
        $card.append($img);
        $board.append($card);
    });
}

function startTimer() {
    timer = setInterval(function() {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        $('#timer').text(formattedTime);
    }, 1000);
}

function revealCard($cardElement) {
    if (lockBoard) return;

    let $imgElement = $cardElement.find('img');
    if ($imgElement.hasClass('hidden')) {
        $imgElement.removeClass('hidden');

        if (!firstCard) {
            firstCard = $imgElement;
        } else if (!secondCard && !$imgElement.is(firstCard)) {
            secondCard = $imgElement;
            moves++;
            $('#moves-counter').text(moves);
            checkForMatch();
        }
    }
}

function checkForMatch() {
    if (firstCard.attr('src') === secondCard.attr('src')) {
        firstCard.parent().addClass('matched');
        secondCard.parent().addClass('matched');
        resetCards();
        matchesFound++;
        if (matchesFound === totalPairs) {
            clearInterval(timer);
            setTimeout(() => alert('Has guanyat!!'), 500);
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.addClass('hidden');
            secondCard.addClass('hidden');
            resetCards();
        }, 500);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}
