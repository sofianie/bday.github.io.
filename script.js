document.querySelector('.flame').addEventListener('click', function() {
    this.style.display = 'none';
});

document.getElementById('startButton').addEventListener('click', function() {
    var initialScreen = document.getElementById('initialScreen');
    var mainContent = document.getElementById('mainContent');
    
    // Fade out the initial screen
    initialScreen.style.opacity = '0';
    initialScreen.style.visibility = 'hidden';

    // After a delay equal to the transition, display the main content
    setTimeout(function() {
        mainContent.style.opacity = '1';
        mainContent.style.visibility = 'visible';
        makeItRain();
        mainContent.style.display = 'block';
    }, 500);  // Delay in milliseconds matching the CSS transition

});

function basic() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function randomDirection() {
    confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 }
    });
}

function makeItRain() {
    // document.getElementById("makeItRain").disabled = true;
    var end = Date.now() + (2 * 1000); // lasts for 2 seconds

    // define the colors for the confetti here
    var colors = ['#FF6C6C', '#6CCAFF', '#FFAF6C', '#B8FF6C'];

    function frame() {
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 250,
            origin: { x: 0.25, y: 0.9 },
            colors: colors
        });
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 350,
            origin: { x: 0.25, y: 0.15 },
            colors: colors
        });
        confetti({
            particleCount: 4,
            angle: 140,
            spread: 250,
            origin: { x: 0.75, y: 0.9 },
            colors: colors
        });
        confetti({
            particleCount: 4,
            angle: 140,
            spread: 350,
            origin: { x: 0.75, y: 0.15 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        } else {
        }
    }
    frame();
}

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}