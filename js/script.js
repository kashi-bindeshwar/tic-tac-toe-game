let boxes = document.querySelectorAll(".box");

let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let resetBtn = document.querySelector("#resetGame");
let newGameBtn = document.querySelector("#newGame");

let oxAudio = document.querySelector("#oxAudio");
let winAudio = document.querySelector("#winAudio");

let totalMatch = document.querySelector("#totalMatch");
let Oscore = document.querySelector("#Odata");
let Xscore = document.querySelector("#Xdata");
let draw = document.querySelector("#draw");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () =>{

        if(turnO)
        {
            box.innerText = "O";
            turnO = false;
            oxAudio.play();
        }else{
            box.innerText = "X";
            turnO = true;
            oxAudio.play();
        }
        box.disabled = true;
        checkWinner();
    });
    
});

const checkWinner = () => {
    let isWinner = false;

    for(pattern of winPatterns)
    {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "")
        {
            if(pos1Val === pos2Val && pos2Val === pos3Val)
            {
                let isWinner = true;
                winningBoxes = pattern; // Save the winning pattern
                // console.log("Winning boxes:", winningBoxes); // Log box numbers
                // console.log("winner " , pos1Val);
                showWinner(pos1Val);
                return;
            }
        }
        
    }
    
    // Check for a draw
    if (!isWinner && Array.from(boxes).every(box => box.innerText !== "")) {
        showDraw();
    }
    
} 


let tmData = 0;
let Odata = 0;
let Xdata = 0;
let drawData = 0;

totalMatch.innerText = 0;
Oscore.innerText = 0;
Xscore.innerText = 0;
draw.innerText = 0;

let showWinner = (winner) =>{
    
    msg.innerText = `Congratulations ! Winner is ${winner}`;
    if(winner==="O")
    {
        Odata++;
        Oscore.innerText = Odata;

        tmData++;
        totalMatch.innerText = tmData;
    }
    else if(winner==="X")
    {
        Xdata++;
        Xscore.innerText = Xdata;

        tmData++;
        totalMatch.innerText = tmData;
    }
    
     // Highlight winning boxes
    winningBoxes.forEach(index => {
        boxes[index].classList.add("highlight");
    });

    msgContainer.classList.remove("hide");
    disableBoxes();
    winAudio.play();
}

let showDraw = () => {
    msg.innerText = "Match is Draw! Nobody wins.";
    draw.innerText = drawData + 1;
    drawData++;
    msgContainer.classList.remove("hide");

    tmData++;
    totalMatch.innerText = tmData;
};

const enableBoxes = () =>{
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () =>{
    for(box of boxes){
        box.disabled = true;
    }
}

const newGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    winningBoxes = []; // Clear winning pattern
    boxes.forEach(box => box.classList.remove("highlight"));
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    winningBoxes = []; // Clear winning pattern
    boxes.forEach(box => box.classList.remove("highlight"));
    tmData = 0;
    Odata = 0;
    Xdata = 0;
    drawData = 0;

    totalMatch.innerText = 0;
    Oscore.innerText = 0;
    Xscore.innerText = 0;
    draw.innerText = 0;
}

newGameBtn.addEventListener("click" , newGame);
resetBtn.addEventListener("click" , resetGame);
