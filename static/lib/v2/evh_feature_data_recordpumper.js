/*

Evalhalla Evalese to JSON export feature

Given Omar, a survey developer
When Omar chooses to send his survey template to CORTEX
Then a JSON representation of his survey will be created
 And the JSON will be sent to CORTEX

_E["feature"]["exportJSON"]

*/

// init the package
(_E.feature.data) ? true : _E.feature.data = {};

_E.feature.data.recordpumper = {};
_E.feature.data.recordpumper.debug = true;

_E.feature.data.recordpumper.create_response = function (action) {
    (_E.feature.data.recordpumper.debug) ? console.log(`create_response`) : true;

    var cortex_json_o_string = (JSON.stringify(_E.feature.cortex.messages.create_survey_response_msg(), null, 4));

    (_E.feature.data.recordpumper.debug) ? console.log(cortex_json_o_string) : true;
    return cortex_json_o_string;
};

_E.feature.data.recordpumper.cortexKeyMap = {
    "RENDER INSTRUCTIVE_TEXT": "SKIP",
    "RENDER PAGE_BREAK": "SKIP",
    "MULTI_CHOICE CGROUP": "USE_OPTION",
    "FREE_TEXT TEXTAREA": "USE_TEXT",
    "SINGLE_CHOICE SCALE_1_TO_5": "USE_OPTION",
    "SINGLE_CHOICE SCALE_1_TO_10": "USE_OPTION",
    "SINGLE_CHOICE RGROUP": "USE_OPTION",
    "CLASSIFIED GC_Language": "USE_CLASSIFIED_LANG",
    "CLASSIFIED GC_Org": "USE_CLASSIFIED_ORG",
    "CLASSIFIED CP_CSD": "USE_CLASSIFIED_CITY",
    "CLASSIFIED GC_ClsLvl": "USE_CLASSIFIED_ROLE",
    "CLASSIFIED CSPS_Offering": "USE_CLASSIFIED_OFFERING"
};
_E.feature.data.recordpumper.determine_action = function (key) {
    if (typeof _E.feature.data.recordpumper.cortexKeyMap[key] === "undefined") {
        return "SKIP"
    } else {
        return _E.feature.data.recordpumper.cortexKeyMap[key];
    }
};
_E.feature.data.recordpumper.create_all_responses = function (survey_template) {
    (_E.feature.data.recordpumper.debug) ? console.log(`create_all_responses`) : true;
    let qs = survey_template.questions;
    let resp_json = [];
    for (let i = 0; i < qs.length; i++) {
        let rec_data_key = `${qs[i].cortex.classifiedAs} ${qs[i].cortex.questionType}`;
        let rec_data_action = _E.feature.data.recordpumper.determine_action(rec_data_key);

        if (rec_data_action == "SKIP") {
            continue;
        }
        /*
            {
                "uid": "test_sur_q_1",
                "total": null,
                "stats": null,
                "questionType": "CLASSIFIED",
                "classifiedAs": "CSPS_Offering"
            }
        */
        console.log("-------------------------");
        console.log(qs[i].cortex.uid);
        console.log(qs[i].cortex.total);
        console.log(qs[i].cortex.stats);
        console.log(rec_data_action);


        resp_json.push(_E.feature.data.recordpumper.create_response(rec_data_action));
        console.log("-------------------------");
    }
    (_E.feature.data.recordpumper.debug) ? console.log(`complete create_all_responses`) : true;
};

_E.feature.data.recordpumper.execute_load = function (survey_template) {
    (_E.feature.data.recordpumper.debug) ? console.log(`execute_load`) : true;
    (_E.feature.data.recordpumper.debug) ? console.log(survey_template) : true;

    _E.feature.data.recordpumper.create_all_responses(survey_template);
    _E.feature.data.recordpumper.submit_response();
};

_E.feature.data.recordpumper.submit_response = function () {
    (_E.feature.data.recordpumper.debug) ? console.log(`submit_response`) : true;
};


_E.feature.data.recordpumper.enable_feature = function () {
    (_E.feature.data.recordpumper.debug) ? console.log(`enable_feature`) : true;
};
