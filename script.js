// ===== TELA DE BOOT =====
const bootScreen = document.getElementById('boot-screen');
const bootText = document.getElementById('boot-text');
const mainContent = document.getElementById('main-content');

const bootLines = [
    'INICIALIZANDO SISTEMA...',
    'CARREGANDO MÓDULOS...',
    'ACESSO CONCEDIDO.',
    ''
];

let lineIndex = 0;
let charIndex = 0;

function typeBoot() {
    if (lineIndex < bootLines.length) {
        const currentLine = bootLines[lineIndex];
        if (charIndex < currentLine.length) {
            bootText.textContent += currentLine[charIndex];
            charIndex++;
            setTimeout(typeBoot, 40);
        } else {
            bootText.textContent += '\n';
            lineIndex++;
            charIndex = 0;
            setTimeout(typeBoot, 300);
        }
    } else {
        bootScreen.classList.add('hidden');
        setTimeout(() => bootScreen.remove(), 500);
    }
}

setTimeout(typeBoot, 500);

// ===== MATRIX RAIN =====
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(draw, 50);

window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
});   
