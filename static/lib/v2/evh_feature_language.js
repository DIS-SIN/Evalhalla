/*

Evalhalla bilingual features

Given our audience, a bilingual nation
When the audience chooses visits our application
Then the application should be available in english and french.

_E["feature"]["lang"]

*/

// init the package
_E.feature.lang = {};


// REFACTOR_PREP: pull all lang refresh out into lib function, detangle
// lang refresh to show the new language spans
_E.feature.lang.refresh_lang = function () {
    if (_E.core.state.store["ui"]["lang"] == "en") {
        $("span.en").show();
        $("span.fr").hide();
    } else if (_E.core.state.store["ui"]["lang"] == "fr") {
        $("span.en").hide();
        $("span.fr").show();
    }

    for (let key in _E.core.state.store["localmem"]) {
        //let value = _E.core.state.store["localmem"][key];
        if (_E.core.state.store["localmem"].hasOwnProperty(key)) { //not a property from prototype chain  
            $("#" + key).html(_E.core.state.store["localmem"][key][_E.core.state.store["ui"]["lang"]]);
            //console.log(key);
        }
    }
    // REFACTOR CHECK: Turning this off as it's designer only
    //ui_resize_textareas();
};

_E.feature.lang.enable_feature = function () {
    // language buttons
    _E.core.state.store["el"]["lang"].on("click", function () {
        if (_E.core.state.store["ui"]["lang"] == "en") {
            _E.core.state.store["ui"]["lang"] = "fr";
            _E.feature.lang.refresh_lang();
            //ui_resize_textareas();
            $(".dropdown-trigger").dropdown();
        } else if (_E.core.state.store["ui"]["lang"] == "fr") {
            _E.core.state.store["ui"]["lang"] = "en";
            _E.feature.lang.refresh_lang();
            //ui_resize_textareas();
            $(".dropdown-trigger").dropdown();
        }
    });
};
