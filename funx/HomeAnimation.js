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
    ctx.lineWidth = 4;
    if(tnl.width!=tnl.height){//does not generate these if width=height
        makeLine(0,cenY,tnl.width,cenY);
        makeLine(cenX,0,cenX,tnl.height);
        makeLine(0,0,tnl.width,tnl.height);
        makeLine(0,tnl.height,tnl.width,0);
    }
    if(tnl.width>tnl.height){
        for(let thicc=1;thicc<3;thicc++){//top and bottom; same Y values across thicc
            makeLine((tnl.width*thicc)/3,0,(tnl.width*(3-thicc))/3,tnl.height);
        }
    } else if(tnl.width<tnl.height) {
        for (let thinn=1; thinn<3; thinn++){//left and right sides, same X values across thinn
            makeLine(0,(tnl.height*thinn)/3,tnl.width,(tnl.height*(3-thinn))/3);
        }
    } else {
        for (let squ=1; squ<4; squ++){//left and right sides, same X values across Q
            makeLine(0,(tnl.height*squ)/4,tnl.width,(tnl.height*(4-squ))/4);
            makeLine((tnl.width*squ)/4,0,(tnl.width*(4-squ))/4,tnl.height);
        }
    }
    ctx.beginPath();
    ctx.arc(cenX, cenY, 35, 0, Math.PI * 2);
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.fill();
}
function makeLine(x0,y0,x1,y1) {
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.stroke();
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
        ring.z -= 0.8; //0.8 is the speed
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