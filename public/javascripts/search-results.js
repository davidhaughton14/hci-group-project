$( document ).ready(function() {
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
});
