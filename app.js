const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");
const removeBtn = document.querySelector("#jsRemove");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE); // Initial canvas bgcolor

ctx.strokeStyle = INITIAL_COLOR; // Default line color
ctx.lineWidth = 2.5; // Default line width
ctx.fillStyle = INITIAL_COLOR; // Default fill color

let painting = false;
let filling = false;

function startPainting(event){
    if(event.which != 1){
        painting = false;
    }else{
        if(filling === false){
            painting = true;
        }
    }
    
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    // Bring mouse point offset
    const x = event.offsetX;
    const y = event.offsetY;  

    if(!painting){ 
        // Painting is false : recode path
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{ 
        // Painting is true : painting line
        ctx.lineTo(x,y); 
        ctx.stroke(); 
    }
}

function onMouseDown(event){
    // Mouse click down event listener
    painting = true;    
}

function handleColorClick(event){
    // Canvas background color setting
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeClick(event){
    // line thickness adjustment
    const range = event.target.value;
    ctx.lineWidth = range;
}

function handleModeClick(event){
    // Draw mode settings : FILL / PAINT
    if(filling){
        filling = false;
        mode.innerText = "FILL" // Change text 
    }else{
        filling = true;
        mode.innerText= "PAINT";
    }
}

function handleCanvasClick(event){
    if(filling){
        // Give background color
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
    // Disable Contextmenu
    event.preventDefault();
}

function handleSaveClick(event){
    // Save Canvas 
    const img = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = img;
    link.download = "PAINTJS[EXPORT]"; 

    link.click();
}

function handleRemoveClick(event){
    // Delete entire picture on canvas
    ctx.clearRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
}

if(canvas){
    // Sign up eventListener
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(colors){
    // Change color
    colors.forEach(color=>color.addEventListener("click", handleColorClick));
}

if(range){
    // Change line thickness
    range.addEventListener("input", handleRangeClick)
}

if(mode){
    // Fill canvas
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    // Save image
    saveBtn.addEventListener("click", handleSaveClick);
}

if(removeBtn){
    // remove
    removeBtn.addEventListener("click", handleRemoveClick);
}