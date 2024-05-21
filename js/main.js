
let sun = new Image();
let moon = new Image();
let earth = new Image();
const ctx = document.getElementById("canvasSolar").getContext("2d");
const canvasR = document.getElementById("canvasReloj");
const ctxR = canvasR.getContext("2d");

function init() {
  sun.src = 'canvas_sun.png';
  moon.src = 'canvas_moon.png';
  earth.src = 'canvas_earth.png';
  sun.onload = moon.onload = earth.onload = () => {
    window.requestAnimationFrame(drawSolar); //llama a la función drawSolar
  };
}

function drawSolar() {
  ctx.globalCompositeOperation = "destination-over";//hace que los elementos se dibujen detrás de los que ya existen 
  ctx.clearRect(0, 0, 300, 300); // limpiar canvas, los números son las coordenadas

  ctx.fillStyle = "rgba(0,0,0,0.4)"; //rgba sirve para ponerle opacidad, color del relleno
  ctx.strokeStyle = "rgba(0,153,255,0.4)"; //color del contorno
  ctx.save();//guarda
  ctx.translate(150, 150);//mueve los orígenes

  // La tierra
  let time = new Date();
  ctx.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() + // 2π radianes representan una rotación completa (360 grados). Dividir entre 60 convierte la rotación completa en una rotación por segundo. Multiplicar por time.getSeconds() ajusta la rotación a la cantidad de segundos actuales del minuto.
    ((2 * Math.PI) / 60000) * time.getMilliseconds(),
  );
  ctx.translate(105, 0);
  ctx.fillRect(0, -12, 50, 24); // Sombra, esta función hace un desplazamiento y los números son para definir el color 
  ctx.drawImage(earth, -12, -12);

  // La luna
  ctx.save();
  ctx.rotate(
    ((2 * Math.PI) / 6) * time.getSeconds() +
    ((2 * Math.PI) / 6000) * time.getMilliseconds(),
  );
  ctx.translate(0, 28.5);
  ctx.drawImage(moon, -3.5, -3.5);
  ctx.restore();

  ctx.restore();

  ctx.beginPath();
  ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Órbita terrestre
  ctx.stroke();

  ctx.drawImage(sun, 0, 0, 300, 300);

  window.requestAnimationFrame(drawSolar);
}

init();


function clock() {
  const now = new Date();


  ctxR.save();
  ctxR.clearRect(0, 0, 150, 150);
  ctxR.translate(75, 75);
  ctxR.scale(0.4, 0.4);
  ctxR.rotate(-Math.PI / 2);
  ctxR.strokeStyle = "black";
  ctxR.fillStyle = "white";
  ctxR.lineWidth = 8;
  ctxR.lineCap = "round";

  // Hour marks
  ctxR.save();
  for (let i = 0; i < 12; i++) {
    ctxR.beginPath();
    ctxR.rotate(Math.PI / 6);
    ctxR.moveTo(100, 0);
    ctxR.lineTo(120, 0);
    ctxR.stroke();
  }
  ctxR.restore();

  // Minute marks
  ctxR.save();
  ctxR.lineWidth = 5;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctxR.beginPath();
      ctxR.moveTo(117, 0);
      ctxR.lineTo(120, 0);
      ctxR.stroke();
    }
    ctxR.rotate(Math.PI / 30);
  }
  ctxR.restore();

  const sec = now.getSeconds();
  // To display a clock with a sweeping second hand, use:
  // const sec = now.getSeconds() + now.getMilliseconds() / 1000;
  const min = now.getMinutes();
  const hr = now.getHours() % 12;

  ctxR.fillStyle = "black";

  // Write image description
  canvasR.innerText = `The time is: ${hr}:${min}`;

  // Write Hours
  ctxR.save();
  ctxR.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec,
  );
  ctxR.lineWidth = 14;
  ctxR.beginPath();
  ctxR.moveTo(-20, 0);
  ctxR.lineTo(80, 0);
  ctxR.stroke();
  ctxR.restore();

  // Write Minutes
  ctxR.save();
  ctxR.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctxR.lineWidth = 10;
  ctxR.beginPath();
  ctxR.moveTo(-28, 0);
  ctxR.lineTo(112, 0);
  ctxR.stroke();
  ctxR.restore();

  // Write seconds
  ctxR.save();
  ctxR.rotate((sec * Math.PI) / 30);
  ctxR.strokeStyle = "#D40000";
  ctxR.fillStyle = "#D40000";
  ctxR.lineWidth = 6;
  ctxR.beginPath();
  ctxR.moveTo(-30, 0);
  ctxR.lineTo(83, 0);
  ctxR.stroke();
  ctxR.beginPath();
  ctxR.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctxR.fill();
  ctxR.beginPath();
  ctxR.arc(95, 0, 10, 0, Math.PI * 2, true);
  ctxR.stroke();
  ctxR.fillStyle = "rgb(0 0 0 / 0%)";
  ctxR.arc(0, 0, 3, 0, Math.PI * 2, true);
  ctxR.fill();
  ctxR.restore();

  ctxR.beginPath();
  ctxR.lineWidth = 14;
  ctxR.strokeStyle = "#325FA2";
  ctxR.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctxR.stroke();

  ctxR.restore();

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);



const img = new Image();

// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.
img.src = "Panorama2.jpg";
const canvasXSize = 800;
const canvasYSize = 200;
const speed = 30; // lower is faster
const scale = 1.05;
const y = -4.5; // vertical offset

// Main program
const dx = 0.75;
let imgW;
let imgH;
let x = 0;
let clearX;
let clearY;
let ctxPanoramica;

img.onload = () => {
  imgW = img.width * scale;
  imgH = img.height * scale;

  if (imgW > canvasXSize) {
    // Image larger than canvas
    x = canvasXSize - imgW;
  }

  // Check if image dimension is larger than canvas
  clearX = Math.max(imgW, canvasXSize);
  clearY = Math.max(imgH, canvasYSize);

  // Get canvas context
  ctxPanoramica = document.getElementById("canvasPanorama").getContext("2d");

  // Set refresh rate
  return setInterval(drawPanorama, speed);
};

function drawPanorama() {
  ctxPanoramica.clearRect(0, 0, clearX, clearY); // clear the canvas

  // If image is <= canvas size
  if (imgW <= canvasXSize) {
    // Reset, start from beginning
    if (x > canvasXSize) {
      x = -imgW + x;
    }

    // Draw additional image1
    if (x > 0) {
      ctxPanoramica.drawImage(img, -imgW + x, y, imgW, imgH);
    }

    // Draw additional image2
    if (x - imgW > 0) {
      ctxPanoramica.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
    }
  } else {
    // Image is > canvas size
    // Reset, start from beginning
    if (x > canvasXSize) {
      x = canvasXSize - imgW;
    }

    // Draw additional image
    if (x > canvasXSize - imgW) {
      ctxPanoramica.drawImage(img, x - imgW + 1, y, imgW, imgH);
    }
  }

  // Draw image
  ctxPanoramica.drawImage(img, x, y, imgW, imgH);

  // Amount to move
  x += dx;
}
