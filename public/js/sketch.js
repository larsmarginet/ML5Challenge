let video;
let uNet;
let segmentationImage;
let photo;

// load uNet model
function preload() {
  uNet = ml5.uNet('face');
  
}

function setup() {
  photo = loadImage('../assets/island.jpg')
  createCanvas(250, 140);
  video = createCapture(VIDEO);
  video.size(250, 140);
  video.hide();
  segmentationImage = createImage(width, height);
  uNet.segment(video, gotResult);
}

function gotResult(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  segmentationImage = result.backgroundMask;
  uNet.segment(video, gotResult);
  //console.log(segmentationImage)
}

const btn = document.getElementById('changebg');
btn.addEventListener('click', () => {
  console.log('clicked')
  photo = loadImage('../assets/forest.jpg');
})


function draw() {
  
  background(photo)
  image(segmentationImage, 0, 0, 250, 140);
}

