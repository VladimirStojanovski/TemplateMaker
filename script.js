const canvas = document.getElementById('templateCanvas');
const ctx = canvas.getContext('2d');
const userTextInput = document.getElementById('userText');

const img = new Image();
img.src = 'BlankTemplate.jpg';

const config = {
    maxWidth: 450,
    lineHeight: 32,
    textFont: '500 26px Roboto',
    textColor: 'black',
    textAlign: 'center',
    startY: 72,
    startX: canvas.width / 2
};

img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    drawText();
};

function drawText() {
    const text = userTextInput.value;
    const words = text.split(' ');
    let line = '';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.font = config.textFont;
    ctx.fillStyle = config.textColor;
    ctx.textAlign = config.textAlign;

    let y = config.startY;

    words.forEach((word, index) => {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);

        if (metrics.width > config.maxWidth && index > 0) {
            ctx.fillText(line, config.startX, y);
            line = word + ' ';
            y += config.lineHeight;
        } else {
            line = testLine;
        }
    });

    ctx.fillText(line, config.startX, y);
}

userTextInput.addEventListener('input', drawText);

function downloadImage() {
    const link = document.createElement('a');
    link.download = 'template.jpg';
    link.href = canvas.toDataURL();
    link.click();
}
