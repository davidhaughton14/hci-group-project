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

    $("#habitName").html(name);

    
 	$("#blood_div").hide();
	$("#heartrate_div").hide();
	$("#sleep_div").hide();
	$("#steps_div").hide();
	$("#vitd_div").hide();
	$("#general_div").hide();
	$("#calendar_general_div").hide();
	
	$("#bloodtitle").html("");
	$("#heartratetitle").html("");
	$("#sleeptitle").html("");
	$("#vitdtitle").html("");
	$("#sleeptitle").html("");
	$("#generaltitle").html("");

   	if (name == "BloodPressure") {
   		$("#bloodtitle").html("Users average daily blood pressure vs daily heart rate - past 30 days");
    	$("#blood_div").show();

    	$("#heartratetitle").html("Users average daily heart rate - past 30 days");
    	$("#heartrate_div").show();
	} else if (name == "Sleep"){
		$("#sleeptitle").html("Breakdown of users sleep vs daily mood - past 7 days");
		$("#sleep_div").show();
	} else if (name == "VitaminD"){
		$("#vitdtitle").html("Vitamin D levels vs daily mood - past 7 days");
		$("#vitd_div").show();
	} else if (name == "StepCount"){
		$("#sleeptitle").html("Number of daily steps - past 7 days");
		$("#steps_div").show();
	} else {
		$("#generaltitle").html("Daily tracked values for habit vs daily mood - past 7 days");
		$("#general_div").show();
		$("#calendar_general_div").show();
	}



    

})

