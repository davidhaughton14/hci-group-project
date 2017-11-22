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
    var steps = 7342;
    var bar = new ProgressBar.Circle("#stepProgress", {
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 4,
        duration: 2000,
        easing: 'bounce',
        strokeWidth: 4,
        from: {color: '#DCEABE', a:0},
        to: {color: '#95d10a', a:1},
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
        }
    });
    bar.animate((steps/10000));
};

function fillSleep(){
    var hours_slept = 6.8;
    var bar = new ProgressBar.Circle("#sleepProgress", {
        color: '#ED6A5A',
        trailColor: '#eee',
        trailWidth: 4,
        duration: 2000,
        easing: 'bounce',
        strokeWidth: 4,
        from: {color: '#DCEABE', a:0},
        to: {color: '#95d10a', a:1},
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
        }
    });
    bar.animate(hours_slept/8);  // Number from 0.0 to 1.0
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
