const header = document.querySelector("#header");
const btn = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");

let boxvalue;
let currentplayer;
const winningpositions =
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],

]

function initGame() {
    currentplayer = "X";
    boxvalue = ["","","","","","","","",""];
    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
    btn.classList.remove("active");
    header.innerText = `Current player - ${currentplayer}`;
}

initGame();

function checkGameOver(){
    let winner = "";
        winningpositions.forEach((position)=>{
            if((boxvalue[position[0]] !== "" || boxvalue[position[1]] !== ""  || boxvalue[position[2]] !== "")
                    &&
                (boxvalue[position[0]] === boxvalue[position[1]])
                    &&
                (boxvalue[position[1]] === boxvalue[position[2]])){

                    winner = boxvalue[position[0]];

                    boxes.forEach((box) => {
                        box.style.pointerEvents = "none";
                    })

                    boxes[position[0]].classList.add("win");
                    boxes[position[1]].classList.add("win");
                    boxes[position[2]].classList.add("win");

                    header.innerText= `winner - ${winner}`;

                    btn.classList.add("active");

                    return;
                } 
        });

        if (winner === "") {
            let fillcount = 0;

            boxvalue.forEach((box)=>{
                if (box !== "") {
                    fillcount++;
                }
            });
        
            if (fillcount === 9) {
                header.innerText = "match tied";
                btn.classList.add("active");
            }
            else return
        }
    
}


function changeplayer(){
    if (currentplayer === "X") {
        currentplayer = "0"
    }
    else {currentplayer = "X";}

    header.innerText = `currentplayer - ${currentplayer}`;

}

function onclickHandler(index){
        if (boxvalue[index] === "") {
            boxvalue[index] = currentplayer;
            boxes[index].innerText = currentplayer;
            boxes[index].style.pointerEvents = "none";
        }
        
        changeplayer();
        checkGameOver();
        
}
    

boxes.forEach((box,index)=>{box.addEventListener("click" , ()=> {onclickHandler(index)})})

btn.addEventListener("click", initGame);