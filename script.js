// let P0 = [10, 10];
// let P1 = [150, 200];
// let P2 = [300, 50];

// let PointPos = [...P0];

// let delta = 0.02; 

// const canvas = document.getElementById("tutorial");
// // canvas.setAttribute("width", window.innerWidth);
// // canvas.setAttribute("height", window.innerHeight);

// // console.log(`width: ${canvas.width} / height: ${canvas.height}`)

// function lerp(Point1, Point2, t){
//      return [(1 - t)*Point1[0] + t*Point2[0], (1 - t)*Point1[1] + t*Point2[1]];
// }

// function delay(delayInms){
//     return new Promise(resolve => setTimeout(resolve, delayInms));
// }

// // Program start
// if (canvas.getContext) {
//     const ctx = canvas.getContext("2d");

//     //set red color
//     ctx.strokeStyle = "rgb(255, 0, 0)";

//     ctx.beginPath();

//     //set our point on Point P0
//     ctx.moveTo(P0[0], P0[1]);
//     ctx.lineTo(P1[0], P1[1]);
//     ctx.lineTo(P2[0], P2[1]);
//     ctx.stroke();


    
//     (async () => {
//         for(let i = 0; i <= 1; i += delta){
//             await delay(200);
//                 ctx.beginPath()
//                 let newPoint = lerp(lerp(P0, P1, i), lerp(P1, P2, i), i);
//                 console.log(newPoint);
//                 ctx.fillStyle = "rgb(255, 0, 0)";
//                 ctx.arc(newPoint[0], newPoint[1], 4, 0, Math.PI * 2, true);
//                 ctx.fill(); 
//                 ctx.closePath();
//         }
//     })();
  
      
    

// } else {
//   // canvas-unsupported code here
// }

class LinkObj { 
    constructor(value, htmlTag){
        this.value = value;
        this.html = htmlTag;
        this.someObj = {
            numb: 1,
        }
    }
    clone(){
        let newObj = new LinkObj();
        Object.assign(newObj, this);
        return newObj;
    }
}



let modes = [
    "VIEW",
    "ADDING",
    "DELETING"
]


let currentMode = new LinkObj(modes[0], document.querySelector("#modeIndecator span"));

console.log(currentMode);

// let currentMode_ = {
//     value: modes[0],
//     html: document.querySelector("#modeIndecator span"),
// }

function ChangeChecker(obj){
    // console.log("we inside ChangeChecker");
    // console.log(currentState);
    // console.log(previousState);


    for(let elem in obj){
     
        // if(currentState[elem] === previousState[elem]){
        //     // console.log("Ok");
        // }
        // else{
        //     // console.log("Not Ok");
        // }
    }
}


let currentState = {
};
let previousState = {};

currentState.currentMode = currentMode;
previousState.currentMode = currentState.currentMode.clone();

console.log(currentState);
console.log(previousState);




// Control element declaration
const btn_addPoint = document.querySelector("#btn_addPoint");
const btn_delPoint = document.querySelector("#btn_delPoint");
const btn_turnoffMode = document.querySelector("#btn_turnoffMode");

const modeIndecator = document.querySelector("#modeIndecator span");



ChangeChecker(currentState);

// console.log(currentState.currentMode.html.);

// Event Listeners

btn_addPoint.addEventListener("click", () => {
    currentMode.value = modes[1];
    ChangeChecker();
}, false);

btn_delPoint.addEventListener("click", () => {
    currentState.currentMode = modes[2];
    ChangeChecker(currentState);
}, false);
