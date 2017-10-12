const TWO_PI = Math.PI * 2;
const PI = Math.PI; // consistency!!
const HALF_PI = Math.PI * 0.5;

// canvas settings
var viewWidth = 768,
    viewHeight = 512,
    container = document.getElementById("container");

window.onload = function() {
    var masterTimeline = new TimelineMax();

    masterTimeline.append(drawBackground());
    masterTimeline.append(drawCODE());
};

function drawBackground() {
    var canvas = createCanvas(),
        c = canvas.getContext('2d');

    var lines = [],
        start,
        end,
        lineStyle = {
            lineWidth:0.25,
            strokeStyle:'#00b'
        };

    var tl = new TimelineMax({onUpdate:tlUpdate});

    for (var i = 0; i <= 24; i++) {

        start = new Point(32 * i, 0);
        end = new Point(32 * i, 0);
        lines.push(new Line(start, end, lineStyle));

        tl.to(end, 0.8, {y:viewHeight, ease:Cubic.easeOut}, 0.05 * i);
    }

    for (var j = 16; j >= 0; j--) {

        start = new Point(viewWidth, 32 * j);
        end = new Point(viewWidth, 32 * j);
        lines.push(new Line(start, end, lineStyle));

        tl.to(end, 0.8, {x:0, ease:Cubic.easeOut}, 0.05 * (16 - j));
    }

    function tlUpdate() {
        c.clearRect(0, 0, viewWidth, viewHeight);
        lines.forEach(function(l) {
            l.draw(c);
        });
    }

    return tl;
}

function drawCODE() {
    var canvas = createCanvas(),
        c = canvas.getContext('2d');

    var center = new Point(viewWidth * 0.5, viewHeight * 0.5),
        top = new Point(viewWidth * 0.5, 32),
        bottom = new Point(viewWidth * 0.5, viewHeight * 0.5 + 224),
        right = new Point(viewWidth * 0.5 - 224, viewHeight * 0.5);

    var drawingCircle = new Circle(top.clone(), 0, {fillStyle:'#000'}),
        letterC = new Circle(center.clone(), 224, {strokeStyle:'#000', lineWidth:1}),
        letterO = new Circle(center.clone(), 224, {strokeStyle:'#000'}),
        letterD = new Circle(center.clone(), 224, {strokeStyle:'#000'}),
        letterDLine = new Line(top.clone(), top.clone(), {strokeStyle:'#000'}),
        letterE = new Circle(center.clone(), 224, {strokeStyle:'#000'}),
        letterELine = new Line(right.clone(), right.clone(), {strokeStyle:'#000'});

    var tl = new TimelineMax({onUpdate:tlUpdate});

    drawingCircle.pivot.copy(center);
    letterC.phiStart = letterC.phiEnd = PI + HALF_PI;
    letterO.phiStart = letterO.phiEnd = HALF_PI;
    letterO.ccw = true;
    letterD.phiStart = letterD.phiEnd = HALF_PI;
    letterD.ccw = true;
    letterE.phiStart = letterE.phiEnd = HALF_PI;

    tl.to(drawingCircle, 0.8, {radius:8, ease:Back.easeOut});

    tl.to(drawingCircle, 1, {rotation:-PI, ease:Cubic.easeInOut});
    tl.to(letterC, 1, {phiStart:HALF_PI, ease:Cubic.easeInOut}, '-=1');
    tl.to(letterC, 0.3, {radius:64, ease:Cubic.easeOut}, '-=0.1');

    tl.to(drawingCircle, 2, {rotation:-PI - TWO_PI, ease:Cubic.easeInOut});
    tl.to(letterO, 2, {phiEnd:HALF_PI - TWO_PI, ease:Cubic.easeInOut}, '-=2');

    tl.to(letterO, 0.3, {radius:64, ease:Cubic.easeOut}, '-=0.1');

    tl.to(drawingCircle, 1, {rotation:PI * -4, ease:Cubic.easeInOut});
    tl.to(letterD, 1, {phiEnd:HALF_PI - PI, ease:Cubic.easeInOut}, '-=1');

    tl.to(drawingCircle.center, 1, {y:center.y + 224, ease:Cubic.easeOut});
    tl.to(letterDLine.end, 1, {y:bottom.y, ease:Cubic.easeOut}, '-=1');

    tl.to(letterD, 0.3, {radius:64, ease:Cubic.easeIn}, '+=0.1');
    tl.to(letterDLine.start, 0.3, {y:center.y - 64, ease:Cubic.easeIn}, '-=0.3');
    tl.to(letterDLine.end, 0.3, {y:center.y + 64, ease:Cubic.easeIn}, '-=0.3');

    tl.to(letterE, 1, {phiEnd:PI + HALF_PI, ease:Cubic.easeIn});
    tl.to(drawingCircle, 1, {rotation:PI * -3, ease:Cubic.easeIn}, '-=1');
    tl.to(drawingCircle, 0.5, {rotation:PI * -3.5, ease:Cubic.easeIn});
    tl.to(drawingCircle.center, 0.5, {y:center.y, ease:Cubic.easeOut});
    tl.to(letterELine.end, 0.5, {x:center.x, ease:Cubic.easeOut}, "-=0.5");

    tl.to(letterE, 0.3, {radius:64, ease:Cubic.easeOut}, '+=0.1');
    tl.to(letterELine.start, 0.3, {x:center.x - 64, ease:Cubic.easeOut}, '-=0.3');

    tl.to(drawingCircle, 0.3, {radius:0, ease:Back.easeIn});

    var outTl = new TimelineMax();

    outTl.to(letterC.center, 0.8, {x:224, ease:Cubic.easeOut}, 0);

    outTl.to(letterO.center, 0.8, {x:320, ease:Cubic.easeOut}, 0);

    outTl.to(letterD.center, 0.8, {x:416, ease:Cubic.easeOut}, 0);
    outTl.to(letterDLine.start, 0.8, {x:416, ease:Cubic.easeOut}, 0);
    outTl.to(letterDLine.end, 0.8, {x:416, ease:Cubic.easeOut}, 0);

    outTl.to(letterE.center, 0.8, {x:576, ease:Cubic.easeOut}, 0);
    outTl.to(letterELine.start, 0.8, {x:512, ease:Cubic.easeOut}, 0);
    outTl.to(letterELine.end, 0.8, {x:576, ease:Cubic.easeOut}, 0);

    tl.append(outTl, '+=0.5');

    function tlUpdate() {
        c.clearRect(0, 0, viewWidth, viewHeight);
        letterC.draw(c);
        letterO.draw(c);
        letterD.draw(c);
        letterDLine.draw(c);
        letterE.draw(c);
        letterELine.draw(c);
        drawingCircle.draw(c);
    }

    return tl;
}

function createCanvas() {
    var canvas = document.createElement('canvas');

    canvas.width = viewWidth;
    canvas.height = viewHeight;
    container.appendChild(canvas);

    return canvas;
}

function Circle(center, radius, style) {
    this.center = center;
    this.radius = radius;
    this.style = style;

    this.phiStart = 0;
    this.phiEnd = TWO_PI;
    this.ccw = false; // counter clock wise

    this.pivot = new Point();
    this.rotation = 0;
}
Circle.prototype = {
    draw:function(ctx) {
        ctx.save();

        applyStyle(ctx, this.style);

        ctx.translate(this.pivot.x, this.pivot.y);
        ctx.rotate(this.rotation);
        ctx.translate(this.center.x - this.pivot.x, this.center.y - this.pivot.y);

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, this.phiStart, this.phiEnd, this.ccw);

        if (this.style.fillStyle) ctx.fill();
        if (this.style.strokeStyle) ctx.stroke();

        ctx.restore();
    }
};


function Line(start, end, style) {
    this.start = start;
    this.end = end;
    this.style = style;
}
Line.prototype = {
    draw:function(ctx) {
        ctx.save();

        applyStyle(ctx, this.style);

        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();

        ctx.restore();
    }
};

function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}
Point.prototype = {
    copy:function(p) {
        this.x = p.x;
        this.y = p.y;
        return this;
    },
    clone:function() {
        return new Point().copy(this);
    }
};

function applyStyle(c, s) {
    for (var p in s) {
        if (p === 'lineDash') {c.setLineDash(s[p])}
        else c[p] = s[p];
    }
}