var ctx;
var canvaso;

window.addEventListener("resize", () => {
  canvaso.height = window.innerHeight / 1.2;
  canvaso.width = window.innerWidth;
});

function init() {
  canvaso = document.createElement("canvas");

  canvaso.classList.add("canvaso");
  canvaso.id = "canvas";
  document.body.appendChild(canvaso);
  canvaso.width = window.innerWidth;
  canvaso.height = window.innerHeight;
  ctx = canvaso.getContext("2d");
}

function tegnLinje(context, startX, startY, endX, endY) {
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}
function tegnCirkelUdsnit(
  context,
  centerX,
  centerY,
  radius,
  startAngle,
  endAngle
) {
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();
}

function tegnTrekant(cotx, centerX, centerY, side, a, b) {
  var h = side;
  var side1 = a;
  var side2 = b;
  cotx.translate(centerX - h, centerY + h);
  cotx.beginPath();
  cotx.moveTo(0, 0);
  cotx.lineTo(a, 0);
  cotx.lineTo(0, -b);
  cotx.lineTo(0, 0);
  cotx.stroke();
  cotx.closePath();
  cotx.save();
  tegnRect(ctx, 0, 0 - side / 6, side / 6, side / 6);
}

function tegnRect(cotx, startX, startY, width, height) {
  cotx.beginPath();
  cotx.rect(startX, startY, width, height);
  cotx.strokeStyle = "red";
  cotx.lineWidth = "2";
  cotx.stroke();
}

// retvinklet
function tegnRetVinkletTrekantMedVinkler(cotx, vinkelA) {
  var sideA_length = Math.cos(vinkelA) * 150;
  var sideB_height = Math.cos(90 - vinkelA) * 150;
  cotx.translate(canvaso.width / 2, canvaso.height / 2);
  cotx.beginPath();
  cotx.moveTo(0, 0);
  cotx.lineTo(sideA_length, 0);
  cotx.lineTo(0, sideB_height);
  cotx.lineTo(0, 0);
  cotx.stroke();
  cotx.closePath();
}

function tegnTrekantMedVinkler(cotx, vinkelA, vinkelB, radius) {
  if (!(vinkelA <= 0 || vinkelB <= 0)) {
    var trueA;
    var trueB;
    var cText;
    var aText;
    var bText;
    if (vinkelA === 90) {
      trueA = 180 - 90 - vinkelB;
      trueB = vinkelB;
      cText = "a 90°";
      aText = `c ${trueA}°`;
      bText = `b ${trueB}°`;
    } else if (vinkelB === 90) {
      trueB = 180 - 90 - vinkelA;
      trueA = vinkelA;
      cText = `b 90°`;
      aText = `a ${trueA}°`;
      bText = `c ${trueB}°`;
    } else {
      trueA = vinkelA;
      trueB = vinkelB;
      cText = `c ${180 - trueA - trueB}°`;
      aText = `a ${vinkelA}°`;
      bText = `b ${vinkelB}°`;
    }
    var vinkelCC = ((180 - (trueA + trueB)) * Math.PI) / 180;
    var a_length = 100;
    var vinkelAA = (trueA * Math.PI) / 180;
    var vinkelBB = (trueB * Math.PI) / 180;
    var b_height = Math.sin(vinkelCC) * a_length;
    var c_length = a_length * Math.cos(vinkelCC);
    var b_length = (a_length / Math.sin(vinkelAA)) * Math.sin(vinkelBB);

    // logs
    console.log("VinkelC = " + vinkelCC);
    console.log("B_height = " + b_height);
    console.log(c_length);
    console.log("b_length = " + b_length);

    cotx.translate(canvaso.width / 3, canvaso.height / 2);

    cotx.beginPath();
    cotx.moveTo(0, 0);
    ctx.font = "14px Arial";

    if (180 - (trueA + trueB) === 90) {
      cotx.rect(0, 0, radius, -radius);
    } else {
      cotx.arc(0, 0, radius, 0, -vinkelCC, true);
    }
    cotx.moveTo(0, 0);
    cotx.fillText(cText, -20, 20);

    // 2
    cotx.lineTo(c_length, -b_height);
    cotx.moveTo(c_length, -b_height);
    cotx.arc(c_length, -b_height, radius, vinkelBB + vinkelAA, vinkelAA, true);
    cotx.moveTo(c_length, -b_height);
    cotx.fillText(bText, c_length - 20, -b_height - 20);

    // 3

    cotx.lineTo(b_length, 0);
    cotx.moveTo(b_length, 0);
    cotx.arc(b_length, 0, radius, Math.PI, Math.PI + vinkelAA);
    cotx.moveTo(b_length, 0);
    cotx.fillText(aText, b_length + 20, 0 + 20);

    cotx.lineTo(0, 0);
    cotx.stroke();
    cotx.closePath();
  }
}

function Ask() {
  var vinkelA = parseFloat(prompt("Hvad skal vinkel A være?"));
  var vinkelB = parseFloat(prompt("Hvad skal vinkel B være?"));
  var radius = parseFloat(prompt("Hvad skal radius af vinklerne være?"));
  tegnTrekantMedVinkler(ctx, vinkelA, vinkelB, radius);
}
const clearone = document.getElementById("clear");
clearone.addEventListener("click", (event) => {
  Clear();
});
function Clear() {
  var canso = document.getElementById("canvas");
  canso.remove();

  init();
}

init();
