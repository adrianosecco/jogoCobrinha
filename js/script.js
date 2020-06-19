let canvas = document.getElementById("snake");
//Context renderiza o desenho que irá ocorrer dentro do canvas, colocando o 2d passa a tratar o arquivo como plano 2d
let context = canvas.getContext("2d");
let box = 32;
let snake = []; //Array para criar a cobrinha. A ideia é remover o último quadradinho e inserir no começo, para que a cobrinha ande.
snake[0] = { //Desenhando a cobrinha
    x: 8 * box,
    y: 8 * box
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); // desenha a caixa onde vamos trabalhar o jogo. tamanho de 16 quadradinhos multipiclado pela box
}

function criarCobrinha() {
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box); // Tamanho de X e Y é o tamanho definido no array e o tamanho do box que será o tamanho do quadradinho
    }
}

criarBG();
criarCobrinha();