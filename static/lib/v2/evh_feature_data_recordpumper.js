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
_E.feature.data.recordpumper.debug = false;

_E.feature.data.recordpumper.generate_this_many = 3;
_E.feature.data.recordpumper.skewness_of_responses = null;//

_E.feature.data.recordpumper.test_freetexts = [
    "I enjoyed it very much. It was well laid out and everything worked perfectly. This is the absolute best thing ever.",
    "This was very nice. It met my needs well. There is some room for improvement, but good overall",
    "It was fine. Nothing really stood out as a positive or a negative really. It works.",
    "This was ok but it could be much better. Some parts did not work for me and I was confused at times",
    "I did not like this at all. I think it needs lots of improvement before I can be happy with it. You go off and improve it. Then talk to me. Not happy."
];

_E.feature.data.recordpumper.test_uas = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0",
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 8.1.0; vivo 1723 Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36 VivoBrowser/5.9.1.2",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.90 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36"
];

_E.feature.data.recordpumper.fluent_ats = ["en", "fr"];

_E.feature.data.recordpumper.create_response = function (qas, survey_template) {
    (_E.feature.data.recordpumper.debug) ? console.log(`create_response`) : true;
    var cortex_json_o = _E.feature.cortex.messages.create_survey_response_msg();
    let date = new Date();
    let date_string = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
    cortex_json_o.created.from = date_string;
    cortex_json_o.created.to = date_string;
    cortex_json_o.questions = qas;

    cortex_json_o.response.userAgent = _E.feature.data.recordpumper.test_uas[_E.fxn.common.get_random_int(_E.feature.data.recordpumper.test_uas.length, _E.feature.data.recordpumper.skewness_of_responses)];
    cortex_json_o.response.surveyEntryMethod = "TEST_DATA_GENERATOR";
    cortex_json_o.response.conducted = survey_template.uid;

    cortex_json_o.respondent.fluent_at = _E.feature.data.recordpumper.fluent_ats[_E.fxn.common.get_random_int(_E.feature.data.recordpumper.fluent_ats.length, _E.feature.data.recordpumper.skewness_of_responses)];
    cortex_json_o.respondent.in_department = autoc_departments[_E.fxn.common.get_random_int(autoc_departments.length, _E.feature.data.recordpumper.skewness_of_responses)];
    cortex_json_o.respondent.located_in = autoc_cities[_E.fxn.common.get_random_int(autoc_cities.length, _E.feature.data.recordpumper.skewness_of_responses)];
    cortex_json_o.respondent.work_as = autoc_classifications[_E.fxn.common.get_random_int(autoc_classifications.length, _E.feature.data.recordpumper.skewness_of_responses)];

    (_E.feature.data.recordpumper.debug) ? console.log(JSON.stringify(cortex_json_o)) : true;
    return cortex_json_o;
};

_E.feature.data.recordpumper.create_response_qas = function (action, survey_template) {
    (_E.feature.data.recordpumper.debug) ? console.log(`create_response_qas`) : true;
    var cortex_json_o = _E.feature.cortex.messages.create_survey_response_qa_part();
    (_E.feature.data.recordpumper.debug) ? console.log(JSON.stringify(cortex_json_o)) : true;
    return cortex_json_o;
};

_E.feature.data.recordpumper.cortexKeyMap = {
    "RENDER INSTRUCTIVE_TEXT": "SKIP",
    "RENDER PAGE_BREAK": "SKIP",
    "MULTI_CHOICE CGROUP": "USE_OPTION",
    "FREE_TEXT TEXTAREA": "USE_TEXT",
    "SINGLE_CHOICE SCALE_1_TO_5": "USE_OPTION_SCALE",
    "SINGLE_CHOICE SCALE_1_TO_10": "USE_OPTION_SCALE",
    "SINGLE_CHOICE RGROUP": "USE_OPTION",
    "CLASSIFIED GC_Language": "USE_CLASSIFIED_LANG",
    "CLASSIFIED GC_Org": "USE_CLASSIFIED_ORG",
    "CLASSIFIED CP_CSD": "USE_CLASSIFIED_CITY",
    "CLASSIFIED GC_ClsLvl": "USE_CLASSIFIED_ROLE",
    "CLASSIFIED CSPS_Offering": "USE_CLASSIFIED_OFFERING"
};

_E.feature.data.recordpumper.make_data_point = function (action) {
    if (action == "USE_TEXT") {
        return _E.feature.data.recordpumper.test_freetexts[_E.fxn.common.get_random_int(_E.feature.data.recordpumper.test_freetexts.length, _E.feature.data.recordpumper.skewness_of_responses)];
    } else if (action == "USE_CLASSIFIED_LANG") {
        return autoc_languages[_E.fxn.common.get_random_int(autoc_languages.length, _E.feature.data.recordpumper.skewness_of_responses)];
    } else if (action == "USE_CLASSIFIED_ORG") {
        return autoc_departments[_E.fxn.common.get_random_int(autoc_departments.length, _E.feature.data.recordpumper.skewness_of_responses)];
    } else if (action == "USE_CLASSIFIED_CITY") {
        return autoc_cities[_E.fxn.common.get_random_int(autoc_cities.length, _E.feature.data.recordpumper.skewness_of_responses)];
    } else if (action == "USE_CLASSIFIED_ROLE") {
        return autoc_classifications[_E.fxn.common.get_random_int(autoc_classifications.length, _E.feature.data.recordpumper.skewness_of_responses)]
    } else if (action == "USE_CLASSIFIED_OFFERING") {
        return "EVALHALLA_TEST_OFFERING";
    }
};

_E.feature.data.recordpumper.determine_action = function (key) {
    if (typeof _E.feature.data.recordpumper.cortexKeyMap[key] === "undefined") {
        return "SKIP"
    } else {
        return _E.feature.data.recordpumper.cortexKeyMap[key];
    }
};

_E.feature.data.recordpumper.generate_all_responses = function (survey_template) {
    (_E.feature.data.recordpumper.debug) ? console.log(`generate_all_responses`) : true;

    let responses = [];
    for (let j = 0; j < _E.feature.data.recordpumper.generate_this_many; j++) {
        let qs = survey_template.questions;
        let resp_qa_json = [];
        for (let i = 0; i < qs.length; i++) {

            let rec_data_key = `${qs[i].cortex.questionType} ${qs[i].cortex.classifiedAs}`;
            let rec_data_action = _E.feature.data.recordpumper.determine_action(rec_data_key);

            if (rec_data_action == "SKIP") {
                continue;
            } else {
                let q_part = _E.feature.data.recordpumper.create_response_qas(rec_data_action, survey_template);

                q_part.uid = qs[i].cortex.uid;
                q_part.questionType = qs[i].cortex.questionType;
                q_part.classifiedAs = qs[i].cortex.classifiedAs;
                q_part.atOrder = qs[i].cortex.atOrder;
                q_part.questionText = qs[i].question;

                if (rec_data_action == "USE_OPTION" || rec_data_action == "USE_OPTION_SCALE") {
                    let rindex = _E.fxn.common.get_random_int(qs[i].options.length, _E.feature.data.recordpumper.skewness_of_responses);

                    if (rec_data_action == "USE_OPTION_SCALE") {
                        q_part.questionAnswer = qs[i].options[rindex].value;
                    } else {
                        q_part.questionAnswer = qs[i].options[rindex].value.en;
                    }
                } else {
                    q_part.questionAnswer = _E.feature.data.recordpumper.make_data_point(rec_data_action);
                }
                resp_qa_json.push(q_part);
            }
        }
        responses.push(_E.feature.data.recordpumper.create_response(resp_qa_json, survey_template));

    }
    _E.feature.data.recordpumper.submit_response(responses);
    (_E.feature.data.recordpumper.debug) ? console.log(`complete generate_all_responses`) : true;
};

_E.feature.data.recordpumper.execute_load = function (survey_template) {
    (_E.feature.data.recordpumper.debug) ? console.log(`execute_load`) : true;
    (_E.feature.data.recordpumper.debug) ? console.log(survey_template) : true;

    if (confirm("Generate and Load Test Data?")) {
        let generate_this_many_in = prompt("How many responses?");
        let generate_with_skew_in = prompt("Skew value?");
        try {
            let generate_this_many_in_int = parseInt(generate_this_many_in);
            _E.feature.data.recordpumper.generate_this_many = generate_this_many_in_int;
        } catch (e) {
            _E.feature.data.recordpumper.generate_this_many = 100;
        }
        try {
            let generate_with_skew_in_float = parseFloat(generate_with_skew_in);
            _E.feature.data.recordpumper.skewness_of_responses = generate_with_skew_in_float;
        } catch (e) {
            _E.feature.data.recordpumper.skewness_of_responses = null;
        }

        _E.feature.data.recordpumper.generate_all_responses(survey_template);
    }
};

_E.feature.data.recordpumper.submit_response = function (responses) {
    (_E.feature.data.recordpumper.debug) ? console.log(`submit_response`) : true;
    //console.log(responses);

    $("#cortex_test_data").val(JSON.stringify(responses));
    $('#cortex_test_data_modal').modal('open');

};


_E.feature.data.recordpumper.enable_feature = function () {
    (_E.feature.data.recordpumper.debug) ? console.log(`enable_feature`) : true;
};
