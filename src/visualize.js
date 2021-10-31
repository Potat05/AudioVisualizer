
// Simple bars visualization
// const VISUALIZER = new AudioVisualizer((data, canvas) => {

//     let ctx = canvas.getContext("2d");

//     for(let i=0; i < data.length; i++) {
//         ctx.fillStyle = "white";
//         ctx.fillRect(i, 0, 1, data[i]);
//     }

// });


// Circle bars visualization
const CIRCLE_BARS_SMOOTHING_TIME_CONSTANT = 0.8; // The closer to 1 the more time it takes for bars to move
const CIRCLE_BARS_COUNT = 1024; // How many bars to get // Keep multiple of 2
const CIRCLE_BARS_CRENDER = CIRCLE_BARS_COUNT / 4; // How many bars to render (Because some higher frequencies rarely show up)
const CIRCLE_BARS_CIRCLE_RADIUS = 30; // Circle in middle
const VISUALIZER = new AudioVisualizer((data, canvas) => {

    let ctx = canvas.getContext("2d");

    // Draw bars
    let centerX = canvas.width*0.5;
    let centerY = canvas.height*0.5;

    let ang = Math.PI*2 / CIRCLE_BARS_CRENDER;
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY+data[0]);
    for(let i=1; i < CIRCLE_BARS_CRENDER; i++) {
        ctx.lineTo(centerX+Math.sin(i*ang)*data[i], centerY+Math.cos(i*ang)*data[i]);
    }
    ctx.closePath();
    ctx.fill();



    // Hide center of bars because it's ugly
    ctx.fillStyle = "#AAA";
    ctx.strokeStyle = "#888";
    ctx.beginPath();
    ctx.arc(centerX, centerY, CIRCLE_BARS_CIRCLE_RADIUS, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();

}, {
    fftSize: CIRCLE_BARS_COUNT,
    smoothingTimeConstant: CIRCLE_BARS_SMOOTHING_TIME_CONSTANT
});
