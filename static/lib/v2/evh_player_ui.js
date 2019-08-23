/*

Evalhalla player ui

_E["feature"]["player"]

*/

// init the package
_E.feature.player = {};

// REFACTOR_PREP: paginator
// pagination
_E.feature.player.debug = true;

// transitions for the survey
_E.feature.player.transitions_state = "true";
_E.feature.player.transitions = {
    "lang": {
        "next": "offering",
        "prev": "lang",
        "ttype": "intro_page"
    },
    "offering": {
        "next": "tombstone",
        "prev": "lang",
        "ttype": "intro_page"
    },
    "tombstone": {
        "next": "1", //survey
        "prev": "offering",
        "ttype": "intro_page"
    },
    "1": {
        "next": "thanks",
        "prev": "tombstone",
        "ttpe": "survey_page"
    },
    "thanks": {
        "next": "lang",
        "prev": "lang",
        "ttype": "intro_page"
    }
};
_E.feature.player.getnextpage = function (onpage) {
    try {
        return _E.feature.player.transitions[onpage].next;
    } catch (e) {
        return "lang";
    }
};
_E.feature.player.getprevpage = function (onpage) {
    try {
        return _E.feature.player.transitions[onpage].prev;
    } catch (e) {
        return "lang";
    }
};
// Based on /noofferingpage or /notombstonepage adjust the transitions
_E.feature.player.transitions_update_paths = function () {
    // go in reverse order flow through it
    if (_E.core.state.store["render"]["no tombstone page"] == true) {
        // update offering node
        _E.feature.player.transitions["offering"].next = "1";
        _E.feature.player.transitions["offering"].prev = "lang";
        // update survey node
        _E.feature.player.transitions["1"].prev = "offering";
    }

    if (_E.core.state.store["render"]["no offering page"] == true) {
        // update lang node
        _E.feature.player.transitions["lang"].next = "tombstone";
        _E.feature.player.transitions["lang"].prev = "lang";
        // update tombstone node
        _E.feature.player.transitions["tombstone"].prev = "lang";
    }

    if (_E.core.state.store["render"]["no tombstone page"] == true && _E.core.state.store["render"]["no offering page"] == true) {
        // update lang node
        _E.feature.player.transitions["lang"].next = "1";
        _E.feature.player.transitions["lang"].prev = "lang";
        // update survey node
        _E.feature.player.transitions["1"].prev = "lang";
    }
};
// reset survey for another survey taker
_E.feature.player.reset_page = function () {
    // set state to end of survey
    _E.feature.player.transitions_state = "thanks";

    $("#autocomplete-input-department").val("");
    $("#autocomplete-input-city").val("");
    $("#autocomplete-input-classification").val("");

    let prevstate = _E.feature.player.transitions_state;
    let nextstate = _E.feature.player.getnextpage(_E.feature.player.transitions_state);

    (_E.feature.player.debug) ? console.log(`<-- _E.feature.player.reset_page ${prevstate} > ${nextstate} | pg ${_E.core.state.store["render"]["currpageid"]} / ${_E.core.state.store["render"]["pageid"]}`) : true;

    _E.feature.player.transitions_state = nextstate;
    _E.core.state.store["render"]["currpageid"] = 0;
    _E.feature.player.set_page(_E.feature.player.transitions_state, "intro_page");

    (_E.feature.player.debug) ? console.log(`--> _E.feature.player.reset_page ${_E.feature.player.transitions_state} | pg ${_E.core.state.store["render"]["currpageid"]} / ${_E.core.state.store["render"]["pageid"]}`) : true;
};
// set the progress bar details
_E.feature.player.set_progress_percent = function () {
    var pct = 0;
    try {
        pct = ((parseFloat(_E.core.state.store["render"]["currpageid"]) / parseFloat(_E.core.state.store["render"]["pageid"])) * 100).toFixed(0);
    } catch (e) {
        pct = 0;
    }
    $(".determinate").css({ "width": pct + "%" });
    $(".determinate-text").text(pct + "%");
};
// hide/show for the pages
_E.feature.player.set_page = function (pageindex) {
    // determine page type
    let ttype = "survey_page";
    if (isNaN(pageindex)) {
        ttype = "intro_page";
    } else {
        ttype = "survey_page";
        _E.core.state.store["render"]["currpageid"] = pageindex;
        _E.feature.player.set_progress_percent();
    }

    if (ttype == "survey_page") {
        $(".surveybody").show();
        _E.core.state.store["el"]["ui_render"].show();
    } else {
        $(".surveybody").hide();
        _E.core.state.store["el"]["ui_render"].hide();
    }

    (_E.feature.player.debug) ? console.log(`<-- _E.feature.player.set_page ${_E.feature.player.transitions_state} | pg ${_E.core.state.store["render"]["currpageid"]} / ${_E.core.state.store["render"]["pageid"]}`) : true;

    _E.core.state.store["render"]["currpageid"] = pageindex;
    _E.feature.player.transitions_state = "" + pageindex;

    $(".ev-page").hide();
    $(".ev-page-" + pageindex).show();
    $(".ev-page-sel").removeClass("active");
    $(".ev-page-sel-" + pageindex).addClass("active");

    _E.feature.player.ui_disable_unready_controls();

    (_E.feature.player.debug) ? console.log(`--> _E.feature.player.set_page ${_E.feature.player.transitions_state} | pg ${_E.core.state.store["render"]["currpageid"]} / ${_E.core.state.store["render"]["pageid"]}`) : true;
};
// paginator enable - add the transitions for the survey
_E.feature.player.enable_paginator = function () {
    for (var i = 1; i <= _E.core.state.store["render"]["pageid"]; i++) {
        $(".ev-page-sel-" + i).on("click", { "i": i },
            function (e) {
                _E.feature.player.set_page(e.data.i);
            }
        );

        _E.feature.player.transitions["" + i] = {
            "ttype": "survey_page",
            "next": (i == _E.core.state.store["render"]["pageid"]) ? "thanks" : i + 1,
            "prev": (i == 1) ? "tombstone" : i - 1
        };
    }
    (_E.feature.player.debug) ? console.log(_E.feature.player.transitions) : true;
};
// advance state backward
_E.feature.player.prev_page = function () {
    let prevstate = _E.feature.player.transitions_state;
    let nextstate = _E.feature.player.getprevpage(_E.feature.player.transitions_state);

    (_E.feature.player.debug) ? console.log(`<-- _E.feature.player.prev_page ${prevstate} > ${nextstate} |  pg ${_E.core.state.store["render"]["currpageid"]} / ${_E.core.state.store["render"]["pageid"]}`) : true;

    _E.feature.player.transitions_state = nextstate;
    _E.feature.player.set_page(_E.feature.player.transitions_state);

    (_E.feature.player.debug) ? console.log(`--> _E.feature.player.prev_page ${_E.feature.player.transitions_state} |  pg ${_E.core.state.store["render"]["currpageid"]} / ${_E.core.state.store["render"]["pageid"]}`) : true;
};
// advance state forward
_E.feature.player.next_page = function () {
    let prevstate = _E.feature.player.transitions_state;
    let nextstate = _E.feature.player.getnextpage(_E.feature.player.transitions_state);

    (_E.feature.player.debug) ? console.log(`<-- _E.feature.player.next_page ${prevstate} > ${nextstate} |  pg ${_E.core.state.store["render"]["currpageid"]} / ${_E.core.state.store["render"]["pageid"]}`) : true;

    _E.feature.player.transitions_state = nextstate;
    _E.core.state.store["render"]["currpageid"] = parseInt(_E.feature.player.transitions_state);
    _E.feature.player.set_page(_E.feature.player.transitions_state);

    (_E.feature.player.debug) ? console.log(`--> _E.feature.player.next_page ${_E.feature.player.transitions_state} |  pg ${_E.core.state.store["render"]["currpageid"]} / ${_E.core.state.store["render"]["pageid"]}`) : true;
};
// disable/able the buttons 
_E.feature.player.ui_disable_unready_controls = function () {
    $("#evalhalla_submit").addClass("disabled accessibledisabled");
    $(".ev-page-sel-" + "right").removeClass("disabled accessibledisabled");
    window.scrollTo(0, 0);
    if (_E.core.state.store["render"]["currpageid"] == _E.core.state.store["render"]["pageid"]) {
        $("#evalhalla_submit").removeClass("disabled accessibledisabled");
        $(".ev-page-sel-" + "right").addClass("disabled accessibledisabled");
    }
};
// tombstone page buttons
_E.feature.player.ui_activate_introtombstone_buttons = function () {
    $(".tombstone-next").on("click", function () {
        _E.feature.player.next_page();
    });
    $(".tombstone-prev").on("click", function () {
        _E.feature.player.prev_page();
    });
    // step advance - ready for next partipant step
    $(".ev-ready-for-next").on("click", function () {
        _E.feature.player.reset_page();
    });
};
// set language button
_E.feature.player.ui_activate_introlangset_controls = function (lang) {
    _E.core.state.store["ui"]["lang"] = lang;
    _E.feature.lang.refresh_lang();
    $(".dropdown-trigger").dropdown();
};
// language page buttons
_E.feature.player.ui_activate_introlangset_buttons = function () {
    //_E.core.state.store["el"]["lang_set_fr"]
    $(".lang-set-fr").on("click", function () {
        _E.feature.player.ui_activate_introlangset_controls("fr");
        _E.feature.player.next_page();
    });
    //_E.core.state.store["el"]["lang_set_en"]
    $(".lang-set-en").on("click", function () {
        _E.feature.player.ui_activate_introlangset_controls("en");
        _E.feature.player.next_page();
    });
};
// offering page buttons
_E.feature.player.ui_activate_intropagedirection_buttons = function () {
    $(".ev-page-sel-" + "offering").on("click", function () {
        _E.feature.player.next_page();
    });
};
// page flow buttons
_E.feature.player.ui_activate_pagedirection_buttons = function () {
    $(".ev-page-sel-" + "left").on("click", function () {
        _E.feature.player.prev_page();
    });
    $(".ev-page-sel-" + "right").on("click", function () {
        _E.feature.player.next_page();
    });
};

//
// SUBMISSION
//

// send to storage
_E.feature.player.api_upload_survey_result = function (data_in) {
    // upload the survey reponse to our integrations
    let api_route = "";
    api_route = sv_api_post_surv_resp_route + sv_api_key;
    _E.fxn.common.api_post_to_route(api_route, data_in);
};

// send to cortex
_E.feature.player.cortex_upload_survey_result = function (data_in) {
    // STUB
    //alert(data_in);
    console.log("CORTEX Upload Stub");
    console.log(data_in);
}

// validate the survey
_E.feature.player.ui_evalhalla_submit_validate = function (formElement) {
    // REFACTOR_PREP: api, detangle the render and local storage, submit the form result
    alert("Missing data / Données manquantes");
    $(".ev-page").show();
    $(".ev-page-lang").hide();
    $(".ev-page-offering").hide();
    $(".ev-page-tombstone").hide();
    $(".ev-page-thanks").hide();

    window.scrollTo(0, 0);

    return formElement.checkValidity();
};

// submit the survey
_E.feature.player.evalhalla_submit = function () {
    // make some form data
    var formElement = document.getElementById("evalhalla_form");
    var formData = new FormData(formElement);
    var query_string = $("#evalhalla_form").serialize();
    //console.log(query_string);
    if (formElement.checkValidity() == true) {
        //alert("Good to go!");
    } else {
        return _E.feature.player.ui_evalhalla_submit_validate(formElement);
    }
    // let em know
    var json_o = _E.fxn.common.get_params_as_object(query_string);

    // get tombstone details
    // TODO: Sanitize inputs, done?
    json_o["tombstone_department"] = _E.fxn.common.safe($("#autocomplete-input-department").val());
    json_o["tombstone_city"] = _E.fxn.common.safe($("#autocomplete-input-city").val());
    json_o["tombstone_classification"] = _E.fxn.common.safe($("#autocomplete-input-classification").val());
    json_o["tombstone_offering_id"] = _E.fxn.common.safe(_E.core.state.store["tombstone"]["offering_id"]);
    json_o["tombstone_language"] = _E.fxn.common.safe(_E.core.state.store["ui"]["lang"]);

    // user-agent information
    json_o["meta_useragent"] = _E.fxn.common.safe(window.navigator.userAgent);
    json_o["meta_entry_method"] = _E.fxn.common.safe(_E.feature.qparam.settings.entry); // "email", "QR", "web", "altered"
    json_o["meta_evalhalla_sur"] = _E.fxn.common.safe(_E.feature.qparam.settings.sur);


    let question_count = 0;
    for (let key in _E.core.interpreter.g_qindex) {
        let value = _E.core.interpreter.g_qindex[key];
        if (_E.core.interpreter.g_qindex.hasOwnProperty(key)) {
            json_o["textofquestion_qid_" + key] = value;
            question_count = question_count + 1;
        }
    }

    json_o["meta_question_count"] = question_count;
    let date = new Date();
    let date_string = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
    json_o["meta_submission_time"] = date_string;


    let jo = json_o;

    // for survista
    var json_o_string = (JSON.stringify(json_o, null, 4));
    // for cortex
    var cortex_json_o_string = (JSON.stringify(_E.feature.cortex.messages.create_survey_response_msg(jo), null, 4));
    (_E.feature.player.debug) ? console.log(cortex_json_o_string) : true;
    // save response to local storage

    //
    // SAVE RESPONSES
    //
    // TODO: turn back on (localstorage)
    (_E.feature.player.debug) ? true : _E.feature.localstore.ls_save_survey_response(json_o_string);
    // TODO: turn back on (survista)
    (_E.feature.player.debug) ? true : _E.feature.player.api_upload_survey_result(json_o_string);
    // TODO: Add CORTEX send here
    (_E.feature.player.debug) ? true : _E.feature.player.cortex_upload_survey_result(cortex_json_o_string);

    console.log(json_o_string);
    //console.log(_E.core.interpreter.g_qindex);

    // show local storage items
    _E.feature.localstore.ls_view_saved_entries();
    //alert(json_o_string);

    // advance page
    _E.feature.player.next_page();
};

//
//
//

// init the player
_E.feature.player.init_feature = function () {
    $("#pre_survey_panels").html(
        _E.core.templates.get("step lang") +
        _E.core.templates.get("step offering") +
        _E.core.templates.get("step tombstone") +
        _E.core.templates.get("step thanks")
    );

    // reinit submit, lang refresh
    $("#evalhalla_submit").on("click", _E.feature.player.evalhalla_submit);
    _E.feature.lang.refresh_lang();

    // enable/disable controls
    _E.feature.player.enable_paginator();
    // update the transition table
    _E.feature.player.transitions_update_paths();

    // REFACTOR_PREP: UI
    $(".sidenav").sidenav();
    $(".parallax").parallax();
    $('.fixed-action-btn').floatingActionButton();
    $('.modal').modal();
    $(".dropdown-trigger").dropdown();

    // auto presentation mode
    _E.core.state.store["el"]["ui_render"].removeClass("m6").addClass("m12");

    // from evh_autocomplete.js
    _E.feature.autocomplete.enable_feature();

    _E.core.state.store["el"]["ui_render"].hide();
    _E.core.state.store["el"]["ui_editor"].hide();
    _E.core.state.store["el"]["ui_json"].hide();
    _E.core.state.store["el"]["ui_ls"].hide();
    _E.core.state.store["el"]["ui_qlib"].hide();

    $("#admin_footer").hide();
    $("#admin_footer_end").hide();
    $(".adm-function").hide();

    _E.core.state.store["ui"]["hs_render_window"] = true;
    _E.core.state.store["el"]["ui_render"].show();
    $(".surveybody").show();

    // set to page 0
    _E.core.state.store["render"]["currpageid"] = 0;

    //$(".ev-page").hide();
    $(".ev-page-" + _E.core.state.store["render"]["currpageid"]).show();
    $(".ev-page-sel").removeClass("active");
    $(".ev-page-sel-" + _E.core.state.store["render"]["currpageid"]).addClass("active");

    // percentage
    _E.feature.player.set_progress_percent();

    // enable/disable controls
    _E.feature.player.ui_disable_unready_controls();

    // HACK: hidden textareas have real height for some reason.
    // adding display none kills resize capability of textarea.
    // we're dynamically adding the maxsize when we need it in presentation mode
    $(".hiddendiv").addClass("hiddendiv-maxsized");
    // enable buttons for intro steps
    _E.feature.player.ui_activate_introlangset_buttons();
    _E.feature.player.ui_activate_introtombstone_buttons();
    _E.feature.player.ui_activate_intropagedirection_buttons();
    _E.feature.player.ui_activate_pagedirection_buttons();

    // advance page to start
    //_E.feature.player.set_page("lang"); // start survey
    _E.feature.player.reset_page();
};

// used by interpreter. Seperate function in case custom calls needed
_E.feature.player.activate_html = function () {
    _E.feature.player.init_feature();
}

// enable feature
_E.feature.player.enable_feature = function () {
    _E.feature.player.init_feature();
};
