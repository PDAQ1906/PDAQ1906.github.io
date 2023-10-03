// Listen to the change event of the input file
$(document).on("change", "#image-input", function() {
  var file = this.files[0];
// Check type of file
  if (file.type.indexOf("image") === -1) {
    alert("Only photos can be uploaded");
    return;
  }

  // Read image data
  var reader = new FileReader();
  reader.onload = function() {

    var img = new Image();
    img.src = reader.result;
    var canvas1 = document.getElementById("canvas-input");
    var canvas2 = document.getElementById("canvas-grayscale");
    var context1 = canvas1.getContext("2d");
    var context2 = canvas2.getContext("2d");

    setInterval(function() {
          // Display the photo on the website
    context1.drawImage(img, 0, 0, canvas1.width, canvas1.height);
    
    // get image data from canvas-input
    var imgData = context1.getImageData(0, 0, canvas1.width, canvas1.height);
    var src = cv.matFromImageData(imgData);
    // convert to grayscale
    var grayscale = new cv.Mat();
    cv.cvtColor(src, grayscale, cv.COLOR_RGBA2GRAY);
    cv.imshow(canvas2, grayscale);
    
  },20);
};
  reader.readAsDataURL(file);
});
// Function called when OpenCV is ready
function onOpenCvReady() {
  console.log('OpenCV is ready');
}