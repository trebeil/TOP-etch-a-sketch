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
    let body = document.querySelector('body');
    body.removeChild(document.querySelector('.container'));
    let container = document.createElement('div');
    container.classList.add('container');
    body.appendChild(container);
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
        } else if (colorMode === 'black') {
            element.style.backgroundColor = 'black';
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

function customizeButtons() {

}

let squaresPerSide = 16;
let width = window.innerWidth*0.7;
let height = window.innerHeight*0.7;
let colorMode = 'black';
createCanvas(squaresPerSide, width, height);
startCanvas();

resolutionButton = document.querySelector('#resolution');
resolutionButton.addEventListener('click', () => {
    squaresPerSide = prompt('Select the number of squares per side');
    cleanCanvas();
    createCanvas(squaresPerSide, width, height);
    startCanvas();
})

resolutionButton = document.querySelector('#cleanCanvas');
resolutionButton.addEventListener('click', () => {
    cleanCanvas();
    createCanvas(squaresPerSide, width, height);
    startCanvas();
})

colorModeButton = document.querySelectorAll('.colorModeButton');
colorModeButton.forEach(element => {
    element.addEventListener('click', () => {
        colorMode = element.id;
        let activeButtons = document.querySelectorAll('.colorModeButton.active');
        activeButtons.forEach(element => {
            element.classList.remove('active');
        })
        element.classList.add('active');
    })
})

window.addEventListener('resize', () => {
    width = window.innerWidth*0.7;
    height = window.innerHeight*0.7;
    cleanCanvas();
    createCanvas(squaresPerSide, width, height);
    startCanvas();
})