// Initialize global variables for flame opacity and animation control
let currentOpacity = 1.0;
let isBlowing = false;

async function requestMicrophoneAccess() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        processAudioStream(stream);
    } catch (error) {
        console.error('Microphone access was denied.', error);
    }
}

function processAudioStream(stream) {
    const audioContext = new AudioContext();
    const microphone = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    microphone.connect(analyser);

    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function analyze() {
        analyser.getByteFrequencyData(dataArray);

        // Calculate the sum of the spectrum to detect the intensity of the blow
        let sum = dataArray.reduce((a, b) => a + b, 0);
        if (sum > 60000 && currentOpacity > 0) { // Adjust the threshold based on testing
            isBlowing = true;
            blowDetected(sum);
        } else {
            isBlowing = false;
        }

        requestAnimationFrame(analyze);
    }

    analyze();
}

function blowDetected(volume) {
    // Gradually decrease the opacity of the flame based on the volume
    const flame = document.querySelector('.flame');
    let decreaseAmount = volume / 1000000; // Adjust this factor based on testing for a smooth transition
    currentOpacity = Math.max(0, currentOpacity - decreaseAmount);

    flame.style.opacity = currentOpacity;

    // Optionally, stop the animation completely if the flame is fully "blown out"
    if (currentOpacity <= 0) {
        flame.style.display = 'none';
        console.log("Candle blown out!");
    }
}

// Trigger the microphone access request
requestMicrophoneAccess();
