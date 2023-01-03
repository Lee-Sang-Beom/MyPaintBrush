const canvas = document.querySelector("#jsCanvas");

// canvas는 getContext 메서드를 이용해 렌더링 컨텍스트를 뽑아낼 수 있습니다. 그리고
// 그리고 이 컨텍스트가 제공하는 함수를 통해 도형 및 그림을 그릴 수 있도록 합니다.
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
        ctx.beginPath(); // 경로를 시작하거나 새 경로를 지정합니다. 선을 그리기 위해 실행하는 함수입니다.
        ctx.moveTo(x,y); // 펜을 x와 y로 지정된 좌표로 옮깁니다.
    }else{ 
        // Painting is true : painting line
        ctx.lineTo(x,y); // 현재의 드로잉 위치에서 x와 y로 지정된 위치까지 경로에 선을 추가합니다.
        ctx.stroke(); // 현재 stroke스타일로 지정된 경로를 "그립니다"
    }
}

function onMouseDown(){
    // Mouse click down event listener
    painting = true;    
}

function handleColorClick(event){
    // Canvas background color setting
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; // 선의 색상
    ctx.fillStyle = ctx.strokeStyle; // 배경 채우기 색상도 같은 것으로 변경
}

function handleRangeClick(event){
    // line thickness adjustment
    const range = event.target.value;
    ctx.lineWidth = range;
}

function handleModeClick(){
    // Draw mode settings : FILL / PAINT
    if(filling){
        filling = false;
        mode.innerText = "FILL" // Change text 
    }else{
        filling = true;
        mode.innerText= "PAINT";
    }
}

function handleCanvasClick(){
    if(filling){
        // Give background color
        // 시작점이 (0,0)이고 크기가 캔버스 크기만큼인 사각형을 그립니다.
        // 채우기 스타일은 사전에 정의해둔 fillStyle 속성에 의해 결정됩니다.
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
    // Disable Contextmenu
    event.preventDefault();
}

function handleSaveClick(){
    // Save Canvas 
    const img = canvas.toDataURL("image/png"); // 캔버스의 데이터 URL을 얻음
    const link = document.createElement("a");

    link.href = img;
    link.download = "PAINTJS[EXPORT]";  // 캔버스의 데이터 URL과 a태그의 download 속성을 이용해 파일을 다운받음

    link.click();
}

function handleRemoveClick(){
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