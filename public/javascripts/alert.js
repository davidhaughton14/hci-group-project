$( document ).ready(function() {
    $(".alert").delay(3000).slideUp(600, function() {
        $(this).alert('close');
    });
});
