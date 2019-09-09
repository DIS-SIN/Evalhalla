(function ($) {
    $(function () {
        //
        // EVALHALLA
        //
        // Just type. It will make your form HTML and JSON
        // Think more code less.
        //
        $("#editor").hide();
        $(".loader-prep").hide();
        // from evh_feature_query_params.js
        _E.feature.qparam.startup(
            function () {
                // from evh_feature_unloadconfirmation.js
                _E.feature.unloadconfirmation.enable_feature();
                // from evh_feature_export_json.js
                _E.feature.exportJSON.enable_feature();
                // from evh_feature_local_storage.js
                _E.feature.localstore.enable_feature();

                // from evh_g_interpreter.js
                _E.core.interpreter.startup("designer");

                // from evh_autocomplete.js
                _E.feature.autocomplete.enable_feature();
                // from evh_feature_language.js
                _E.feature.lang.enable_feature();
                // from evh_feature_question_library.js
                _E.feature.localstore.questionlib.enable_feature();
                // from evh_feature_data_recordpumper.js
                _E.feature.data.recordpumper.enable_feature();
                // from evh_designer_ui.js
                _E.feature.designer.enable_feature();
                // from evh_tutorial_demo.js
                _E.feature.designer_tutorial.enable_feature();
                // set in evh_g_state.js
                //if (auto_display_mode == true) {
                // from evh_player_ui.js
                //    enable_feature_player_ui();
                //}
                $("#editor").show();
                $(".loader-prep").show();
                $(".loader-remprep").remove();
            });
    });
})(jQuery);
