/*

Evalhalla state

// this is a the app state object. it hold a bunch of info to help optimize things
// the jquery selectors are stored here so we can refactor easier and hopefully
// speed things up.
// app state details, ui, handle to jq elems

*/

// init interpreter
_E.core.state = {};

_E.core.state.store = {
    // tutorial script vars
    "tut": {},
    //    "type_it": g_tutorial_script.split(""),
    //     "type_it_short": g_shorthand_script.split(""),
    //     "type_it_short_fr": g_shorthand_script_fr.split(""),
    //     "char_at": 0,
    //     "typer": null,
    // },
    // question library
    "qlib": [],
    // tombstone information
    "tombstone": {
        "offering_id": "",
        "department": "",
        "classification": "",
        "city": ""
    },
    // generics (refactor)
    "generics": {
        "generic_fetched": false,
        "ev_inline_dept": "",
        "ev_inline_role": "",
        "ev_inline_region": "",
        "ev_inline_office": ""
    },
    // ui window state (for hide show)
    "ui": {
        "lang": "en",
        "hs_editor_window": false,
        "hs_json_window": false,
        "hs_render_window": false,
        "hs_ls_window": false,
        "hs_qlib_window": false
    },
    // elements, jquery selectors
    "el": {
        // lang
        "lang": $(".lang"),
        //"lang_set_en": function () { return $(".lang-set-en") }, // need dynamic address
        //"lang_set_fr": function () { return $(".lang-set-fr") }, // need dynamic address
        "en": $(".en"),
        "fr": $(".fr"),
        // buttons
        "btn_upload": $(".survista_send"),
        "btn_tutorial": $(".show_me_how"),
        "btn_tutorial_short": $(".show_me_how_short"),
        "btn_hs_editor": $(".hs_editor_window"),
        "btn_hs_json": $(".hs_json_window"),
        "btn_hs_render": $(".hs_render_window"),
        "btn_hs_ls": $(".hs_ls_window"),
        "btn_hs_qlib": $(".hs_qlib_window"),
        "btn_audit": $(".audit_json_render"),
        // admin buttons
        "adm_clear_ls": $(".adm_clear_ls"),
        "adm_save_working_survey": $(".adm_save_working_survey"),
        // add cmms editor
        "edt_erase": $(".ev-add-erase"),
        "edt_header": $(".ev-add-header"),
        "edt_instr": $(".ev-add-instr"),
        "edt_qany": $(".ev-add-qany"),
        "edt_qfree": $(".ev-add-qfree"),
        "edt_qone": $(".ev-add-qone"),
        "edt_qrank": $(".ev-add-qrank"),
        "edt_qscale": $(".ev-add-qscale"),
        // content
        "c_editor": $("#editor_target"),
        "c_json": $("#json_target"),
        "c_render": $("#render_target"),
        "c_ls": $("#ls_target"),
        // ui panels
        "ui_editor": $("#editor_window"),
        "ui_json": $("#json_window"),
        "ui_render": $("#render_window"),
        "ui_ls": $("#ls_window"),
        "ui_qlib": $("#qlib_window")
    },
    "render": {
        "json": "{}",
        "pageid": 1,
        "currpageid": 1,
        "header": {
            "survey": false,
            "title": false,
            "intro": false
        },
        "header_json": {
            "survey": false,
            "title": false,
            "intro": false
        },
        "question": {
            "text": false,
            "qid": 0,
            "form": false,
            "random": {
                "order": false,
                "options": false
            },
            "required": false
        },
        // REFACTOR_PREP: editor, parser, player - detangle
        // Render Trigger
        // Render Timer additions. TODO: Causes flicker of submit. Adjust setting classes.
        "render_buffering": false,
        "render_manager": null,
        "render_delay": 1300, // 1.3 sec delay between renders
        "render_requested": false
    }
};

// Evalese parser state, headers, questions, json
// used for generation of html form

// REFACTOR PREP: this is deeply couples to multiple components, consider major refactor
// remove connections and expose through functions as required.
// detangle parser from ui element use
// replace _E.core.state.store["render"]["json"] with _E.core.state.store["render"]["json"]
/*
var _E.core.state.store["render"] = {
    "json": "{}",
    "pageid": 1,
    "currpageid": 1,
    "header": {
        "survey": false,
        "title": false,
        "intro": false
    },
    _E.core.state.store["render"]{
        "survey": false,
        "title": false,
        "intro": false
    },
    "question": {
        "text": false,
        "qid": 0,
        "form": false,
        "random": {
    _E.core.state.store["render"]: false,
    _E.core.state.store["render"]s": false
    _E.core.state.store["render"]
        "required": false
    }_E.core.state.store["render"]
}
*/

//
// State Controls
//

// reset the control flags after each successful chunk processing
// hard means a new survey. This is usually triggered when we get 
// a new survey header
_E.core.state.render_state_reset = function (hard) {
    hard = hard || false;
    _E.core.state.store["render"]["question"] = {
        "text": false,
        "qid": 0,
        "form": false,
        "random": {
            "order": false,
            "options": false
        },
        "required": false
    };
    _E.core.state.store["render"]["json"] = "{}";
    _E.core.state.store["render"]["pageid"] = 1;
    _E.core.state.store["render"]["currpageid"] = 1;
    if (hard == true) {
        _E.core.state.store["render"]["header"] = {
            "survey": "",
            "title": "",
            "intro": ""
        };
    }
}

