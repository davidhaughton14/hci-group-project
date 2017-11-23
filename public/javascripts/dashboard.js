$( document ).ready(function() {
    fillSteps();
    fillSleep();
    fillDrink();
    fillSmoke();
    fillBP();
    fillvitD();
    $("#happyRange").bootstrapSlider({
        ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ticks_labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    });
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight){
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight +30+ "px";
                panel.style.paddingBottom = "15px"
                panel.style.paddingTop = "15px"
            }
            if(!(this.classList.contains("active"))){
                panel.style.paddingBottom = "0px"
                panel.style.paddingTop = "0px"
            }
        }
    }
    document.getElementById("defaultOpen").click();
});

function fillSteps(){
    var steps = 7342;
    var bar = new ProgressBar.Circle("#stepProgress", {
        color: '#95d10a',
        trailColor: '#eee',
        trailWidth: 4,
        duration: 2000,
        text: {
            autoStyleContainer: true,
        },
        easing: 'bounce',
        strokeWidth: 4,
        from: {color: '#DCEABE', a:0},
        to: {color: '#95d10a', a:1},
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            var value = Math.round(circle.value()*10000);
            if (value === 0) {
              circle.setText('');
            } else {
              circle.setText(value + " out of 10000 steps");
            }
        }
    });
    bar.animate((steps/10000));
};

function fillSleep(){
    var hours_slept = 6.8;
    var bar = new ProgressBar.Circle("#sleepProgress", {
        color: '#95d10a',
        trailColor: '#eee',
        trailWidth: 4,
        duration: 2000,
        text: {
            autoStyleContainer: true,
        },
        easing: 'bounce',
        strokeWidth: 4,
        from: {color: '#DCEABE', a:0},
        to: {color: '#95d10a', a:1},
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            var value = (circle.value()*8).toFixed(1);
            if (value === 0) {
              circle.setText('');
            } else {
              circle.setText(value + " out of 8 hours sleep");
            }
        }
    });
    bar.animate(hours_slept/8);  // Number from 0.0 to 1.0
}

function fillDrink(){
    var units_consumed = 1.8;
    var bar = new ProgressBar.Circle("#BpProgress", {
        color: '#95d10a',
        trailColor: '#eee',
        trailWidth: 4,
        duration: 2000,
        text: {
            autoStyleContainer: true,
        },
        easing: 'bounce',
        strokeWidth: 4,
        from: {color: '#DCEABE', a:0},
        to: {color: '#95d10a', a:1},
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            var value = (circle.value()*5).toFixed(1);
            if (value === 0) {
              circle.setText('');
            } else {
              circle.setText(value + " units of alcohol drank out of your limit of 5");
            }
        }
    });
    bar.animate(units_consumed/5);  // Number from 0.0 to 1.0
}

function fillSmoke(){
    var cigs_smoked = 5;
    var bar = new ProgressBar.Circle("#vitDProgress", {
        color: '#95d10a',
        trailColor: '#eee',
        trailWidth: 4,
        duration: 2000,
        text: {
            autoStyleContainer: true,
        },
        easing: 'bounce',
        strokeWidth: 4,
        from: {color: '#DCEABE', a:0},
        to: {color: '#95d10a', a:1},
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            var value = Math.round((circle.value()*10));
            if (value === 0) {
              circle.setText('');
            } else {
              circle.setText(value + " cigarettes smoked out of your limit of 10");
            }
        }
    });
    bar.animate(cigs_smoked/10);  // Number from 0.0 to 1.0
}

function fillvitD(){
    var vitD = 17.4;
    var bar = new ProgressBar.Circle("#drinkProgress", {
        color: '#95d10a',
        trailColor: '#eee',
        trailWidth: 4,
        duration: 2000,
        text: {
            autoStyleContainer: true,
        },
        easing: 'bounce',
        strokeWidth: 4,
        from: {color: '#DCEABE', a:0},
        to: {color: '#95d10a', a:1},
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            var value = (circle.value()*20).toFixed(1);
            if (value === 0) {
              circle.setText('');
            } else {
              circle.setText("Vitamin D level of " + value + " from recommended 20 ng/ml");
            }
        }
    });
    bar.animate(vitD/20);  // Number from 0.0 to 1.0
}

function fillBP(){
    var bp = 118;
    var bar = new ProgressBar.Circle("#smokeDProgress", {
        color: '#95d10a',
        trailColor: '#eee',
        trailWidth: 4,
        duration: 2000,
        text: {
            autoStyleContainer: true,
        },
        easing: 'bounce',
        strokeWidth: 4,
        from: {color: '#DCEABE', a:0},
        to: {color: '#95d10a', a:1},
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            var value = Math.round(circle.value()*120);
            if (value === 0) {
              circle.setText('');
            } else {
              circle.setText("Avg. BP value of " + value +"/80mmHg" + " from recommended 120/80mmHg");
            }
        }
    });
    bar.animate(bp/120);  // Number from 0.0 to 1.0
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
