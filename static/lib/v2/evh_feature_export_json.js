/*

Evalhalla Evalese to JSON export feature

Given Omar, a survey developer
When Omar chooses to send his survey template to CORTEX
Then a JSON representation of his survey will be created
 And the JSON will be sent to CORTEX

_E["feature"]["exportJSON"]

*/

// init the package
_E.feature.exportJSON = {};

// REFACTOR_PREP: survista integration, creation of json
_E.feature.exportJSON.audit_json = function () {
    var src = JSON.parse(
        _E.core.state.store["render"]["json"]
            .replace(/\,\%questions/g, "")
            .replace(/\%options/g, "")
    );
    var render = [];

    //alert(JSON.stringify(src));
    var snip = _E.core.templates.get("header");
    snip = snip.replace(/\%title/g, src["title"]);
    snip = snip.replace(/\%survey/g, src["language"]);
    snip = snip.replace(/\%intro/g, src["description"]);
    render.push(snip);

    var qs = src["questions"];
    for (var k = 0; k < qs.length; k++) {
        qsnip = "";
        if (qs[k]["questionType"] == "instruction") {
            qsnip = _E.core.templates.get("instruction");
        } else {
            qsnip = _E.core.templates.get("question");
        }

        qsnip = qsnip.replace(/\%question/g, qs[k]["question"]);
        qsnip = qsnip.replace(/\%instruction/g, qs[k]["question"]);
        qsnip = qsnip.replace(/\%qid/g, qs[k]["qid"]);
        //src["language"]
        //src["randomOrder"] // TODO
        //src["randomOptions"] // TODO
        var opts = qs[k]["options"];
        var render_opts = [];
        var opts_snip = "";
        if (qs[k]["questionType"] == "dropdown") {
            opts_snip = _E.core.templates.get("scale")
                .replace(/\%qid/g, qs[k]["qid"])
                .replace(/\%low/g, "Low")
                .replace(/\%high/g, "High")
                .replace(/\%unsure/g, "Unsure")
                ;
        } else if (qs[k]["questionType"] == "text") {
            opts_snip = _E.core.templates.get("open")
                .replace(/\%qid/g, qs[k]["qid"])
                ;
        }
        if (qs[k]["questionType"] == "mcq") {
            for (var l = 0; l < opts.length; l++) {

                opts_snip = _E.core.templates.get("pick one");
                //opts_snip = _E.core.templates.get("pick any"); // survista handles it?
                //opts_snip = _E.core.templates.get("rank"); // survista handles it?

                //console.log(qs[k]["questionType"]);
                // render_opts.push(opts[l]);                          
                opts_snip = opts_snip
                    .replace(/\%qid/g, qs[k]["qid"])
                    .replace(/\%pick/g, opts[l].trim())
                    .replace(/\%oid/g, l)
                    ;
                render_opts.push(opts_snip);
                //console.log(opts_snip);
                //random_shuffle.push(opts_snip);
            }
        } else {
            render_opts.push(opts_snip);
        }

        qsnip = qsnip.replace(/\%form/g, render_opts.join(""));
        //snip = snip.replace(/\%form/g, qsnip);
        render.push(qsnip);
    }

    render = _E.core.templates.form_wrap(render.join(""));
    _E.core.state.store["el"]["btn_hs_render"].trigger("click");
    _E.core.state.store["el"]["c_render"].html(render);
    // reinit submit, lang refresh
    refresh_lang();
    $("#evalhalla_submit").on("click", _E.feature.player.evalhalla_submit);
    $("select").formSelect();

};

_E.feature.exportJSON.enable_feature = function () {
    // add enabling functions
};
