/*

Evalhalla Evalese to JSON export feature

Given Omar, a survey developer
When Omar chooses to send his survey template to CORTEX
Then a JSON representation of his survey will be created
 And the JSON will be sent to CORTEX

_E["feature"]["exportJSON"]

*/

// init the package
(_E.feature.cortex) ? true : _E.feature.cortex = {};

_E.feature.cortex.messages = {};
_E.feature.cortex.messages.debug = false;


_E.feature.cortex.messages.get_stat_nodes = function () {
    let stat_node_response = `{
        "payload": {
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
            }, {
                "uid": "test_sur_q_3",
                "total": 2,
                "stats": "{\"Turkish\":2}",
                "questionType": "CLASSIFIED",
                "classifiedAs": "GC_Language"
            }, {
                "uid": "test_sur_q_4",
                "total": 2,
                "stats": "{\"CS-03\":2}",
                "questionType": "CLASSIFIED",
                "classifiedAs": "GC_ClsLvl"
            }, {
                "uid": "test_sur_q_5",
                "total": 2,
                "stats": "{\"Botwood\":2}",
                "questionType": "CLASSIFIED",
                "classifiedAs": "CP_CSD"
            }, {
                "uid": "test_sur_q_6",
                "total": 2,
                "stats": "{\"This 1\":2}",
                "questionType": "SINGLE_CHOICE",
                "classifiedAs": "RGROUP"
            }, {
                "uid": "test_sur_q_7",
                "total": 2,
                "stats": "{\"5\":2}",
                "questionType": "SINGLE_CHOICE",
                "classifiedAs": "SCALE_1_TO_5"
            }, {
                "uid": "test_sur_q_8",
                "total": 2,
                "stats": "{\"8\":2}",
                "questionType": "SINGLE_CHOICE",
                "classifiedAs": "SCALE_1_TO_10"
            }, {
                "uid": "test_sur_q_9",
                "total": 2,
                "stats": "{\"This is what\":2}",
                "questionType": "FREE_TEXT",
                "classifiedAs": "TEXTAREA"
            }, {
                "uid": "test_sur_q_10",
                "total": 2,
                "stats": "{\"Yes\":2}",
                "questionType": "SINGLE_CHOICE",
                "classifiedAs": "RGROUP"
            }, {
                "uid": "test_sur_q_11",
                "total": 4,
                "stats": "{\"No\":2}",
                "questionType": "MULTI_CHOICE",
                "classifiedAs": "CGROUP"
            }]
        }
    }`;
    return stat_node_response;
};


_E.feature.cortex.messages.create_survey_template_msg = function (jo) {
    (_E.feature.cortex.messages.debug) ? console.log(`create_survey_template_msg`) : true;
    let msg_cortex = {
        "uid": "",//
        "title": "",//
        "description": "",//
        "valid": {
            "from": "2019-06-01", // default to 2019-06-01
            "to": "2020-06-01" // default to 2020-06-01
        },
        "version": "0.0.1",
        "questions": [
            /*
                {
                    "question_label": "",//"SINGLE_CHOICE|MULTI_CHOICE|CLASSIFIED|BINARY|FREE_TEXT"
                    "question_interpretation": "",//"AS_CHOICE|AS_TRUTH|AS_FREE_TEXT|CLASSIFIED_AS"
                    "AT_ORDER": ""//
                }
            */
        ]
    };

    msg_cortex.uid = jo.survey.trim();
    msg_cortex.title = jo.title;
    msg_cortex.description = jo.description;
    msg_cortex.questions = jo.questions;
    msg_cortex = _E.fxn.common.trim_json_object_keyvalues(msg_cortex);

    return msg_cortex;
};

_E.feature.cortex.messages.create_survey_evalese_msg = function (jo) {
    (_E.feature.cortex.messages.debug) ? console.log(`create_survey_evalese_msg`) : true;
    let msg_cortex = {
        "uid": "",//
        "sur_evalese": ""
    };

    msg_cortex.uid = jo.survey.trim();
    msg_cortex.sur_evalese = _E.core.interpreter.sur_evalese.trim();
    msg_cortex = _E.fxn.common.trim_json_object_keyvalues(msg_cortex);

    return msg_cortex;
};



_E.feature.cortex.messages.create_survey_response_qa_part = function (jo) {
    let msg_cortex = {
        "uid": "",
        "questionType": "",
        "classifiedAs": "",
        "atOrder": "",
        "questionAnswer": "",
        "questionText": ""
    };
    return msg_cortex;
}
_E.feature.cortex.messages.create_survey_response_msg = function (jo) {

    let msg_cortex = {
        "response": {
            "userAgent": "",
            "surveyEntryMethod": "",
            "conducted": ""
        },
        "respondent": {
            "fluent_at": "",// "tombstone_language",
            "in_department": "",// "tombstone_department",
            "located_in": "",// "tombstone_city",
            "work_as": "",// "tombstone_classification"
        },
        "questions": [
            /*
                {
                    "uid": cortex_response.response.conducted + "_q_" + tokens[2],
                    "questionType": _E.core.interpreter.cortex_questiontypes[tokens[0]].type,
                    "classifiedAs": _E.core.interpreter.cortex_questiontypes[tokens[0]].subtype,
                    "atOrder": tokens[2],
                    "questionAnswer": jo[key],
                    "questionText": jo["textofquestion_qid_" + tokens[1]]
                }
            }*/
        ],
        "created": {
            "from": "", // default to 2019-06-01
            "to": "" // default to 2020-06-01
        }
    };
    if (typeof jo === "undefined") {
        return msg_cortex;
    }
    /*
    "tombstone_department": "",
    "tombstone_city": "",
    "tombstone_classification": "",
    "tombstone_offering_id": "",
    "tombstone_language": "en",

    "meta_useragent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    "meta_entry_method": "",
    "meta_question_count": 14,
    "meta_evalhalla_sur": "eldp",
    "meta_submission_time": "2019-08-17T22:03:26.727Z"
    */


    msg_cortex.response.conducted = jo["meta_evalhalla_sur"];
    msg_cortex.response.surveyEntryMethod = (jo["meta_entry_method"] == "") ? "DIRECT_LINK" : jo["meta_entry_method"];
    msg_cortex.response.userAgent = jo["meta_useragent"];
    //cortex_response.response.conducted = jo["meta_evalhalla_sur"];

    msg_cortex.respondent.fluent_at = jo["tombstone_language"];
    msg_cortex.respondent.in_department = jo["tombstone_department"];
    msg_cortex.respondent.located_in = jo["tombstone_city"];
    msg_cortex.respondent.work_as = jo["tombstone_classification"];


    msg_cortex.created.from = jo["meta_submission_time"];
    msg_cortex.created.to = jo["meta_submission_time"];

    for (let key in jo) {
        let tokens = key.split("_");
        if (tokens[0] == "tombstone") {
            continue;
        } else if (tokens[0] == "meta") {
            continue;
        } else if (tokens[0] == "rgroup" || tokens[0] == "cgroup" || tokens[0] == "scale1to10" ||
            tokens[0] == "scale1to5" || tokens[0] == "textarea") {

            msg_cortex.questions.push(
                {
                    "uid": msg_cortex.response.conducted + "_q_" + tokens[2],
                    "questionType": _E.core.interpreter.cortex_questiontypes[tokens[0]].type,
                    "classifiedAs": _E.core.interpreter.cortex_questiontypes[tokens[0]].subtype,
                    "atOrder": tokens[2],
                    "questionAnswer": jo[key],
                    "questionText": jo["textofquestion_qid_" + tokens[1]]
                }
            );
        }
    }
    return msg_cortex;
}

_E.feature.cortex.messages.enable_feature = function () {
    (_E.feature.cortex.messages.debug) ? console.log(`enable_feature`) : true;
};
