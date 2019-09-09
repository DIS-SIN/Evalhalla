(function ($) {
    $(function () {
        //
        // EVALHALLA
        //
        // Just type. It will make your form HTML and JSON
        // Think more code less.
        //

        // PRERENDER
        // from evh_feature_query_params.js
        console.log("Evalhalla Startup");
        $(".hide-on-player").hide();
        $(".loader-prep").hide();
        _E.feature.qparam.startup(function () {
            console.log("Evalhalla qparam startup callback post CORTEX");
            // from evh_feature_unloadconfirmation.js
            _E.feature.unloadconfirmation.enable_feature();
            // from evh_feature_local_storage.js
            _E.feature.localstore.enable_feature();


            // from evh_g_interpreter.js
            _E.core.interpreter.startup();

            // POST RENDER
            // from evh_autocomplete.js
            _E.feature.autocomplete.enable_feature();
            // from evh_feature_language.js
            _E.feature.lang.enable_feature();
            // from evh_player_ui.js
            _E.feature.player.enable_feature();
            $(".loader-prep").show();
            $(".loader-remprep").remove();
        });

    });
})(jQuery);
