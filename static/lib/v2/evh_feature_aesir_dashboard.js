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
_E.feature.aesir.g_qindex = {} // derefrence question text here
_E.feature.aesir.g_meta_data = {};
_E.feature.aesir.g_response = []; // CORTEX INTEGRATION - data pull

_E.feature.aesir.cortex_reply = []; // CORTEX INTEGRATION - data pull

_E.feature.aesir.render_data = function (response) {
    let render_html = "";
    for (let i = 0; i < response.length; i++) {
        if (response[i].stats == null) {
            continue;
        }
        //Inital html to show
        render_html = `<div class="col s4" style="float:top;"><div class="card-panel"><canvas id="${'chart_' + response[i].uid}" width="300" height="300"></canvas><pre class="ctx_msg">${JSON.stringify(response[i], null, 2)}</pre></div></div>`;

        //Render the intial HTML
        $("#render_target").append(render_html);

        resp_to_chart = {
            target_qid: response[i].uid,
            d_labels: [],
            d_data: []
        };


        let stats = JSON.parse(response[i].stats);
        let statsKeys = (stats) ? Object.keys(stats) : true;
        for (let ii = 0; ii < statsKeys.length; ii++) {
            resp_to_chart.d_labels.push(statsKeys[ii]);
            (stats) ? resp_to_chart.d_data.push(
                parseInt(stats[statsKeys[ii]], 10)
            ) : true;
        }


        //Depending on the type of the question, build a different type of chart
        if (response[i].classifiedAs.includes('SCALE')) {
            _E.feature.aesir.build_bar_chart(resp_to_chart);
        }

        //Depending on the type of the question, build a different type of chart
        if (response[i].classifiedAs.includes('CGROUP')) {
            _E.feature.aesir.build_pie_chart(resp_to_chart);
        }

        if (response[i].classifiedAs.includes('RGROUP')) {
            _E.feature.aesir.build_pie_chart(resp_to_chart);
        }

        if (response[i].questionType.includes('CLASSIFIED')) {
            _E.feature.aesir.build_pie_chart(resp_to_chart);
        }

        if (response[i].questionType.includes('FREE_TEXT')) {
            _E.feature.aesir.build_bar_chart(resp_to_chart);
        }
        /*
                $("#render_target").append('<div class="col s6" style="float:top;"><div class="card-panel"><span class="badge">(' +
                    response[i].uid + ')</span><p style="font-weight:bold;font-size:0.8em;bottom:0.25rem;line-height:1.2em;">' +
                    response[i].questionType + " " + response[i].classifiedAs +
                    '</p><canvas id="chart_' + response[i].uid + '" width="300" height="300"></canvas></div></div>');
        
        */
    }
    $(".ctx_msg").hide();
}

_E.feature.aesir.cortex_get_survey = function (survey) {
    //$.get("https://survistaapp.com/api/surveys/schemaless?title=" + survey, function (response) {


    let response = _E.feature.cortex.messages.get_stat_nodes();
    console.log(response);

    _E.feature.aesir.cortex_reply = response.payload.data;
    /*
    payload": {
    "uid": "e443f49d82d692e8e1dcd0c6d540b137",
    "data": [{
        "uid": "test_sur_q_1",
        "total": null,
        "stats": null,
        "questionType": "CLASSIFIED",
        "classifiedAs": "CSPS_Offering"
    }, {
        "uid": "test_sur_q_2",
        "total": 2,
        "stats": "{\"Transports Canada\":2}",
        "questionType": "CLASSIFIED",
        "classifiedAs": "GC_Org"
    },
    */
    _E.feature.aesir.render_data(_E.feature.aesir.cortex_reply);
    //});
}

_E.feature.aesir.build_bar_chart = function (chartd) {
    console.log(chartd);
    var ctx = document.getElementById('chart_' + chartd.target_qid + '').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartd.d_labels,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Responses',
                data: chartd.d_data//[12, 19, 3, 5, 2, 3]
                , backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'
                ]
                , borderColor: [
                    'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
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
    console.log(chartd);
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
                    , "backgroundColor": [
                        'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
                        '#fdd835', '#fbc02d', '#a8f925', '#f5177f', '#ff7c4d'
                    ]
                }
            ]
        },
        options: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    });

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


_E.feature.aesir.push_replies_v0 = function () {
    // check box
    _E.feature.aesir.cortex_reply.push(
        {
            "uid": "test_sur_q_3",
            "questionType": "MULTI_CHOICE",
            "classifiedAs": "CGROUP",
            "stats": {
                "English": [50, 0.5],
                "French": [40, 0.4],
                "Turkish": [10, 0.1]
            }
        }
    );

    // free text
    _E.feature.aesir.cortex_reply.push(
        {
            "uid": "test_sur_q_9",
            "questionType": "FREE_TEXT",
            "classifiedAs": "TEXTAREA",
            "stats": {
                "responses": [
                    { "questionAnswer": "Blah", "count": 14 },
                    { "questionAnswer": "Blah 2", "count": 4 }
                ],
                "avgSentimentScore": "0.0",
                "avgMaginitudeScore": "0.0",
                "top5PositiveResponses": [
                    {
                        "questionAnswer": "Blah",
                        "sentimentScore": "0.0",
                        "maginitudeScore": "0.0"
                    },
                    {
                        "questionAnswer": "Blah 10",
                        "sentimentScore": "0.0",
                        "maginitudeScore": "0.0"
                    }
                ],
                "top5NegativeResponses": [
                    {
                        "questionAnswer": "Blah",
                        "sentimentScore": "0.0",
                        "maginitudeScore": "0.0"
                    },
                    {
                        "questionAnswer": "Blah 10",
                        "sentimentScore": "0.0",
                        "maginitudeScore": "0.0"
                    }
                ]
            }
        }
    );

    //SINGLE_CHOICE SCALE_1_TO_5
    _E.feature.aesir.cortex_reply.push(
        {
            "uid": "test_sur_q_7",
            "questionType": "SINGLE_CHOICE",
            "classifiedAs": "SCALE_1_TO_5",
            "stats": {
                "averageValue": "2.5",
                "values": [
                    { "option": "1", "count": "14", "percentage": "0.3" },
                    { "option": "2", "count": "5", "percentage": "0.1" },
                    { "option": "5", "count": "90", "percentage": "0.87" },
                    { "option": "Unsure", "count": "5", "percentage": "0.1" }
                ]
            }
        }
    );

    //SINGLE_CHOICE SCALE_1_TO_10
    _E.feature.aesir.cortex_reply.push(
        {
            "uid": "test_sur_q_8",
            "questionType": "SINGLE_CHOICE",
            "classifiedAs": "SCALE_1_TO_10",
            "stats": {
                "averageValue": "5",
                "values": [
                    { "option": "1", "count": "14", "percentage": "0.3" },
                    { "option": "2", "count": "5", "percentage": "0.1" },
                    { "option": "10", "count": "90", "percentage": "0.87" },
                    { "option": "Unsure", "count": "5", "percentage": "0.1" }
                ]
            }
        }
    );

    //SINGLE_CHOICE RGROUP
    _E.feature.aesir.cortex_reply.push(
        {
            "uid": "test_sur_q_10",
            "questionType": "SINGLE_CHOICE",
            "classifiedAs": "RGROUP",
            "stats": {
                "Pizza": [50, 0.5],
                "Fish": [40, 0.4],
                "Fishza": [10, 0.1]
            }
        }
    );

    //CLASSIFIED GC_Language
    //CLASSIFIED GC_Org
    //CLASSIFIED CP_CSD
    //CLASSIFIED GC_ClsLvl
    //CLASSIFIED CSPS_Offering
    _E.feature.aesir.cortex_reply.push(
        {
            "uid": "test_sur_q_1",
            "questionType": "CLASSIFIED",
            "classifiedAs": "GC_Language",
            "stats": {
                "English": [50, 0.5],
                "French": [40, 0.4],
                "Urdu": [10, 0.1]
            }
        }
    );
    // end demo dat

}

_E.feature.aesir.enable_feature = function () {
    // Test Data
    _E.feature.aesir.cortex_get_survey();
}