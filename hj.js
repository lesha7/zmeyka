let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

let snakeBody = [];
let snakeSize = 30;
snakeBody[0] = {x: 8 * snakeSize, y: 8 * snakeSize};

let food = {
    x: Math.floor(Math.random()*17+1) * snakeSize,
    y: Math.floor(Math.random()*15+3) * snakeSize
}

let score = 0;

let d;

document.addEventListener("keydown", direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw(){
    
    context.fillStyle = "grey";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < snakeBody.length; i++){
        context.fillStyle = (i == 0)? "green" : "blue";
        context.fillRect(snakeBody[i].x, snakeBody[i].y, snakeSize, snakeSize);

        context.strokeStyle = "red";
        context.strokeRect(snakeBody[i].x, snakeBody[i].y, snakeSize, snakeSize);
    }

    context.fillStyle = "orange";
    context.fillRect(food.x, food.y, snakeSize, snakeSize);

    let snakeX = snakeBody[0].x;
    let snakeY = snakeBody[0].y;

    if( d == "LEFT") snakeX -= snakeSize;
    if( d == "UP") snakeY -= snakeSize;
    if( d == "RIGHT") snakeX += snakeSize;
    if( d == "DOWN") snakeY += snakeSize;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor(Math.random()*18+1) * snakeSize,
            y: Math.floor(Math.random()*15+3) * snakeSize
        }
    }else{
        snakeBody.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if(snakeX < -1* snakeSize || snakeX > 18 * snakeSize || snakeY < 1*snakeSize || snakeY > 18*snakeSize || collision(newHead, snakeBody)){
        clearInterval(game);
        alert("Game Over! Your Score: " + score);
    }

    snakeBody.unshift(newHead);

    context.fillStyle = "white";
    context.font = "55px Changa one";
    context.fillText(score, 2*snakeSize, 1.6*snakeSize);
    ctx.fillStyle = '#999';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
}

let game = setInterval(draw, 100);