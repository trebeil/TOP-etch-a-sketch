function createCanvas (squaresPerSide, width, height) {
    let smallerSize = Math.min(width, height);

    let squareSize = smallerSize/squaresPerSide;

    let container = document.querySelector('.container');
    container.style.width = (squaresPerSide*squareSize)+'px';
    container.style.height = (squaresPerSide*squareSize)+'px';

    let n = squaresPerSide**2;

    for (i = 0; i < n; i++) {
        let div = document.createElement('div');
        div.style.height = `${squareSize}px`;
        div.style.width = `${squareSize}px`;
        div.classList.add(`pixel`);
        div.style.backgroundColor = 'white';
        document.querySelector('.container').appendChild(div);
    }
}

function cleanCanvas() {
    let div = document.querySelector('.content');
    div.removeChild(document.querySelector('.container'));
    let container = document.createElement('div');
    container.classList.add('container');
    div.appendChild(container);
}

function randomColor() {
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    return `rgb(${r},${g},${b})`;
}

function startCanvas() {
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(element => {
        element.addEventListener('mouseover', () => {
            if (colorMode === 'randomColor') {
                element.style.backgroundColor = randomColor();
            } else if (colorMode === 'solid') {
                element.style.backgroundColor = color;
            } else if (colorMode === 'blackFog') {
                let color = element.style.backgroundColor;
                if (color === 'white') {
                    element.style.backgroundColor = 'hsl(0, 0%, 90%)';
                } else {
                    let rgbArray = color.substr(4);
                    rgbArray = rgbArray.slice(0,rgbArray.length-1);
                    rgbArray = rgbArray.split(', ');
                    let r = rgbArray[0];
                    let g = rgbArray[1];
                    let b = rgbArray[2];
                    if (r !== g || r !== b || g !== b) {
                        element.style.backgroundColor = 'white';
                    } else {
                        r = Math.max(r-25,0);
                        element.style.backgroundColor = `rgb(${r}, ${r}, ${r})`;
                    }
                }
            }
        })
    });
}

function changeColorMode (element) {
    colorMode = element.id;
    let activeButtons = document.querySelectorAll('.colorModeButton.active');
    activeButtons.forEach(element => {
        element.classList.remove('active');
    })
    element.classList.add('active');
}

let squaresPerSide = 16;
let width = window.innerWidth*0.7;
let height = window.innerHeight*0.7;
let colorMode = 'solid';
let color = 'black';

createCanvas(squaresPerSide, width, height);
startCanvas();

let input = document.querySelector('input#color');
input.addEventListener('change', () => {
    color = input.value;
    colorMode = 'solid';
    startCanvas();
    changeColorMode(document.querySelector('#solid'));
});

let resolutionSlider = document.querySelector('#resolution');
resolutionSlider.value = 16;
resolutionSlider.addEventListener('change', () => {
    squaresPerSide = resolutionSlider.value;
    document.querySelector('.chosenResolution').textContent = `Current: ${squaresPerSide}`;
    cleanCanvas();
    createCanvas(squaresPerSide, width, height);
    startCanvas();
});

resolutionButton = document.querySelector('#cleanCanvas');
resolutionButton.addEventListener('click', () => {
    cleanCanvas();
    createCanvas(squaresPerSide, width, height);
    startCanvas();
});

let colorModeButton = document.querySelectorAll('.colorModeButton');
colorModeButton.forEach(element => {
    element.addEventListener('click', () => {
        changeColorMode(element);
    });
});

window.addEventListener('resize', () => {
    width = window.innerWidth*0.7;
    height = window.innerHeight*0.7;
    cleanCanvas();
    createCanvas(squaresPerSide, width, height);
    startCanvas();
});