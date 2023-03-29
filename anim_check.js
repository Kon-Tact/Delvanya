function startAnim(canvas) {
    var start = 25;
    var mid = 35;
    var end = 55;
    var width = 6;
    var leftX = start;
    var leftY = start;
    var rightX = mid + 2;
    var rightY = mid - 3;
    var animationSpeed = 15;
  
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = width;
    ctx.strokeStyle = 'rgba(0, 150, 0, 1)';
  
    for (i = start; i < mid; i++) {
        var drawLeft = window.setTimeout(function () {
            ctx.beginPath();
            ctx.moveTo(start, start);
            ctx.lineTo(leftX, leftY);
            ctx.lineCap = 'round';
            ctx.stroke();
            leftX++;
            leftY++;
        }, 1 + (i * animationSpeed) / 3);
    }
  
    for (i = mid; i < end; i++) {
        var drawRight = window.setTimeout(function () {
            ctx.beginPath();
            ctx.moveTo(leftX + 2, leftY - 3);
            ctx.lineTo(rightX, rightY);
            ctx.stroke();
            rightX++;
            rightY--;
        }, 1 + (i * animationSpeed) / 3);
    }
  }