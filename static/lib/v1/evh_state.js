
// These are the "EVALESE" command. This is the markdown that builds the forms.
// You can easily add new aliases for the core commands. Just make sure you check
// yourself. There's not much in the way of error catching here. It trusts you.
const g_cmd = {
    // CMDS in ALLCAPS, but input is any case
    "[SURVEY]": { "type": "survey", "html": "<survey>%v</survey>" },
    "#": { "type": "survey", "html": "<survey>%v</survey>" },
    "[TITLE]": { "type": "title", "html": "<title>%v</title>" },
    "##": { "type": "title", "html": "<title>%v</title>" },
    "[INTRO]": { "type": "intro", "html": "<intro>%v</intro>" },
    "###": { "type": "intro", "html": "<intro>%v</intro>" },
    "[QUESTION]": { "type": "question", "html": "<question>%v</question>" },
    "Q:": { "type": "question", "html": "<question>%v</question>" },
    "[*QUESTION]": { "type": "req question", "html": "<question>%v</question>" },
    "*Q:": { "type": "req question", "html": "<question>%v</question>" },
    "[SCALE]": { "type": "scale", "html": "<scale>%v</scale>" },
    "/SCALE": { "type": "scale", "html": "<scale>%v</scale>" },
    "/SCALE1-5": { "type": "scale1-5", "html": "<scale>%v</scale>" },
    "/ÉCHELLE": { "type": "scale", "html": "<scale>%v</scale>" },
    "|": { "type": "scale", "html": "<scale>%v</scale>" },
    "[OPEN]": { "type": "open", "html": "<open>%v</open>" },
    "/OPEN": { "type": "open", "html": "<open>%v</open>" },
    "/OUVRIR": { "type": "open", "html": "<open>%v</open>" },
    "@": { "type": "open", "html": "<open>%v</open>" },
    "[INSTRUCTION]": { "type": "instruction", "html": "<instruction>%v</instruction>" },
    "//": { "type": "instruction", "html": "<instruction>%v</instruction>" },
    "[END]": { "type": "end", "html": "<end>%v</end>" },
    ";": { "type": "end", "html": "<end>%v</end>" },
    "[RANDOMORDER]": { "type": "random order", "html": "<rand>%v</rand>" },
    "~": { "type": "random order", "html": "<rand>%v</rand>" },
    "/RAND": { "type": "random order", "html": "<rand>%v</rand>" },
    "[RANDOMIZEORDER]": { "type": "random order", "html": "<rand>%v</rand>" },
    "[ENDRANDOMORDER]": { "type": "end random order", "html": "<rand>%v</rand>" },
    "[ENDRANDOMIZEORDER]": { "type": "end random order", "html": "<rand>%v</rand>" },
    ";~": { "type": "end random order", "html": "<rand>%v</rand>" },
    ";RAND": { "type": "end random order", "html": "<rand>%v</rand>" },
    "[RANDOMOPTIONS]": { "type": "random options", "html": "<rand>%v</rand>" },
    "~~": { "type": "random options", "html": "<rand>%v</rand>" },
    "/RANDO": { "type": "random options", "html": "<rand>%v</rand>" },
    "[RANDOMIZEOPTIONS]": { "type": "random options", "html": "<rand>%v</rand>" },
    "[ENDRANDOMOPTIONS]": { "type": "end random options", "html": "<rand>%v</rand>" },
    "[ENDRANDOMIZEOPTIONS]": { "type": "end random options", "html": "<rand>%v</rand>" },
    ";~~": { "type": "end random options", "html": "<rand>%v</rand>" },
    ";RANDO": { "type": "end random options", "html": "<rand>%v</rand>" },
    "[PICKONE]": { "type": "pick one", "html": "<pick>%v</pick>" },
    "/ONE": { "type": "pick one", "html": "<pick>%v</pick>" },
    "/UN": { "type": "pick one", "html": "<pick>%v</pick>" },
    ".": { "type": "pick one", "html": "<pick>%v</pick>" },
    "[PICKANY]": { "type": "pick any", "html": "<pick>%v</pick>" },
    "/ANY": { "type": "pick any", "html": "<pick>%v</pick>" },
    "/TOUT": { "type": "pick any", "html": "<pick>%v</pick>" },
    "*": { "type": "pick any", "html": "<pick>%v</pick>" },
    "[ENDPICK]": { "type": "end pick", "html": "<pick>%v</pick>" },
    "[RANK]": { "type": "rank", "html": "<rank>%v</rank>" },
    "/RANK": { "type": "rank", "html": "<rank>%v</rank>" },
    "/TAUX": { "type": "rank", "html": "<rank>%v</rank>" },
    "$": { "type": "rank", "html": "<rank>%v</rank>" },
    "[RATE]": { "type": "rank", "html": "<rank>%v</rank>" },
    "/RATE": { "type": "rank", "html": "<rank>%v</rank>" },
    "[ENDRANK]": { "type": "end rank", "html": "<rank>%v</rank>" },
    "[ENDRATE]": { "type": "end rank", "html": "<rank>%v</rank>" },
    "/GENERICS": { "type": "generics", "html": "<generics>%v</generics>" },
    "[GENERICS]": { "type": "generics", "html": "<generics>%v</generics>" },
    "/PAGEBREAK": { "type": "page break", "html": "<page break>%v</page break>" },
    "[PAGEBREAK]": { "type": "page break", "html": "<page break>%v</page break>" }

};


// this is a the app state object. it hold a bunch of info to help optimize things
// the jquery selectors are stored here so we can refactor easier and hopefully 
// speed things up.
// app state details, ui, handle to jq elems
const g_state = {
    // tutorial script vars
    "tut": {
        "type_it": g_tutorial_script.split(""),
        "type_it_short": g_shorthand_script.split(""),
        "type_it_short_fr": g_shorthand_script_fr.split(""),
        "char_at": 0,
        "typer": null,
    },
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
        "lang_set_en": $(".lang-set-en"),
        "lang_set_fr": $(".lang-set-fr"),
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
    }
};

// Evalese parser state, headers, questions, json
// used for generation of html form
var g_control_flags = {
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
    }
}

//
// State Controls
//

// reset the control flags after each successful chunk processing
// hard means a new survey. This is usually triggered when we get 
// a new survey header
var reset_control_flags = function (hard) {
    hard = hard || false;
    g_control_flags["question"] = {
        "text": false,
        "qid": 0,
        "form": false,
        "random": {
            "order": false,
            "options": false
        },
        "required": false
    };
    g_control_flags["json"] = "{}";
    g_control_flags["pageid"] = 1;
    g_control_flags["currpageid"] = 1;
    if (hard == true) {
        g_control_flags["header"] = {
            "survey": "",
            "title": "",
            "intro": ""
        };
    }
}