let model = null;

async function loadNeuralNet() {
	model = await tf.loadLayersModel('https://anishg24.github.io/InteractiveMNIST/model/js/model.json');
}
loadNeuralNet().then(r => console.log("Model Loaded."));

function setup(){
    let canvas = createCanvas(280, 280);
    canvas.parent("main-canvas");
    // canvas.center('horizontal');
    background(0);
    progressBar.hidden = true;
}

function draw(){
    strokeWeight(8);
    stroke(255);
    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

let progressBar = document.getElementById("progress");
let setBar = (percent) => {
    progressBar.style.width = percent + "%";
}

let out = document.getElementById("out");

document.getElementById("clear").addEventListener("click", () =>{
    background(0);
    progressBar.hidden = true;
    out.innerHTML = "";
})

document.getElementById("guess").addEventListener("click",() =>{
    const input_length = 28 * 28;
    let inputs = [];
    let img = get();
    img.resize(28, 28);
    img.loadPixels();
    for (let i = 0; i < input_length; i++){
        let bright = img.pixels[i * 4];
        inputs[i] = bright/255.0;
    }
    let predictions = predict(inputs);
    console.log(predictions);
    out.innerHTML = "The computer thinks you've drawn a " + predictions[0];
    setBar(100);
});

let predict = (inputs) => {
    progressBar.hidden = false;
    let tensor = tf.tensor(inputs, [28, 28, 1], "float32");
    setBar(25);
    tensor = tf.expandDims(tensor, 0);
    setBar(50);
    let outputs = model.predict(tensor).dataSync();
    let predictions = Array.from(outputs).map(n => parseFloat(n.toPrecision(5)))
    setBar(75);
    return [predictions.indexOf(max(predictions)), predictions];
}

