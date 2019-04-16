const cardBoard = document.querySelector("#cardboard");
const imgs = [
  "Card 1.png",
  "Card 2.png",
  "Card 3.png",
  "Card 4.png",
  "Card 5.png",
  "Card 6.png"
];

let cardHTML = "";
let pontos = 0;

imgs.forEach(img => {
  cardHTML += `<div class="memory-card" data-card="${img}">
    <img class="front-face" src="img/${img}"/>
    <img class="back-face" src="img/carta.png">
  </div>`;
});

cardBoard.innerHTML = cardHTML + cardHTML;

/** Fim da Renderização HTML */


const cards = document.querySelectorAll(".memory-card");
let firstCard, secondCard;
let lockCards = false;

function flipCard() {



  if (lockCards) return false;
  $('#myModal').modal('show');
  let form = document.querySelector('#questao');
  let botao = document.querySelector('#submit');


  botao.addEventListener('click', function (e) {
    botao.removeEventListener('click', flipCard);
    let resposta = "D";
    if (form.questao1.value === resposta) {


      this.classList.add('flip');
      if (!firstCard) {
        firstCard = this;

        return false;
      }

      secondCard = this;
      checkForMatch();

    } else {
      alert("Resposta Incorreta");

    }
  })




}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  !isMatch ? unFlipCards() : resetCards(isMatch);
  if (!isMatch) {
    pontos++;
  }
}

(function aleatorio() {
  cards.forEach(card => {
    var rand = Math.floor(Math.random() * 12);
    card.style.order = rand;
  });
})();

function unFlipCards() {
  lockCards = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetCards();
  }, 1000);
}

function resetCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }

  [firstCard, secondCard, lockCards] = [null, null, false];
}

cards.forEach(card => card.addEventListener("click", flipCard));

function pergunta() {
  $('#myModal').modal('show');
  let form = document.querySelector('#questao');
  const botao = document.querySelector('#submit');

  botao.addEventListener('click', function (e) {

    let resposta = "D";


    if (form.questao1.value === resposta) {
      alert("Resposta correta");
      botao.removeEventListener("click", flipCard);
      flipCard();

    } else {
      alert("Resposta Incorreta");
      botao.removeEventListener("click", flipCard);
    }

  })








}
