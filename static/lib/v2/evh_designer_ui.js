/*

Evalhalla designer ui

_E["feature"]["designer"]

*/

// init the package
_E.feature.designer = {};

_E.feature.designer.debug = false;


_E.feature.designer.qrinit = false;
_E.feature.designer.enable_ls_ui_buttons = function () {
    // upload to survista/cortex: stub
    // TODO: Fix with correct code (right now just obj/deobj for test)
    _E.core.state.store["el"]["btn_upload"].on("click", function () {
        (_E.feature.designer.debug) ? console.log("CORTEX Upload") : true;

        let jo = JSON.parse(
            _E.core.interpreter.evh_clean_json(
                _E.core.state.store["render"]["json"]
                    .replace(/\,\%questions/g, "")
                    .replace(/\%questions/g, "")
                    .replace(/\%options/g, "")
            )
        );

        // cortex feature
        (_E.feature.designer.debug) ? alert("STUB: Upload Full Survey JSON to CORTEX.") : true;
        (_E.feature.designer.debug) ? console.log(
            JSON.stringify(_E.feature.cortex.messages.create_survey_template_msg(jo), null, 4)
        ) : true;
        (_E.feature.designer.debug) ? alert("STUB: Upload Survey Evalese to CORTEX.") : true;
        (_E.feature.designer.debug) ? console.log(
            JSON.stringify(_E.feature.cortex.messages.create_survey_evalese_msg(jo), null, 4)
        ) : true;

        console.log("Evalhalla -[produceSurveyTemplate]-> CORTEX");
        (_E.feature.designer.debug) ? true : produceSurveyTemplate(
            //_E.feature.qparam.settings.sur,
            JSON.stringify(
                _E.feature.cortex.messages.create_survey_template_msg(jo)
            )
        );
        console.log("Evalhalla -[produceEvalese]-> CORTEX");
        (_E.feature.designer.debug) ? true : produceEvalese(
            _E.feature.qparam.settings.sur,
            JSON.stringify(
                _E.feature.cortex.messages.create_survey_evalese_msg(jo)
            )
        );
        console.log("Evalhalla CORTEX Upload Complete");

        //alert("CORTEX Upload Complete");
        $(".cortex_conduct_survey").trigger("click");
    });

    // generate test data
    $(".clr-cortex-test-data").on("click", function () {
        $("#cortex_test_data").val("");
    });
    $(".cortex_view_dashboard").on("click", function () {
        window.location = "https://app.evalhalla.ca/app/player/dashboard/?sur=" + _E.feature.qparam.settings.sur;
    });
    $(".cortex_conduct_survey").on("click", function () {
        $("#cortex_qr_text").html(
            `<h3>
            <a href="https://app.evalhalla.ca/app/player/survey/?sur=${_E.feature.qparam.settings.sur}&entry=QR">
                https://app.evalhalla.ca/app/player/survey/?sur=${_E.feature.qparam.settings.sur}
            </a></h3>
            `
        );
        if (_E.feature.designer.qrinit == false) {
            _E.feature.designer.qrinit = new QRCode("cortex_qr", {
                text: "https://app.evalhalla.ca/app/player/survey/?sur=" + _E.feature.qparam.settings.sur + "&entry=QR",
                width: 256,
                height: 256,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        } else {
            _E.feature.designer.qrinit.clear(); // clear the code.
            _E.feature.designer.qrinit.makeCode("https://app.evalhalla.ca/app/player/survey/?sur=" + _E.feature.qparam.settings.sur + "&entry=QR"); // make another code.
        }
        $('#cortex_conduct_qr').modal('open');
    });
    $(".generate_test_data").on("click", function () {
        let jo = JSON.parse(
            _E.core.interpreter.evh_clean_json(
                _E.core.state.store["render"]["json"]
                    .replace(/\,\%questions/g, "")
                    .replace(/\%questions/g, "")
                    .replace(/\%options/g, "")
            )
        );
        let stempl = _E.feature.cortex.messages.create_survey_template_msg(jo)

        _E.feature.data.recordpumper.execute_load(stempl);
        // add enabling functions
    });

    // Local storage
    _E.core.state.store["el"]["adm_clear_ls"].on("click", function () {
        alert("Clearing LocalStorage...");
        _E.feature.localstore.ls_clear_saved_entries();
        _E.core.state.store["el"]["c_ls"].val("");
    });

    _E.core.state.store["el"]["adm_save_working_survey"].on("click", function () {
        alert("Saving Working Survey...");

        _E.feature.localstore.ls_save_survey_signature(_E.core.state.store["render"]["json"]
            .replace(/\,\%questions/g, "")
            .replace(/\%questions/g, "")
            .replace(/\%options/g, ""), _E.fxn.common.safe(_E.core.state.store["el"]["c_editor"].val()));
    });
};

_E.feature.designer.ui_reset_panels = function () {
    _E.core.state.store["el"]["ui_render"].addClass("m6").removeClass("m12");
    _E.core.state.store["el"]["ui_render"].show();
    _E.core.state.store["el"]["ui_editor"].addClass("m6").removeClass("m12");
    _E.core.state.store["el"]["ui_editor"].show();
    _E.core.state.store["el"]["ui_json"].addClass("m6").removeClass("m12");
    _E.core.state.store["el"]["ui_json"].hide();
    // _E.core.state.store["el"]["ui_ls"].addClass("m4").removeClass("m12");
    _E.core.state.store["el"]["ui_ls"].hide();
    _E.core.state.store["el"]["ui_qlib"].hide();
    _E.core.state.store["ui"]["hs_render_window"] = false;
    _E.core.state.store["ui"]["hs_editor_window"] = false;
    _E.core.state.store["ui"]["hs_json_window"] = false;
    _E.core.state.store["ui"]["hs_ls_window"] = false;
    _E.core.state.store["ui"]["hs_qlib_window"] = false;
};

_E.feature.designer.enable_editor_panel_menu_buttons = function () {
    _E.core.state.store["el"]["btn_hs_qlib"].on("click", function () {
        if (_E.core.state.store["ui"]["hs_qlib_window"] == true) {
            _E.feature.designer.ui_reset_panels();
        } else {
            //_E.core.state.store["el"]["ui_ls"].removeClass("m4").addClass("m12");
            _E.core.state.store["el"]["ui_qlib"].show();
            _E.core.state.store["el"]["ui_ls"].hide();
            _E.core.state.store["el"]["ui_render"].hide();
            _E.core.state.store["el"]["ui_editor"].hide();
            _E.core.state.store["el"]["ui_json"].hide();
            _E.core.state.store["ui"]["hs_qlib_window"] = true;
        }
    });
    _E.core.state.store["el"]["btn_hs_ls"].on("click", function () {
        if (_E.core.state.store["ui"]["hs_ls_window"] == true) {
            _E.feature.designer.ui_reset_panels();
        } else {
            //_E.core.state.store["el"]["ui_ls"].removeClass("m4").addClass("m12");
            _E.core.state.store["el"]["ui_ls"].show();
            _E.core.state.store["el"]["ui_render"].hide();
            _E.core.state.store["el"]["ui_editor"].hide();
            _E.core.state.store["el"]["ui_json"].hide();
            _E.core.state.store["el"]["ui_qlib"].hide();
            _E.core.state.store["ui"]["hs_ls_window"] = true;
        }
    });
    _E.core.state.store["el"]["btn_hs_render"].on("click", function () {
        if (_E.core.state.store["ui"]["hs_render_window"] == true) {
            _E.feature.designer.ui_reset_panels();
        } else {
            _E.core.state.store["el"]["ui_render"].removeClass("m6").addClass("m12");
            _E.core.state.store["el"]["ui_render"].show();
            _E.core.state.store["el"]["ui_editor"].hide();
            _E.core.state.store["el"]["ui_json"].hide();
            _E.core.state.store["el"]["ui_ls"].hide();
            _E.core.state.store["el"]["ui_qlib"].hide();
            _E.core.state.store["ui"]["hs_render_window"] = true;
        }
    });
    _E.core.state.store["el"]["btn_hs_editor"].on("click", function () {
        if (_E.core.state.store["ui"]["hs_editor_window"] == true) {
            _E.feature.designer.ui_reset_panels();
        } else {
            _E.core.state.store["el"]["ui_editor"].removeClass("m6").addClass("m12");
            _E.core.state.store["el"]["ui_editor"].show();
            _E.core.state.store["el"]["ui_json"].hide();
            _E.core.state.store["el"]["ui_render"].hide();
            _E.core.state.store["el"]["ui_ls"].hide();
            _E.core.state.store["el"]["ui_qlib"].hide();
            _E.core.state.store["ui"]["hs_editor_window"] = true;
        }
    });
    _E.core.state.store["el"]["btn_hs_json"].on("click", function () {
        if (_E.core.state.store["ui"]["hs_json_window"] == true) {
            _E.feature.designer.ui_reset_panels();
        } else {
            _E.core.state.store["el"]["c_json"].val(JSON.stringify(JSON.parse(_E.core.state.store["render"]["json"]
                .replace(/\,\%questions/g, "")
                .replace(/\%options/g, "")
            ), null, 4));
            //_E.core.state.store["el"]["ui_json"].removeClass("m6").addClass("m12");
            _E.core.state.store["el"]["ui_json"].show();
            _E.core.state.store["el"]["ui_editor"].hide();
            _E.core.state.store["el"]["ui_render"].hide();
            _E.core.state.store["el"]["ui_ls"].hide();
            _E.core.state.store["el"]["ui_qlib"].hide();
            _E.core.state.store["ui"]["hs_json_window"] = true;
        }
    });
    _E.core.state.store["el"]["btn_audit"].on("click", function () {
        alert("Auditing Evalhalla to Survista Render. Note there may be differences until both systems are fully aligned.");
        // from evh_designer_export_json.js
        _E.feature.exportJSON.audit_json();
    });
};

// REFACTOR_PREP: editor, UI
//
// Editor buttons
//
_E.feature.designer.get_editor_tmpl = function (cmd) {
    if (cmd == "header") {
        return `
# ${_E.feature.qparam.settings.sur}

## 
/en English Title /;
/fr Titre Francais /;

### 
/en Survey introduction text /;
/fr Texte pour introduire le sondage /;

`;
    } else if (cmd == "instr") {
        return `// 
/en Explanatory text note /;
/fr Texte d'explication en francais /;

`;
    } else if (cmd == "qany") {
        return `Q: 
/en This is my question? /;
/fr C'est la question? /;
/any
/en A Thing /; /fr Un chose /;
/en A Thing /; /fr Un chose /;
/en A Thing /; /fr Un chose /;
;

`;
    } else if (cmd == "qfree") {
        return `Q:
/en This is my question? /;
/fr C'est la question? /;
/open

`;
    } else if (cmd == "qone") {
        return `Q: 
/en This is my question? /;
/fr C'est la question? /;
/one
/en A Thing /; /fr Un chose /;
/en A Thing /; /fr Un chose /;
/en A Thing /; /fr Un chose /;
;

`;
    } else if (cmd == "qrank") {
        return "";
    } else if (cmd == "qscale") {
        return `Q: 
/en This is my question? /;
/fr C'est la question? /;
/scale1to5
/en Low /; /fr Bas /;,
/en High /; /fr Haut /;,
/en Unsure /; /fr Incertain /;

`;
    } else {
        return "";
    }
}

_E.feature.designer.editor_add_template = function (cmd) {
    _E.core.state.store["el"]["c_editor"].val(
        _E.fxn.common.safe(_E.core.state.store["el"]["c_editor"].val()) + _E.feature.designer.get_editor_tmpl(cmd)
    );
    _E.core.state.store["el"]["c_editor"].trigger("keyup");
}

_E.feature.designer.trigger_action = function (curr_action) {
    //console.log(curr_action);
    _E.feature.designer.editor_add_template(curr_action);
};

_E.feature.designer.enable_editor_buttons = function (actions) {
    _E.core.state.store["el"]["edt_" + "header"].on("click", function () { _E.feature.designer.trigger_action("header"); });
    _E.core.state.store["el"]["edt_" + "instr"].on("click", function () { _E.feature.designer.trigger_action("instr"); });
    _E.core.state.store["el"]["edt_" + "qany"].on("click", function () { _E.feature.designer.trigger_action("qany"); });
    _E.core.state.store["el"]["edt_" + "qfree"].on("click", function () { _E.feature.designer.trigger_action("qfree"); });
    _E.core.state.store["el"]["edt_" + "qone"].on("click", function () { _E.feature.designer.trigger_action("qone"); });
    _E.core.state.store["el"]["edt_" + "qrank"].on("click", function () { _E.feature.designer.trigger_action("qrank"); });
    _E.core.state.store["el"]["edt_" + "qscale"].on("click", function () { _E.feature.designer.trigger_action("qscale"); });
    //
    _E.core.state.store["el"]["edt_erase"].on("click", function () {
        // probs should confirm here. TODO
        _E.core.state.store["el"]["c_editor"].val("");
        _E.core.state.store["el"]["c_editor"].trigger("keyup");
    });
};

// REFACTOR_PREP: UI
// materialize css resize the textareas so it shows content instead
// of remaining the previous size
_E.feature.designer.ui_resize_textareas = function () {
    M.textareaAutoResize(_E.core.state.store["el"]["c_editor"]);
    M.textareaAutoResize(_E.core.state.store["el"]["c_json"]);
    M.updateTextFields();
}

_E.feature.designer.modal_cortex_test_data = null;
_E.feature.designer.enable_feature = function () {
    _E.feature.designer.ui_reset_panels();

    _E.feature.designer.enable_ls_ui_buttons();
    _E.feature.designer.enable_editor_panel_menu_buttons();
    _E.feature.designer.enable_editor_buttons();

    // REFACTOR_PREP: UI
    $(".sidenav").sidenav();
    $(".parallax").parallax();
    $('.fixed-action-btn').floatingActionButton();
    $('.modal').modal();
    $(".dropdown-trigger").dropdown();

    //var elems = document.querySelectorAll('.modal');
    //var instances = M.Modal.init(elems, options);

    // not presentation mode
    $("#step_lang").hide();
    $("#step_offering").hide();
    $("#step_tombstone").hide();
    $("#step_thank_you_cta").hide();

    // Focus on the editor
    _E.core.state.store["el"]["c_editor"].focus();
};
