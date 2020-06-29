const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");
const rows = 28;
const columns = 28;
const gridHeight = window.innerHeight;
const gridWidth = window.innerWidth;

class Pixel{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.dim = 20;
        this.bounds = [x, x + this.dim, y, y + this.dim];
        this.isDrawn = false;
    }

    draw(){
        if (this.isDrawn){
            ctx.fillStyle = "#FFFFFF";
            ctx.strokeStyle = "#FFFFFF";
        } else {
            ctx.fillStyle = "#000000";
            ctx.strokeStyle = "#000000";
        }
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.dim, this.dim);
    }
}
let a = new Pixel(50, 50);
a.draw();
for (let row = 0; row < rows; row ++){
    let y = gridHeight + 20*row;
    for (let col = 0; col < columns;col++){
        let x = gridWidth + 20*col;
        let p = new Pixel(x, y);
        // console.log(x, y);
        p.draw();
    }
}
