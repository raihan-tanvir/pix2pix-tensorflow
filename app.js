const SIZE = 256;
let inputImg, inputCanvas, output, statusMsg, pix2pix, randomBtn, clearBtn, transferBtn, currentColor, currentStroke;


function setup() {
  // Create a canvas
  inputCanvas = createCanvas(SIZE, SIZE);
  inputCanvas.class('border-box').parent('input');

  inputImg = loadImage('images/input_1.png', drawImage);

  output = select('#output');
  statusMsg = select('#status');

  currentColor = color(0,0,0);
  currentStroke = 1;
  select('#red').mousePressed(() => currentColor = color(255, 0, 0));
  select('#blue').mousePressed(() => currentColor = color(0, 0, 255));
  select('#size').mouseReleased(() => currentStroke = select('#size').value());

  transferBtn = select('#transferBtn');

  clearBtn = select('#clearBtn');
  clearBtn.mousePressed(function() {
    clearCanvas();
    background(255, 255, 255);
	statusMsg.html('Canvas Cleared!');
  });

  randomBtn = select('#randomBtn');
  randomBtn.mousePressed(function() {
    let src =['images/input_1.png', 'images/input_2.png', 'images/input_3.png', 'images/input_4.png', 'images/input_5.png',
	'images/input_6.png','images/input_7.png','images/input_8.png','images/input_9.png','images/input_10.png',
	'images/input_11.png','images/input_12.png','images/input_13.png','images/input_14.png','images/input_15.png',
	'images/input_16.png','images/input_17.png','images/input_18.png','images/input_19.png','images/input_20.png'];
    let index = int(random(0, 20));
    inputImg = loadImage(src[index], drawImage);
	
	statusMsg.html('Random Sketch Selected');
  });

  stroke(0);
  pixelDensity(1);

  pix2pix = ml5.pix2pix('model/enhanced_v.pict', modelLoaded);
}

function draw() {
  if (mouseIsPressed) {
    stroke(currentColor);
    strokeWeight(currentStroke)
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function modelLoaded() {
  statusMsg.html('Model Loaded!');
  transferBtn.mousePressed(function() {
    transfer();
  });
}

function drawImage() {
  image(inputImg, 0, 0,SIZE, SIZE);
}

function clearCanvas() {
  background(255);
}

function transfer() {
	statusMsg.html('Generating Jamdani Motif........!');
	const canvasElement = select('canvas').elt;

	pix2pix.transfer(canvasElement, function(err, result) {

    if (err) {
      console.log(err);
    }
    if (result && result.src) {
      statusMsg.html('Done!');
      output.elt.src = result.src;
    }
  });
}
