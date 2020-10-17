let video;
let uNet;
let segmentationImage;
let photo;


function preload() {
  uNet = ml5.uNet('face');
}

function setup() {
  const constraints = { 
    audio: false, 
    video: {
      mandatory: {
        minWidth: 240,
        minHeight: 150
      },
      optional: [{ maxFrameRate: 30 }]
    }
  };
  createCanvas(250, 140);
  video = createCapture(constraints);
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
}

function draw() {
  background(photo ? photo : 0)
  image(segmentationImage, 0, 0, 250, 140);
}

const $btn = document.getElementById('imgPickerBtn');
const $imgPicker = document.querySelector('.imagePicker');
$btn.addEventListener('click', () => {
  console.log('clicked');
  $imgPicker.classList.add("imagePicker--active")
  // photo = loadImage('../assets/forest.jpg');
})

