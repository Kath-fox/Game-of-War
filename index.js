let deckId
const newDeck = document.getElementById("new-deck")
const drawCards = document.getElementById("draw-cards")
const cardsContainer = document.getElementById("cards")
const winnerStatement = document.getElementById("winner-statement")
let card1Score = 0
let card2Score = 0

async function handleClick() {
    const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()
    deckId = data.deck_id
    document.getElementById("remaining-cards").innerText = `Remaining cards: ${data.remaining}`
}

newDeck.addEventListener("click", handleClick)

drawCards.addEventListener("click", async() => {
    const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    cardsContainer.children[0].innerHTML = `
    <img src=${data.cards[0].image} class="card-img" />
    `
    cardsContainer.children[1].innerHTML = `
    <img src=${data.cards[1].image} class="card-img" />
    `
    winnerStatement.innerText = `
    ${findWinner(data.cards[0], data.cards[1])}
    `
    document.getElementById("remaining-cards").innerText = `Remaining cards: ${data.remaining}`

    document.getElementById("player-1-score").innerText = `Computer: ${card1Score}`
    document.getElementById("player-2-score").innerText = `Me: ${card2Score}`            

    if(data.remaining === 0) {
        drawCards.disabled = true;
        displayFinalWinner()
    }
})

function displayFinalWinner() {
    if(card1Score > card2Score) {
        winnerStatement.innerText = "Computer wins the game!"
    } else if(card2Score > card1Score) {
        winnerStatement.innerText = "You win the game!"
    } else {
        winnerStatement.innerText = "It's a draw!"
    }
}


function findWinner(card1, card2) {
    let winner = ""
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1Index = valueOptions.indexOf(card1.value)
    const card2Index = valueOptions.indexOf(card2.value)
    if(card1Index > card2Index) {
        card1Score ++
        winner = "Computer wins!"
    } else if(card2Index > card1Index) {
        card2Score ++
        winner = "You win!"
    } else {
        winner = "War!"
    }
    return winner
}