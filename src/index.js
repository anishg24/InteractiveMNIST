let model = null;

async function loadNeuralNet() {
    model = await tf.loadLayersModel('https://anishg24.github.io/InteractiveMNIST/model/js/model.json');
}

loadNeuralNet().then(r => console.log("Model Loaded."));

function setup() {
    let canvas = createCanvas(280, 280);
    canvas.parent("main-canvas");
    canvas.mouseReleased(processInput);
    canvas.touchEnded(processInput);
    // canvas.center('horizontal');
    background(0);
}

function draw() {
    strokeWeight(32);
    stroke(255);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

// function mouseReleased() {
//     processInput();
// }


let out = document.getElementById("out");

document.getElementById("clear").addEventListener("click", () => {
    background(0);
    out.innerHTML = "";
})


let processInput = () => {
    const input_length = 28 * 28;
    let inputs = [];
    let img = get();
    img.resize(28, 28);
    // img.save("photo", "png")
    img.loadPixels();
    for (let i = 0; i < input_length; i++) {
        let bright = img.pixels[i * 4];
        inputs[i] = bright / 255.0;
    }
    let predictions = predict(inputs);
    console.log(predictions);
    out.innerHTML = "The computer thinks you've drawn a " + predictions[0];
    updateGraph(predictions[1]);
}

let predict = (inputs) => {
    let tensor = tf.tensor(inputs, [28, 28, 1], "float32");
    tensor = tf.expandDims(tensor, 0);
    let outputs = model.predict(tensor).dataSync();
    let predictions = Array.from(outputs).map(n => parseFloat(n.toPrecision(5)))
    return [predictions.indexOf(max(predictions)), predictions];
}

let updateGraph = (predictions) => {
    // console.log("TEST")
    document.getElementById("noChart").innerHTML = ""
    predictions = predictions.map((n) => (n * 100).toPrecision(2));
    let ctx = document.getElementById("chart").getContext("2d");
    let myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            datasets: [{
                data: predictions,
                backgroundColor: [
                    'rgb(197,34,51)',
                    'rgb(251,77,61)',
                    'rgb(255,130,0)',
                    'rgb(239,174,43)',
                    'rgb(228,204,55)',
                    'rgb(242,232,99)',
                    'rgb(143,201,58)',
                    'rgb(0,114,187)',
                    'rgb(30,145,214)',
                    'rgb(121,30,148)',
                    'rgb(202,60,255)',
                    'rgb(227,101,193)'
                ],
            }]
        },
    });
}
