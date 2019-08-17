/*

Evalhalla player ui

_E["feature"]["player"]

*/

// init the package
_E.feature.player = {};

// REFACTOR_PREP: paginator
// pagination

// REFACTOR_PREP: paginator
// step advance - tomstone information set
_E.feature.player.ui_activate_introtombstone_buttons = function () {
    $(".tombstone-set").on("click", function () {
        //$("#step_tombstone").hide();
        //$(".surveybody").show();
        //_E.core.state.store["el"]["ui_render"].show();
        _E.core.state.store["render"]["currpageid"] = 1; // advance page, note we're switching types here
        //console.log(_E.core.state.store["render"]["currpageid"]);
        _E.feature.player.hs_page_step();
    });
    // step advance - ready for next partipant step
    $(".ev-ready-for-next").on("click", function () {
        $("#step_thank_you_cta").hide();
        $("#step_lang").show();
        $("#autocomplete-input-department").val("");
        $("#autocomplete-input-city").val("");
        $("#autocomplete-input-classification").val("");
    });
};

_E.feature.player.hs_page_step = function () {
    if (_E.core.state.store["render"]["currpageid"] <= 0) {
        //_E.core.state.store["render"]["currpageid"] = 1;
        _E.core.state.store["render"]["currpageid"] = "tombstone";
        _E.feature.player.hs_page_intro_step();
        return;
    }
    var pct = 0;
    try {
        pct = ((parseFloat(_E.core.state.store["render"]["currpageid"]) / parseFloat(_E.core.state.store["render"]["pageid"])) * 100).toFixed(0);
    } catch (e) {
        pct = 0;
    }
    $(".surveybody").show();
    _E.core.state.store["el"]["ui_render"].show();
    $(".ev-page").hide();
    $(".ev-page-" + _E.core.state.store["render"]["currpageid"]).show();
    $(".ev-page-sel").removeClass("active");
    $(".ev-page-sel-" + _E.core.state.store["render"]["currpageid"]).addClass("active");

    $(".determinate").css({ "width": pct + "%" });
    $(".determinate-text").text(pct + "%");
};

_E.feature.player.hs_page_intro_step = function () {

    /*if (_E.core.state.store["render"]["currpageid"] == "lang") {
        _E.core.state.store["render"]["currpageid"] = "offering";
    } else if (_E.core.state.store["render"]["currpageid"] == "offering") {
        _E.core.state.store["render"]["currpageid"] = "tombstone";
    } else if (_E.core.state.store["render"]["currpageid"] == "tombstone") {
        _E.core.state.store["render"]["currpageid"] = "1";
        $(".surveybody").show();
        hs_page_step();
        return;
    }*/
    $(".surveybody").hide();
    $(".ev-page").hide();
    $(".ev-page-" + _E.core.state.store["render"]["currpageid"]).show();
};

_E.feature.player.ui_activate_introlangset_buttons = function () {
    //_E.core.state.store["el"]["lang_set_fr"]
    $(".lang-set-fr").on("click", function () {
        _E.core.state.store["ui"]["lang"] = "fr";
        _E.feature.lang.refresh_lang();
        //ui_resize_textareas();
        $(".dropdown-trigger").dropdown();
        //$("#step_lang").hide();
        //$("#step_offering").show();
        _E.core.state.store["render"]["currpageid"] = "offering"; // advance page
        //console.log(_E.core.state.store["render"]["currpageid"]);
        _E.feature.player.hs_page_intro_step();
    });
    //_E.core.state.store["el"]["lang_set_en"]
    $(".lang-set-en").on("click", function () {
        _E.core.state.store["ui"]["lang"] = "en";
        _E.feature.lang.refresh_lang();
        //ui_resize_textareas();
        $(".dropdown-trigger").dropdown();
        //$("#step_lang").hide();
        //$("#step_offering").show();
        _E.core.state.store["render"]["currpageid"] = "offering"; // advance page
        //console.log(_E.core.state.store["render"]["currpageid"]);
        _E.feature.player.hs_page_intro_step();
    });
};

_E.feature.player.ui_activate_intropagedirection_buttons = function () {
    $(".ev-page-sel-" + "offering").on("click", function () {
        _E.core.state.store["render"]["currpageid"] = "offering";
        _E.feature.player.hs_page_intro_step();
    });
};

_E.feature.player.ui_activate_pagedirection_buttons = function () {
    $(".ev-page-sel-" + "left").on("click", { "i": "left" },
        function (e) {
            if (isNaN(_E.core.state.store["render"]["currpageid"]) == false) {
                _E.core.state.store["render"]["currpageid"] = _E.core.state.store["render"]["currpageid"] - 1;
                _E.feature.player.hs_page_step();
            } else {
                _E.feature.player.hs_page_intro_step();
            }


            //alert(e.data.i);
            $("#evalhalla_submit").addClass("disabled accessibledisabled");
            $(".ev-page-sel-" + "right").removeClass("disabled accessibledisabled");
            window.scrollTo(0, 0);
            if (_E.core.state.store["render"]["currpageid"] == _E.core.state.store["render"]["pageid"]) {
                $("#evalhalla_submit").removeClass("disabled accessibledisabled");
                $(".ev-page-sel-" + "right").addClass("disabled accessibledisabled");
            }
        });
    $(".ev-page-sel-" + "right").on("click", { "i": "right" },
        function (e) {
            //alert(e.data.i);
            _E.core.state.store["render"]["currpageid"] = _E.core.state.store["render"]["currpageid"] + 1;
            if (_E.core.state.store["render"]["currpageid"] >= _E.core.state.store["render"]["pageid"]) {
                _E.core.state.store["render"]["currpageid"] = _E.core.state.store["render"]["pageid"];
            }
            $(".ev-page").hide();
            $(".ev-page-" + _E.core.state.store["render"]["currpageid"]).show();
            $(".ev-page-sel").removeClass("active");
            $(".ev-page-sel-" + _E.core.state.store["render"]["currpageid"]).addClass("active");
            $(".determinate").css({ "width": ((parseFloat(_E.core.state.store["render"]["currpageid"]) / parseFloat(_E.core.state.store["render"]["pageid"])) * 100).toFixed(0) + "%" });
            $(".determinate-text").text(((parseFloat(_E.core.state.store["render"]["currpageid"]) / parseFloat(_E.core.state.store["render"]["pageid"])) * 100).toFixed(0) + "%");

            //alert(e.data.i);
            $("#evalhalla_submit").addClass("disabled accessibledisabled");
            $(".ev-page-sel-" + "right").removeClass("disabled accessibledisabled");
            window.scrollTo(0, 0);
            if (_E.core.state.store["render"]["currpageid"] == _E.core.state.store["render"]["pageid"]) {
                $("#evalhalla_submit").removeClass("disabled accessibledisabled");
                $(".ev-page-sel-" + "right").addClass("disabled accessibledisabled");
            }
        });
}

// upload the survey reponse to our integrations
_E.feature.player.api_upload_survey_result = function (data_in) {
    //console.log(data_in);
    let api_route = "";
    api_route = sv_api_post_surv_resp_route + sv_api_key;
    _E.fxn.common.api_post_to_route(api_route, data_in);

    // deprecated: Registhor storage temporary routes
    // api_route = rg_api_route;
    // _E.fxn.common.api_post_to_route(api_route, data_in);
}

// REFACTOR_PREP: api, detangle the render and local storage
// submit the form result
_E.feature.player.evalhalla_submit = function () {
    // make some form data
    var formElement = document.getElementById("evalhalla_form");
    var formData = new FormData(formElement);
    //console.log(formData);
    // can use that to post
    // query string would be
    var query_string = $("#evalhalla_form").serialize();
    //console.log(query_string);
    if (formElement.checkValidity() == true) {
        //alert("Good to go!");
    } else {
        alert("Missing data / Données manquantes");
        $(".ev-page").show();
        $(".ev-page-lang").hide();
        $(".ev-page-offering").hide();
        $(".ev-page-tombstone").hide();
        formElement.checkValidity()
        return;
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

    for (let key in _E.core.interpreter.g_qindex) {
        let value = _E.core.interpreter.g_qindex[key];
        if (_E.core.interpreter.g_qindex.hasOwnProperty(key)) {
            json_o["textofquestion_qid_" + key] = value;
        }
    }

    var json_o_string = (JSON.stringify(json_o, null, 4));
    //console.log(json_o_string);
    // save response to local storage

    // TODO: turn back on
    _E.feature.localstore.ls_save_survey_response(json_o_string);

    // save response to survista

    // TODO: turn back on
    _E.feature.player.api_upload_survey_result(json_o_string);

    //console.log(json_o_string);
    //console.log(_E.core.interpreter.g_qindex);

    // show local storage items
    _E.feature.localstore.ls_view_saved_entries();
    //alert(json_o_string);
    _E.core.state.store["el"]["ui_render"].hide();
    $("#step_thank_you_cta").show();
    //alert("Check the console for details");
};


_E.feature.player.enable_feature = function () {
    $("#pre_survey_panels").html(
        _E.core.templates.get("step lang") +
        _E.core.templates.get("step offering") +
        _E.core.templates.get("step tombstone") +
        _E.core.templates.get("step thanks")
    );

    // REFACTOR_PREP: UI
    $(".sidenav").sidenav();
    $(".parallax").parallax();
    $('.fixed-action-btn').floatingActionButton();
    $('.modal').modal();
    $(".dropdown-trigger").dropdown();

    // auto presentation mode
    //alert("auto");
    _E.core.state.store["el"]["ui_render"].removeClass("m6").addClass("m12");

    // from evh_autocomplete.js
    _E.feature.autocomplete.enable_feature();


    $("#step_lang").show();
    $("#step_offering").hide();
    $("#step_tombstone").hide();
    $("#step_thank_you_cta").hide();

    _E.core.state.store["el"]["ui_render"].hide();
    _E.core.state.store["el"]["ui_editor"].hide();
    _E.core.state.store["el"]["ui_json"].hide();
    _E.core.state.store["el"]["ui_ls"].hide();
    _E.core.state.store["el"]["ui_qlib"].hide();
    $("#admin_footer").hide();
    $("#admin_footer_end").hide();
    $(".adm-function").hide();
    _E.core.state.store["ui"]["hs_render_window"] = true;
    // HACK: hidden textareas have real height for some reason.
    // adding display none kills resize capability of textarea.
    // we're dynamically adding the maxsize when we need it in presentation mode
    $(".hiddendiv").addClass("hiddendiv-maxsized");

    // enable buttons for intro steps
    _E.feature.player.ui_activate_introlangset_buttons();
    _E.feature.player.ui_activate_introtombstone_buttons();
    _E.feature.player.ui_activate_intropagedirection_buttons();
};
