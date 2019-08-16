_E.feature.qparam = {}
// Autodisplay Overrides
//
_E.feature.qparam.settings = {
    "_E.feature.qparam.settings.auto_display_mode": false, // if you pass a query param in with sur=example_nanos_paged for example, it goes right into "presentation mode"
    "load": "ig",
    "resp": "hty",
    "weasel": "weasel", // the weasel
    "entry": "direct", // the entry method to the survey
    "params": null, // the search params
    "sur": "", // the survey to load
    "sur_evh": ""
};

_E.feature.qparam.startup = function () {
    // REFACTOR_PREP: player, param extraction (likely lib function) 
    try {
        _E.feature.qparam.settings.params = new URLSearchParams(window.location.search);
        _E.feature.qparam.settings.sur = _E.fxn.common.safe(_E.feature.qparam.settings.params.get("sur"));
        _E.feature.qparam.settings.entry = _E.fxn.common.safe(_E.feature.qparam.settings.params.get("entry"));
        _E.feature.qparam.settings.weasel = _E.fxn.common.safe(_E.feature.qparam.settings.params.get("weasel"));

    } catch (e) {
        // IE11 Unsupported
        alert("Apologies. Evalhalla is built using modern code. If you can, please make urgent requests to your leadership to enter the modern era. Everything will improve, you will get more done will less friction. Chrome, Firefox, or Edge all will work.");
    }

    // REFACTOR_PREP: player, survey selection (editor function + api for player)

    // ok let's load it up
    // TODO: Remove hardcode demos and replace with API
    if (_E.feature.qparam.settings.sur == "" || typeof _E.feature.qparam.settings.sur === "undefined") {
        _E.feature.qparam.settings.sur = "test_sur"; // the survey to load
    }


    // override it
    if (_E.feature.qparam.settings.sur == "example_nanos") {
        _E.feature.qparam.settings.sur_evh = example_nanos;
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    else if (_E.feature.qparam.settings.sur == "example_nanos_paged") {
        _E.feature.qparam.settings.sur_evh = example_nanos_paged;
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    else if (_E.feature.qparam.settings.sur == "ut1_june18_event") {
        _E.feature.qparam.settings.sur_evh = ut1_june18_event;
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    else if (_E.feature.qparam.settings.sur == "ut0_da_interest") {
        _E.feature.qparam.settings.sur_evh = ut0_da_interest;
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    else if (_E.feature.qparam.settings.sur == "engage") {
        _E.feature.qparam.settings.sur_evh = engage;
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    else if (_E.feature.qparam.settings.sur == "inclusive") {
        _E.feature.qparam.settings.sur_evh = inclusive;
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    else if (_E.feature.qparam.settings.sur == "busrides") {
        _E.feature.qparam.settings.sur_evh = busrides;
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    else if (_E.feature.qparam.settings.sur == "test_sur") {
        _E.feature.qparam.settings.sur_evh = test_sur;
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    else if (_E.feature.qparam.settings.sur == "ypn") {
        _E.feature.qparam.settings.sur_evh = ypn;
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    else if (_E.feature.qparam.settings.sur == "dmb") {
        _E.feature.qparam.settings.sur_evh = dmb;
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    else if (_E.feature.qparam.settings.sur == "dmb2") {
        _E.feature.qparam.settings.sur_evh = dmb2;
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    else if (_E.feature.qparam.settings.sur == "openhouse") {
        _E.feature.qparam.settings.sur_evh = openhouse;
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    else if (_E.feature.qparam.settings.sur == "tsq") {
        _E.feature.qparam.settings.sur_evh = tsq;
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    else if (_E.feature.qparam.settings.sur == "discover") {
        _E.feature.qparam.settings.sur_evh = discover;
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    else {
        _E.feature.qparam.settings.sur_evh = test_sur;
        _E.feature.qparam.settings.auto_display_mode = true;
    } // current hot default
    // edit breaks

    // REFACTOR: detangly player/designer/dash
    g_intro_script = _E.feature.qparam.settings.sur_evh;

    if (_E.feature.qparam.settings.weasel == "m" + _E.feature.qparam.settings.load + _E.feature.qparam.settings.resp) {
        _E.feature.qparam.settings.sur = "";
        _E.feature.qparam.settings.auto_display_mode = false;
    }
};

