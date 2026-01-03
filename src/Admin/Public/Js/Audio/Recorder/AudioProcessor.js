class AudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.port.onmessage = (event) => {
            // Handling data from the node.
            console.log(event.data);
        };
        this.port.postMessage('Hi!');

    }

    process(inputs, outputs, parameters) {
        const output = outputs[0];
        // file.data.microphone = output;
        return true;
    }

}

registerProcessor('audio-processor', AudioProcessor);