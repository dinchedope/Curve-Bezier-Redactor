// modes

let modes = [
    "VIEW",
    "ADDING",
    "DELETING"
]

let RADIUS = 4;

let DELAY = 0.01;

const canvas_playGround = document.querySelector("#playGround");
let playgroundWidth   = canvas_playGround.clientWidth;
let playgroundHeight  = canvas_playGround.clientHeight;
let ctx = canvas_playGround.getContext("2d");

// STATES  

// let currentState = {};
// let previousState = {};

// ChangeChecker

// function ChangeChecker(current, previous){
//     for(let prop in current){
//         if(current.hasOwnProperty[prop] == previous.hasOwnProperty(prop)){
//             switch(typeof current[prop]){
//                 case "Object":
//                     ChangeChecker(current[prop], previous[prop]);
//                     break;
//                 case "Function":
//                     break;
//                 default: 
//                     if(current[prop] !== current[prop]){
                        
//                     }
//                     break;    
//             }
//         } else {
//             return false;
//         }
       
//     }
//     return true;
// }

// function PropertyChangedHandler()


// Classes

class LinkObj {
    _value;
    _html;

    constructor(value, html){
        this._value = value;
        this._html = html;
    }

    //VALUE
    get value() {
        console.log("get");
        return this._value;
    }

    set value(newValue) {
        this._value = newValue;
        console.log(this._html);
        this._html.innerHTML = this._value;

    }

    //HTML
    get html(){
        return this._html;
    }

    set html(newHtml) {
        this._html = newHtml;
    }
}

class Point {
    _x;
    _y;
    
    constructor(x, y){
        this._x = x;
        this._y = y;
    }

    get x(){
        return this._x;
    }

    set x(newX){
        this._x = newX;
    }

    get y(){
        return this._y;
    }

    set y(newY){
        this._y = newY;
    }
}

class Circle {
    _coords;
    _radius;

    /**
     * 
     * @param {Point} coords 
     * @param {number} radius 
     */
    constructor(coords, radius){
        this._coords = coords;
        this._radius = radius;
    }

    get coords(){
        return this._coords;
    }

    set coords(newCoords){
        this._coords = newCoords;
    }

    get radius(){
        return this._radius;
    }

    set radius(newRadius){
        this._radius = newRadius;
    }
}

// Functions


/**
 * 
 * @param {Circle} figur //Need to create a parent class for figure to take them coords. 
 */
function TakePoint(figur){
    return new Point(figur.coords.x, figur.coords.y);
}


/**
 * 
 * @param {Circle} CircleObj 
 */

function drawPoint(CircleObj){
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.arc(CircleObj._coords._x, CircleObj._coords._y, CircleObj.radius, 0, Math.PI * 2, false);
    ctx.fill(); 
    ctx.closePath();
}

/**
 * 
 * @param {Point} Point1 
 * @param {Point} Point2 
 */

function drawLine(Point1, Point2){
    
    ctx.beginPath();
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.moveTo(Point1.x, Point1.y);
    ctx.lineTo(Point2.x, Point2.y);
    ctx.stroke();
    ctx.closePath();
    console.log(`Draw line: ${Point1.x} - ${Point1.y} / ${Point2.x} - ${Point2.y}`);
}

/**
 * 
 * @param {Point} Point1 
 * @param {Point} Point2 
 * @param {number} t 
 * @returns {Point}
 */

function lerp(Point1, Point2, t){
    return new Point(((1 - t) * Point1.x + t * Point2.x), ((1 - t) * Point1.y + t * Point2.y));
}

/**
 * Function draw lines between points
 */

function lineConnector(){
    console.log(gPoints.length);
    if(gPoints.length > 1){
        for(let i = 0; i < gPoints.length-1; i++){
            drawLine(gPoints[i].coords, gPoints[i+1].coords);
        }
    }

    for(let i = 0; i < gPoints.length; i++){
        
    }
}

function bezierCreator(){
    let allCoords = gPoints.map(figur => {
        return TakePoint(figur);
    });

    let startPoint = allCoords[0];

    let coords = [];
    let newCoords = [];
    for(let t = 0; t <= 1; t += DELAY){
        newCoords = allCoords.slice(0);
        for(let groups = gPoints.length-1; groups > 0; groups--){
            coords = newCoords;
            newCoords = [];
            for(let i = 0; i < groups; i++){
                newCoords.push(lerp(coords[i], coords[i+1], t));
            }  
 
        }
        drawLine(startPoint, newCoords[0]);
        startPoint = newCoords[0];
    }
}



// INIT

let gPoints = [];

const btn_addPoint    = document.querySelector("#btn_addPoint");
const btn_delPoint    = document.querySelector("#btn_delPoint");
const btn_turnoffMode = document.querySelector("#btn_turnoffMode");
const btn_turnbtn_createBezieroffMode = document.querySelector("#btn_createBezier");



canvas_playGround.setAttribute("width", playgroundWidth);
canvas_playGround.setAttribute("height", playgroundHeight);
console.log(`${playgroundWidth} / ${playgroundHeight}`);


const modeIndecator = document.querySelector("#modeIndecator span");
modeIndecator.innerHTML = modes[0];


// OBJECTS



let currentMode = new LinkObj(modes[0], modeIndecator);


// Event Listeners

btn_addPoint.addEventListener("click", () => {
    currentMode.value = modes[1];
}, false);

btn_delPoint.addEventListener("click", () => {
    currentMode.value = modes[2];
}, false);

btn_turnoffMode.addEventListener("click", () => {
    currentMode.value = modes[0];
}, false);

btn_createBezier.addEventListener("click", () => {
    bezierCreator();
}, false);

canvas_playGround.addEventListener("click", (event) => {
    gPoints.push(new Circle(new Point(event.offsetX, event.offsetY), RADIUS))
    console.log(`${event.offsetX} - ${event.offsetY}`);
    drawPoint(gPoints[gPoints.length - 1]);
    lineConnector();
}, false);