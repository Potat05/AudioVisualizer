
// Get elements
const CANVAS = document.getElementById("AudioVisualizer");
const AUDIOMESSAGE = document.getElementById("AudioMessage");
const AUDIO = document.getElementById("Audio");
const AUDIOUPLOAD = document.getElementById("AudioUpload");








// Hide options after 3 seconds of not moving mouse
const AUDIO_OPTIONS_HIDE_TIME = 3000;
let mouseTimer = Infinity;

// To hide stuff timer
function hideUpdate() {
    // Pausing doesn't hide stuff
    if(AUDIO.paused) {
        mouseTimer = Infinity;
        return;
    }
    // Set to hide elements AUDIO_OPTIONS_HIDE_TIME in the future
    mouseTimer = Date.now() + AUDIO_OPTIONS_HIDE_TIME;
}


// Update on mouse
document.addEventListener("mousemove", hideUpdate);
document.addEventListener("mousedown", hideUpdate);


// Loop to test to hide elements
function hideLoop() {
    setTimeout(hideLoop, 100);

    // Put canvas ontop of everything if time is up
    const hide = (Date.now() >= mouseTimer);
    if(hide) {
        CANVAS.style.zIndex = 1;
        CANVAS.style.cursor = "none";
    } else {
        CANVAS.style.zIndex = 0;
        CANVAS.style.cursor = "default";
    }
}
hideLoop();





// Audio
AUDIO.volume = 0.1; // Don't earrape people

// File upload
AUDIOUPLOAD.addEventListener("change", (e) => {
    const file = e.target.files[0];
    AUDIO.setAttribute("src", URL.createObjectURL(file));
    hideUpdate();
    AUDIOMESSAGE.hidden = true;
    AUDIO.hidden = false;
});



AUDIO.addEventListener("play", (e) => {
    hideUpdate();
    if(!VISUALIZER.audio) VISUALIZER.setAudio(AUDIO);
    if(!VISUALIZER.canvas) VISUALIZER.setCanvas(CANVAS);
    VISUALIZER.start();
});

AUDIO.addEventListener("pause", (e) => {
    hideUpdate();
    VISUALIZER.stop();
});











// Draggable audio options
const AUDIOOPTIONS = document.getElementById("AudioOptionsDiv");
dragElement(AUDIOOPTIONS);












