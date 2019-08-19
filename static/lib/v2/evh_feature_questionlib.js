/*

Evalhalla question library

Given Omar, a survey developer
When Omar chooses to build a survey
Then a library of easy to insert premade questions should be available

_E["feature"]["questionlib"]

*/
// 
// Question Library
//

// REFACTOR_PREP: question library
//
// Question Libary
//
// This is a copy/paste storage for questions you have in the editor.
// Once you start building surveys this makes it easier to make new ones
// Why have to do stuff over and over right?

// Note: PREQREQUISTES
// depends on _E.feature.localstore from evh_feature_local_storage.js

if (typeof _E.feature.localstore === "undefined") {
    _E.feature.localstore = {};
    console.log("Evalhalla Boot Warning: No localstorage feature detected. Trying my best. Probs will fail.");
    // todo, resolve dependency
}

// init the package
_E.feature.localstore.questionlib = {};

// save the question library text into the library
_E.feature.localstore.questionlib.ls_save_qlib = function () {
    if (_E.feature.localstore.ls_storageAvailable('localStorage')) {
        var ev_ls = _E.feature.localstore.ls_get_lsobject();
        //console.log(ev_ls);
        ev_ls["qlib"] = _E.fxn.common.safe($("#qlib").val());
        localStorage.setItem('ev_ls', JSON.stringify(ev_ls));
        _E.feature.localstore.ls_show_local_storage();
        _E.feature.localstore.questionlib.update_question_library();
        //ui_resize_textareas();
    } else {
        _E.feature.localstore.warn_user_alert();
    }
};

// load the question library into the editor
_E.feature.localstore.questionlib.ls_load_qlib = function () {
    if (_E.feature.localstore.ls_storageAvailable('localStorage')) {
        var ev_ls = _E.feature.localstore.ls_get_lsobject();
        //console.log(ev_ls);
        $("#qlib").val(ev_ls["qlib"]);
        _E.feature.localstore.questionlib.update_question_library();
    } else {
        _E.feature.localstore.warn_user_alert();
    }
};

_E.feature.localstore.questionlib.update_question_library = function () {
    var qlib = _E.fxn.common.safe($("#qlib").val());
    if (qlib == "") {
        qlib = "Q: Example?\n/open\n\nQ: Example 2?\n/open\n";
        $("#qlib").val(qlib);
    }
    qlib = qlib.split("\n\n");
    var tbody = "";
    for (var i = 0; i < qlib.length; i++) {
        tbody += _E.core.templates.get("qlib entry")
            .replace(/\%bqid/g, i)
            .replace(/\%question/g, qlib[i])
            .replace(/\%ctrl/g, '<a id="ql_' + i + '" class="btn-small bqlib">Add</a>')

    }
    $("#qlib_target").html(tbody);
    $(".bqlib").on("click", function () {
        var bqid = $(this).attr("id");
        bqid = bqid.replace("ql_", "");
        var text = $("#bqlib_" + bqid).html();
        _E.core.state.store["el"]["c_editor"].val(
            _E.core.state.store["el"]["c_editor"].val() +
            "\n" +
            text
        );
        _E.core.state.store["el"]["c_editor"].trigger("keyup");
    });
};

// REFACTOR_PREP: UI, qlib
_E.feature.localstore.questionlib.enable_feature = function () {
    _E.feature.localstore.questionlib.ls_load_qlib();

    $("#qlib").on("change", function () {
        _E.feature.localstore.questionlib.update_question_library();
        _E.feature.localstore.questionlib.ls_save_qlib();
    });
    $("#qlib").trigger("change");
};
