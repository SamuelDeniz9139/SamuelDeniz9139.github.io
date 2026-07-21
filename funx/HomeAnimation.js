const tnl = document.getElementById("tunnel");
const ctx = tnl.getContext("2d");
tnl.width = window.innerWidth;
tnl.height = window.innerHeight;
let rings = [];
function initRings() {
    rings = [];
    for (let i = 0; i < 20; i++) {//40 is the max number of rings
        rings.push({
            z: i * 100,
            color: 'rgba(100, 255, 225, 0.2)'
        });
    }
}
function drawLines() {
    const cenX = tnl.width / 2;
    const cenY = tnl.height / 2;
    ctx.strokeStyle = "rgba(100,255,225,0.2)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    if(tnl.width - tnl.height <= -250){//middle line is vertical on mobile devices
        ctx.moveTo(0, cenY);
        ctx.lineTo(cenX*2,cenY);
    } else if (tnl.width > tnl.height + 250) {//middle line is horizontal on desktops
        ctx.moveTo(cenX,0);
        ctx.lineTo(cenX,cenY*2);
    }
    ctx.stroke();
    for (let q=0; q<4; q++){//left and right sides, X values are the same across all Q
        ctx.beginPath();
        ctx.moveTo(0,(tnl.height*q)/3);
        ctx.lineTo(tnl.width,(tnl.height*(3-q))/3);
        ctx.stroke();
    }
    for(let u=1;u<3;u++){//top and bottom
        ctx.beginPath();
        ctx.moveTo((tnl.width*u)/3,0);
        ctx.lineTo((tnl.width*(3-u))/3,tnl.height);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(cenX, cenY, 35, 0, Math.PI * 2);
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.fill();
}
function drawTunnel() {
    ctx.clearRect(0, 0, tnl.width, tnl.height);
    drawLines();
    const cenX = tnl.width / 2;
    const cenY = tnl.height / 2;
    for (let ring of rings) {
        const perspective = 500 / ring.z;
        const radius = perspective * 200;
        ctx.beginPath();
        ctx.arc(cenX, cenY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 2 * perspective;
        ctx.stroke();
        ring.z -= 0.5; //0.5 is the speed
        if (ring.z <= 0) {
            ring.z = 2000;
            ring.color = 'rgba(100, 255, 225, 0.2)';
        }
    }
    requestAnimationFrame(drawTunnel);
}
initRings();
drawTunnel();
window.addEventListener("resize", () => {
    tnl.width = window.innerWidth;
    tnl.height = window.innerHeight;
    initRings();
});