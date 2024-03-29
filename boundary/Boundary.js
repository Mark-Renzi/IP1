const LEVELOFFSET = 5;
const BOXSIZE = 50;
const OFFSET = 3;
var isDraw = false;

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    //If (x,y) is contained in the rectangle
    contains(x, y) {
        return x >= this.x && x <= (this.x + this.width) && y >= this.y && y <= (this.y + this.height);
    }
}


/**
 * redraw the canvas from model
 * @param {*} model 
 * @param {*} canvasObj 
 * @param {*} appObj 
 * @returns 
 */
function redrawCanvas(model, canvasObj, appObj) {
    if (typeof canvasObj === "undefined") {return;}

    const ctx = canvasObj.getContext('2d');
    if (ctx === null) {return;}

    //blank the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0,0,canvasObj.width, canvasObj.height)

    if (model.puzzle && !model.victory) {
      isDraw = false;
      drawPuzzle(ctx, model.puzzle);
    }
    else {
      ctx.fillStyle = "rgba(255, 255, 255, .5)";
      ctx.beginPath();
      ctx.roundRect(20, 20, canvasObj.width -40, canvasObj.height-40, 5); 
      ctx.lineWidth = 4;
      ctx.strokeStyle = "rgb(255, 255, 255)";
      ctx.stroke();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(0, 0, 0)";
      ctx.stroke();
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.font = "30px Segoe UI";
      ctx.textAlign = "center";
      ctx.fillText("FINISH!",255,240);
    }
}



function drawPuzzle(ctx, puzzle) {
    let max = Math.max(puzzle.rowNum, puzzle.colNum);
    const magicNumber = 9.8;
    let scaleFactor = magicNumber/max;
    let hSkew, vSkew; hSkew = vSkew = max/magicNumber;
    if (puzzle.rowNum < puzzle.colNum){
      vSkew += (puzzle.colNum - puzzle.rowNum) * scaleFactor * 25;
    } else {
      hSkew += (puzzle.rowNum - puzzle.colNum) * scaleFactor * 25;
    }
    
    ctx.setTransform(scaleFactor, 0, 0, scaleFactor, hSkew, vSkew);
    const img = new Image();
    img.src = "./assets/NinjaSe.png"
    ctx.shadowColor = "black";

    puzzle.walls.forEach(wall => {
        let rect = getRect(wall);
        ctx.fillStyle = wall.color;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    })

    puzzle.doors.forEach(door => {
        let rect = getRect(door);
        ctx.fillStyle = "black";
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        ctx.fillStyle = door.color;
        ctx.fillRect(rect.x+5, rect.y+5, rect.width-10, rect.height-10);
        ctx.fillStyle = "black";
        ctx.fillRect(rect.x+13, rect.y+13, rect.width-26, rect.height-26);
        ctx.fillStyle = "white";
        ctx.fillRect(rect.x+14, rect.y+14, rect.width-28, rect.height-28);
    })

    puzzle.keys.forEach(key => {
        let rect = getRect(key);
        ctx.fillStyle = "black";
        ctx.fillRect(rect.x+13, rect.y+13, rect.width-26, rect.height-26);
        ctx.fillStyle = key.color;
        ctx.fillRect(rect.x+14, rect.y+14, rect.width-28, rect.height-28);
    })

    let rect = getRect(puzzle.player);
    img.onload = function() {
        if (!isDraw) {
            ctx.drawImage(img, rect.x, rect.y, rect.width, rect.height);
            if (puzzle.player.held != null){
                ctx.fillStyle = "black";
                ctx.fillRect(rect.x+20, rect.y+20, rect.width-26, rect.height-26);
                ctx.fillStyle = puzzle.player.held.color;
                ctx.fillRect(rect.x+21, rect.y+21, rect.width-28, rect.height-28);
            }
            
            isDraw = true
        }
    }
}

function getRect(wall) {
    let c = wall.location();
    let rect = new Rectangle(BOXSIZE*c.column + OFFSET + LEVELOFFSET, BOXSIZE*c.row + OFFSET + LEVELOFFSET, BOXSIZE-2*OFFSET, BOXSIZE-2*OFFSET);
    return rect;
}