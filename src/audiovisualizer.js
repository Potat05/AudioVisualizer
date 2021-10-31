


class AudioVisualizer {
    constructor(draw, options={}) {
        // Draw
        this.draw = draw;
        if(!this.draw) { // Default draw
            this.draw = (data, canvas) => {
                data = [...data];

                let ctx = canvas.getContext("2d");

                let space = canvas.width / data.length;
                for(let i=0; i < data.length; i++) {
                    ctx.fillStyle = "white";
                    ctx.fillRect(i*space, 0, 1, data[i]);
                }
            }
        }

        this.options = {...{
            fftSize: 2048,
            smoothingTimeConstant: 0.8
        }, ...options}


    }

    setAudio(audio=document.querySelector("audio")) {
        // Init audio
        this.audio = audio;
        this.audioCtx = new AudioContext();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = this.options.fftSize;
        this.analyser.smoothingTimeConstant = this.options.smoothingTimeConstant;
        this.source = this.audioCtx.createMediaElementSource(this.audio);
        this.source.connect(this.analyser);
        this.source.connect(this.audioCtx.destination);
        this.data = new Uint8Array(this.analyser.frequencyBinCount);
    }

    setCanvas(canvas=document.querySelector("canvas")) {
        // Init canvas
        this.canvas = canvas;
    }

    start() {
        this.running = true;
        this.step();
    }

    stop() {
        this.running = false;
    }

    step() {

        if(this.audio) {
            this.analyser.getByteFrequencyData(this.data);
        }


        if(this.canvas && this.audio && this.draw) {
            this.canvas.width = this.canvas.getBoundingClientRect().width;
            this.canvas.height = this.canvas.getBoundingClientRect().height;
            
            this.draw(this.data, this.canvas);
        }

        if(this.running) requestAnimationFrame(() => this.step());
    }

}