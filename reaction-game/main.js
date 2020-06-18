const spinner = document.querySelector('.spinner p');
const spinnerContainer = document.querySelector('.spinner'); // container for showing and hiding spinner
let rotateCount = 0;
let startTime = null;
let rAF;
const btn = document.querySelector('button');
const result = document.querySelector('.result');

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

function draw(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }

    rotateCount = (timestamp - startTime) / 3;

    if (rotateCount > 359) {
        rotateCount %= 360;
    }

    spinner.style.transform = 'rotate(' + rotateCount + 'deg)';
    rAF = requestAnimationFrame(draw);  //requestAnimationFrame recursively calls the draw function
}

// hide result and spinner in the beginning
result.style.display = 'none';
spinnerContainer.style.display = 'none';

function reset() {
    btn.style.display = 'block';
    result.textContent = '';
    result.style.display = 'none';
}

btn.addEventListener('click', start);

function start() {
    draw(); //start the spinner spinning
    spinnerContainer.style.display = 'block';
    btn.style.display = 'none';
    setTimeout(setEndgame, random(5000, 10000));    //set keypress listeners after a random time between 5 and 10 seconds
}

function setEndgame() {
    cancelAnimationFrame(rAF);  //cancel animation
    spinnerContainer.style.display = 'none';    //hide spinner
    result.style.display = 'block';
    result.textContent = 'PLAYERS GO!';

    document.addEventListener('keydown', keyHandler);
    function keyHandler(e) {
        console.log(e.key);
        if (e.key === 'a' || e.key === 'A') {
            result.textContent = 'Player 1 won!';
            document.removeEventListener('keydown', keyHandler);    //once a keypress is detected, remove the listener
            setTimeout(reset, 5000);
        } else if (e.key === 'l'|| e.key === 'L') {
            result.textContent = 'Player 2 won!';
            document.removeEventListener('keydown', keyHandler);    //once a keypress is detected, remove the listener
            setTimeout(reset, 5000);
        }
    };
}