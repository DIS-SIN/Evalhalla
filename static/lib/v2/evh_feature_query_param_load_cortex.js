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
_E.feature.qparam.cortex = {
    //"evalese": ///
};
_E.feature.qparam.startup_builtinsurveys = {
    "test_sur": (test_sur) ? test_sur : "",
    "example_nanos": (example_nanos) ? example_nanos : "",
    "example_nanos_paged": (example_nanos_paged) ? example_nanos_paged : "",
    "ut1_june18_event": (ut1_june18_event) ? ut1_june18_event : "",
    "ut0_da_interest": (ut0_da_interest) ? ut0_da_interest : "",
    "engage": (engage) ? engage : "",
    "inclusive": (inclusive) ? inclusive : "",
    "busrides": (busrides) ? busrides : "",
    "ypn": (ypn) ? ypn : "",
    "eldp": (eldp) ? eldp : "",
    "dmb": (dmb) ? dmb : "",
    "dmb2": (dmb2) ? dmb2 : "",
    "openhouse": (openhouse) ? openhouse : "",
    "tsq": (tsq) ? tsq : "",
    "discover": (discover) ? discover : "",
};
_E.feature.qparam.startupcallback = function () { };
_E.feature.qparam.startup = function (callback) {
    console.log("Evalhalla qparam statup");
    _E.feature.qparam.startupcallback = callback;
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
        function () {
            console.log("Evalhalla <-[consumeEvalese]- CORTEX");
            _E.feature.qparam.settings.auto_display_mode = true;
            g_intro_script = _E.feature.qparam.cortex.evalese; //_E.feature.qparam.settings.sur_evh;

            if (typeof callback !== "undefined") {
                console.log("Evalhalla startupcallback post CORTEX");
                _E.feature.qparam.startupcallback();
            }
        },
        function () {
            console.log("CORTEX Connection Issue, Falling back on demo data");
            if (typeof _E.feature.qparam.startup_builtinsurveys[_E.feature.qparam.settings.sur] !== "undefined") {
                _E.feature.qparam.settings.sur_evh = _E.feature.qparam.startup_builtinsurveys[_E.feature.qparam.settings.sur];
                _E.feature.qparam.settings.auto_display_mode = true;
            } else {
                _E.feature.qparam.settings.sur = "test_sur";
                _E.feature.qparam.settings.sur_evh = _E.feature.qparam.startup_builtinsurveys[_E.feature.qparam.settings.sur];
                _E.feature.qparam.settings.auto_display_mode = true;
            }
            g_intro_script = _E.feature.qparam.settings.sur_evh;
            _E.feature.qparam.startupcallback();
        });


};

