/*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

/*----- app's state (variables) -----*/

let board;
let turn = 'X';
let win;

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('#board div'));

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);


/*----- functions -----*/

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });
        return winner ? winner : board.includes('') ? null : 'T';
};

function handleTurn() {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    render();
};
function init() {
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    render();
    //Appel fonction
    resetBackground();
};

function render() {
    board.forEach(function(mark, index) {
    //this moves the value of the board item into the squares[idx]
    squares[index].textContent = mark;
    //Pour chaque case, on enleve la classe checked
    squares[index].classList.remove("checked");
    //Si la case est n'est pas vide
    if(mark !== "")
    {
        //On ajoute la classe checked
        squares[index].classList.add("checked")
    }
    });
    messages.textContent = win === 'T' ? `Partie nulle!` : win ? `${win} a gagné le jeu!` : `C'est le tour de ${turn}!`;
    //Appel fonction
    changerBackground();
    };
init();
//Fonction qui change le fond de la page
function changerBackground()
{
    //Quand win = tie/egalite
    if(win === "T")
    {
        //Change couleur du document
      document.body.style.backgroundColor = "red";
    }
}
//Fonction qui fait un retour au depart
function resetBackground()
{
    //Change la couleur pour celle du depart
    document.body.style.backgroundColor = "";
}
//Ajouter un eventlistener pour que lorque le bouton est appuyer, le init est appeler
document.getElementById("reset-button").addEventListener("click", function()
{
    //Init contient resetBackground
    init();
})
//*Modifications: Dans render, init et les fonctions "changerBackground"
//"resetBackground"