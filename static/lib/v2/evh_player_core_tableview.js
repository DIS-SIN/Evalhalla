(function ($) {
    $(function () {
        //
        // EVALHALLA
        //

        // from evh_feature_query_params.js
        _E.feature.qparam.startup(function () {

            // from evh_feature_instant_table
            _E.feature.instatable.enable_feature();
        });

    });
})(jQuery);