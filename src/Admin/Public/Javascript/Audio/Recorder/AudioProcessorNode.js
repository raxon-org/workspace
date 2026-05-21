class AudioProcessorNode extends AudioWorkletNode {
    constructor(context) {
        super(context, 'audio-processor');

        const constraints = {
            audio: true,
            video: false,
        };

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((mediaStream) => {
                console.log('create audio stream in address');
                console.log(_('prototype'));
                console.log(context);
                /*
                const section = getSection(file.data.get('section.id'));
                if(!section){
                    return;
                }
                let audio = section.select('audio');
                if(!audio){
                    audio = create('audio');
                    audio.className = 'microphone';
                    audio.srcObject = mediaStream;
                    audio.autoplay = true;
                    section.appendChild(audio);

                }
                let audio_format = section.select('audio-format');
                if(!audio_format){
                    audio_format = create('span');
                    audio_format.className = 'microphone-format';
                    audio_format.html("Format: 1 channel pcm @ "+context.sampleRate/1000+"kHz");
                    section.appendChild(audio_format);
                }
                 */
            })
            .catch((err) => {
                // always check for errors at the end.
                console.error(`${err.name}: ${err.message}`);
            });
    }
}