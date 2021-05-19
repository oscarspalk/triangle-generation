var canvaso = document.createElement("canvas");

canvaso.classList.add("canvaso");
document.body.appendChild(canvaso);
canvaso.width = 900;
canvaso.height = 900;

var ctx = canvaso.getContext("2d");
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

/*function tegnRetVinkletTrekantMedVinkler(cotx, vinkelA) {
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
*/
function tegnTrekantMedVinkler(cotx, vinkelA, vinkelB) {
  var vinkelC = ((180 - (vinkelA + vinkelB)) * Math.PI) / 180;
  var a_length = 100;
  var vinkelAA = (vinkelA * Math.PI) / 180;
  var vinkelBB = (vinkelB * Math.PI) / 180;
  var b_height = Math.sin(vinkelC) * a_length;
  var c_length = a_length * Math.cos(vinkelC);
  var b_length = (a_length / Math.sin(vinkelAA)) * Math.sin(vinkelBB);
  
  // logs
  
  console.log("B_height = " + b_height);
  console.log("c_length = " + c_length);
  console.log("b_length = " + b_length);
  
  
  cotx.translate(canvaso.width / 2, canvaso.height / 2);
  cotx.beginPath();
  cotx.moveTo(0, 0);
  cotx.lineTo(c_length, -b_height);
  cotx.lineTo(b_length, 0);
  cotx.lineTo(0, 0);
  cotx.stroke();
  cotx.closePath();
}
