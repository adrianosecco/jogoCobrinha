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

//o Math.floor remove a parte flutuante do Math.random (remove 0.). O Math.random retorna sempre um número aleatório até 1
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,    
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Função do background, quadro de fundo do jogo onde a cobrinha irá poder se movimentar, criando uma limitação de área
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

//Função para comer a comidinha
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//Criando os eventos de escuta, para capturar o comando que irá controlar os movimentos da cobrinha e interpretar no browser
//addEventListener captura a ação da tecla e chama a função update
document.addEventListener('keydown', update);
//Passa como argunto o evento de ação da tecla da função abaixo
function update (event) { //teclas: cima 38, baixo 40, esquerda 37, direita 39
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() { //As funções foram passadas dentro de uma função, para que sejam carregadas corretamente e seu intervalo seja o correto, conforme definido na função iniciarJogo()        
    //Se a posição de snake[0].x, que é a cabeça da cobrinha for maior que 15 multiplicado pelo box (tela), ela recebe o valor de zero e reaparece no valor de zero, dando a impressão que atravessou a tela
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i]).x && snake[0].y == snake[i].y){ //Se a posição zero de snake.x for exatamente a mesma da posição i E a posição zero de y for igual a posição i de y, vamos parar a função jogo e damos um alert de game over
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }
    
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;     //A cobrinha começa na poosição 0 de X e Y, utilizando o array snake criado no início do documento, como váriavel do tipo array global.
    let snakeY = snake[0].y;

    //Coordenadas
    if(direction == "right") snakeX += box; //Condição para que se a cobrinha estiver indo para a direita, será acrescentado um quadradinho na posição de snakeX
    if(direction == "left") snakeX -= box; //Plano cartesiano, acrescenda na direita e tira da esquerda, assim cria a impressão de que a cobrinha está indo para a direita
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //Aumentando o tamanho da cobrinha e criando aleatoriamente um novo local para a comidinha, após ser comida oO
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //Remove o último elemento do Array, dando a impressão de que foi comido oO      
    }
    else{food.x = Math.floor(Math.random() * 15 + 1) * box; //Recebendo novamente uma posição aleatória para x
        food.y = Math.floor(Math.random() * 15 + 1) * box; //Recebendo novamente uma posição aleatória para y       
    } 

    // Criando uma nova cabeça
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //Acrescenta uma nova cabeça no primeiro elemento, utilizando o método unshift
}

let jogo = setInterval(iniciarJogo, 100); //Função para que seja iniciado o jogo após MS. A cada 100 MS será atualizado o desenrolar do jogo, dando continuidade e evitando travar o jogo

