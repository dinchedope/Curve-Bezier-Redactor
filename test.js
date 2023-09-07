// let obj = { 
    
//     num: 1,
//     func: function(){
//         return true;
//     }
// }

// console.log(obj.func.toString()); //"return true"

// let obj = {
//     num : 10
// }

// console.log(typeof obj);

class LinkObj {
    _value;
    _html;

    constructor(value, html){
        this._value = value;
        this._html = html;
    }

    get value() {
        console.log("get");
        return this._value;
    }

    get html(){
        return this._html;
    }

    set value(newValue) {
        console.log("set")
        this._value = newValue;
    }

    set html(newHtml) {
        this._html = newHtml;
    }
}

console.log(LinkObj);

// OBJECTS

let currentMode = new LinkObj("VIEW", document.querySelector("#modeIndecator span"));

for(let prop in currentMode){
    console.log(prop);
}

console.log(currentMode);