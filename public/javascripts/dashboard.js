$( document ).ready(function() {
    fillSteps();
    fillSleep();

    $("#happyRange").bootstrapSlider({
        ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ticks_labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    });

    document.getElementById("defaultOpen").click();

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

function openCity(evt, panelname) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(panelname).style.display = "block";
    evt.currentTarget.className += " active";
}
