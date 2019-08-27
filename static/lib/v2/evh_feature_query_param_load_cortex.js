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
    "sur_evh": "",
    "fallback": false
};
_E.feature.qparam.cortex = {
    //"evalese": ///

};
_E.feature.qparam.startup_builtinsurveys = {
    "test_sur": (typeof test_sur !== "undefined") ? test_sur : "",
    "example_nanos": (typeof example_nanos !== "undefined") ? example_nanos : "",
    "example_nanos_paged": (typeof example_nanos_paged !== "undefined") ? example_nanos_paged : "",
    "ut1_june18_event": (typeof ut1_june18_event !== "undefined") ? ut1_june18_event : "",
    "ut0_da_interest": (typeof ut0_da_interest !== "undefined") ? ut0_da_interest : "",
    "engage": (typeof engage !== "undefined") ? engage : "",
    "inclusive": (typeof inclusive !== "undefined") ? inclusive : "",
    "busrides": (typeof busrides !== "undefined") ? busrides : "",
    "ypn": (typeof ypn !== "undefined") ? ypn : "",
    "eldp": (typeof eldp !== "undefined") ? eldp : "",
    "dmb": (typeof dmb !== "undefined") ? dmb : "",
    "dmb2": (typeof dmb2 !== "undefined") ? dmb2 : "",
    "openhouse": (typeof openhouse !== "undefined") ? openhouse : "",
    "tsq": (typeof tsq !== "undefined") ? tsq : "",
    "discover": (typeof discover !== "undefined") ? discover : "",
};
_E.feature.qparam.startupcallback = function () { };
_E.feature.qparam.consume_evalese_error = function () {
    console.log("CORTEX Connection Issue, CREATE or FALLBACK check");
    // WARN: Messing with the sur lookup case. fix this with slugify and detangling demo code
    if (typeof _E.feature.qparam.startup_builtinsurveys[_E.feature.qparam.settings.sur.toLowerCase()] !== "undefined") {
        console.log("... Using pre-baked survey from demo");
        _E.feature.qparam.settings.sur_evh = _E.feature.qparam.startup_builtinsurveys[_E.feature.qparam.settings.sur.toLowerCase()];
        _E.feature.qparam.settings.auto_display_mode = true;
    } else {
        if (_E.feature.qparam.settings.fallback == "true") {
            console.log("... FALLBACK. Using test_sur demo default");
            _E.feature.qparam.settings.sur = "TEST_SUR"; // WARN: Case survey id changes
            _E.feature.qparam.settings.sur_evh = _E.feature.qparam.startup_builtinsurveys[_E.feature.qparam.settings.sur.toLowerCase()];
        }
        _E.feature.qparam.settings.auto_display_mode = true;
    }
    console.log("Evalhalla qparam statup, using sur = " + _E.feature.qparam.settings.sur);
    g_intro_script = _E.feature.qparam.settings.sur_evh;
    _E.feature.qparam.startupcallback();
};
_E.feature.qparam.consume_evalese_success = function () {
    console.log("Evalhalla <-[consumeEvalese]- CORTEX");
    let jo = JSON.parse(_E.feature.qparam.cortex.evalese);
    //console.log(jo.sur_evalese);

    g_intro_script = jo.sur_evalese; //_E.feature.qparam.settings.sur_evh;
    _E.feature.qparam.settings.auto_display_mode = true;
    _E.feature.qparam.settings.sur_evh = jo.sur_evalese;

    console.log("Evalhalla startupcallback post CORTEX");

    console.log("Evalhalla qparam statup, using sur = " + _E.feature.qparam.settings.sur);
    _E.feature.qparam.startupcallback();
};
_E.feature.qparam.startup = function (callback) {
    console.log("Evalhalla qparam statup");
    _E.feature.qparam.startupcallback = callback;
    // REFACTOR_PREP: player, param extraction (likely lib function) 
    try {
        _E.feature.qparam.settings.params = new URLSearchParams(window.location.search);
        _E.feature.qparam.settings.sur = _E.fxn.common.safe(_E.feature.qparam.settings.params.get("sur"));
        _E.feature.qparam.settings.entry = _E.fxn.common.safe(_E.feature.qparam.settings.params.get("entry"));
        _E.feature.qparam.settings.weasel = _E.fxn.common.safe(_E.feature.qparam.settings.params.get("weasel"));
        _E.feature.qparam.settings.fallback = _E.fxn.common.safe(_E.feature.qparam.settings.params.get("fallback"));
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

    // pull in the evalese
    /*
    if (typeof _E.feature.qparam.startup_builtinsurveys[_E.feature.qparam.settings.sur] !== "undefined") {
        _E.feature.qparam.settings.sur_evh = _E.feature.qparam.startup_builtinsurveys[_E.feature.qparam.settings.sur];
        _E.feature.qparam.settings.auto_display_mode = true;
    } else {
        _E.feature.qparam.settings.sur = "test_sur";
        _E.feature.qparam.settings.sur_evh = _E.feature.qparam.startup_builtinsurveys[_E.feature.qparam.settings.sur];
        _E.feature.qparam.settings.auto_display_mode = true;
    }

     if (_E.feature.qparam.settings.weasel == "m" + _E.feature.qparam.settings.load + _E.feature.qparam.settings.resp) {
            _E.feature.qparam.settings.sur = "";
            _E.feature.qparam.settings.auto_display_mode = false;
        }
    */

    // REFACTOR: detangly player/designer/dash
    consumeEvalese(
        _E.feature.qparam.settings.sur,
        _E.feature.qparam.cortex,
        (_E.feature.qparam.settings.fallback == "true") ? _E.feature.qparam.consume_evalese_error : _E.feature.qparam.consume_evalese_success,
        _E.feature.qparam.consume_evalese_error
    );
};

