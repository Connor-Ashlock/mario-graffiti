const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementById('colors');
const reticles = document.getElementById('reticles');
const reticleColor = document.querySelectorAll('.reticle-color');
const trash = document.getElementById('trash');
const saveBtn = document.getElementById('save-btn');
const red = 'rgb(252, 34, 43)';
const green = 'rgb(62, 178, 78)';
const purple = 'rgb(79, 33, 138)';
const yellow = 'rgb(254, 203, 47)';
const introModal = document.getElementById('instructions');
const starBtn = document.querySelector('.star-btn');
const colorInput = document.getElementById('color-input');
const colorModal = document.getElementById('color-modal');
const colorModalClose = document.getElementById('close-color');
let isPainting = false;

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', paint);
canvas.addEventListener('touchstart', convertTouchstartToMousedown);
canvas.addEventListener('touchend', convertTouchendToMouseup);
canvas.addEventListener('touchmove', convertTouchmoveToMousemove);
colors.addEventListener('click', handleColorClick);
saveBtn.addEventListener('click', takeScreenshot)
reticles.addEventListener('click', setReticleSize);
trash.addEventListener('click', clearCanvas);
// introModal.addEventListener('load', openModal);
starBtn.addEventListener('click', hideModal);
colorInput.addEventListener('focusout', handleColorClick);
colorModalClose.addEventListener('click', closeColorModal);
window.addEventListener('resize', resizeCanvas);

function startPosition() {
  isPainting = true;
  paint(event);
}

function finishedPosition() {
  isPainting = false;
  ctx.beginPath();
}

function paint() {
  if (!isPainting) return;
  ctx.lineCap = 'round';
  ctx.lineTo(event.clientX, event.clientY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(event.clientX, event.clientY);
}

function convertTouchstartToMousedown() {
  const touch = event.touches[0];
  const mouseEvent = new MouseEvent('mousedown', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}

function convertTouchendToMouseup() {
  const mouseEvent = new MouseEvent('mouseup', {});
  canvas.dispatchEvent(mouseEvent);
}

function convertTouchmoveToMousemove() {
  const touch = event.touches[0];
  const mouseEvent = new MouseEvent('mousemove', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}

function handleColorClick() {
  switch (event.target.id) {
    case 'red':
      setColor(red);
    break;
    case 'green':
      setColor(green);
    break;
    case 'purple':
      setColor(purple);
    break;
    case 'yellow':
      setColor(yellow);
    break;
    default:
      openColorModal();
      setColor(colorInput.value);
  }
}

function setReticleSize() {
  if (event.target.id === 'reticle-box-1' || event.target.parentElement.id === 'reticle-box-1') {
    ctx.lineWidth = 10;
  } else if (event.target.id === 'reticle-box-2' || event.target.parentElement.id === 'reticle-box-2') {
    ctx.lineWidth = 20;
  } else if (event.target.id === 'reticle-box-3' || event.target.parentElement.id === 'reticle-box-3') {
    ctx.lineWidth = 30;
  }
}

function setColor(color) {
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  for (let i = 0; i < reticleColor.length; i++) {
    reticleColor[i].style.backgroundColor = color;
  }
}

function start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.strokeStyle = red;
  ctx.shadowColor = red;
  ctx.shadowOffsetX= 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 10;
  ctx.lineWidth = 20;
}

function clearCanvas() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
}


function hideModal(){
  introModal.classList.add('d-none');
}

function openColorModal() {
  colorModal.classList.add('show', 'd-block');
}

function closeColorModal() {
  colorModal.classList.remove('show', 'd-block')
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.strokeStyle = red;
  ctx.shadowColor = red;
  ctx.shadowOffsetX= 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 10;
  ctx.lineWidth = 20;
}

function takeScreenshot() {
  html2canvas(canvas)
    .then((canvas) => {
      const dataURL = canvas.toDataURL('image/png');
      saveBtn.setAttribute('href', dataURL);
    })
}

start();
