var cardList = [
    "A_card",
    "2_card",
    "3_card",
    "4_card",
    "5_card",
    "6_card",
    "7_card",
    "J_card",
    "Q_card",
    "K_card"
]

var cardSet;
var board = [];
var rows = 4;
var columns = 5;

var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); // Two of each card
    console.log("Before shuffle:", cardSet);

    // Fisher-Yates Shuffle
    for (let i = cardSet.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Random index between 0 and i
        [cardSet[i], cardSet[j]] = [cardSet[j], cardSet[i]]; // Swap with destructuring
    }

    console.log("After shuffle:", cardSet);
}

function startGame() {
    //arrange the board 4x5
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); 

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "images/" + cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);

        }
        board.push(row);
    }

    console.log(board);
    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "images/back.jpg";
        }
    }
}

function selectCard() {

    if (this.src.endsWith("back.jpg")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); 
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = "images/" + board[r][c] + ".jpg";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); 
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = "images/" + board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }

}

function update() {
    //if cards aren't the same, flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "images/back.jpg";
        card2Selected.src = "images/back.jpg"; 
    }

    card1Selected = null;
    card2Selected = null;
}