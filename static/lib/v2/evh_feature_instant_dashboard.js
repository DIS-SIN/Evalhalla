/*

Evalhalla Instant Dashboard

Given Omar, a survey admin
When Omar admins a survey
Then Omar should see the results instantly

_E["feature"]["instadash"]

*/
_E.feature.instadash = {};

_E.feature.instadash.g_chart_data = [];
_E.feature.instadash.g_qindex = {} // derefrence question text here
_E.feature.instadash.g_meta_data = {};
_E.feature.instadash.g_response = []; // SURVUSTA INTEGRATION - data pull

_E.feature.instadash.reinit_meta = function () {
    _E.feature.instadash.g_meta_data = {
        entry: { target_qid: "Entry", chart_type: "rgroup", d_data: [], d_labels: [] },
        evalhalla: { target_qid: "Sur", chart_type: "none", d_data: [], d_labels: [] },
        useragent: { target_qid: "Method", chart_type: "rgroup", d_data: [], d_labels: [] },
        language: { target_qid: "Lang", chart_type: "rgroup", d_data: [], d_labels: [] },
        department: { target_qid: "Department", chart_type: "scale", d_data: [], d_labels: [] },
        offering: { target_qid: "Offering", chart_type: "none", d_data: [], d_labels: [] },
        classification: { target_qid: "Classification", chart_type: "scale", d_data: [], d_labels: [] },
        city: { target_qid: "City", chart_type: "scale", d_data: [], d_labels: [] }
    };
}
_E.feature.instadash.g_qindex = {} // derefrence question text here

_E.feature.instadash.parse_question_text = function (sur_text) {
    var sa = sur_text.replace(/\n/g, "").split("Q:");
    for (let i = 1; i < sa.length; i++) {
        let evh_sai = sa[i];
        evh_sai = evh_sai.split("/open")[0].split("/OPEN")[0]
            .split("/any")[0].split("/ANY")[0]
            .split("/one")[0].split("/ONE")[0]
            .split("/scale")[0].split("/SCALE")[0]
            .split("/scale1-5")[0].split("/SCALE1-5")[0];
        evh_sai = evh_sai;

        // split by lang (en for now)
        evh_sai = evh_sai.split("/;")[0];
        evh_sai = evh_sai.replace("/en", "");
        _E.feature.instadash.g_qindex["" + i] = evh_sai;
    }
}


_E.feature.instadash.render_data = function (response) {
    _E.feature.instadash.g_chart_data = (typeof response !== "undefined") ? response : [];
    // dont refresh if we have no new data
    if (_E.feature.instadash.g_response.length == _E.feature.instadash.g_chart_data.length) {
        return;
    }
    // clear the render: barbaric refresh
    $("#render_target").html("");
    _E.feature.instadash.g_response = _E.feature.instadash.g_chart_data;
    let questions_to_chart = [];
    for (let i = 0; i < _E.feature.instadash.g_chart_data.length; i++) {
        let data_point = _E.feature.instadash.g_chart_data[i];
        for (let key in data_point) {
            let value = data_point[key];
            if (data_point.hasOwnProperty(key)) {
                let key_tokens = key.split("_");
                let data_type = key_tokens[0];
                if (data_type == "meta" || data_type == "tombstone") {
                    continue;
                } else {
                    let data_qid = key_tokens[2];
                    if (questions_to_chart.includes(data_qid)) {
                        continue;
                    }
                    questions_to_chart.push(data_qid);
                }
            }
        }
    }

    questions_to_chart.sort(function (a, b) { return a - b; });
    $("#render_target").append('<div class="col s12 m12 center"><div class="card-panel purp-canada-ca-edged"><span class="badge">Live</span><sub>Survey Feedback</sub><div id="chart_textarea_responses" width="300" height="300">' +
        '<div class="row">' +
        '<div class="col s12 m4 center"><p><strong># Responses</strong><br/><span style="color:#66b66a;font-size:2.3em;">' + _E.feature.instadash.g_chart_data.length + '</span></p></div>' +
        '<div class="col s12 m4 center"><p><strong>Unique Roles</strong><br/><span style="color:#66b66a;font-size:2.3em;" class="cht_roles"></span></p></div>' +
        '<div class="col s12 m4 center"><p><strong>Unique Departments</strong><br/><span style="color:#66b66a;font-size:2.3em;" class="cht_depts"></span></p></div>' +
        '</div></div></div></div>');
    for (let i = 0; i < questions_to_chart.length; i++) {
        _E.feature.instadash.build_charts({
            "target_qid": questions_to_chart[i],
            "d_labels": [],
            "d_data": [],
            "d_data_sentences": []
        });
    }
    $("#render_target").append('<div class="col s12"><h4>General Information</h4></div>');
    _E.feature.instadash.build_meta_charts();
    //build_raw_datatable();
}

_E.feature.instadash.survista_get_survey = function (survey) {
    if (survey == "" || typeof survey === "undefined") {
        survey = "test_sur";
    }
    $.get("https://survistaapp.com/api/surveys/schemaless?title=" + survey, function (response) {

        _E.feature.instadash.render_data(response);

    });

}


_E.feature.instadash.stop_auto_refresh = function () {
    clearInterval(_E.feature.instadash.tmr);
    _E.feature.instadash.tmr = null;
}

_E.feature.instadash.start_auto_refresh = function () {
    _E.feature.instadash.survista_get_survey(_E.feature.qparam.settings.sur);
    clearInterval(_E.feature.instadash.tmr);
    _E.feature.instadash.tmr = null;
    _E.feature.instadash.tmr = setInterval(function () {
        _E.feature.instadash.survista_get_survey(_E.feature.qparam.settings.sur);
    }, 4500);
}

_E.feature.instadash.build_scale = function (chartd) {
    chartd.d_data.sort();
    chartd.d_labels.sort();
    let layout = chartd.layout ? chartd.layout : "s12 m4";
    $("#render_target").append('<div class="col ' + layout + '" style="float:top;"><div class="card-panel"><span class="badge">(' + chartd.target_qid + ')</span><p style="font-weight:normal;font-size:0.9em;bottom:0.25rem;line-height:1.2em;">' + (_E.feature.instadash.g_qindex[chartd.target_qid] ? _E.feature.instadash.g_qindex[chartd.target_qid] : "") + '</p><canvas id="chart_scale_' + chartd.target_qid + '" width="300" height="300"></canvas><p id="chart_avg_' + chartd.target_qid + '"></p></div></div>');

    var sum = 0;
    for (var i = 0; i < chartd.d_data.length; i++) {
        let pint = parseInt(chartd.d_data[i], 10);
        if (pint != 77) {
            sum += parseInt(chartd.d_data[i], 10);
        }
    }
    // give those were unsure a score of 0, because thats probably better than 77
    var avg = sum / chartd.d_data.length;
    avg = avg.toFixed(2);
    if (isNaN(avg)) {
        avg = "";
        $('#chart_avg_' + chartd.target_qid + '').remove();
    }
    //scrub data
    var d_data_new = [];
    for (var i = 0; i < chartd.d_labels.length; i++) {
        //alert(chartd.d_data[i]);
        if (77 == chartd.d_labels[i] || "77" == chartd.d_labels[i]) {
            d_data_new.push("Unsure");
        } else {
            d_data_new.push(chartd.d_labels[i])
        }
    }
    chartd.d_labels = d_data_new;
    // scrub data to match form
    var num_repl = -1;
    var cur_labl = "";
    var d_data_new = [];
    for (var i = 0; i < chartd.d_data.length; i++) {
        //alert(chartd.d_data[i]);
        if (cur_labl == chartd.d_data[i]) {
            d_data_new[num_repl] = d_data_new[num_repl] + 1;
        } else {
            cur_labl = chartd.d_data[i];
            num_repl += 1;
            d_data_new[num_repl] = 1;
        }
    }
    chartd.d_data = d_data_new;
    //console.log(chartd.d_labels);
    //console.log(chartd.d_data);



    var ctx = document.getElementById('chart_scale_' + chartd.target_qid + '').getContext('2d');
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
    $('#chart_avg_' + chartd.target_qid + '').html('<p><strong>Avg. </strong><br/><span style="color:#666666;font-size:2.3em;">' + avg + '</span></p>');
}

_E.feature.instadash.build_rgroup = function (chartd) {
    chartd.d_data.sort();
    chartd.d_labels.sort();
    let layout = chartd.layout ? chartd.layout : "s12 m4";
    $("#render_target").append('<div class="col ' + layout + '" style="float:top;"><div class="card-panel"><span class="badge">(' +
        chartd.target_qid + ')</span><p style="font-weight:bold;font-size:0.8em;bottom:0.25rem;line-height:1.2em;">' +
        (_E.feature.instadash.g_qindex[chartd.target_qid] ? _E.feature.instadash.g_qindex[chartd.target_qid] : "") +
        '</p><canvas id="chart_rgroup_' + chartd.target_qid + '" width="300" height="300"></canvas></div></div>');
    var ctx = document.getElementById('chart_rgroup_' + chartd.target_qid + '').getContext('2d');

    // scrub data to match form
    var num_repl = -1;
    var cur_labl = "";
    var d_data_new = [];
    for (var i = 0; i < chartd.d_data.length; i++) {
        //alert(chartd.d_data[i]);
        if (cur_labl == chartd.d_data[i]) {
            d_data_new[num_repl] = d_data_new[num_repl] + 1;
        } else {
            cur_labl = chartd.d_data[i];
            num_repl += 1;
            d_data_new[num_repl] = 1;
        }
    }
    chartd.d_data = d_data_new;

    // sum data
    let sum = 0;
    for (let q = 0; q < chartd.d_data.length; q++) {
        sum += parseInt(chartd.d_data[q], 10);
    }

    for (let q = 0; q < chartd.d_labels.length; q++) {
        chartd.d_labels[q] = ((parseInt(chartd.d_data[q], 10) / sum) * 100).toFixed(0) + "% " + chartd.d_labels[q].substring(0, 20);
    }

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

_E.feature.instadash.build_cgroup = function (chartd) {
    _E.feature.instadash.build_rgroup(chartd);
}

_E.feature.instadash.convert_to_star_rating = function (a) {
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

_E.feature.instadash.convert_to_color_rating = function (a) {
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

_E.feature.instadash.build_textarea = function (chartd) {
    chartd.d_data.sort();
    chartd.d_labels.sort();
    let layout = chartd.layout ? chartd.layout : "s12 m4";
    $("#render_target").append('<div class="col ' + layout +
        '" style="float:top;"><div class="card-panel"><span class="badge">(' +
        chartd.target_qid + ')</span><sub style="font-weight:normal;font-size:1.3em;bottom:0.25rem;line-height:1.2em;">' +
        _E.feature.instadash.g_qindex[chartd.target_qid] + '</sub><div id="chart_textarea_' + chartd.target_qid +
        '" width="300" height="300"></div></div></div>');
    var ctx = $('#chart_textarea_' + chartd.target_qid + '');

    var acc = 0.0;
    for (let i = 0; i < chartd.d_data.length; i++) {
        acc += parseFloat(chartd.d_data[i]);
    }
    var avg_senitment = (acc / parseFloat(chartd.d_data.length)).toFixed(2);
    let clr = _E.feature.instadash.convert_to_color_rating(avg_senitment);
    let avg_senitment_stars = _E.feature.instadash.convert_to_star_rating(avg_senitment);
    let sentences_table = '<tr><td>' + chartd.d_data_sentences.reverse().slice(0, 5).join("</td></tr><tr><td>") + '</td></tr>';


    //console.log(sentences_table);

    ctx.append('<p><strong>Avg. Sentiment <sup> (-1 to +1)</sup></em></strong><br/><span style="color:' + clr + ';">' +
        avg_senitment_stars + '</span><span style="color:' + clr + ';font-size:1.8em;">' + avg_senitment +
        '</span></p><table style="font-weight:normal;font-size:0.8em;"><thead><th>Last 5 Responses</th></thead><tbody>' +
        sentences_table + '</tbody></table>');
}

_E.feature.instadash.build_raw_datatable = function () {
    let layout = "s12 m12";
    let datatable = '';//<table class="table-responsive"></table>
    for (var i = 0; i < _E.feature.instadash.g_chart_data.length; i++) {
        let data_point = _E.feature.instadash.g_chart_data[i];
        datatable += '<div class="card-panel purp-canada-ca-edged">';
        for (let key in data_point) {
            let value = data_point[key];
            if (data_point.hasOwnProperty(key)) { //not a property from prototype chain  
                let key_tokens = key.split("_");
                let data_type = key_tokens[0];
                if (data_type == "textarea" || data_type == "rgroup" || data_type == "cgroup" || data_type == "scale") {
                    let data_detail = (typeof (key_tokens[3]) === "undefined") ? "data" : key_tokens[3];
                    if (data_detail != "data") {
                        continue;
                    }
                } else {
                    continue;
                }
                datatable += '<p><sub>' + key + ': </sub><sub>' + data_point[key] + '</sub></p>';
            }
        }
        datatable += '</div>';

    }
    $("#render_target").append('<div class="col ' + layout + '" style="float:top;">' + datatable + '</div>');

}

_E.feature.instadash.build_meta_charts = function () {
    _E.feature.instadash.reinit_meta();
    let chartd = { "d_data": [], "d_labels": [] };
    for (var i = 0; i < _E.feature.instadash.g_chart_data.length; i++) {
        let data_point = _E.feature.instadash.g_chart_data[i];
        for (let key in data_point) {
            let value = data_point[key];
            if (data_point.hasOwnProperty(key)) { //not a property from prototype chain     
                let key_tokens = key.split("_");
                /*
                        "meta_entry_method": "",
                        "meta_evalhalla_sur": "ut0_da_interest",
                        "meta_useragent": "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
                        
                        "tombstone_language": "en",
                        "tombstone_department": "Parcs Canada",
                        "tombstone_offering_id": "119639",
                        "tombstone_classification": "CS-05",
                        "tombstone_city": "NATIONAL CAPITAL REGION (NCR), NCR/RCN", 
                        
                */
                let data_type = key_tokens[0];
                if (data_type == "meta" || data_type == "tombstone") {
                    let chartd = {};
                    if (value == "") {
                        value = "Blank";
                    }
                    if (data_type == "meta" && key_tokens[1] == "entry") {
                        if (!_E.feature.instadash.g_meta_data.entry.d_labels.includes(value)) {
                            _E.feature.instadash.g_meta_data.entry.d_labels.push(value);
                        }
                        _E.feature.instadash.g_meta_data.entry.d_data.push(value);
                    } else if (data_type == "meta" && key_tokens[1] == "evalhalla") {
                        if (!_E.feature.instadash.g_meta_data.evalhalla.d_labels.includes(value)) {
                            _E.feature.instadash.g_meta_data.evalhalla.d_labels.push(value);
                        }
                        _E.feature.instadash.g_meta_data.evalhalla.d_data.push(value);
                    } else if (data_type == "meta" && key_tokens[1] == "useragent") {
                        if (!_E.feature.instadash.g_meta_data.useragent.d_labels.includes(value.split(";")[0]/*.split("/")[0]*/)) {
                            _E.feature.instadash.g_meta_data.useragent.d_labels.push(value.split(";")[0]/*.split("/")[0]*/);
                        }
                        _E.feature.instadash.g_meta_data.useragent.d_data.push(value.split(";")[0]/*.split("/")[0]*/);
                    } else if (data_type == "tombstone" && key_tokens[1] == "language") {
                        if (!_E.feature.instadash.g_meta_data.language.d_labels.includes(value)) {
                            _E.feature.instadash.g_meta_data.language.d_labels.push(value);
                        }
                        _E.feature.instadash.g_meta_data.language.d_data.push(value);
                    } else if (data_type == "tombstone" && key_tokens[1] == "department") {
                        if (!_E.feature.instadash.g_meta_data.department.d_labels.includes(value)) {
                            _E.feature.instadash.g_meta_data.department.d_labels.push(value);
                        }
                        _E.feature.instadash.g_meta_data.department.d_data.push(value);
                    } else if (data_type == "tombstone" && key_tokens[1] == "offering") {
                        if (!_E.feature.instadash.g_meta_data.offering.d_labels.includes(value)) {
                            _E.feature.instadash.g_meta_data.offering.d_labels.push(value);
                        }
                        _E.feature.instadash.g_meta_data.offering.d_data.push(value);
                    } else if (data_type == "tombstone" && key_tokens[1] == "classification") {
                        if (!_E.feature.instadash.g_meta_data.classification.d_labels.includes(value)) {
                            _E.feature.instadash.g_meta_data.classification.d_labels.push(value);
                        }
                        _E.feature.instadash.g_meta_data.classification.d_data.push(value);
                    } else if (data_type == "tombstone" && key_tokens[1] == "city") {
                        if (!_E.feature.instadash.g_meta_data.city.d_labels.includes(value)) {
                            _E.feature.instadash.g_meta_data.city.d_labels.push(value);
                        }
                        _E.feature.instadash.g_meta_data.city.d_data.push(value);
                    }
                }
            }
        }
    }
    // basic metrics
    var uclass = [];
    var udepts = [];
    for (let q = 0; q < _E.feature.instadash.g_meta_data.classification.d_data.length; q++) {
        if (uclass.includes(_E.feature.instadash.g_meta_data.classification.d_data[q])) { continue; }
        uclass.push(_E.feature.instadash.g_meta_data.classification.d_data[q]);
    }
    for (let q = 0; q < _E.feature.instadash.g_meta_data.department.d_data.length; q++) {
        if (udepts.includes(_E.feature.instadash.g_meta_data.department.d_data[q])) { continue; }
        udepts.push(_E.feature.instadash.g_meta_data.department.d_data[q]);
    }
    //$(".cht_roles").html([...new Set(_E.feature.instadash.g_meta_data.classification.d_data)].length);
    //$(".cht_depts").html([...new Set(_E.feature.instadash.g_meta_data.department.d_data)].length);
    $(".cht_roles").html(uclass.length);
    $(".cht_depts").html(udepts.length);

    //_E.feature.instadash.g_meta_data.department.d_labels.length

    for (let key in _E.feature.instadash.g_meta_data) {
        let value = _E.feature.instadash.g_meta_data[key];
        if (_E.feature.instadash.g_meta_data.hasOwnProperty(key)) {
            //g_qindex[key] = key;
            if (value.chart_type == "scale") {
                value.layout = "s12 m12";
                _E.feature.instadash.build_scale(value);
            } else if (value.chart_type == "rgroup") {
                _E.feature.instadash.build_rgroup(value);
            } else if (value.chart_type == "none") {
                //build_rgroup(value);
            }
        }
    }

}

_E.feature.instadash.build_charts = function (chartd) {

    //console.log(g_chart_data);
    for (var i = 0; i < _E.feature.instadash.g_chart_data.length; i++) {
        let data_point = _E.feature.instadash.g_chart_data[i];
        for (let key in data_point) {
            let value = data_point[key];
            if (data_point.hasOwnProperty(key)) { //not a property from prototype chain     
                let key_tokens = key.split("_");
                let data_type = key_tokens[0];
                if (data_type == "meta" || data_type == "tombstone") {
                    continue;
                } else {
                    let data_qid = key_tokens[2];
                    if (data_qid != chartd.target_qid) { continue; }
                    chartd.chart_type = data_type;
                    let data_detail = (typeof (key_tokens[3]) === "undefined") ? "data" : key_tokens[3];

                    if (data_detail == "data"
                        || data_detail == "sentimentScore"
                        || data_detail == "sentences"
                    ) {
                        if (data_type == "cgroup") {
                            for (let k = 0; k < value.length; k++) {
                                if (!chartd.d_labels.includes(value[k])) {
                                    chartd.d_labels.push(value[k]);
                                }
                                chartd.d_data.push(value[k]);
                            }
                        } else {
                            if (!chartd.d_labels.includes(value)) {
                                chartd.d_labels.push(value);
                            }
                        }

                        if (data_type == "scale") {
                            chartd.d_data.push(parseInt(value, 10));
                        } else if (data_type == "rgroup") {
                            chartd.d_data.push(value);
                        } else if (data_type == "textarea" && data_detail == "sentimentScore") {
                            chartd.d_data.push(value);
                        } else if (data_type == "textarea" && data_detail == "data") {
                            //console.log(chartd.d_data_sentences);
                            //for (let q = value.length - 1; q >= 0; q--) {
                            //    chartd.d_data_sentences.push(value[q].text);
                            //}
                            if (value != "") {
                                chartd.d_data_sentences.push(value);
                            }
                            // take only 5: TODO check most postive and most negative
                            //chartd.d_data_sentences = chartd.d_data_sentences.slice(0, 5);
                        }
                    }
                }
            } else {  //property from protytpe chain
            }
        }
    }

    if (chartd.chart_type == "scale") {
        _E.feature.instadash.build_scale(chartd);
    } else if (chartd.chart_type == "rgroup") {
        _E.feature.instadash.build_rgroup(chartd);
    } else if (chartd.chart_type == "cgroup") {
        _E.feature.instadash.build_cgroup(chartd);
    } else if (chartd.chart_type == "textarea") {
        _E.feature.instadash.build_textarea(chartd);
    }
};


_E.feature.instadash.enable_feature = function () {
    _E.feature.instadash.reinit_meta();
    _E.feature.instadash.parse_question_text(_E.feature.qparam.settings.sur_evh);
    $("#render_target").append('<div class="col s12"><h3>Instant Dashboard: ' + _E.feature.qparam.settings.sur + '</h3></div>');
    _E.feature.instadash.tmr = null;

    $(".go-live").on("click", function () {
        _E.feature.instadash.start_auto_refresh();
    });
    $(".go-silent").on("click", function () {
        _E.feature.instadash.stop_auto_refresh();
    });
    $("#render_override_btn").on("click", function () {
        _E.feature.instadash.stop_auto_refresh();
        _E.feature.instadash.render_data([]);
        _E.feature.instadash.render_data(JSON.parse($("#render_override").val()));
    });


    _E.feature.instadash.start_auto_refresh();

}