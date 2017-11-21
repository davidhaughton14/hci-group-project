$( document ).ready(function() {
    var canvas = document.getElementById('steps-progress');
    var context = canvas.getContext('2d');
    var steps = 7342;
    var stepsDifference = (10000-steps);
    var percentLeft = stepsDifference/10000;
    var fillValue = (400-(percentLeft*400));
    context.beginPath();
    context.rect(0, 0, fillValue, 40);
    context.fillStyle = 'green';
    context.fill();
    context.noStroke();
});
