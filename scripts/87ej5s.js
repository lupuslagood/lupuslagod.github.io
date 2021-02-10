let canvas, ctx, wave, theta;

const strokeColor = {
    h: 200,
    s: 50,
    l: 50,
};

window.onload = () => {
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext("2d");

    wave = {
        y: window.innerHeight / 2,
        length: 200000,
        amplitude: 50,
        speed: 0.05,
    };

    theta = 0;
    window.requestAnimationFrame(animation);
};

function animation(timestamp) {
    window.requestAnimationFrame(animation);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // NOTE: Right waves
    const leftOption = {
        sx: 0,
        sy: window.innerHeight / 4,
        width: window.innerWidth / 2,
        getY(i) {
            return (
                this.sy +
                Math.sin(i * wave.length + theta) * wave.amplitude * Math.sin(theta)
            );
        },
    };

    for (let i = 0; i < 24; i += 2) {
        plotSine(i, leftOption);
    }

    // NOTE: Right waves
    const rightOption = {
        sx: window.innerWidth / 2,
        sy: window.innerHeight / 4,
        width: window.innerWidth,
        getY(i) {
            return this.sy + Math.sin(i * wave.length + theta) * wave.amplitude;
        },
    };

    for (let i = 0; i < 24; i += 2) {
        plotSine(i, rightOption);
    }

    // NOTE+ Left down
    const leftDownOption = {
        sx: 0,
        sy: window.innerHeight / 2,
        width: window.innerWidth / 2,
        getY(i) {
            return this.sy + Math.sin(i * wave.length) * 20;
        },
    };

    plotSine(1, leftDownOption);

    // NOTE+ Right down
    const rightDownOption = {
        sx: 0,
        sy: window.innerHeight / 2,
        width: window.innerWidth / 2,
        getY(i) {
            return this.sy + Math.sin(i * wave.length * 2) * 4;
        },
    };
    plotSine(0, rightDownOption);

    // NOTE+ Right down
    const rightDownOption2 = {
        sx: window.innerWidth / 2,
        sy: window.innerHeight / 2,
        width: window.innerWidth,
        getY(i) {
            return this.sy + Math.sin(i * wave.length * 2) * 4;
        },
    };
    plotSine(0, rightDownOption2);

    // NOTE+ left bottome
    const leftBottomOption = {
        sx: 0,
        sy: window.innerHeight - window.innerHeight / 4,
        width: window.innerWidth / 2,
        getY(i) {
            return (
                this.sy +
                Math.sin(i * wave.length * 2) * 4 * Math.sin(i * wave.length) * 20
            );
        },
    };
    plotSine(0, leftBottomOption);

    // NOTE+ Left down
    const rightBottomOption = {
        sx: window.innerWidth / 2,
        sy: window.innerHeight - window.innerHeight / 4,
        width: window.innerWidth,
        getY(i) {
            return (
                this.sy +
                Math.sin(i * wave.length * 2 + theta) *
                4 *
                Math.sin(i * wave.length + theta) *
                20
            );
        },
    };
    plotSine(0, rightBottomOption);

    theta += wave.speed;
}

function plotSine(yOffset, opt) {
    ctx.beginPath();
    ctx.moveTo(opt.sx + yOffset, opt.sy);
    const alpha = map(yOffset, 0, 24, 1, 0);
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.lineWidth = 1;

    // NOTE: Left waves
    for (let i = opt.sx; i < opt.width; i++) {
        ctx.lineTo(i + yOffset, opt.getY(i));
    }

    ctx.stroke();
}

function map(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}