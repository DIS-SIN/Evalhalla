(function ($) {
    $(function () {
        //
        // EVALHALLA
        //

        // from evh_feature_query_params.js
        _E.feature.qparam.startup(function () {

            $(document).ready(function () {
                if (typeof _E.feature.designer === "undefined") {
                    _E.feature.designer = {}
                }
                if (typeof _E.feature.designer.qrinit === "undefined") {
                    _E.feature.designer.qrinit = false;
                }
                $("#render_target").html(
                    `<h3 class="center-align" style="font-size:1.3em;">
                        <a href="https://app.evalhalla.ca/app/player/survey/?sur=${_E.feature.qparam.settings.sur}&entry=QR">
                            https://app.evalhalla.ca/app/player/survey/?sur=${_E.feature.qparam.settings.sur}
                        </a>
                    </h3>
                    `
                );
                if (_E.feature.designer.qrinit == false) {
                    $("#qr_render_target").html("");
                    _E.feature.designer.qrinit = new QRCode("qr_render_target", {
                        text: "https://app.evalhalla.ca/app/player/survey/?sur=" + _E.feature.qparam.settings.sur + "&entry=QR",
                        width: 512,
                        height: 512,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                    $("#qr_render_target > img").css({ "display": "block", "margin-left": "auto", "margin-right": "auto" });
                    $("#qr_render_target").css({ "display": "block", "margin-left": "auto", "margin-right": "auto" });

                } else {
                    _E.feature.designer.qrinit.clear(); // clear the code.
                    _E.feature.designer.qrinit.makeCode("https://app.evalhalla.ca/app/player/survey/?sur=" + _E.feature.qparam.settings.sur + "&entry=QR"); // make another code.
                }
            });
        });

    });
})(jQuery);