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
    video: { width: 250, height: 140 }
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
  document.querySelector('.loadingScreen').style.display = "none";
  segmentationImage = result.backgroundMask;
  uNet.segment(video, gotResult);
}

function draw() {
  background(photo ? photo : 0)
  image(segmentationImage, 0, 0, 250, 140);
}



const init = () => {
  loadImages();
}

const $btn = document.getElementById('imgPickerBtn');
const $imgPicker = document.querySelector('.imagePicker');
const $imgList = $imgPicker.querySelector('.imageList');
const $close = document.getElementById('closeImageList');

$btn.addEventListener('click', () => {
  if ($imgPicker.classList.contains("imagePicker--active")) {
    $imgPicker.classList.remove("imagePicker--active");
  } else {
    $imgPicker.classList.add("imagePicker--active");
  }
});

$close.addEventListener('click', () => {
  if ($imgPicker.classList.contains("imagePicker--active")) {
    $imgPicker.classList.remove("imagePicker--active");
  } else {
    $imgPicker.classList.add("imagePicker--active");
  }
})

const loadImages = () => {
  for (let i = 0; i < 5; i++) {
    const $li = document.createElement('li');
    $li.innerHTML = `<img src="../assets/image${i}.jpg" alt="background image" width="160" height="120" class="backgroundImage" />`;
    $li.addEventListener('click', () => {
      document.querySelectorAll('.backgroundImage').forEach(item => item.classList.remove('backgroundImage--active'));
      photo = loadImage(`../assets/image${i}.jpg`);
      $li.querySelector('.backgroundImage').classList.add('backgroundImage--active');
    })
    $imgList.appendChild($li);
  }
}

init();

