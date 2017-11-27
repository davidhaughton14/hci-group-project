$('#modalDIARY').on('show.bs.modal', function (e) {
    var date = $(e.relatedTarget).data('diary-date');
    var diarytext = $(e.relatedTarget).data('diary-text');
    var rating = $(e.relatedTarget).data('diary-rating');

    var diaryHeading = "Diary entry for "+date;
    var diaryRating = rating + "/10";
    $("#diaryDate").html(diaryHeading);
    $("#diaryText").html(diarytext);
    $("#diaryRating").html(diaryRating);
})

$('#habitMODAL').on('show.bs.modal', function (e) {
    var name = $(e.relatedTarget).data('habit-name');

 	$("#blood_div").hide();
	$("#heartrate_div").hide();
	$("#sleep_div").hide();

   	if (name == "BloodPressure") {
    	$("#blood_div").show();
    	$("#heartrate_div").show();
	} else if (name == "Sleep"){
		$("#sleep_div").show();

	} else if (name == "vitaminD"){


	} else if (name == "StepCount"){

	} else {


	}


    $("#habitName").html(name);

    

})

