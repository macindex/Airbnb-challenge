const apiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";



const cardsConteudo = document.querySelector("#cards");

let data = [];



async function buscarCards() {
  let resposta = await fetch(apiUrl);

  const dataResposta = await resposta.json();

  return dataResposta;
}



function gerarCards(cards) {
  cardsConteudo.innerHTML = "";
  cards.map(renderCard);
}



function renderCard(card) {
  var div = document.createElement("div");
  div.className = "item";

  var cardImage = document.createElement("img");
  cardImage.className = "card-image";
  cardImage.src = card.photo;

  var propriedadeTipo = document.createElement("p");
  propriedadeTipo.className = "card-type";
  propriedadeTipo.innerHTML = card.property_type;

  var firstP = document.createElement("p");
  firstP.innerHTML = card.name;

  var secondP = document.createElement("p");
  secondP.innerHTML = `Valor por noite: <b class="card-price">R$${card.price},00</b>`;

  div.appendChild(cardImage);
  div.appendChild(propriedadeTipo);
  div.appendChild(firstP);
  div.appendChild(secondP);

  cardsConteudo.appendChild(div);
}



async function main() {
  data = await buscarCards();

  if (data[0]) {
    gerarCards(data);
  }
}

main();


function ordernarCrescente() {
  data.sort(function (a, b) {
    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
  });

  gerarCards(data);
}

function ordernarDecrescente() {
  data.sort(function (a, b) {
    return a.name < b.name ? 1 : b.name < a.name ? -1 : 0;
  });

  gerarCards(data);
}

function ordernarMenorPreco() {
  data.sort(function (a, b) {
    return a.price > b.price ? 1 : b.price > a.price ? -1 : 0;
  });

  gerarCards(data);
}

function ordernarMaiorPreco() {
  data.sort(function (a, b) {
    return a.price < b.price ? 1 : b.price < a.price ? -1 : 0;
  });

  gerarCards(data);
}


function handleSearch() {
  
  let valueInput = document.querySelector("#searchInput").value.toUpperCase();
  
  const filteredResults = data.filter((places) => {
  
    const placesToSearchByName = places.name.toUpperCase();
  
    if (placesToSearchByName.search(valueInput) > -1) {
  
      return places;
    }
  });
  
  gerarCards(filteredResults);
}
