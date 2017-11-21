$( document ).ready(function() {
    fillSteps();
    fillSleep();
});

function fillSteps(){
    var stepCanvas = document.getElementById('steps-progress');
    var context = stepCanvas.getContext('2d');
    var steps = 7342;
    var stepsDifference = (10000-steps);
    var percentLeft = stepsDifference/10000;
    var fillValue = (400-(percentLeft*400));
    var grd=context.createLinearGradient(0,0,fillValue,0);
    grd.addColorStop(0,"#DCEABE");
    grd.addColorStop(1,"#95d10a");
    context.beginPath();
    context.rect(0, 0, fillValue, 40);
    context.fillStyle = grd;
    context.fill();
}

function fillSleep(){
    var sleepCanvas = document.getElementById('sleep-progress');
    var context = sleepCanvas.getContext('2d');
    var steps = 6.8;
    var stepsDifference = (8-steps);
    var percentLeft = stepsDifference/8;
    var fillValue = (400-(percentLeft*400));
    var grd=context.createLinearGradient(0,0,fillValue,0);
    grd.addColorStop(0,"#DCEABE");
    grd.addColorStop(1,"#95d10a");
    context.beginPath();
    context.rect(0, 0, fillValue, 40);
    context.fillStyle = grd;
    context.fill();
}
