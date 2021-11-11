let ball=document.querySelector(".ball");
let board=document.querySelector(".board");

let leftPaddle=document.querySelector(".left");
let rightPaddle=document.querySelector(".right");

let boardBound=board.getBoundingClientRect();
let x=true;
let y=true;

let leftPlayerLives=3;
let rightPlayerLives=3;

let ballSpeed = 10;


// user input listen

document.addEventListener("keydown",function(e){
    if(e.key=="w"){
    movePaddle(leftPaddle,-window.innerHeight*0.1);
    }else if(e.key=="s"){
        movePaddle(leftPaddle,window.innerHeight*0.1);
    }else if(e.key=="ArrowUp"){
        movePaddle(rightPaddle,-window.innerHeight*0.1);
    }else if(e.key=="ArrowDown"){
        movePaddle(rightPaddle,window.innerHeight*0.1);
    }
})
// color set function declare here

function setColor(index){
  let icons=document.querySelectorAll(".fas.fa-circle");   
  icons[index].style.color="red"; 
}

// Here function of paddle declared

function movePaddle(currentPaddle,change){
    let cPaddleBounds=currentPaddle.getBoundingClientRect();

    if(cPaddleBounds.top+change>=boardBound.top&&cPaddleBounds.bottom+change<=boardBound.bottom){
    currentPaddle.style.top=cPaddleBounds.top+change+"px";
}

}

//Here function of moveBall declared

function moveBall(){
    let ballCord=ball.getBoundingClientRect();
    let ballTop=ballCord.top;
    let ballBottom=ballCord.bottom;
    let ballLeft=ballCord.left;
    let ballRight=ballCord.right;

    // check if collided with any players horizontal boundary

    let hastouchedLeft=ballLeft<=boardBound.left;
    let hastouchedRight=ballRight>boardBound.right;
    if(hastouchedLeft||hastouchedRight){
        if(hastouchedLeft){
        leftPlayerLives--;
        setColor(leftPlayerLives);
        if(leftPlayerLives==0){
            alert("Game Over Player🔥🅱Won");
            document.location.reload();
        }  else{
            return resetGame();
        }
        }else{
         rightPlayerLives--;
         setColor(3+rightPlayerLives);
         if(rightPlayerLives==0){
            alert("Game Over Player🔥🅰Won");
            document.location.reload();
         }else{
             return resetGame();
         }
        }
    }

    // function restGame

    function resetGame(){
        console.log("reset");
        ball.style.top=window.innerHeight*0.45+"px";
        ball.style.left=window.innerWidth*0.45+"px";
        requestAnimationFrame(moveBall);
    }

    // handle vertical bound
    if(ballTop<=boardBound.top||ballBottom>=boardBound.bottom){
    //   vertically outside
    y=!y;
    }
    
    // *********************colision performed here **************************

    let leftPaddleBounds=leftPaddle.getBoundingClientRect();
    let rightPaddleBounds=rightPaddle.getBoundingClientRect();

 
    if(!(ballBottom === leftPaddleBounds.top)
       && ballLeft<=leftPaddleBounds.right 
       && ballRight>=leftPaddleBounds.left&&
       ballTop+40>=leftPaddleBounds.top
       &&ballBottom-40<=leftPaddleBounds.bottom){
       x=!x;
    }
    if(!(ballBottom === rightPaddleBounds.top)
       &&ballLeft<=rightPaddleBounds.right 
       && ballRight>=rightPaddleBounds.left
       && ballTop+40>=rightPaddleBounds.top
       &&ballBottom-40<=rightPaddleBounds.bottom){
        x=!x;
    }

    ball.style.top= y==true?ballTop+ballSpeed+"px":ballTop-ballSpeed+"px";
    ball.style.left= x==true?ballLeft+ballSpeed+"px":ballLeft-ballSpeed+"px";
    requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);

