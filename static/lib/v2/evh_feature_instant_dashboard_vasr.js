/*

Evalhalla Instant Dashboard

Given Omar, a survey admin
When Omar admins a survey
Then Omar should see the results instantly

_E["feature"]["cortexinstantdash"]



questionType classifiedAs
- Descriptive text
```
{json msg}
```

RENDER INSTRUCTIVE_TEXT
- Do nothing, it's an instruction for render

RENDER PAGE_BREAK
- Do nothing, it's an instruction for render

MULTI_CHOICE CGROUP
- Let's treat this as a pie or horizontal bar chart
- To make charting easy I'd need the question details from the survey
- So either the dashboard pulls of copy of the survey json template to be able to get the content, or we
embed in the stats. I defer to expert opinion here on whats best.
```
{
	"uid": "test_sur_q_3",
	"questionType": "MULTI_CHOICE",
	"classifiedAs": "CGROUP",
	"stats": {
		"English": [50, 0.5],
		"French": [40, 0.4],
		"Turkish": [10, 0.1],
		...
	}
}
```

FREE_TEXT TEXTAREA
This control is going to be an odd one. It needs to handle sentiment on sentimentable stuff.
And just do some counting for the ones where sentiment makes no sense (Q: Your favorite animal sub-genus in spain)
We can do something creative where a click "turns on sentiment" for the question (but its just hide showing one of the two parts of that chart)
Similar to instadash for now
```
{
	"uid": "test_sur_q_9",
	"questionType": "FREE_TEXT",
	"classifiedAs": "TEXTAREA",
	"stats": {
		"responses": [
			{ "questionAnswer": "Blah", "count": 14 },
			{ "questionAnswer": "Blah 2", "count": 4 },
		],
		"avgSentimentScore": "0.0",
		"avgMaginitudeScore": "0.0",
		"top5PositiveResponses": [
			{
				"questionAnswer": "Blah",
				"sentimentScore": "0.0",
				"maginitudeScore": "0.0",
			},
			{
				"questionAnswer": "Blah 10",
				"sentimentScore": "0.0",
				"maginitudeScore": "0.0",
			}
		],
		"top5NegativeResponses": [
			{
				"questionAnswer": "Blah",
				"sentimentScore": "0.0",
				"maginitudeScore": "0.0",
			},
			{
				"questionAnswer": "Blah 10",
				"sentimentScore": "0.0",
				"maginitudeScore": "0.0",
			}
		]
	}
}
```

SINGLE_CHOICE SCALE_1_TO_5
Vertical bar chart, no nonsense, focus on average of the result
```
{
	"uid": "test_sur_q_7",
	"questionType": "SINGLE_CHOICE",
	"classifiedAs": "SCALE_1_TO_5",
	"stats": {
		"averageValue": "2.5",
		"values": [
			{"option": "1", "count": "14", "percentage": "0.3"},
			{"option": "2", "count": "5", "percentage": "0.1"},
			...
			{"option": "5", "count": "90", "percentage": "0.87"},
			{"option": "Unsure", "count": "5", "percentage": "0.1"}
		]
	}
},
```

SINGLE_CHOICE SCALE_1_TO_10
Vertical bar chart, no nonsense, focus on average of the result
```
{
	"uid": "test_sur_q_8",
	"questionType": "SINGLE_CHOICE",
	"classifiedAs": "SCALE_1_TO_10",
	"stats": {
		"averageValue": "5",
		"values": [
			{"option": "1", "count": "14", "percentage": "0.3"},
			{"option": "2", "count": "5", "percentage": "0.1"},
			...
			{"option": "10", "count": "90", "percentage": "0.87"},
			{"option": "Unsure", "count": "5", "percentage": "0.1"}
		]
	}
},
```

SINGLE_CHOICE RGROUP
This one is weird for now, I have some more refactoring to do to get the "classified" form controls to have unique form ids
Until then, the classified ones are being marked as SINGLE_CHOICE RGROUP. We can work around this by checking the uid for the question and
comparing it to the survey template. It's correct in the survey, so we could "know" what is what.

Long run, I'll have those marked as classified_whatever_qid_1 so we can handle them appropriately. But this is more open heart surgery than I'm ready to commit to for now.

Chart as pie or some variant thereof
```
{
	"uid": "test_sur_q_10",
	"questionType": "SINGLE_CHOICE",
	"classifiedAs": "RGROUP",
	"stats": {
		"Pizza": [50, 0.5],
		"Fish": [40, 0.4],
		"Fishza": [10, 0.1],
		...
	}
},
```

CLASSIFIED GC_Language
CLASSIFIED GC_Org
CLASSIFIED CP_CSD
CLASSIFIED GC_ClsLvl
CLASSIFIED CSPS_Offering
We can do something unique for each classified form. Barchart or pie as default for now.
But we should definitely think on this one. Until the classified_blah part is in, we can use respondent data
as placeholders as they pull from the same data.
```
{
	"uid": "test_sur_q_10",
	"questionType": "CLASSIFIED",
	"classifiedAs": "<from above keys>",
	"stats": {
		"English": [50, 0.5],
		"French": [40, 0.4],
		"Urdu": [10, 0.1],
		...
	}
},
```


*/
_E.feature.aesir = {};

_E.feature.aesir.g_chart_data = [];
_E.feature.aesir.cortex_chart_data = {};
_E.feature.aesir.g_qindex = {} // derefrence question text here
_E.feature.aesir.g_meta_data = {};
_E.feature.aesir.g_response = []; // CORTEX INTEGRATION - data pull

_E.feature.aesir.cortex_reply = []; // CORTEX INTEGRATION - data pull

_E.feature.aesir.truncate_length = 10;

_E.feature.aesir.g_chart_data_counter = 0;
_E.feature.aesir.cortex_get_survey_callback = function () {
    // TODO: Correct for CORTEX reply
    console.log("Cortex GetSurvey Callback ");
    _E.feature.aesir.cortex_reply = _E.feature.aesir.cortex_chart_data.payload.data;
    _E.feature.aesir.render_data(_E.feature.aesir.cortex_reply);
    //_E.feature.aesir.g_chart_data_counter = _E.feature.aesir.g_chart_data_counter + 1;

    /*
    _E.feature.aesir.renderinterval = setInterval(function () {
        _E.feature.aesir.cortex_get_survey();
        //if (_E.feature.aesir.g_chart_data_counter >= _E.feature.aesir.g_chart_data.length) {
        //    clearInterval(_E.feature.aesir.renderinterval);
        //}
        _E.feature.aesir.g_chart_data_counter = (_E.feature.aesir.g_chart_data_counter >= _E.feature.aesir.cortex_chart_data.length) ? 0 : _E.feature.aesir.g_chart_data_counter;
    }, 1000);*/
};
_E.feature.aesir.cortex_get_survey_callback_error = function () {
    console.log("CORTEX Connection Issue, Falling Back on Demo Data get_stat_nodes");
    _E.feature.aesir.cortex_chart_data = _E.feature.cortex.messages.get_stat_nodes();
    _E.feature.aesir.cortex_chart_data = _E.feature.aesir.cortex_chart_data[_E.feature.aesir.cortex_chart_data.length - 1];
    _E.feature.aesir.cortex_get_survey_callback();
    /*
     _E.feature.aesir.cortex_reply = _E.feature.aesir.cortex_chart_data[_E.feature.aesir.g_chart_data_counter].payload.data;
    _E.feature.aesir.render_data(_E.feature.aesir.cortex_reply);
    _E.feature.aesir.g_chart_data_counter = _E.feature.aesir.g_chart_data_counter + 1;

    _E.feature.aesir.renderinterval = setInterval(function () {
        _E.feature.aesir.cortex_reply = _E.feature.aesir.cortex_chart_data[_E.feature.aesir.g_chart_data_counter].payload.data;
        _E.feature.aesir.render_data(_E.feature.aesir.cortex_reply);
        _E.feature.aesir.g_chart_data_counter = _E.feature.aesir.g_chart_data_counter + 1;
        if (_E.feature.aesir.g_chart_data_counter >= _E.feature.aesir.g_chart_data.length) {
            clearInterval(_E.feature.aesir.renderinterval);
        }
        _E.feature.aesir.g_chart_data_counter = (_E.feature.aesir.g_chart_data_counter >= _E.feature.aesir.cortex_chart_data.length) ? 0 : _E.feature.aesir.g_chart_data_counter;
    }, 1000);
    */
};
_E.feature.aesir.cache = {};

_E.feature.aesir.available_dates = [];
// tombstone
_E.feature.aesir.available_depts = [];
_E.feature.aesir.available_classifications = [];
_E.feature.aesir.available_locations = [];
// meta
_E.feature.aesir.available_languages = [];
_E.feature.aesir.available_entrys = [];
_E.feature.aesir.available_useragents = [];
_E.feature.aesir.available_offerings = [];

_E.feature.aesir.selected_date_from = "";
_E.feature.aesir.selected_date_to = "";

_E.feature.aesir.selected_depts = "all";
_E.feature.aesir.selected_location = "all";
_E.feature.aesir.selected_classification = "all";

_E.feature.aesir.selected_language = "all";
_E.feature.aesir.selected_entry = "all";
_E.feature.aesir.selected_useragent = "all";
_E.feature.aesir.selected_offering = "all";

_E.feature.aesir.cortex_chart_data_excluded = [];

_E.feature.aesir.populate_filter_controls = function (control) {
    let html_available = `<option value="all" selected>All</option>`;
    for (let i = 0; i < _E.feature.aesir["available_" + control + "s"].length; i++) {
        html_available += `<option value="${encodeURIComponent(_E.feature.aesir["available_" + control + "s"][i])}">${(_E.feature.aesir["available_" + control + "s"][i] == "" ? "Blank" : _E.feature.aesir["available_" + control + "s"][i])}</option>`;
    }
    //alert(html_available_dates);
    $("#selected_" + control).html(html_available);

    //if (_E.feature.aesir.selected_depts == "") {
    //    $("#selected_dept").val(_E.feature.aesir.available_depts[0]);
    //} else {
    $("#selected_" + control).val(_E.feature.aesir["selected_" + control]);
    //}
    $("#selected_" + control).on("change", function () {
        //alert("from changed");
        _E.feature.aesir["selected_" + control] = $("#selected_" + control).val();
        _E.feature.aesir.cortex_get_survey(_E.feature.qparam.settings.sur);
    });
};
_E.feature.aesir.populate_dept_filter_controls = function () {
    let html_available_depts = `<option value="all" selected>All</option>`;
    for (let i = 0; i < _E.feature.aesir.available_depts.length; i++) {
        html_available_depts += `<option value="${encodeURIComponent(_E.feature.aesir.available_depts[i])}">${(_E.feature.aesir.available_depts[i] == "" ? "Blank" : _E.feature.aesir.available_depts[i])}</option>`;
    }
    //alert(html_available_dates);
    $("#selected_dept").html(html_available_depts);

    //if (_E.feature.aesir.selected_depts == "") {
    //    $("#selected_dept").val(_E.feature.aesir.available_depts[0]);
    //} else {
    $("#selected_dept").val(_E.feature.aesir.selected_depts);
    //}
    $("#selected_dept").on("change", function () {
        //alert("from changed");
        _E.feature.aesir.selected_depts = $("#selected_dept").val();
        _E.feature.aesir.cortex_get_survey(_E.feature.qparam.settings.sur);
    });
};
_E.feature.aesir.populate_date_filter_controls = function () {
    let html_available_dates = ``;
    for (let i = 0; i < _E.feature.aesir.available_dates.length; i++) {
        html_available_dates += `<option value="${encodeURIComponent(_E.feature.aesir.available_dates[i])}">${_E.feature.aesir.available_dates[i]}</option>`;
    }
    //alert(html_available_dates);
    $("#selected_date_from").html(`<option value="2000-01-01" selected>All</option>` + html_available_dates);
    $("#selected_date_to").html(html_available_dates + `<option value="2100-01-01" selected>All</option>`);

    if (_E.feature.aesir.selected_date_from == "") {
        $("#selected_date_from").val(_E.feature.aesir.available_dates[0]);
    } else {
        $("#selected_date_from").val(_E.feature.aesir.selected_date_from);
    }
    $("#selected_date_from").on("change", function () {
        //alert("from changed");
        _E.feature.aesir.selected_date_from = $("#selected_date_from").val();
        _E.feature.aesir.cortex_get_survey(_E.feature.qparam.settings.sur);
    });
    if (_E.feature.aesir.selected_date_to == "") {
        $("#selected_date_to").val(_E.feature.aesir.available_dates[_E.feature.aesir.available_dates.length - 1]);
    } else {
        $("#selected_date_to").val(_E.feature.aesir.selected_date_to);
    }
    $("#selected_date_to").on("change", function () {
        //alert("to changed");
        _E.feature.aesir.selected_date_to = $("#selected_date_to").val();
        _E.feature.aesir.cortex_get_survey(_E.feature.qparam.settings.sur);
    });
};
_E.feature.aesir.cortex_filter_survey_responses = function (response) {
    let required_responses = [];
    let excluded_responses = [];

    // date selection
    let selected_date_from = "";
    let selected_date_to = "";
    if (_E.feature.aesir.selected_date_from == "") {
        selected_date_from = (typeof $("#selected_date_from").val() === "undefined") ? "2000-01-01" : $("#selected_date_from option:first").val();
    } else {
        selected_date_from = _E.feature.aesir.selected_date_from;
    }
    if (_E.feature.aesir.selected_date_to == "") {
        selected_date_to = (typeof $("#selected_date_to").val() === "undefined") ? "2100-01-01" : $("#selected_date_to option:last").val();
    } else {
        selected_date_to = _E.feature.aesir.selected_date_to;
    }

    //console.log("t: " + selected_date_to + " f:" + selected_date_from);

    // dept selection
    let selected_depts = [];
    //if (_E.feature.aesir.selected_depts == "") {
    //    selected_depts = (typeof $("#selected_depts").val() === "undefined") ? "all" : $("#selected_depts").val();
    //} else {
    selected_depts = _E.feature.aesir.selected_depts;
    //}
    let selected_classification = [];
    selected_classification = _E.feature.aesir.selected_classification;
    let selected_location = [];
    selected_location = _E.feature.aesir.selected_location;

    let selected_language = [];
    selected_language = _E.feature.aesir.selected_language;
    let selected_entry = [];
    selected_entry = _E.feature.aesir.selected_entry;
    let selected_useragent = [];
    selected_useragent = _E.feature.aesir.selected_useragent;
    let selected_offering = [];
    selected_offering = _E.feature.aesir.selected_offering;

    // filter
    let available_dates = [];
    let available_depts = [];
    let available_classifications = [];
    let available_locations = [];

    let available_languages = [];
    let available_entrys = [];
    let available_useragents = [];
    let available_offerings = [];

    for (let i = 0; i < response.length; i++) {

        let subtime = response[i]["meta_submission_time"].split("T")[0];
        if (available_dates.includes(subtime) == false) { available_dates.push(subtime); }
        let curr = new Date(subtime + "T00:00");
        let from = new Date(selected_date_from + "T00:00");
        let to = new Date(selected_date_to + "T00:00");
        let date_condition = (curr <= to && curr >= from);

        let tombstone_dept = decodeURIComponent(response[i]["tombstone_department"]);
        if (available_depts.includes(tombstone_dept) == false) { available_depts.push(tombstone_dept); }
        let dept_condition = (decodeURIComponent(selected_depts) == tombstone_dept || selected_depts == "all");

        let tombstone_classification = decodeURIComponent(response[i]["tombstone_classification"].split("-")[0]);
        if (available_classifications.includes(tombstone_classification) == false) { available_classifications.push(tombstone_classification); }
        let classification_condition = (decodeURIComponent(selected_classification) == tombstone_classification || selected_classification == "all");

        let tombstone_location = decodeURIComponent(response[i]["tombstone_city"]);
        if (available_locations.includes(tombstone_location) == false) { available_locations.push(tombstone_location); }
        let location_condition = (decodeURIComponent(selected_location) == tombstone_location || selected_location == "all");

        // meta
        let tombstone_language = decodeURIComponent(response[i]["tombstone_language"]);
        if (available_languages.includes(tombstone_language) == false) { available_languages.push(tombstone_language); }
        let language_condition = (decodeURIComponent(selected_language) == tombstone_language || selected_language == "all");

        let meta_useragent = decodeURIComponent(response[i]["meta_useragent"].split("(")[1].split(")")[0]);
        if (available_useragents.includes(meta_useragent) == false) { available_useragents.push(meta_useragent); }
        let useragent_condition = (decodeURIComponent(selected_useragent) == meta_useragent || selected_useragent == "all");

        let meta_entry = decodeURIComponent(response[i]["meta_entry_method"]);
        if (available_entrys.includes(meta_entry) == false) { available_entrys.push(meta_entry); }
        let entry_condition = (decodeURIComponent(selected_entry) == meta_entry || selected_entry == "all");

        let tombstone_offering = decodeURIComponent(response[i]["tombstone_offering_id"]);
        if (available_offerings.includes(tombstone_offering) == false) { available_offerings.push(tombstone_offering); }
        let offering_condition = (decodeURIComponent(selected_offering) == tombstone_offering || selected_offering == "all");

        //console.log(date_condition + " " + dept_condition);


        let qfilter = _E.feature.aesir.question_level_filter; //= { "qid": cr.uid, "test": test_val };
        let q_condition = true;
        if (typeof qfilter === "undefined") {
            q_condition = true;
        } else {
            if (typeof qfilter["qid"] === "undefined") {
                q_condition = true;
            } else {
                let scaleqf = qfilter["qid"].replace(_E.feature.qparam.settings.sur.toUpperCase(), "scale").replace("_q_", "_qid_");
                let scale15qf = qfilter["qid"].replace(_E.feature.qparam.settings.sur.toUpperCase(), "scale1to5").replace("_q_", "_qid_");
                let scale110qf = qfilter["qid"].replace(_E.feature.qparam.settings.sur.toUpperCase(), "scale1to10").replace("_q_", "_qid_");
                let scaletxtqf = qfilter["qid"].replace(_E.feature.qparam.settings.sur.toUpperCase(), "textarea").replace("_q_", "_qid_");
                let scaleddqf = qfilter["qid"].replace(_E.feature.qparam.settings.sur.toUpperCase(), "dropdown").replace("_q_", "_qid_");
                let scalergqf = qfilter["qid"].replace(_E.feature.qparam.settings.sur.toUpperCase(), "rgroup").replace("_q_", "_qid_");
                let scalecgqf = qfilter["qid"].replace(_E.feature.qparam.settings.sur.toUpperCase(), "cgroup").replace("_q_", "_qid_");

                //qfilter["test"] = encodeURIComponent(qfilter["test"]);
                if (qfilter["test"] == "Blank") { qfilter["test"] = ""; }

                q_condition = false ||
                    encodeURIComponent(response[i][scaleqf]) == qfilter["test"] ||
                    encodeURIComponent(response[i][scale15qf]) == qfilter["test"] ||
                    encodeURIComponent(response[i][scale110qf]) == qfilter["test"] ||
                    encodeURIComponent(response[i][scaletxtqf]) == qfilter["test"] ||
                    encodeURIComponent(response[i][scaleddqf]) == qfilter["test"] ||
                    encodeURIComponent(response[i][scalergqf]) == qfilter["test"] ||
                    encodeURIComponent(response[i][scalecgqf]).includes(qfilter["test"]);
            }
        }


        if (date_condition == true &&
            dept_condition == true &&
            classification_condition == true &&
            location_condition == true &&
            language_condition == true &&
            useragent_condition == true &&
            entry_condition == true &&
            offering_condition == true &&
            q_condition == true) {
            required_responses.push(response[i]);
        } else {
            excluded_responses.push(response[i]);
        }
        // TODO: Add multiday values
    }

    //console.log(JSON.stringify(available_depts));
    //console.log(JSON.stringify(selected_depts));

    _E.feature.aesir.available_dates = available_dates.sort();
    _E.feature.aesir.available_depts = available_depts.sort();
    _E.feature.aesir.available_classifications = available_classifications.sort();
    _E.feature.aesir.available_locations = available_locations.sort();

    _E.feature.aesir.available_languages = available_languages.sort();
    _E.feature.aesir.available_useragents = available_useragents.sort();
    _E.feature.aesir.available_entrys = available_entrys.sort();
    _E.feature.aesir.available_offerings = available_offerings.sort();


    _E.feature.aesir.cortex_chart_data_excluded = excluded_responses;

    return required_responses;
}
_E.feature.aesir.cortex_get_survey = function (survey) {
    //$.get("https://survistaapp.com/api/surveys/schemaless?title=" + survey, function (response) {
    //console.log(_E.feature.aesir.g_chart_data.length);

    $.get("https://survistaapp.com/api/surveys/schemaless?title=" + _E.feature.qparam.settings.sur.toUpperCase(), function (response) {
        //_E.feature.instadash.render_data(response);

        // sets: _E.feature.aesir.cortex_chart_data_excluded
        // sets: _E.feature.aesir.available_dates
        response = _E.feature.aesir.cortex_filter_survey_responses(response);
        _E.feature.aesir.cache_incoming = response;


        //$("#render_target").append(`<div><pre>${JSON.stringify(converted_aesir_format, null, 4)}</pre></div>`);
        if (JSON.stringify(_E.feature.aesir.cache) !== JSON.stringify(_E.feature.aesir.cache_incoming)) {

            //response = _E.feature.aesir.cortex_filter_survey_responses(response);

            _E.feature.aesir.cortex_chart_data = _E.feature.cortex.messages.convert_survista_to_aesir(response);
            //console.log(JSON.stringify(_E.feature.aesir.cache) + "\n\n" + JSON.stringify(_E.feature.aesir.cache_incoming));
            _E.feature.aesir.cache = _E.feature.aesir.cache_incoming;

            _E.feature.aesir.cortex_get_survey_callback();
            // TODO: Renable for refresh
            //_E.feature.aesir.stop_auto_refresh();
        }
        //_E.feature.instadash.stop_auto_refresh();
    });
    // TODO: Turn on for test data
    //console.log("Evalhalla -[consumeSurveyMetrics]-> CORTEX");
    //_E.feature.aesir.g_chart_data = _E.feature.cortex.messages.get_stat_nodes();
    /*consumeSurveyMetrics(
        _E.feature.qparam.settings.sur,
        _E.feature.aesir.cortex_chart_data,
        (_E.feature.qparam.settings.fallback == "true") ? _E.feature.aesir.cortex_get_survey_callback_error : _E.feature.aesir.cortex_get_survey_callback,
        _E.feature.aesir.cortex_get_survey_callback_error
    );*/
}
_E.feature.aesir.tmr = null;
_E.feature.aesir.stop_auto_refresh = function () {
    clearInterval(_E.feature.aesir.tmr);
    _E.feature.aesir.tmr = null;
}

_E.feature.aesir.start_auto_refresh = function () {
    _E.feature.aesir.cortex_get_survey(_E.feature.qparam.settings.sur);
    clearInterval(_E.feature.aesir.tmr);
    _E.feature.aesir.tmr = null;
    _E.feature.aesir.tmr = setInterval(function () {
        _E.feature.aesir.cortex_get_survey(_E.feature.qparam.settings.sur);
    }, 4000);
}
_E.feature.aesir.backgroundColors = [];
_E.feature.aesir.populate_background_colors = function () {
    _E.feature.aesir.backgroundColors = [];
    //for (let i = 0; i < 1000; i++) {
    //    _E.feature.aesir.backgroundColors.push(_E.fxn.common.randomHsl());
    //}

    //https://gka.github.io/palettes/#/50|d|96ffea,0000c8,ffb179|fbff7c,ff005e,93003a|0|1

    let main_colors = [
        // Elmina Color Safe Pallette
        "#1E6D80",
        "#77259A",
        "#235BC1",
        "#9C233E",
        "#D0481B",
        "#3C3D6B",
        "#208088",//"#61CFDA", fails wcag
        "#DF2A51",
        "#3A8248",//"#51B063", fails wvg
        "#008533",//"#00EE5C", fails wvag
        "#6B5A30",
        "#876AA0",
        "#CA16DA",//"#EA82F3", fails wcag
        "#9CB237",
        "#38870D",//"#B4F690", fails wcag
        "#6F362C",
        "#0E76D8",//"#459FF3", fails wcag
        "#F7E6C2",
        "#008571",//"#00E6C2", fails wcag
        // Additional Colors
        '#fdd835',
        '#fbc02d', '#a8f925', '#f5177f', '#ff7c4d', '#00429d', '#204fa3', '#315ca9', '#4069af',
        '#4d77b5', '#5985bb', '#6593c0', '#71a1c6', '#7eafcb', '#8bbdd0', '#ffe5cc', '#ffcab9', '#ffaea5',
        '#fd9291', '#f4777f', '#e75d6f', '#d84360', '#c52a52', '#ae1045', '#93003a',
        'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)']
    let extended_colors = ['#ffb179', '#f4a481', '#e99889', '#df8e90', '#d58596', '#cc7e9c', '#c378a1', '#bb74a7', '#b371ac', '#ac6fb1', '#a66fb5', '#a070ba', '#9b72be', '#9776c3', '#937ac7', '#9080cb', '#8e87cf', '#8d90d3', '#8c99d6', '#8ca4da', '#8dafdd', '#8ebde0', '#90cbe3', '#92dbe6', '#94ece8', '#fef17a', '#ffe378', '#ffd575', '#ffc873', '#ffbb71', '#feaf6e', '#fca26c', '#fa9769', '#f78b66', '#f38064', '#ef7461', '#ea6a5e', '#e55f5c', '#e05559', '#da4b56', '#d44253', '#ce3850', '#c72f4e', '#c1264b', '#ba1e48', '#b21545', '#ab0d42', '#a30540', '#9b013d', '#93003a'];
    //_E.fxn.common.shuffle_array(extended_colors);


    _E.feature.aesir.backgroundColors = main_colors.concat(extended_colors);

    /*
        for (let i = 0; i < 1000; i++) {
            _E.feature.aesir.backgroundColors.push(_E.fxn.common.randomHsl());
        }*/
    //_E.fxn.common.shuffle_array(_E.feature.aesir.backgroundColors);
};

_E.feature.aesir.build_bar_chart = function (chartd) {
    //console.log(chartd);
    var ctx = document.getElementById('chart_' + chartd.target_qid + '').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartd.d_labels,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Responses',
                data: chartd.d_data//[12, 19, 3, 5, 2, 3]
                , backgroundColor: _E.feature.aesir.backgroundColors/*[
                    'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'
                ]*/
                /*, borderColor: [
                    'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'
                ],*/
                , borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                labels: {
                    // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                    render: 'value'
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMin: 10,
                        suggestedMax: 10,
                        minHeight: 10
                    }
                }]
            },
            legend: {
                display: false,
                position: 'right'
            }
        }

    });
};

_E.feature.aesir.build_pie_chart = function (chartd) {
    //console.log(chartd);
    var ctx = document.getElementById('chart_' + chartd.target_qid + '').getContext('2d');
    // And for a doughnut chart
    var myDoughnutChart = new Chart(ctx, {
        "type": "doughnut",
        "data": {
            "labels": chartd.d_labels,//["Red", "Blue", "Yellow"], 
            "datasets": [
                {
                    "label": '% Responses',
                    "data": chartd.d_data
                    , "backgroundColor": _E.feature.aesir.backgroundColors /*[
                        'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
                        '#fdd835', '#fbc02d', '#a8f925', '#f5177f', '#ff7c4d'
                    ]*/
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                labels: [
                    {
                        render: 'label',
                        position: 'outside',
                        arc: true,
                        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        overlap: false,
                    },
                    {
                        render: 'value',
                        fontColor: '#fff',
                        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    }
                ]
            },
            legend: {
                display: false,
                position: 'top'
            }
        }
    });
}

//_E.feature.aesir.cortex_chart_data_excluded
//_E.feature.aesir.available_dates
// <option value="10">10</option>
_E.feature.aesir.build_respondent_chart = function (chartd) {
    let render_html = `
            <div class="col s12 m9" style="float:top;">
                <div class="card-panel">
                             <!-- <p style="font-weight:bold;font-size:0.9em;bottom:0.25rem;line-height:1.2em;">
                                <span class='en'>${_E.fxn.common.label_blackart_spacewrap(_E.feature.qparam.settings.sur)} Dashboard (${_E.feature.aesir.stat_data.total_responses} Replies)</span>
                               <span class='fr'>Statistique Generale/span>
                            </p> -->
                           
                    <div class="row">
                        <div class="col s12">
                            <div id="edtable_general" class="ctx_datatable">${chartd.html}</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s3">
                            <button class="ctx_expand_charts btn btn-large purp-canada-ca"><em class="material-icons fab-align" aria-hidden="true">exposure</em></button>
                        </div>
                        <div class="col s3" >
                            <button class="ctx_live_charts btn btn-large purp-canada-ca"><em class="material-icons fab-align" aria-hidden="true">repeat</em></button>
                        </div>
                        <div class="col s3">
                            <button class="ctx_advfilters btn btn-large purp-canada-ca"><em class="material-icons fab-align" aria-hidden="true">filter_list</em></button>
                        </div>
                        <div class="col s3">
                            <button class="ctx_tableview btn btn-large purp-canada-ca"><em class="material-icons fab-align" aria-hidden="true">grid_on</em></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col s12 m3" style="float:top;">
                <div class="card-panel">
                    <div class="row">   
                        <div class="col s12" >
                            <label class="lg-lbl" for="selected_date_from" id="lbl_selected_date_from">
                                <span class="en evh-parser-ignore">From Date</span>
                                <span class="fr evh-parser-ignore">De Date</span>
                            </label>
                            <select class="browser-default" id="selected_date_from" name="selected_date_from" aria-labelledby="lbl_selected_date_from">
                            </select>
                        </div>
                        <div class="col s12" >
                            <label class="lg-lbl" for="selected_date_to" id="lbl_selected_date_to">
                                <span class="en evh-parser-ignore">To Date</span>
                                <span class="fr evh-parser-ignore">A Date</span>
                            </label>
                            <select class="browser-default" id="selected_date_to" name="selected_date_to" aria-labelledby="lbl_selected_date_to">
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col s12 m12 advfilters" style="float:top;">
                <div class="card-panel">
                    <div class="row">   
                        <div class="col s12">
                            <span><sup>Report filters (Allows multiple filters per report)</sup></span>
                        </div>
                        <div class="col s12 m4" >
                            <label class="lg-lbl" for="selected_dept" id="lbl_selected_dept">
                                <span class="en evh-parser-ignore">Department</span>
                                <span class="fr evh-parser-ignore">Department</span>
                            </label>
                            <select class="browser-default" id="selected_dept" name="selected_dept" aria-labelledby="lbl_selected_dept">
                            </select>
                        </div>
                        <div class="col s12 m4" >
                            <label class="lg-lbl" for="selected_classification" id="lbl_selected_classification">
                                <span class="en evh-parser-ignore">Classification</span>
                                <span class="fr evh-parser-ignore">Niveau du post</span>
                            </label>
                            <select class="browser-default" id="selected_classification" name="selected_classification" aria-labelledby="lbl_selected_classification">
                            </select>
                        </div>
                        <div class="col s12 m4" >
                            <label class="lg-lbl" for="selected_location" id="lbl_selected_location">
                                <span class="en evh-parser-ignore">City</span>
                                <span class="fr evh-parser-ignore">Ville</span>
                            </label>
                            <select class="browser-default" id="selected_location" name="selected_location" aria-labelledby="lbl_selected_location">
                            </select>
                        </div>
                    </div>
                    <div class="row">   
                        <div class="col s12 m3" >
                            <label class="lg-lbl" for="selected_language" id="lbl_selected_language">
                                <span class="en evh-parser-ignore">Language</span>
                                <span class="fr evh-parser-ignore">Langue</span>
                            </label>
                            <select class="browser-default" id="selected_language" name="selected_language" aria-labelledby="lbl_selected_language">
                            </select>
                        </div>
                        <div class="col s12 m3" >
                            <label class="lg-lbl" for="selected_useragent" id="lbl_selected_useragent">
                                <span class="en evh-parser-ignore">User Agent</span>
                                <span class="fr evh-parser-ignore">Agent d'User</span>
                            </label>
                            <select class="browser-default" id="selected_useragent" name="selected_useragent" aria-labelledby="lbl_selected_useragent">
                            </select>
                        </div>
                        <div class="col s12 m3" >
                            <label class="lg-lbl" for="selected_entry" id="lbl_selected_entry">
                                <span class="en evh-parser-ignore">Entry</span>
                                <span class="fr evh-parser-ignore">Entre</span>
                            </label>
                            <select class="browser-default" id="selected_entry" name="selected_entry" aria-labelledby="lbl_selected_entry">
                            </select>
                        </div>
                        <div class="col s12 m3" >
                            <label class="lg-lbl" for="selected_offering" id="lbl_selected_offering">
                                <span class="en evh-parser-ignore">Offering</span>
                                <span class="fr evh-parser-ignore">Offre</span>
                            </label>
                            <select class="browser-default" id="selected_offering" name="selected_offering" aria-labelledby="lbl_selected_offering">
                            </select>
                        </div>
                    </div>
                </div>
            </div>`;
    return render_html;
}

_E.feature.aesir.convert_to_star_rating = function (a) {
    /* STAR RATING FOR SENTIMENT
         +1 = 5*
        0.4 = 4*
        0.0 = 3*
       -0.4 = 2*
       -1.0 = 1*
    */
    let s = 3;
    if (a == 1.0) {
        s = 5;
    } else if (a < 1.0 && a >= 0.4) {
        s = 4;
    } else if (a < 0.4 && a >= 0.0) {
        s = 3;
    } else if (a < 0.0 && a > -0.4) {
        s = 2;
    } else if (a <= -0.4) {
        s = 1;
    }
    let h = '<span style="font-size:2.3em;">&#9733;' + s + '</span><br />';

    return h;
}

_E.feature.aesir.convert_to_color_rating = function (a) {
    /* STAR RATING FOR SENTIMENT
         +1 = 5*
        0.4 = 4*
        0.0 = 3*
       -0.4 = 2*
       -1.0 = 1*
    */
    let s = "#666666;";
    if (a == 1.0) {
        s = "#aaffaa;";
    } else if (a < 1.0 && a >= 0.4) {
        s = "rgb(44, 200, 142)";
    } else if (a < 0.4 && a >= 0.0) {
        s = "rgb(54, 162, 235)";
    } else if (a < 0.0 && a > -0.4) {
        s = "#ffcc00";
    } else if (a <= -0.4) {
        s = "rgb(255, 99, 132)";
    }

    return s;
}

_E.feature.aesir.stat_data = {
    "total_responses": 0
};
_E.feature.aesir.render_data = function (response) {
    $("#render_target").html("");
    let render_html = "";
    // console.log("Should see: " + response.length);
    for (let i = 0; i < response.length; i++) {
        let cr = response[i];
        // console.log(i + " ITEM");
        // console.log(cr);
        let ql = JSON.parse(cr.question);
        if (cr.stats == null) {
            continue;
        }
        // console.log("ok")

        //Inital html to show
        render_html = `
            <div class="ctx_crt col s12 m6" style="float:top;"><div class="card-panel">
                <span class="badge">#${cr.uid.split("_").slice(-1)[0]}</span>
                <p style="font-weight:bold;font-size:0.9em;bottom:0.25rem;line-height:1.2em;">
                    <span class='en'>${ql[0] ? ql[0] : cr.uid}</span>
                    <!-- <span class='fr'>${ql[1] ? ql[1] : cr.uid}</span> -->
                </p>
                <sub><strong id="${'chart_totals_' + cr.uid}"></strong> Responses</sub>
                <canvas id="${'chart_' + cr.uid}" width="300" height="300"></canvas>
                <div id="edtable_sentiment_${'chart_' + cr.uid}" class="ctx_datatable_sentiment"></div>
                <div id="edtable_filter_${'chart_' + cr.uid}" class="ctx_datatable_filter"></div>
                <div id="edtable_${'chart_' + cr.uid}" class="ctx_datatable"></div>
                <pre class="ctx_msg">${JSON.stringify(cr, null, 2)}</pre>
            </div></div>`;

        // console.log("ok 2")

        //Render the intial HTML
        $("#render_target").append(render_html);

        resp_to_chart = {
            target_qid: cr.uid,
            d_labels: [],
            d_data: []
        };

        // console.log("ok 3")



        let stats = JSON.parse(cr.stats);
        let statsKeys = (stats) ? Object.keys(stats) : [];
        let statsKeysGrouped = {};
        let statDataTable = [];

        let options_select = `<option value="all" selected>All</option>`;
        _E.feature.aesir.stat_data.total_responses = 0;
        for (let ii = 0; ii < statsKeys.length; ii++) {
            if (cr.questionType.includes('CLASSIFIED')) {
                // accumulate grouped stats
                let groupedStatsKey = (cr.classifiedAs == "GC_ClsLvl") ? statsKeys[ii].split("-")[0] : statsKeys[ii];
                if (typeof statsKeysGrouped[groupedStatsKey] === "undefined") {
                    statsKeysGrouped[groupedStatsKey] = parseInt(stats[statsKeys[ii]], 10);
                } else {
                    statsKeysGrouped[groupedStatsKey] += parseInt(stats[statsKeys[ii]], 10);
                }
                options_select += `<option value="${encodeURIComponent(groupedStatsKey)}">${groupedStatsKey}</option>`;
                _E.feature.aesir.stat_data.total_responses += parseInt(stats[statsKeys[ii]], 10);
            } else {
                (stats) ? statDataTable.push(
                    { "statKey": statsKeys[ii], "statValue": parseInt(stats[statsKeys[ii]], 10), "statBg": _E.feature.aesir.backgroundColors[ii] }
                ) : true;
                _E.feature.aesir.stat_data.total_responses += parseInt(stats[statsKeys[ii]], 10);
                options_select += `<option value="${encodeURIComponent(statsKeys[ii])}">${statsKeys[ii]}</option>`;
            }
        }
        cr.total = _E.feature.aesir.stat_data.total_responses;


        $(`#edtable_filter_${'chart_' + cr.uid}`).html(`
            <div class="advfilters" >
                <label class="lg-lbl" for="selected_edtable_filter_${'chart_' + cr.uid}" id="lbl_selected_edtable_filter_${'chart_' + cr.uid}">
                    <span class="en evh-parser-ignore">Question Filter <sup>(matching answer)</sup></span>
                    <span class="fr evh-parser-ignore">Question Filtre <sup>(Max 1 pour report)</sup></span>
                </label>
                <select class="browser-default" id="selected_edtable_filter_${'chart_' + cr.uid}" name="selected_edtable_filter_${'chart_' + cr.uid}" aria-labelledby="lbl_selected_edtable_filter_${'chart_' + cr.uid}">
                ${options_select}
                </select>
            </div>
        `);

        /*alert((typeof _E.feature.aesir.question_level_filter === "undefined") ? "all" : (_E.feature.aesir.question_level_filter.test == "" ? "Blank" : _E.feature.aesir.question_level_filter.test));
        $(`#selected_edtable_filter_${'chart_' + cr.uid}`).val(
            (typeof _E.feature.aesir.question_level_filter === "undefined") ? "all" : _E.feature.aesir.question_level_filter.test == "" ? encodeURIComponent("Blank") : _E.feature.aesir.question_level_filter.test
        );
        //console.log($(`#selected_edtable_filter_${'chart_' + cr.uid}`).val());
        if ($(`#selected_edtable_filter_${'chart_' + cr.uid}`).val() == null) {
            $(`#selected_edtable_filter_${'chart_' + cr.uid}`).val("all");
        }
        */
        let set_val = "all";
        if (typeof _E.feature.aesir.question_level_filter === "undefined") {
            set_val = "all";
        } else {
            if (cr.uid == _E.feature.aesir.question_level_filter.qid) {
                if (_E.feature.aesir.question_level_filter.test == "") {
                    set_val = encodeURIComponent("Blank");
                } else {
                    set_val = _E.feature.aesir.question_level_filter.test;
                }
            }
        }
        $(`#selected_edtable_filter_${'chart_' + cr.uid}`).val(set_val);
        if ($(`#selected_edtable_filter_${'chart_' + cr.uid}`).val() == null) {
            $(`#selected_edtable_filter_${'chart_' + cr.uid}`).val("all");
        }

        $(`#selected_edtable_filter_${'chart_' + cr.uid}`).on("change", function () {
            let test_val = $(`#selected_edtable_filter_${'chart_' + cr.uid}`).val();
            if (test_val == "all") {
                _E.feature.aesir.question_level_filter = undefined;
            } else {
                _E.feature.aesir.question_level_filter = { "qid": cr.uid, "test": test_val };
            }
            //alert($(`#selected_edtable_filter_${'chart_' + cr.uid}`).val());
            _E.feature.aesir.cortex_get_survey(_E.feature.qparam.settings.sur);
        })

        // console.log("ok 4")

        $("#chart_totals_" + cr.uid).html(cr.total);

        if (cr.questionType.includes('CLASSIFIED') || cr.uid.includes('_entry') || cr.uid.includes('_useragent')) {
            $(`#edtable_filter_${'chart_' + cr.uid}`).remove();
        }

        if (cr.questionType.includes('CLASSIFIED')) {
            $(`#edtable_filter_${'chart_' + cr.uid}`).remove();
            let statsKeysGroupedIds = (statsKeysGrouped) ? Object.keys(statsKeysGrouped) : [];
            for (let ii = 0; ii < statsKeysGroupedIds.length; ii++) {
                (stats) ? statDataTable.push(
                    { "statKey": statsKeysGroupedIds[ii], "statValue": parseInt(statsKeysGrouped[statsKeysGroupedIds[ii]], 10), "statBg": _E.feature.aesir.backgroundColors[ii] }
                ) : true;
            }
        }

        statDataTable.sort(function (a, b) {
            return b.statValue - a.statValue;
        });

        //console.log("ok 5")

        for (let ii = 0; ii < statDataTable.length; ii++) {
            // color override
            statDataTable[ii].statBg = _E.feature.aesir.backgroundColors[ii];
            _E.feature.aesir.backgroundColors[ii] = statDataTable[ii].statBg;
            resp_to_chart.d_labels.push(_E.fxn.common.label_truncate(statDataTable[ii].statKey, _E.feature.aesir.truncate_length));
            (stats) ? resp_to_chart.d_data.push(
                parseInt(statDataTable[ii].statValue, 10)
            ) : true;
        }


        let recLimit = 13; // setting to 13, but arbitrary really
        let item_count = (statDataTable.length < recLimit) ? statDataTable.length : recLimit;
        let others = {
            "statValue": 0,
            "statKey": `Other Answers`,
            "statOtherCategories": `(${statDataTable.length - recLimit} Categories)`,
            "statBg": "#333333"
        };
        if (statDataTable.length > recLimit) {
            for (let iii = recLimit; iii < statDataTable.length; iii++) {
                others.statValue += statDataTable[iii].statValue;
            }
            // truncate arrays
            resp_to_chart.d_data = resp_to_chart.d_data.slice(0, recLimit)
            resp_to_chart.d_labels = resp_to_chart.d_labels.slice(0, recLimit)
            // add others
            resp_to_chart.d_data.push(others.statValue);
            resp_to_chart.d_labels.push(others.statKey + " " + others.statOtherCategories);
        }

        //console.log("ok 6 CLS:[" + cr.classifiedAs + "]");
        //console.log(cr);

        //Depending on the type of the question, build a different type of chart
        //console.log(cr.classifiedAs);
        if (cr.classifiedAs.includes('SCALE')) {
            _E.feature.aesir.build_bar_chart(resp_to_chart);
        }
        //Depending on the type of the question, build a different type of chart
        if (cr.classifiedAs.includes('CGROUP')) {
            _E.feature.aesir.build_pie_chart(resp_to_chart);
        }
        if (cr.classifiedAs.includes('RGROUP')) {
            _E.feature.aesir.build_pie_chart(resp_to_chart);
        }
        if (cr.questionType.includes('CLASSIFIED')) {
            _E.feature.aesir.build_pie_chart(resp_to_chart);
        }
        let sentiment_html = "";
        if (cr.questionType.includes('FREE_TEXT')) {
            //_E.feature.aesir.build_bar_chart(resp_to_chart);
            $(`#${'chart_' + cr.uid}`).hide();
            let clr = _E.feature.aesir.convert_to_color_rating(cr.avgSentimentScore);
            let avg_senitment_stars = _E.feature.aesir.convert_to_star_rating(cr.avgSentimentScore);

            sentiment_html = `<div>
                <p><strong>Avg. Sentiment <sup> (-1 to +1)</sup></em></strong><br/><span style="color:${clr};">
                ${avg_senitment_stars}</span><span style="color:${clr};font-size:1.8em;">${cr.avgSentimentScore.toFixed(2)}
                </span></p>
                </div>`;
            $(`#edtable_sentiment_${'chart_' + cr.uid}`).html(sentiment_html);
        } else {
            $(`#edtable_sentiment_${'chart_' + cr.uid}`).hide();
        }

        // console.log("ok 7")

        let statDataTableHTML = `<table><tr><th>Answer</th><th>Stats</th></tr>`;//`${sentiment_html}<table>`;
        for (let iii = 0; iii < item_count; iii++) {
            // break obscenely large strings
            statDataTableHTML += `<tr>
                <td>${_E.fxn.common.label_blackart_spacewrap(statDataTable[iii].statKey)}</td>
                <td>
                    <strong style="font-weight:bold;color:${statDataTable[iii].statBg}">${statDataTable[iii].statValue}</strong> <sup>(${((statDataTable[iii].statValue / cr.total) * 100).toFixed(1)}%)</sup>
                </td></tr>`;
        }
        // TODO: RESUME HERE
        if (statDataTable.length > recLimit) {
            statDataTableHTML += `<tr>
                <td>${others.statKey} <sup>${others.statOtherCategories}</sup></td>
                <td>
                    <strong style="font-weight:bold;color:${others.statBg}">${others.statValue}</strong> <sup>(${((others.statValue / cr.total) * 100).toFixed(1)}%)</sup>
                </td></tr>`;
        }
        statDataTableHTML += `</table>`;
        //statDataTable.sort();

        $(`#edtable_${'chart_' + cr.uid}`).html(statDataTableHTML);

        //console.log(resp_to_chart);
        //console.log("ok done");
    }

    $("#render_target").prepend(_E.feature.aesir.build_respondent_chart(
        {
            "html": `
                <div class="row">
                    <div class="col s8">Survey Conducted<br><strong style="font-weight:bold;font-size:2em;">${_E.fxn.common.label_blackart_spacewrap(_E.feature.qparam.settings.sur)}</strong></div>
                    <div class="col s4">Total Responses<br><strong style="font-weight:bold;font-size:2em;">${_E.feature.aesir.stat_data.total_responses}</strong></div>
                </div>
            `
        }
    ));


    _E.feature.aesir.populate_date_filter_controls();
    _E.feature.aesir.populate_dept_filter_controls();
    _E.feature.aesir.populate_filter_controls("classification");
    _E.feature.aesir.populate_filter_controls("location");

    _E.feature.aesir.populate_filter_controls("useragent");
    _E.feature.aesir.populate_filter_controls("entry");
    _E.feature.aesir.populate_filter_controls("language");
    _E.feature.aesir.populate_filter_controls("offering");

    $(".ctx_msg").hide();
    $(".fr").hide();
    _E.feature.aesir.enable_expand_contract();
    _E.feature.aesir.enable_livepoll();
    _E.feature.aesir.enable_tableviewbtn();
    _E.feature.aesir.enable_filterbtn();
    $('.card-panel').matchHeight();
}

_E.feature.aesir.expanded = true;
_E.feature.aesir.exp_charts = function () {
    if (_E.feature.aesir.expanded != true) {
        // current desire is to compress
        $(".ctx_crt").removeClass("m6").addClass("m3");
        //$(".ctx_msg").hide();
        $(".ctx_datatable").hide();
        $("#edtable_general").show();
    } else {
        // current design is to expand
        $(".ctx_crt").removeClass("m3").addClass("m6");
        //$(".ctx_msg").show();
        $(".ctx_datatable").show();
    }
    for (var id in Chart.instances) {
        Chart.instances[id].resize();
    }
    $('.card-panel').matchHeight();
}
_E.feature.aesir.enable_expand_contract = function () {
    $(".ctx_expand_charts").on("click", function () {
        if (_E.feature.aesir.expanded == true) {
            // currently expanded, now compress
            _E.feature.aesir.expanded = false;
            _E.feature.aesir.exp_charts();
        } else {
            // currently compressed, now expand
            _E.feature.aesir.expanded = true;
            _E.feature.aesir.exp_charts();
        }
    });
    _E.feature.aesir.exp_charts();
}
_E.feature.aesir.showfilter = true;
_E.feature.aesir.hs_filter = function () {
    if (_E.feature.aesir.showfilter != true) {
        $(".advfilters").hide();
        $('.card-panel').matchHeight();
    } else {
        $(".advfilters").show();
        $('.card-panel').matchHeight();
    }
}
_E.feature.aesir.enable_filterbtn = function () {
    $(".ctx_advfilters").on("click", function () {
        if (_E.feature.aesir.showfilter == true) {
            // currently expanded, now compress
            _E.feature.aesir.showfilter = false;
            _E.feature.aesir.hs_filter();
        } else {
            // currently compressed, now expand
            _E.feature.aesir.showfilter = true;
            _E.feature.aesir.hs_filter();
        }
    });
    _E.feature.aesir.hs_filter();
}

_E.feature.aesir.enable_tableviewbtn = function () {
    $(".ctx_tableview").on("click", function () {
        window.location = "https://app.evalhalla.ca/app/player/tableview/?sur=" + _E.feature.qparam.settings.sur;
    });
}

_E.feature.aesir.livepoll = false;
_E.feature.aesir.enable_livepoll = function () {
    $(".ctx_live_charts").on("click", function () {
        if (_E.feature.aesir.livepoll == true) {
            // currently polling, turn off
            _E.feature.aesir.livepoll = false;
            _E.feature.aesir.stop_auto_refresh();
            $(".ctx_live_charts").html(`<em class="material-icons fab-align" aria-hidden="true">repeat</em>`);
        } else {
            // currently not polling, turn on
            _E.feature.aesir.livepoll = true;
            _E.feature.aesir.start_auto_refresh();
            $(".ctx_live_charts").html(`<em class="material-icons fab-align" aria-hidden="true">pause</em>`);
        }
        _E.feature.aesir.exp_charts();
    });
    if (_E.feature.aesir.livepoll != true) {
        $(".ctx_live_charts").html(`<em class="material-icons fab-align" aria-hidden="true">repeat</em>`);
    } else {
        $(".ctx_live_charts").html(`<em class="material-icons fab-align" aria-hidden="true">pause</em>`);
    }
}

_E.feature.aesir.enable_feature = function () {
    _E.feature.aesir.populate_background_colors();
    // Test Data
    //_E.feature.aesir.cortex_get_survey();
    _E.feature.aesir.start_auto_refresh();
    _E.feature.aesir.stop_auto_refresh();
}
