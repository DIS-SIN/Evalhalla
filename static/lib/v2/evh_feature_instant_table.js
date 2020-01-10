/*

Evalhalla Instant Table View

Given Omar, a survey admin
When Omar admins a survey
Then Omar should see the results instantly in a table format

_E["feature"]["instatable"]

*/
_E.feature.instatable = {};
_E.feature.instatable.g_qindex = {}; // derefrence question text here

// 1. Get from Survista Api
_E.feature.instatable.get_survey_data = function (survey) {
    if (survey == "" || typeof survey === "undefined") {
        survey = "test_sur";
    }

    let api_route = _C.apiroute.responses(_E.fxn.common.safe(survey));
    //"https://survistaapp.com/api/surveys/schemaless?title=" + survey
    $.get(api_route, function (response) {
        let rsp = `[]`;
        try {
            rsp = JSON.stringify(response);
        } catch (e) {
            rsp = `[]`; // if bad, use nothing
            alert("JSON Error, Invalid Data");
        }
        $("#render_override").val(rsp);
        _E.feature.instatable.g_render_table();
    });
}
// 2. Get sur from templates
_E.feature.instatable.get_survey_sur = function (survey) {
    if (survey == "" || typeof survey === "undefined") {
        survey = "test_sur";
    }
    $("#render_override_evh").val(g_intro_script); // from qparam feature REFACTOR this out

}
// 3. Dereference Question Text
_E.feature.instatable.parse_question_text = function (sur_text) {
    var sa = sur_text.replace(/\n/g, "").split("Q:");
    for (let i = 1; i < sa.length; i++) {
        let evh_sai = sa[i];
        evh_sai = evh_sai.split("/open")[0].split("/OPEN")[0]
            .split("/any")[0].split("/ANY")[0]
            .split("/one")[0].split("/ONE")[0]
            .split("/department")[0].split("/DEPARTMENT")[0]
            .split("/location")[0].split("/LOCATION")[0]
            .split("/offering")[0].split("/OFFERING")[0]
            .split("/classification")[0].split("/CLASSIFICATION")[0]
            .split("/dropdown")[0].split("/DROPDOWN")[0]
            .split("/language")[0].split("/LANGUAGE")[0]
            .split("/scale")[0].split("/SCALE")[0]
            .split("/scale1to5")[0].split("/SCALE1TO5")[0];
        evh_sai = evh_sai;

        // split by lang (en for now)
        evh_sai = evh_sai.split("/;")[0];
        evh_sai = evh_sai.replace("/en", "");
        _E.feature.instatable.g_qindex["" + i] = evh_sai;
    }
};
// get the text of the question by index
_E.feature.instatable.get_qindex_text = function (key) {
    let keya = key.split("_");
    try {
        let t = _E.feature.instatable.g_qindex[parseInt(keya[2], 10)];
        if (typeof t === "undefined") {
            t = key;
        }
        return t;
    } catch (e) {
        return "N/A";
    }
};
// 4. Render Process
// use these variables for render
_E.feature.instatable.g_render_table_extended = false;
_E.feature.instatable.g_render_table_tombstone = false;
_E.feature.instatable.g_render_table_meta = false;
_E.feature.instatable.g_render_table = function (etended) {
    let current_sur = $("#render_override_evh").val();
    let in_json = $("#render_override").val();

    let html_output = "";
    let tsv_output = "";

    let ino = [];
    try {
        //alert(in_json);
        ino = JSON.parse(in_json);
    } catch (e) {
        alert("Invalid JSON. Please try again. JSON invalide.Veuillez réessayer.");
    }

    // collect the avaiable columns (not all records have all columns specified)

    if ($("#extended_on").is(":checked") == true) {
        _E.feature.instatable.g_render_table_extended = true;
    } else {
        _E.feature.instatable.g_render_table_extended = false;
    }

    if ($("#tombstone_on").is(":checked") == true) {
        _E.feature.instatable.g_render_table_tombstone = true;
    } else {
        _E.feature.instatable.g_render_table_tombstone = false;
    }

    if ($("#meta_on").is(":checked") == true) {
        _E.feature.instatable.g_render_table_meta = true;
    } else {
        _E.feature.instatable.g_render_table_meta = false;
    }

    //alert($("#extended_on").prop("checked"));

    let available_columns = [];
    for (let i = 0; i < ino.length; i++) {
        // now handle each record
        let record = ino[i];
        for (let key in record) {
            if (record.hasOwnProperty(key)) {
                if (!available_columns.includes(key)) {
                    let a_keys = key.split("_");
                    let mod = (typeof a_keys[3] !== "undefined") ? true : false;
                    let skip = ((a_keys[0] == "meta" && _E.feature.instatable.g_render_table_meta == false) ||
                        (a_keys[0] == "tombstone" && _E.feature.instatable.g_render_table_tombstone == false) ||
                        a_keys[0] == "textofquestion") ? true : false;
                    if ((mod == false && skip == false) || _E.feature.instatable.g_render_table_extended == true) {
                        available_columns.push(key);
                    }
                }
            }
        }
    }


    let compareEvhKey = function (a, b) {
        /*
        "meta_useragent",
        "meta_entry_method",
        "meta_evalhalla_sur",
        "meta_question_count",
        "meta_submission_time",
        "tombstone_language",
        "tombstone_city",
        "tombstone_department",
        "tombstone_offering_id", // note [2] is definied
        "tombstone_classification",
        "rgroup_qid_1",
        "rgroup_qid_2",
        "textarea_qid_4",
        "scale1to5_qid_3",
        "textofquestion_qid_1",
        "textofquestion_qid_2",
        "textofquestion_qid_3",
        "textofquestion_qid_4",
        "textarea_qid_4_language", // note [2] == [2], if [3] defined then -1

        ORDER
        meta
        tombstone
        qid #1..n & -1 for mod
        qid #1..n & mod

        */

        let a_keys = a.split("_");
        let b_keys = b.split("_");

        let a_type = (typeof a_keys[0] === "undefined") ? -1 : a_keys[0];
        let b_type = (typeof b_keys[0] === "undefined") ? -1 : b_keys[0];

        let a_qid = (typeof a_keys[2] === "undefined") ? -1 : a_keys[2];
        let b_qid = (typeof b_keys[2] === "undefined") ? -1 : b_keys[2];

        let a_mod = (typeof a_keys[3] === "undefined") ? -1 : a_keys[3];
        let b_mod = (typeof b_keys[3] === "undefined") ? -1 : b_keys[3];

        // textofquestion counts as mod
        if (a_type == "textofquestion") {
            a_mod = "textofquestion";
        }
        if (b_type == "textofquestion") {
            b_mod = "textofquestion";
        }

        // meta
        if (a_type == "meta" && b_type != "meta") {
            //a is less than b by some ordering criterion
            return -1;
        }
        if (a_type != "meta" && b_type == "meta") {
            // a is greater than b by the ordering criterion
            return 1;
        }
        if (a_type == "meta" && b_type == "meta") {
            // a must be equal to b
            return 0;
        }

        // tombstone
        if (a_type == "tombstone" && b_type != "tombstone") {
            //a is less than b by some ordering criterion
            return -1;
        }
        if (a_type != "tombstone" && b_type == "tombstone") {
            // a is greater than b by the ordering criterion
            return 1;
        }
        if (a_type == "tombstone" && b_type == "tombstone") {
            // a must be equal to b
            return 0;
        }

        // mod
        if (a_mod == -1 && b_mod != -1) {
            //a is less than b by some ordering criterion
            return -1;
        }
        if (a_mod != -1 && b_mod == -1) {
            // a is greater than b by the ordering criterion
            return 1;
        }

        // parse ints
        a_qid = parseInt(a_qid, 10);
        b_qid = parseInt(b_qid, 10);

        // qid & mod -1
        if ((a_qid < b_qid) && (a_mod == -1 && b_mod == -1)) {
            //a is less than b by some ordering criterion
            return -1;
        }
        if ((a_qid > b_qid) && (a_mod == -1 && b_mod == -1)) {
            // a is greater than b by the ordering criterion
            return 1;
        }
        if ((a_qid == b_qid) && (a_mod == -1 && b_mod == -1)) {
            // a must be equal to b
            return 0;
        }

        // qid & mod
        if ((a_qid < b_qid) && (a_mod != -1 && b_mod != -1)) {
            //a is less than b by some ordering criterion
            return -1;
        }
        if ((a_qid > b_qid) && (a_mod != -1 && b_mod != -1)) {
            // a is greater than b by the ordering criterion
            return 1;
        }
        if ((a_qid == b_qid) && (a_mod != -1 && b_mod != -1)) {
            // a must be equal to b
            return 0;
        }

        // a must be equal to b
        return 0;
    };

    available_columns.sort(compareEvhKey);

    // dereference the questions from the evalese (optional step to save the human time in matching)
    _E.feature.instatable.parse_question_text(current_sur);

    // build the table header
    let thead = `<thead>`
    let thead_tsv = ``;
    for (let j = 0; j < available_columns.length; j++) {
        thead += `<th>${_E.feature.instatable.get_qindex_text(available_columns[j])} (${available_columns[j]})</th>`;
        thead_tsv += `${_E.feature.instatable.get_qindex_text(available_columns[j])} (${available_columns[j]})\t`;
    }
    thead += `</thead><tbody>`;
    thead_tsv += `\n`;

    // extract the records and values
    html_output += `<table class="responsive-table">` + thead;
    tsv_output += thead_tsv;
    for (let i = 0; i < ino.length; i++) {
        // now handle each record
        let record = ino[i];
        html_output += `<tr>`;
        for (let j = 0; j < available_columns.length; j++) {
            let key = available_columns[j];
            if (record.hasOwnProperty(key)) {
                let value = record[key];
                html_output += `<td>${value.toString().replace(/\r\n/g, '')}</td>`;
                tsv_output += `${value.toString().replace(/\r\n/g, '').replace(/\n/g, '')}\t`;
            } else {
                html_output += `<td>blank</td>`;
                tsv_output += `blank\t`;
            }
        }
        html_output += `</tr>`;
        tsv_output += `\r\n`;
    }
    html_output += `</tbody></table>`;
    $("#render_target").html(html_output);
    $("#render_tsv").html(tsv_output);
};

_E.feature.instatable.download_tsv = function () {
    $("#render_override_btn").trigger("click");
    let tsv = $("#render_tsv").val();
    let dt = new Date().toISOString().replace(/(\-\:)/g, "_");
    dt = dt.replace(".", "_")
        .replace("T", "_T");
    $("#download_as_tsv").attr("href", "data:text/plain;charset=utf-8,\uFEFF" + encodeURIComponent(tsv)).attr("download", "evalhalla_" + _E.feature.qparam.settings.sur + "_" + dt + ".txt");
}

_E.feature.instatable.enable_feature = function () {

    // get survey questions
    _E.feature.instatable.get_survey_sur(_E.feature.qparam.settings.sur);
    // get the data
    _E.feature.instatable.get_survey_data(_E.feature.qparam.settings.sur);

    $("#render_override_btn").on("click", function () {
        _E.feature.instatable.g_render_table();
    });

    $("#download_as_tsv").on("click", function () {
        _E.feature.instatable.download_tsv();
    });
};