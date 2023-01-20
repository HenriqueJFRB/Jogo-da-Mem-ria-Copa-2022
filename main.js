var imagesFolder = "images"
var imageExtension = ".PNG"
var images = [
    "neymar",
    "messi",
    "alba",
    "arrascaeta",
    "cristiano",
    "debruyne",
    "kane",
    "lewandowski",
    "mbappe",
    "vandijk"
]

var numberOfCards = 10

if (numberOfCards > images.length) {
    alert("o número de cartões selecionados é maior do que o número de imagens salvas")
} else {
    images = images.slice(0, numberOfCards)
}

//cria ou gera do vetor de imagem
var imagesCopy = images.slice(0)

//agrupa todas as imagens(originais e cópias)
var allImage = images.concat(imagesCopy)

//vamos criar um vetor para armazenar as cartas viradas na rodada
var activeCards = []

//iremos criar uma variável que irá marcar o tempo de início de jogo
var startTime

//vamos embaralhar as cartas
allImage = shuffle(allImage)

var cardBox = document.getElementById("cardBox")

//percorre o array de imagens para inserir as cartas uma a uma
for (let i = 0; i < allImage.length; i++) {
    //iremos criar uma tag html div e iremos inseri-la na variavel card
    let card = document.createElement("div")

    //iremos adicionar uma classe a esse elemento criado
    card.className = "card"

    //iremos criar uma tag html div eremos inseri-la na cardBack
    let cardBack = document.createElement("div")
    // Adiciona as classes cardBack e show
    cardBack.className = "cardBack show"
    //iremos adicionar um id para div
    cardBack.id = "cardBack-" + i

    // Cria uma tag html img e insere na variável cardFront
    let cardFront = document.createElement("img")
    // Adiciona as classes cardFront e hidden
    cardFront.className = "cardFront hidden"
    // Adiciona um id para img no formato cardFront-i-nome, exemplo: cardFront-0-neymar
    cardFront.id = "cardFront-" + i + "-" + allImage[i]
    // Insere o atributo src da imagem, exemplo: image/neymar/.PNG
    cardFront.src = imagesFolder + "/" + allImage[i] + imageExtension

    cardBack.onclick = function () {
        //Inicia a contagem do tempo
        if (startTime === undefined) {
            startTime = new Date()
        }

        activeCards.push(cardFront)

        //regra 2: devemos permitir no máximo 2 cartas por rodada
        if (activeCards.length <= 2) {
            flipCard(cardBack, cardFront)
        }

        //Só faz sentido verificar se as cartas combinam se tiverem 2 ativas
        if (activeCards.length === 2) {
            //iremos chamar a função isMatch para avaliar se as cartas são iguais
            if (isMatch(activeCards[0], activeCards[1])) {
                activeCards[0].classList.add("match")
                activeCards[1].classList.add("match")
                activeCards = []
                if(isEndOfGame()){
                    setTimeout(function(){
                        let totalTime=Math.round((new Date()-startTime)/1000)
                        alert("Fim de jogo TENDEU?! seu tempo foi de "+totalTime+"segundos.\nPressione F5 pra jogar denovo")    
                    },500)
                }
            }else{
                hideCardsAfterDelay();
            }
        }
    }

    // Adiciona cardBack e cardFront dentro da div card que criamos anteriormente
    card.appendChild(cardBack);
    card.appendChild(cardFront);


    // Adiciona a div card dentro da nossa caixa de cartas
    cardBox.appendChild(card);
}

// Função responsável por virar a carta
function flipCard(card1, card2) {
    card1.classList.remove("show")
    card1.classList.add("hidden")
    
    card2.classList.remove("hidden")
    card2.classList.add("show")
}

// Função responsável por embaralhar um array
function shuffle(array) {
    return array.sort(function (a, b) {
        return (Math.random() * 2 - 1);
    });
}

function isMatch(card1,card2){
    if(card1.id.split("-")[2]===card2.id.split("-")[2]){
        return true
    }else{
        return false
    }
} 
function hideCardsAfterDelay(){
    setTimeout(function(){
        let idCard0=activeCards[0].id.split("-")[1]
        let idCard1=activeCards[1].id.split("-")[1]
        let cardBack0=document.getElementById("cardBack-"+idCard0)
        let cardBack1=document.getElementById("cardBack-"+idCard1)
        flipCard(activeCards[0],cardBack0)
        flipCard(activeCards[1],cardBack1)
        activeCards=[]
    },2000)
}
function isEndOfGame(){
    let matchedCards = document.getElementsByClassName("match");
    if(matchedCards.length===allImageslength){
        return true
    } else{
        return false
    }
}