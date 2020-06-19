let canvas = document.getElementById("snake");
//Context renderiza o desenho que irá ocorrer dentro do canvas, colocando o 2d passa a tratar o arquivo como plano 2d
let context = canvas.getContext("2d");
let box = 32;
let snake = []; //Array para criar a cobrinha. A ideia é remover o último quadradinho e inserir no começo, para que a cobrinha ande.
snake[0] = { //Desenhando a cobrinha
    x: 8 * box,
    y: 8 * box
}
let direction = "right";

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

function iniciarJogo() { //As funções foram passadas dentro de uma função, para que sejam carregadas corretamente e seu intervalo seja o correto, conforme definido na função iniciarJogo()
    criarBG();
    criarCobrinha();

    let snakeX = snake[0].x;     //A cobrinha começa na poosição 0 de X e Y, utilizando o array snake criado no início do documento, como váriavel do tipo array global.
    let snakeY = snake[0].y;

    //Coordenadas
    if(direction == "right") snakeX += box; //Condição para que se a cobrinha estiver indo para a direita, será acrescentado um quadradinho na posição de snakeX
    if(direction == "left") snakeX -= box; //Plano cartesiano, acrescenda na direita e tira da esquerda, assim cria a impressão de que a cobrinha está indo para a direita
    if(direction == "up") snakeX -= box;
    if(direction == "down") snakeX += box;

    snake.pop(); //Remove o último elemento do Array, dando a impressão de que foi comido oO

    // Criando uma nova cabeça
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //Acrescenta uma nova cabeça no primeiro elemento, utilizando o método unshift
}

let jogo = setInterval(iniciarJogo, 100); //Função para que seja iniciado o jogo após MS. A cada 100 MS será atualizado o desenrolar do jogo, dando continuidade e evitando travar o jogo

