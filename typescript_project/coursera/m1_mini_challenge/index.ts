/// Number Types mini-challenge
/// Write a function that will only accept numbers and attend to 
/// all TypeScript weakness flags.

/// String Types mini-challenge
/// Write a function that will display the most recent reviewers name next to the review total,
/// making sure to assign a type to the parameter, to prevent unwanted behaviour.

const reviewTotalDisplay = document.querySelector('#reviews')

const reviews = [
    {
        name: 'Sheia',
        stars: 5,
        loyaltyUser: true,
        date: '01-04-2021'
    },
    {
        name: 'Andrzej',
        stars: 3,
        loyaltyUser: false,
        date: '28-03-2021'
    },
    {
        name: 'Omar',
        stars: 4,
        loyaltyUser: true,
        date: '27-03-2021'
    },
]

// Solution 1 displays the length in the display
function number_of_reviews(num: number){
    return num
}

console.log(number_of_reviews(reviews.length))


// Solution 2 displays the length inside the web 
function showReviewTotal (value1 : number, value2 : string, isLoyalty : boolean) {
    const iconDisplay = isLoyalty ? ' ⭐' : ''
    reviewTotalDisplay.innerHTML = 'review total: ' + value1.toString() + 'last reviewer name: ' + value2 + iconDisplay
}

function getLastReviewer(){
    let lastReviewer = reviews[0]
    for(let i = 1; i < reviews.length; i++){
        if (reviews[i].date > lastReviewer.date)
            lastReviewer = reviews[i]
    }
    return lastReviewer
}

showReviewTotal(reviews.length, getLastReviewer().name, getLastReviewer().loyaltyUser)


/// Mini-challenge fixing the website

const you = {
    userName: {firstName: 'Bobby', lastName: 'Brown'},
    isReturning: true,
}

function populateUser(isReturning : boolean, userName : string ) {
    if (isReturning){
        returningUserDisplay.innerHTML = 'back'
    }
    userNameDisplay.innerHTML = userName
}

populateUser(you.isReturning, you.userName.firstName)