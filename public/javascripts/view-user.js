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

    //$("#habitName").html(name);
	$("#7day").hide();
	$("#30day").hide();

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

	$("#bloodtitle").css("font-weight","Bold");
	$("#heartratetitle").css("font-weight","Bold");
	$("#sleeptitle").css("font-weight","Bold");
	$("#vitdtitle").css("font-weight","Bold");
	$("#sleeptitle").css("font-weight","Bold");
	$("#generaltitle").css("font-weight","Bold");
	

   	if (name == "BloodPressure") {
   		$("#30day").show();
   		$("#bloodtitle").html("Average daily blood pressure vs daily heart rate");
    	$("#blood_div").show();

    	$("#heartratetitle").html("Average daily heart rate");
    	$("#heartrate_div").show();
	} else if (name == "Sleep"){
		$("#7day").show();
		$("#sleeptitle").html("Breakdown of sleep vs daily mood");
		$("#sleep_div").show();
	} else if (name == "VitaminD"){
		$("#7day").show();
		$("#vitdtitle").html("Vitamin D levels vs daily mood");
		$("#vitd_div").show();
	} else if (name == "StepCount"){
		$("#7day").show();
		$("#sleeptitle").html("Number of daily steps");
		$("#steps_div").show();
	} else {
		$("#30day").show();
		$("#generaltitle").html("Daily tracked values for habit vs daily mood");
		$("#general_div").show();
		$("#calendar_general_div").show();
	}



    

})

