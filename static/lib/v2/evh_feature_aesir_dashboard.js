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
_E.feature.aesir.cortex_get_survey = function (survey) {
    //$.get("https://survistaapp.com/api/surveys/schemaless?title=" + survey, function (response) {
    //console.log(_E.feature.aesir.g_chart_data.length);

    // TODO: Turn on for test data
    console.log("Evalhalla -[consumeSurveyMetrics]-> CORTEX");
    //_E.feature.aesir.g_chart_data = _E.feature.cortex.messages.get_stat_nodes();
    consumeSurveyMetrics(
        _E.feature.qparam.settings.sur,
        _E.feature.aesir.cortex_chart_data,
        (_E.feature.qparam.settings.fallback == "true") ? _E.feature.aesir.cortex_get_survey_callback_error : _E.feature.aesir.cortex_get_survey_callback,
        _E.feature.aesir.cortex_get_survey_callback_error
    );
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
        "#2E6D80",
        "#77259A",
        "#235BC1",
        "#459FF3",
        "#EA82F3",
        "#61CFDA",
        "#9C233E",
        "#EA7F5A",
        "#51B063",
        "#00E6C2",
        "#B4F690",
        "#00EE5C",
        "#3C3D6B",
        "#E75D7A",
        "#6B5A30",
        "#9B84B1",
        "#9CB237",
        "#6F362C",
        "#F7E6C2",
        // Additional Colors
        '#fdd835', '#fbc02d', '#a8f925', '#f5177f', '#ff7c4d', '#00429d', '#204fa3', '#315ca9', '#4069af',
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

_E.feature.aesir.build_respondent_chart = function (chartd) {
    let render_html = `
            <div class="col s12" style="float:top;"><div class="card-panel">
                <span class="badge">(General)</span>
                <p style="font-weight:normal;font-size:0.9em;bottom:0.25rem;line-height:1.2em;">
                    <span class='en'>General Statistics</span>
                    <!-- <span class='fr'>Statistique Generale/span> -->
                </p>
                <div id="edtable_general" class="ctx_datatable">${chartd.html}</div>
            </div></div>`;
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
    for (let i = 0; i < response.length; i++) {
        let cr = response[i];
        let ql = JSON.parse(cr.question);
        if (cr.stats == null) {
            continue;
        }

        //Inital html to show
        render_html = `
            <div class="col s12 m6 l4" style="float:top;"><div class="card-panel">
                <span class="badge">(${cr.uid})</span>
                <p style="font-weight:normal;font-size:0.9em;bottom:0.25rem;line-height:1.2em;">
                    <span class='en'>${ql[0] ? ql[0] : cr.uid}</span>
                    <!-- <span class='fr'>${ql[1] ? ql[1] : cr.uid}</span> -->
                </p>
                <sub><strong id="${'chart_totals_' + cr.uid}"></strong> Responses</sub>
                <canvas id="${'chart_' + cr.uid}" width="300" height="300"></canvas>
                <div id="edtable_${'chart_' + cr.uid}" class="ctx_datatable"></div>
                <pre class="ctx_msg">${JSON.stringify(cr, null, 2)}</pre>
            </div></div>`;

        //Render the intial HTML
        $("#render_target").append(render_html);

        resp_to_chart = {
            target_qid: cr.uid,
            d_labels: [],
            d_data: []
        };


        let stats = JSON.parse(cr.stats);
        let statsKeys = (stats) ? Object.keys(stats) : [];
        let statsKeysGrouped = {};
        let statDataTable = [];

        _E.feature.aesir.stat_data.total_responses = 0;
        for (let ii = 0; ii < statsKeys.length; ii++) {
            if (cr.questionType.includes('CLASSIFIED')) {
                // accumulate grouped stats
                let groupedStatsKey = statsKeys[ii].split("-")[0];
                if (typeof statsKeysGrouped[groupedStatsKey] === "undefined") {
                    statsKeysGrouped[groupedStatsKey] = parseInt(stats[statsKeys[ii]], 10);
                } else {
                    statsKeysGrouped[groupedStatsKey] += parseInt(stats[statsKeys[ii]], 10);
                }
                _E.feature.aesir.stat_data.total_responses += parseInt(stats[statsKeys[ii]], 10);
            } else {
                (stats) ? statDataTable.push(
                    { "statKey": statsKeys[ii], "statValue": parseInt(stats[statsKeys[ii]], 10), "statBg": _E.feature.aesir.backgroundColors[ii] }
                ) : true;
                _E.feature.aesir.stat_data.total_responses += parseInt(stats[statsKeys[ii]], 10);
            }
        }
        cr.total = _E.feature.aesir.stat_data.total_responses;

        $("#chart_totals_" + cr.uid).html(cr.total);

        if (cr.questionType.includes('CLASSIFIED')) {
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


        for (let ii = 0; ii < statDataTable.length; ii++) {
            // color override
            statDataTable[ii].statBg = _E.feature.aesir.backgroundColors[ii];
            _E.feature.aesir.backgroundColors[ii] = statDataTable[ii].statBg;
            resp_to_chart.d_labels.push(_E.fxn.common.label_truncate(statDataTable[ii].statKey, _E.feature.aesir.truncate_length));
            (stats) ? resp_to_chart.d_data.push(
                parseInt(statDataTable[ii].statValue, 10)
            ) : true;
        }


        let recLimit = 13;
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


        //Depending on the type of the question, build a different type of chart
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
        if (cr.questionType.includes('FREE_TEXT')) {
            _E.feature.aesir.build_bar_chart(resp_to_chart);
        }

        let statDataTableHTML = `<table>`;
        for (let iii = 0; iii < item_count; iii++) {
            statDataTableHTML += `<tr>
                <td>${statDataTable[iii].statKey}</td>
                <td>
                    <strong style="color:${statDataTable[iii].statBg}">${statDataTable[iii].statValue}</strong> <sup>(${((statDataTable[iii].statValue / cr.total) * 100).toFixed(1)}%)</sup>
                </td></tr>`;
        }
        // TODO: RESUME HERE
        if (statDataTable.length > recLimit) {
            statDataTableHTML += `<tr>
                <td>${others.statKey} <sup>${others.statOtherCategories}</sup></td>
                <td>
                    <strong style="color:${others.statBg}">${others.statValue}</strong> <sup>(${((others.statValue / cr.total) * 100).toFixed(1)}%)</sup>
                </td></tr>`;
        }
        statDataTableHTML += `</table>`;
        //statDataTable.sort();


        $(`#edtable_${'chart_' + cr.uid}`).html(statDataTableHTML);

    }

    $("#render_target").prepend(_E.feature.aesir.build_respondent_chart(
        {
            "html": `
                <div>
                    <table>
                    <tr>
                        <td>Total Responses<br><strong>${_E.feature.aesir.stat_data.total_responses}</strong></td>
                        <td>Survey Conducted<br>${_E.feature.qparam.settings.sur}</td>
                    </tr>
                    </table>
                </div>
            `
        }
    ));

    $(".ctx_msg").hide();
}


_E.feature.aesir.enable_feature = function () {
    _E.feature.aesir.populate_background_colors();
    // Test Data
    _E.feature.aesir.cortex_get_survey();
}