/*

Evalhalla local storage features

Given our audience, a varied network connectivity group
When the audience chooses visits our application
Then the application should be able to save their information until the network allows communication

_E["feature"]["localstore"]

*/

// init the package
_E.feature.localstore = {};
// init sub-feature: in evh_feature_questionlib.js
// _E.feature.localstore.questionlib = {};
// init the settings
_E.feature.localstore.settings = {
    "warn_user_no_storage": false // this will fire once and only once. No need to annoy.
};
// _E.core.state.store["localstore"]["warn_user_no_storage"] = false;

// REFACTOR_PREP: local storage, bunch of detangle and refactor
//
// LocalStorage for client side info store
//

// do we even has this?
_E.feature.localstore.ls_storageAvailable = function (type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

_E.feature.localstore.warn_user_alert = function () {
    // Too bad, no localStorage for us
    if (_E.feature.localstore.setting.warn_user_no_storage == false) {
        alert("This device does not support local storage. Save feature disabled.");
        _E.feature.localstore.setting.warn_user_no_storage = true;
    }
}

// REFACTOR_PREP: might be able to jettison in favor of dashboard
//
// Basic Pre-Survista Charting
//
// The idea here is so that you can use localStorage to save the responses on
// the device you're using (lets say you wanna decide what pizza to order for a meeting)
// This will let you build the survey, pass the device around, and then see a chart of the 
// results right away.

// TODO: Pull out template code into snips
// TODO: Optimize render, no need to show ls on every keystroke
// display the report of the stored information. Survey, Responses, all of it.
_E.feature.localstore.ls_show_local_storage = function () {
    if (_E.feature.localstore.ls_storageAvailable('localStorage')) {
        var ev_ls = _E.feature.localstore.ls_get_lsobject();
        var display_str = "";
        var tbody = "";


        display_str += _E.core.templates.get("ls_header").replace(/\%en/g, "Working Survey").replace(/\%fr/g, "Sondage en cours").replace(/\%count/g, "");
        display_str += _E.core.templates.get("ls");
        tbody = "";
        if (ev_ls["working_survey"] != null) {
            tbody += "<tr><td>" +
                (ev_ls["working_survey"]["title"] != null ? ev_ls["working_survey"]["title"] : "") +
                "</td><td>" +
                (ev_ls["working_survey"]["description"] != null ? ev_ls["working_survey"]["description"] : "") +
                "</td><td>" +
                (ev_ls["working_survey"]["language"] != null ? ev_ls["working_survey"]["language"] : "") +
                "</td><td>" +
                (ev_ls["working_survey"]["questions"] != null ? ev_ls["working_survey"]["questions"].length : "") +
                "</td><tr>" +
                "";
        } else {
            tbody = "<tr><td>None</td><td></td><td></td><td></td>";
        }
        display_str = display_str.replace(/\%tbody/g, tbody);

        display_str += _E.core.templates.get("ls_header").replace(/\%en/g, "Saved Survey").replace(/\%fr/g, "Sondage Sauvegardées");
        display_str += _E.core.templates.get("ls");
        tbody = "";
        if (ev_ls["saved_survey_signatures"] != null
            && ev_ls["saved_survey_signatures"].length > 0) {
            display_str = display_str.replace(/\%count/g, ev_ls["saved_survey_signatures"].length);
            var cs = null;
            for (var l = 0; l < ev_ls["saved_survey_signatures"].length; l++) {
                cs = ev_ls["saved_survey_signatures"][l]["survista"];
                tbody += '<tr><td><a id="sv_sr_' + l + '" class="adm_load_survey">' +
                    (cs["title"] != null ? cs["title"] : "") +
                    "</a></td><td>" +
                    (cs["description"] != null ? cs["description"] : "") +
                    "</td><td>" +
                    (cs["language"] != null ? cs["language"] : "") +
                    "</td><td>" +
                    (cs["questions"] != null ? cs["questions"].length : "") +
                    "</td><tr>" +
                    "";
            }
        } else {
            tbody = "<tr><td>-</td><td></td><td></td><td></td>";
        }
        display_str = display_str.replace(/\%count/g, "0");
        display_str = display_str.replace(/\%tbody/g, tbody);

        display_str += _E.core.templates.get("ls_header").replace(/\%en/g, "Saved Responses").replace(/\%fr/g, "Réponses Sauvegardées");
        display_str += _E.core.templates.get("ls");
        tbody = "";
        if (ev_ls["saved_filled_survey_responses"] != null && ev_ls["saved_filled_survey_responses"].length > 0) {
            display_str = display_str.replace(/\%count/g, ev_ls["saved_filled_survey_responses"].length);
            var survey = "", answer = "", answer_text = "", keys = "", qid = "", q = "", qida = [], opt_text = "", type = "";
            var tabulation = {};
            for (var l = 0; l < ev_ls["saved_filled_survey_responses"].length; l++) {
                answer_text = [];
                survey = ev_ls["saved_filled_survey_responses"][l]["survey"];
                answer = ev_ls["saved_filled_survey_responses"][l]["response"];

                // key = Object.keys(answer);
                if (typeof survey["questions"] !== "undefined") {
                    for (var k in answer) {
                        type = (k.split("_"))[0];
                        qida = (k.match(/\d+/g));
                        qid = "";
                        try {
                            qid = qida[0];
                        } catch (e) {
                            qid = -1;
                        }
                        oid = "";

                        //console.log(qid, k);

                        if (typeof tabulation[survey["title"]] === "undefined") {
                            tabulation[survey["title"]] = {};
                        }


                        q = survey["questions"].find(function (element) {
                            return element["qid"] == qid;
                        });
                        opt_text = "";
                        try {
                            if (typeof qida[1] !== "undefined") {
                                oid = qida[1];
                                opt_text = q["options"][oid];
                            }
                        } catch (e) {
                            // do nothing
                        }
                        var ans_key = ("Q" + qid + " " + opt_text).trim();
                        if (typeof q !== "undefined") {
                            if (typeof tabulation[survey["title"]][ans_key] === "undefined") {
                                tabulation[survey["title"]][ans_key] = {
                                    "question": (q["question"] + " " + opt_text).trim(),
                                    "values": []
                                }
                            }
                            tabulation[survey["title"]][ans_key]["values"].push(
                                //"(Q" + qid + ", " + type + ") " +
                                //q["question"] + " " + opt_text +
                                //" (A) " + 
                                answer[k]
                                // + "<br>"
                            );

                            answer_text.push(
                                "(Q" + qid + ", " + type + ") " +
                                q["question"] + " " + opt_text +
                                " (A) " + answer[k] + "<br>"
                            );
                        }

                    }
                    answer_text.sort();
                }

                tbody += "<tr><td>" +
                    ev_ls["saved_filled_survey_responses"][l]["survey"]["title"] +
                    "</td><td>" +
                    answer_text.join(" ") + //JSON.stringify(ev_ls["saved_filled_survey_responses"][l]["response"], null, 4) +
                    "</td><td>" +
                    //"<pre>" + JSON.stringify(ev_ls["saved_filled_survey_responses"][l]["response"], null, 4) + "</pre>" +
                    "-</td><td>" +
                    //<input value='" + JSON.stringify(ev_ls["saved_filled_survey_responses"][l]["survey"], null, 4) + "'/>" +
                    "-</td><tr>" +
                    "";


            }
        } else {
            tbody = "<tr><td>-</td><td></td><td></td><td></td>";
        }
        display_str = display_str.replace(/\%count/g, "0");
        display_str = display_str.replace(/\%tbody/g, tbody);


        var regen_color_btn = '<a class="regen_color btn purp-canada-ca lighten-2"><span class="en">Colour</span><span class="fr">Couleur</span></a>';
        display_str += _E.core.templates.get("ls_header")
            .replace(/\%en/g, "Tabulated Results (Basic)")
            .replace(/\%fr/g, "Resultats Tabulé (Simple)");

        display_str += regen_color_btn;
        var metrics = {};
        var charts = [];
        var slices = [];
        for (var index in tabulation) {
            metrics = {};
            display_str += "" + "<div><strong>" + index + "</strong></div>";// + JSON.stringify(tabulation[index]) + "</div><hr>";
            for (var rindex in tabulation[index]) {
                metrics = {};
                slices = [];
                display_str += "<li><strong>" + rindex + "</strong> <em>" +
                    tabulation[index][rindex]["question"] +
                    "</em><br>";
                for (var t = 0; t < tabulation[index][rindex]["values"].length; t++) {
                    if (typeof metrics[tabulation[index][rindex]["values"][t]] === "undefined") {
                        metrics[tabulation[index][rindex]["values"][t]] = 1
                    } else {
                        metrics[tabulation[index][rindex]["values"][t]] += 1
                    }
                }
                for (var metric in metrics) {
                    metrics[metric] = (parseFloat(metrics[metric]) / parseFloat(tabulation[index][rindex]["values"].length));

                    slices.push(
                        { percent: metrics[metric], color: _E.fxn.common.randomHsl() }
                    );
                    metrics[metric] = (metrics[metric] * 100).toFixed(1) + "%";
                }
                charts.push(
                    {
                        "chart_id": _E.fxn.common.slugify("" + index + "_" + rindex + "_" + "chart"),
                        "slices": slices
                    }
                );
                display_str += '<svg class="hnpie" id="' + _E.fxn.common.slugify(index + "_" + rindex + "_" + "chart") + '" viewBox="-1 -1 2 2" style="transform: rotate(-90deg)"></svg>';
                for (var metric in metrics) {
                    display_str += " <strong>" + (metric == "" ? "Blank Response" : metric) + "</strong>: " + metrics[metric] + ", ";
                }
                display_str += "</li>";
            }
            display_str += "<hr>";
        }
        //display_str += "" + "<pre>" + JSON.stringify(tabulation, null, 4) + "</pre>";

        _E.core.state.store["el"]["c_ls"].html("" +
            _E.core.interpreter.activate_lang(display_str)
        );
        $(".adm_load_survey").on("click", function () {
            _E.feature.localstore.ls_load_survey($(this).attr("id"), "sv_sr_");
        });

        _E.feature.lang.refresh_lang();

        for (var i = 0; i < charts.length; i++) {
            _E.fxn.common.hackernoon_pie(charts[i]["chart_id"], charts[i]["slices"]);
        }
        $(".regen_color").on("click", function (e) {
            e.preventDefault();
            _E.feature.localstore.ls_show_local_storage();
            return false;
        });

        //ui_resize_textareas();
    } else {
        _E.feature.localstore.warn_user_alert();
    }
}

// REFACTOR_PREP: local storage, detangle the render
// pull the survey from localstorage and render it
_E.feature.localstore.ls_load_survey = function (id, trim) {
    if (_E.feature.localstore.ls_storageAvailable('localStorage')) {
        var ls_index = parseInt(id.replace(trim, ""), 10);
        var ev_ls = _E.feature.localstore.ls_get_lsobject();

        _E.core.state.store["el"]["c_editor"].val(
            ev_ls["saved_survey_signatures"][ls_index]["evalhalla"]
        );

        _E.core.state.store["el"]["c_editor"].trigger("change");
    } else {
        _E.feature.localstore.warn_user_alert();
    }
}

// REFACTOR_PREP: local storage, detangle the render
// clear out the local storage, clean and frush.
_E.feature.localstore.ls_clear_saved_entries = function () {
    if (_E.feature.localstore.ls_storageAvailable('localStorage')) {
        localStorage.clear();
        _E.feature.localstore.ls_init_local_storage();
        _E.core.state.store["el"]["c_editor"].trigger("change");
        _E.feature.localstore.ls_show_local_storage();
    } else {
        _E.feature.localstore.warn_user_alert();
    }
}

// REFACTOR_PREP: local storage, detangle the render
/*
This is a peek at what we're saving
Survista has JSON format to follow, Evalhalla has evalese.
 
ev_ls = {
    "working_survey": "", // json source curr survey
    "saved_survey_signature": [{"survista":{}, "evalhalla": ""}], // array of json src
    "saved_filled_survey_responses": [{},{}], //array of answerjson + survey sig
}
*/
// initialize the local store
_E.feature.localstore.ls_init_local_storage = function () {
    if (_E.feature.localstore.ls_storageAvailable('localStorage')) {
        var ev_ls = {
            "working_survey": {}, // json source curr survey
            "saved_survey_signatures": [], // array of json src
            "saved_filled_survey_responses": [], //array of answerjson + survey sig
        };
        localStorage.setItem('ev_ls', JSON.stringify(ev_ls));
    } else {
        _E.feature.localstore.warn_user_alert();
    }
}
// get the string from local store and make it an object for use
_E.feature.localstore.ls_get_lsobject = function () {
    var ev_ls = localStorage.getItem('ev_ls');
    if (ev_ls == null) {
        _E.feature.localstore.ls_init_local_storage();
        ev_ls = localStorage.getItem('ev_ls');
    }
    ev_ls = JSON.parse(ev_ls);
    return ev_ls;
}

// save the current survey in the editor to the ls
_E.feature.localstore.ls_save_survey_signature = function (signature, src) {
    if (_E.feature.localstore.ls_storageAvailable('localStorage')) {
        var ev_ls = _E.feature.localstore.ls_get_lsobject();
        //console.log(ev_ls);
        ev_ls["saved_survey_signatures"].push({ "survista": JSON.parse(signature), "evalhalla": src });
        localStorage.setItem('ev_ls', JSON.stringify(ev_ls));
        _E.feature.localstore.ls_show_local_storage();
        //ui_resize_textareas();
    } else {
        _E.feature.localstore.warn_user_alert();
    }
}
// update the local store of the current working survey
// this allows cross refresh content to remain
_E.feature.localstore.ls_update_working_survey = function (signature) {
    if (_E.feature.localstore.ls_storageAvailable('localStorage')) {
        var ev_ls = _E.feature.localstore.ls_get_lsobject();
        try {
            ev_ls["working_survey"] = JSON.parse(_E.core.interpreter.evh_clean_json(signature));
            localStorage.setItem('ev_ls', JSON.stringify(ev_ls));
            _E.core.interpreter.dismiss_parse_error();
        } catch (e) {
            _E.core.interpreter.show_parse_error();
        }
        //todo: timer on refreshes
        //ls_show_local_storage();
        //ui_resize_textareas();
    } else {
        _E.feature.localstore.warn_user_alert();
    }
}


// save the survey response into the local store. allows for offline storage for upload later
// TODO: upload later function
_E.feature.localstore.ls_save_survey_response = function (response) {
    if (_E.feature.localstore.ls_storageAvailable('localStorage')) {
        var ev_ls = _E.feature.localstore.ls_get_lsobject();

        ev_ls["saved_filled_survey_responses"].push(
            {
                "response": JSON.parse(response),
                "survey": ev_ls["working_survey"]
            }
        );

        localStorage.setItem('ev_ls', JSON.stringify(ev_ls));
        _E.feature.localstore.ls_show_local_storage();
        //ui_resize_textareas();

        // submit to api
        // deprecated: turn back on
        //api_upload_survey_result(response);

        // clear responses
        // TODO: reinit tombstone generics, refactor needed
        // REFACTOR: turned this off, no longer required
        // _E.core.state.store["generics"]["generic_fetched"] = false;
        // api_get_generics();

        // Bug fix, after paginator, this was causing the buttons to not have click events
        //_E.core.state.store["el"]["c_editor"].trigger("change");
    } else {
        _E.feature.localstore.warn_user_alert();
    }
}

_E.feature.localstore.ls_view_saved_entries = function () {
    if (_E.feature.localstore.ls_storageAvailable('localStorage')) {
        _E.feature.localstore.ls_show_local_storage();
    } else {
        _E.feature.localstore.warn_user_alert();
    }
}

// EXEC INIT -- fire the load for the question library
_E.feature.localstore.enable_feature = function () {

    $(".update_ls").on("click", function (e) {
        e.preventDefault();
        _E.feature.localstore.ls_show_local_storage();
        return false;
    });
};
