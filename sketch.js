const density = 'Ñ@#W$9876543210?!abc;:+=-,._    ';

let video;
let asciiDiv;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(120, 60);
  video.hide();
  asciiDiv = createDiv();
  asciiDiv.class('ascii-container');
}

function draw() {
  video.loadPixels();
  let asciiImage = '';

  for (let j = 0; j < video.height; j++) {
    let row = '';
    for (let i = video.width - 1; i >= 0; i--) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len - 1, 0));

      const c = density.charAt(charIndex);
      row += (c == ' ') ? '&nbsp;' : c;
    }
    asciiImage += row + '<br/>';
  }
  asciiDiv.html(asciiImage);
}
