/*

Evalhalla Evalese to JSON export feature

Given Omar, a survey developer
When Omar chooses to send his survey template to CORTEX
Then a JSON representation of his survey will be created
 And the JSON will be sent to CORTEX

_E["feature"]["designer_tutorial"]

*/

// init the package
_E.feature.designer_tutorial = {};

// REFACTOR_PREP: editor, tutorial
//
// Tutorial runner setup
//

_E.feature.designer_tutorial.run_type_it = function (type_this) {
    type_this = type_this || "type_it_short";

    _E.core.state.store["tut"]["char_at"] = 0;
    _E.core.state.store["el"]["c_editor"].val("");

    _E.core.state.render_state_reset(true);

    clearInterval(_E.core.state.store["tut"]["typer"]);
    _E.core.state.store["tut"]["typer"] = null;
    _E.core.state.store["tut"]["typer"] = setInterval(function () {
        if (_E.core.state.store["tut"]["char_at"] > _E.core.state.store["tut"]["" + type_this].length) {
            clearInterval(_E.core.state.store["tut"]["typer"]);
            _E.core.state.store["tut"]["typer"] = null;
        } else {
            try {
                if (typeof _E.core.state.store["tut"]["" + type_this][_E.core.state.store["tut"]["char_at"]] !== "undefined") {
                    _E.core.state.store["el"]["c_editor"].val(
                        _E.core.state.store["el"]["c_editor"].val() + _E.core.state.store["tut"]["" + type_this][_E.core.state.store["tut"]["char_at"]]
                    );
                    _E.core.state.store["el"]["c_editor"].trigger("keyup");
                    _E.core.state.store["tut"]["char_at"] = _E.core.state.store["tut"]["char_at"] + 1;
                    M.textareaAutoResize(_E.core.state.store["el"]["c_editor"]);//ui_resize_textareas();
                }
            } catch (e) {
                // do nothing
            }
        }
    }, 80);
};

_E.feature.designer_tutorial.enable_feature = function () {
    // Focus on the editor
    _E.core.state.store["el"]["c_editor"].focus();
    _E.core.state.store["tut"] = {
        "type_it": g_tutorial_script.split(""),
        "type_it_short": g_shorthand_script.split(""),
        "type_it_short_fr": g_shorthand_script_fr.split(""),
        "char_at": 0,
        "typer": null
    };
    _E.core.state.store["el"]["btn_tutorial"].on("click", function () {
        if (_E.core.state.store["ui"]["lang"] == "en") {
            _E.feature.designer_tutorial.run_type_it("type_it_short");
        } else {
            _E.feature.designer_tutorial.run_type_it("type_it_short_fr");
        }
    });
};
