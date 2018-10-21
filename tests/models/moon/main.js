var model;

window.addEventListener('load', function() {
    // console.log("window load");
    model = document.getElementsByTagName("a-obj-model")[0];
    console.log(model);
    requestAnimationFrame(redraw);
});

var angleY = 0;
var deltaAngle = 0.1

function redraw() {
    //console.log("redraw");
    requestAnimationFrame(redraw);
    rot = "90 " + angleY + " 0";
    model.setAttribute("rotation", rot);

    angleY += deltaAngle;
    if (angleY > 180) angleY -= 360;
}