(function ($) {
    $(function () {
        //
        // EVALHALLA
        //
        // Just type. It will make your form HTML and JSON
        // Think more code less.
        //


        //
        // Autodisplay Overrides
        //
        var auto_display_mode = false; // if you pass a query param in with sur=example_nanos_paged for example, it goes right into "presentation mode"
        var params = null; // the search params
        var sur = null; // the survey to load
        var entry = "direct";
        try {
            params = new URLSearchParams(window.location.search);
            sur = safe(params.get("sur"));
            entry = safe(params.get("entry"));
        } catch (e) {
            // good old Internet Explorer. Still writing "special" code for you...
            params = window.location.search.split("?")[1]; // yep, I actually did that.
            sur = safe(params.split("sur=")[1].split("&entry=")[0]); // very cross. much browser. so wow.
            entry = safe(params.split("entry=")[1].split("&sur=")[0]); // very cross. much browser. so wow.
            alert(sur + " " + entry);
        }

        // ok let's load it up
        // TODO: Remove hardcode demos and replace with API
        if (sur == "example_nanos") { g_intro_script = example_nanos; auto_display_mode = true; }
        if (sur == "example_nanos_paged") { g_intro_script = example_nanos_paged; auto_display_mode = true; }
        if (sur == "ut1_june18_event") { g_intro_script = ut1_june18_event; auto_display_mode = true; }
        if (sur == "ut0_da_interest") { g_intro_script = ut0_da_interest; auto_display_mode = true; }

        // wraps the generated elements in a form and a paginator
        var form_wrap = function (src) {
            var pages = "";
            for (var i = 1; i <= g_control_flags["pageid"]; i++) {
                pages += `<li class="waves-effect ev-page-sel ev-page-sel-` + i + `"><a>` + i + `</a></li>`;
            }
            var fwtmpl = evh_templates["html"]["form wrap"];
            var currpct = 0;
            try {
                currpct = ((parseFloat(g_control_flags["currpageid"]) / parseFloat(g_control_flags["pageid"])) * 100).toFixed(0)
            } catch (e) {
                currpct = 0;
            }
            fwtmpl = fwtmpl
                .replace(/\%pctdisplay/g, currpct)
                .replace(/\%pct/g, currpct)
                .replace(/\%src/g, src)
                .replace(/\%pages/g, pages)
            return fwtmpl;
        };
        // return a json or html snip with %replaceme codons/tokens sprinkled in
        // the general idea here is to use these like a templating lang. Just waaaay simpler
        // For huge surveys we might get into hot water performance wise
        // theres about 160 .replace regexes - but for our problem domain we're aiming
        // for small short and light surveys.
        var get_template_snip = function (snip, format = "html") {
            if (snip == "header") {
                if (format == "json") {
                    return evh_templates["json"]["header"];
                }
                return evh_templates["html"]["header"];
            } else if (snip == "question" || snip == "req question") {
                if (format == "json") {
                    return evh_templates["json"]["question"];
                }
                return evh_templates["html"]["question"];
            } else if (snip == "scale") {
                if (format == "json") {
                    return evh_templates["json"]["scale"];
                }
                return evh_templates["html"]["scale"];
            } else if (snip == "scale1-5") {
                if (format == "json") {
                    return evh_templates["json"]["scale1-5"];
                }
                return evh_templates["html"]["scale1-5"];
            } else if (snip == "open") {
                if (format == "json") {
                    return evh_templates["json"]["open"];
                }
                return evh_templates["html"]["open"];
            } else if (snip == "pick one") {
                if (format == "json") {
                    return evh_templates["json"]["pick one"];//'"%pick"';
                }
                return evh_templates["html"]["pick one"];
            } else if (snip == "pick any") {
                if (format == "json") {
                    return evh_templates["json"]["pick any"];//'"%pick"';
                }
                return evh_templates["html"]["pick any"];
            } else if (snip == "rank") {
                if (format == "json") {
                    return evh_templates["json"]["rank"];//'"%pick"';
                }
                return evh_templates["html"]["rank"];
            } else if (snip == "instruction") {
                if (format == "json") {
                    return evh_templates["json"]["instruction"];
                }
                return evh_templates["html"]["instruction"];
            } else if (snip == "ls") {
                return evh_templates["html"]["ls"];
            } else if (snip == "ls_header") {
                return evh_templates["html"]["ls_header"];
            } else if (snip == "generics") {
                // todo only one generics
                // TODO JSON
                // Generics was the prototype of tombstone. Repurpose for other "generic fields"
                if (format == "json") {
                    return evh_templates["json"]["generics"];//'"%field"';
                }
                return evh_templates["html"]["generics"];
            } else if (snip == "qlib entry") {
                return evh_templates["html"]["qlib entry"];
            } else if (snip == "page break") {
                if (format == "json") {
                    return evh_templates["json"]["page break"];
                }
                return evh_templates["html"]["page break"];
            }

            return "";
        };

        //
        // Question Libary
        //
        // This is a copy/paste storage for questions you have in the editor.
        // Once you start building surveys this makes it easier to make new ones
        // Why have to do stuff over and over right?
        var update_question_library = function () {
            var qlib = safe($("#qlib").val());
            if (qlib == "") {
                qlib = "Q: Example?\n/open\n\nQ: Example 2?\n/open\n";
                $("#qlib").val(qlib);
            }
            qlib = qlib.split("\n\n");
            var tbody = "";
            for (var i = 0; i < qlib.length; i++) {
                tbody += get_template_snip("qlib entry")
                    .replace(/\%bqid/g, i)
                    .replace(/\%question/g, qlib[i])
                    .replace(/\%ctrl/g, '<a id="ql_' + i + '" class="btn-small bqlib">Add</a>')

            }
            $("#qlib_target").html(tbody);
            $(".bqlib").on("click", function () {
                var bqid = $(this).attr("id");
                bqid = bqid.replace("ql_", "");
                var text = $("#bqlib_" + bqid).html();
                g_state["el"]["c_editor"].val(
                    g_state["el"]["c_editor"].val() +
                    "\n" +
                    text
                );
                g_state["el"]["c_editor"].trigger("keyup");
            });
        }

        //
        // LocalStorage for client side info store
        //

        // do we even has this?
        var ls_storageAvailable = function (type) {
            var storage;
            try {
                storage = window[type];
                var x = '__storage_test__';
                storage.setItem(x, x);
                storage.removeItem(x);
                return true;
            } catch (e) {
                return e instanceof DOMException && (
                    // everything except Firefox
                    e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === 'QuotaExceededError' ||
                    // Firefox
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                    // acknowledge QuotaExceededError only if there's something already stored
                    (storage && storage.length !== 0);
            }
        }

        var warn_user_no_storage = false; // this will fire once and only once. No need to annoy.
        var warn_user_alert = function () {
            // Too bad, no localStorage for us
            if (warn_user_no_storage == false) {
                alert("This device does not support local storage. Save feature disabled.");
                warn_user_no_storage = true;
            }
        }

        //
        // Basic Pre-Survista Charting
        //
        // The idea here is so that you can use localStorage to save the responses on
        // the device you're using (lets say you wanna decide what pizza to order for a meeting)
        // This will let you build the survey, pass the device around, and then see a chart of the 
        // results right away.

        // TODO: Pull out template code into snips
        // TODO: Optimize render, no need to show ls on every keystroke
        // display the report of the stored information. Survey, Responses, all of it.
        var ls_show_local_storage = function () {
            if (ls_storageAvailable('localStorage')) {
                var ev_ls = ls_get_lsobject();
                var display_str = "";
                var tbody = "";


                display_str += get_template_snip("ls_header").replace(/\%en/g, "Working Survey").replace(/\%fr/g, "Enquête en cours").replace(/\%count/g, "");
                display_str += get_template_snip("ls");
                tbody = "";
                if (ev_ls["working_survey"] != null) {
                    tbody += "<tr><td>" +
                        (ev_ls["working_survey"]["title"] != null ? ev_ls["working_survey"]["title"] : "") +
                        "</td><td>" +
                        (ev_ls["working_survey"]["description"] != null ? ev_ls["working_survey"]["description"] : "") +
                        "</td><td>" +
                        (ev_ls["working_survey"]["language"] != null ? ev_ls["working_survey"]["language"] : "") +
                        "</td><td>" +
                        (ev_ls["working_survey"]["questions"] != null ? ev_ls["working_survey"]["questions"].length : "") +
                        "</td><tr>" +
                        "";
                } else {
                    tbody = "<tr><td>None</td><td></td><td></td><td></td>";
                }
                display_str = display_str.replace(/\%tbody/g, tbody);

                display_str += get_template_snip("ls_header").replace(/\%en/g, "Saved Survey").replace(/\%fr/g, "Enquête Sauvegardées");
                display_str += get_template_snip("ls");
                tbody = "";
                if (ev_ls["saved_survey_signatures"] != null
                    && ev_ls["saved_survey_signatures"].length > 0) {
                    display_str = display_str.replace(/\%count/g, ev_ls["saved_survey_signatures"].length);
                    var cs = null;
                    for (var l = 0; l < ev_ls["saved_survey_signatures"].length; l++) {
                        cs = ev_ls["saved_survey_signatures"][l]["survista"];
                        tbody += '<tr><td><a id="sv_sr_' + l + '" class="adm_load_survey">' +
                            (cs["title"] != null ? cs["title"] : "") +
                            "</a></td><td>" +
                            (cs["description"] != null ? cs["description"] : "") +
                            "</td><td>" +
                            (cs["language"] != null ? cs["language"] : "") +
                            "</td><td>" +
                            (cs["questions"] != null ? cs["questions"].length : "") +
                            "</td><tr>" +
                            "";
                    }
                } else {
                    tbody = "<tr><td>-</td><td></td><td></td><td></td>";
                }
                display_str = display_str.replace(/\%count/g, "0");
                display_str = display_str.replace(/\%tbody/g, tbody);

                display_str += get_template_snip("ls_header").replace(/\%en/g, "Saved Responses").replace(/\%fr/g, "Réponses Sauvegardées");
                display_str += get_template_snip("ls");
                tbody = "";
                if (ev_ls["saved_filled_survey_responses"] != null && ev_ls["saved_filled_survey_responses"].length > 0) {
                    display_str = display_str.replace(/\%count/g, ev_ls["saved_filled_survey_responses"].length);
                    var survey = "", answer = "", answer_text = "", keys = "", qid = "", q = "", qida = [], opt_text = "", type = "";
                    var tabulation = {};
                    for (var l = 0; l < ev_ls["saved_filled_survey_responses"].length; l++) {
                        answer_text = [];
                        survey = ev_ls["saved_filled_survey_responses"][l]["survey"];
                        answer = ev_ls["saved_filled_survey_responses"][l]["response"];

                        // key = Object.keys(answer);
                        if (typeof survey["questions"] !== "undefined") {
                            for (var k in answer) {
                                type = (k.split("_"))[0];
                                qida = (k.match(/\d+/g));
                                qid = "";
                                try {
                                    qid = qida[0];
                                } catch (e) {
                                    qid = -1;
                                }
                                oid = "";

                                //console.log(qid, k);

                                if (typeof tabulation[survey["title"]] === "undefined") {
                                    tabulation[survey["title"]] = {};
                                }


                                q = survey["questions"].find(function (element) {
                                    return element["qid"] == qid;
                                });
                                opt_text = "";
                                try {
                                    if (typeof qida[1] !== "undefined") {
                                        oid = qida[1];
                                        opt_text = q["options"][oid];
                                    }
                                } catch (e) {
                                    // do nothing
                                }
                                var ans_key = ("Q" + qid + " " + opt_text).trim();
                                if (typeof q !== "undefined") {
                                    if (typeof tabulation[survey["title"]][ans_key] === "undefined") {
                                        tabulation[survey["title"]][ans_key] = {
                                            "question": (q["question"] + " " + opt_text).trim(),
                                            "values": []
                                        }
                                    }
                                    tabulation[survey["title"]][ans_key]["values"].push(
                                        //"(Q" + qid + ", " + type + ") " +
                                        //q["question"] + " " + opt_text +
                                        //" (A) " + 
                                        answer[k]
                                        // + "<br>"
                                    );

                                    answer_text.push(
                                        "(Q" + qid + ", " + type + ") " +
                                        q["question"] + " " + opt_text +
                                        " (A) " + answer[k] + "<br>"
                                    );
                                }

                            }
                            answer_text.sort();
                        }

                        tbody += "<tr><td>" +
                            ev_ls["saved_filled_survey_responses"][l]["survey"]["title"] +
                            "</td><td>" +
                            answer_text.join(" ") + //JSON.stringify(ev_ls["saved_filled_survey_responses"][l]["response"], null, 4) +
                            "</td><td>" +
                            //"<pre>" + JSON.stringify(ev_ls["saved_filled_survey_responses"][l]["response"], null, 4) + "</pre>" +
                            "-</td><td>" +
                            //<input value='" + JSON.stringify(ev_ls["saved_filled_survey_responses"][l]["survey"], null, 4) + "'/>" +
                            "-</td><tr>" +
                            "";


                    }
                } else {
                    tbody = "<tr><td>-</td><td></td><td></td><td></td>";
                }
                display_str = display_str.replace(/\%count/g, "0");
                display_str = display_str.replace(/\%tbody/g, tbody);


                var regen_color_btn = '<a class="regen_color btn purp-canada-ca lighten-2"><span class="en">Colour</span><span class="fr">Couleur</span></a>';
                display_str += get_template_snip("ls_header")
                    .replace(/\%en/g, "Tabulated Results (Basic)")
                    .replace(/\%fr/g, "Resultats Tabulé (Simple)");

                display_str += regen_color_btn;
                var metrics = {};
                var charts = [];
                var slices = [];
                for (var index in tabulation) {
                    metrics = {};
                    display_str += "" + "<div><strong>" + index + "</strong></div>";// + JSON.stringify(tabulation[index]) + "</div><hr>";
                    for (var rindex in tabulation[index]) {
                        metrics = {};
                        slices = [];
                        display_str += "<li><strong>" + rindex + "</strong> <em>" +
                            tabulation[index][rindex]["question"] +
                            "</em><br>";
                        for (var t = 0; t < tabulation[index][rindex]["values"].length; t++) {
                            if (typeof metrics[tabulation[index][rindex]["values"][t]] === "undefined") {
                                metrics[tabulation[index][rindex]["values"][t]] = 1
                            } else {
                                metrics[tabulation[index][rindex]["values"][t]] += 1
                            }
                        }
                        for (var metric in metrics) {
                            metrics[metric] = (parseFloat(metrics[metric]) / parseFloat(tabulation[index][rindex]["values"].length));

                            slices.push(
                                { percent: metrics[metric], color: randomHsl() }
                            );
                            metrics[metric] = (metrics[metric] * 100).toFixed(1) + "%";
                        }
                        charts.push(
                            {
                                "chart_id": slugify("" + index + "_" + rindex + "_" + "chart"),
                                "slices": slices
                            }
                        );
                        display_str += '<svg class="hnpie" id="' + slugify(index + "_" + rindex + "_" + "chart") + '" viewBox="-1 -1 2 2" style="transform: rotate(-90deg)"></svg>';
                        for (var metric in metrics) {
                            display_str += " <strong>" + (metric == "" ? "Blank Response" : metric) + "</strong>: " + metrics[metric] + ", ";
                        }
                        display_str += "</li>";
                    }
                    display_str += "<hr>";
                }
                //display_str += "" + "<pre>" + JSON.stringify(tabulation, null, 4) + "</pre>";

                g_state["el"]["c_ls"].html("" +
                    activate_lang(display_str)
                );
                $(".adm_load_survey").on("click", function () {
                    ls_load_survey($(this).attr("id"), "sv_sr_");
                });
                refresh_lang();
                for (var i = 0; i < charts.length; i++) {
                    hackernoon_pie(charts[i]["chart_id"], charts[i]["slices"]);
                }
                $(".regen_color").on("click", function (e) { e.preventDefault(); ls_show_local_storage(); return false; });

                //ui_resize_textareas();
            } else {
                warn_user_alert();
            }
        }

        // pull the survey from localstorage and render it
        var ls_load_survey = function (id, trim) {
            if (ls_storageAvailable('localStorage')) {
                var ls_index = parseInt(id.replace(trim, ""), 10);
                var ev_ls = ls_get_lsobject();

                g_state["el"]["c_editor"].val(
                    ev_ls["saved_survey_signatures"][ls_index]["evalhalla"]
                );

                g_state["el"]["c_editor"].trigger("change");
            } else {
                warn_user_alert();
            }
        }

        // clear out the local storage, clean and frush.
        var ls_clear_saved_entries = function () {
            if (ls_storageAvailable('localStorage')) {
                localStorage.clear();
                ls_init_local_storage();
                g_state["el"]["c_editor"].trigger("change");
                ls_show_local_storage();
            } else {
                warn_user_alert();
            }
        }
        /*
        This is a peek at what we're saving
        Survista has JSON format to follow, Evalhalla has evalese.
        
        ev_ls = {
            "working_survey": "", // json source curr survey
            "saved_survey_signature": [{"survista":{}, "evalhalla": ""}], // array of json src
            "saved_filled_survey_responses": [{},{}], //array of answerjson + survey sig
        }
        */
        // initialize the local store
        var ls_init_local_storage = function () {
            if (ls_storageAvailable('localStorage')) {
                var ev_ls = {
                    "working_survey": {}, // json source curr survey
                    "saved_survey_signatures": [], // array of json src
                    "saved_filled_survey_responses": [], //array of answerjson + survey sig
                };
                localStorage.setItem('ev_ls', JSON.stringify(ev_ls));
            } else {
                warn_user_alert();
            }
        }
        // get the string from local store and make it an object for use
        var ls_get_lsobject = function () {
            var ev_ls = localStorage.getItem('ev_ls');
            if (ev_ls == null) {
                ls_init_local_storage();
                ev_ls = localStorage.getItem('ev_ls');
            }
            ev_ls = JSON.parse(ev_ls);
            return ev_ls;
        }
        // save the question library text into the library
        var ls_save_qlib = function () {
            if (ls_storageAvailable('localStorage')) {
                var ev_ls = ls_get_lsobject();
                //console.log(ev_ls);
                ev_ls["qlib"] = safe($("#qlib").val());
                localStorage.setItem('ev_ls', JSON.stringify(ev_ls));
                ls_show_local_storage();
                update_question_library();
                ui_resize_textareas();
            } else {
                warn_user_alert();
            }
        }
        // load the question library into the editor
        var ls_load_qlib = function () {
            if (ls_storageAvailable('localStorage')) {
                var ev_ls = ls_get_lsobject();
                //console.log(ev_ls);
                $("#qlib").val(ev_ls["qlib"]);
                update_question_library();
            } else {
                warn_user_alert();
            }
        }
        // EXEC INIT -- fire the load for the question library
        ls_load_qlib();

        // save the current survey in the editor to the ls
        var ls_save_survey_signature = function (signature, src) {
            if (ls_storageAvailable('localStorage')) {
                var ev_ls = ls_get_lsobject();
                //console.log(ev_ls);
                ev_ls["saved_survey_signatures"].push({ "survista": JSON.parse(signature), "evalhalla": src });
                localStorage.setItem('ev_ls', JSON.stringify(ev_ls));
                ls_show_local_storage();
                ui_resize_textareas();
            } else {
                warn_user_alert();
            }
        }
        // update the local store of the current working survey
        // this allows cross refresh content to remain
        var ls_update_working_survey = function (signature) {
            if (ls_storageAvailable('localStorage')) {
                var ev_ls = ls_get_lsobject();
                ev_ls["working_survey"] = JSON.parse(signature);
                localStorage.setItem('ev_ls', JSON.stringify(ev_ls));
                //todo: timer on refreshes
                //ls_show_local_storage();
                ui_resize_textareas();
            } else {
                warn_user_alert();
            }
        }


        // save the survey response into the local store. allows for offline storage for upload later
        // TODO: upload later function
        var ls_save_survey_response = function (response) {
            if (ls_storageAvailable('localStorage')) {
                var ev_ls = ls_get_lsobject();

                ev_ls["saved_filled_survey_responses"].push(
                    {
                        "response": JSON.parse(response),
                        "survey": ev_ls["working_survey"]
                    }
                );

                localStorage.setItem('ev_ls', JSON.stringify(ev_ls));
                ls_show_local_storage();
                ui_resize_textareas();

                // submit to api
                // deprecated: turn back on
                //api_upload_survey_result(response);

                // clear responses
                // TODO: reinit tombstone generics, refactor needed
                g_state["generics"]["generic_fetched"] = false;
                api_get_generics();
                g_state["el"]["c_editor"].trigger("change");
            } else {
                warn_user_alert();
            }
        }
        var ls_view_saved_entries = function () {
            if (ls_storageAvailable('localStorage')) {
                ls_show_local_storage();
            } else {
                warn_user_alert();
            }
        }

        //
        // Helper functions
        //

        // get from tombstone: stub
        // TODO: Refactor Fix with correct code (right now just obj/deobj for test)
        g_state["generics"]["generic_fetched"] = false;
        autoc_load_classifications();
        autoc_load_departments();
        autoc_load_cities();
        //api_get_generics();

        // auto reset the form if enough time has passed
        // NOTE: Accessibility concerns here
        const activate_restart_timer = function () {
            //TODO: 20 sec delay restart
        };

        // registhor api integrations. Testing route
        const rg_api_route = api_post_surv_resp_route + api_key;
        // survista:eval api integrations
        const sv_api_route = sv_api_post_surv_resp_route + sv_api_key;
        // post the currently rendered survey response to the api
        var api_post_to_route = function (route, data_in) {
            $.ajax({
                url: route,
                contentType: "application/json",
                type: "POST",
                data: data_in,
                success: function (response) {
                    console.log(response);
                }
            });
        }
        // upload the survey reponse to our integrations
        var api_upload_survey_result = function (data_in) {
            //console.log(data_in);
            let api_route = "";
            api_route = sv_api_route;
            api_post_to_route(api_route, data_in);
            api_route = rg_api_route;
            api_post_to_route(api_route, data_in);
        }
        // submit the form result
        const evalhalla_submit = function () {
            // make some form data
            var formElement = document.getElementById("evalhalla_form");
            var formData = new FormData(formElement);
            //console.log(formData);
            // can use that to post
            // query string would be
            var query_string = $("#evalhalla_form").serialize();
            //console.log(query_string);
            if (formElement.checkValidity() == true) {
                //alert("Good to go!");
            } else {
                alert("Missing data / Données manquantes");
                $(".ev-page").show();
                $(".ev-page-lang").hide();
                $(".ev-page-offering").hide();
                $(".ev-page-tombstone").hide();
                formElement.checkValidity()
                return;
            }
            // let em know
            var json_o = get_params_as_object(query_string);

            // get tombstone details
            // TODO: Sanitize inputs, done?
            json_o["tombstone_department"] = safe($("#autocomplete-input-department").val());
            json_o["tombstone_city"] = safe($("#autocomplete-input-city").val());
            json_o["tombstone_classification"] = safe($("#autocomplete-input-classification").val());
            json_o["tombstone_offering_id"] = safe(g_state["tombstone"]["offering_id"]);
            json_o["tombstone_language"] = safe(g_state["ui"]["lang"]);

            // user-agent information
            json_o["meta_useragent"] = safe(window.navigator.userAgent);
            json_o["meta_entry_method"] = safe(entry); // "email", "QR", "web", "altered"
            json_o["meta_evalhalla_sur"] = safe(sur);

            var json_o_string = (JSON.stringify(json_o, null, 4));
            console.log(json_o_string);
            // save response to local storage
            ls_save_survey_response(json_o_string);
            // save response to survista

            // TODO: turn back on
            api_upload_survey_result(json_o_string);

            // show local storage items
            ls_view_saved_entries();
            //alert(json_o_string);
            g_state["el"]["ui_render"].hide();
            $("#step_thank_you_cta").show();
            activate_restart_timer();
            //alert("Check the console for details");
        };

        // convert the en/fr tags into HTML
        const activate_lang = function (pack) {
            pack = pack
                .replace(/\/en/g, "<span class='en'>")
                .replace(/\/fr/g, "<span class='fr'>")
                .replace(/\/\;/g, "</span>")
                .replace(/\/\;\/en/g, "</span><span class='en'>")
                .replace(/\/\;\/fr/g, "</span><span class='fr'>")
                .replace(/\;\/en/g, "</span><span class='en'>")
                .replace(/\;\/fr/g, "</span><span class='fr'>")
                ;
            return pack;
        };

        // helper function to take the multiline input and pack it into one object
        const pack_text = function (src_a, i, pack, join = " ") {
            var nextcmd = "null";
            var pack_json = "";
            while (nextcmd == "null") {
                if (i + 1 < src_a.length) {
                    nextcmd = detect_command(src_a[i + 1]);
                    if (nextcmd == "null") {
                        //pack += join + "[en] " + src_a[i + 1] + " [fr] " + src_a[i + 1];
                        pack += join + src_a[i + 1];
                        i++;
                    } else {
                        // do nothing
                    }
                } else {
                    nextcmd = "exit";
                }
            }
            // Q: the test
            // Q: /en the test
            // Q: /fr le test
            // Q: /en the test /fr le test
            // TODO note: this/entails could be an issue
            pack_json = pack;

            pack = activate_lang(pack); // adds in the <span> s

            return { "pack": pack, "pack_json": pack_json, "i": i };
        }

        // materialize css resize the textareas so it shows content instead
        // of remaining the previous size
        var ui_resize_textareas = function () {
            M.textareaAutoResize(g_state["el"]["c_editor"]);
            M.textareaAutoResize(g_state["el"]["c_json"]);
        }

        //
        // Command Handlers
        //

        // parser - detect if we have encountered a command
        var detect_command = function (src) {
            var first_word = src.split(" ")[0];
            if (first_word == "" || typeof first_word === "undefined") {
                return "null";
            } else if (first_word == "\n") {
                return "newline";
            } else if (typeof g_cmd[first_word.toUpperCase().trim()] !== "undefined") {
                return g_cmd[first_word.toUpperCase().trim()];
            }
            return "null";
        }
        // parser - handle the header command
        var handle_cmd_header = function (cmd, src, json = "") {
            reset_control_flags();

            g_control_flags["header"][cmd] = src.replace(src.split(" ")[0], "").trim();
            g_control_flags["header_json"][cmd] = json.replace(json.split(" ")[0], "").trim();
            // handle html
            var snip = get_template_snip("header");
            snip = snip.replace(/\%title/g, g_control_flags["header"]["title"]);
            snip = snip.replace(/\%survey/g, g_control_flags["header"]["survey"]);
            snip = snip.replace(/\%intro/g, g_control_flags["header"]["intro"]);
            // handle json
            var jsonsnip = get_template_snip("header", "json");
            jsonsnip = jsonsnip.replace(/\%title/g, g_control_flags["header_json"]["title"]);
            jsonsnip = jsonsnip.replace(/\%survey/g, g_control_flags["header_json"]["survey"]);
            jsonsnip = jsonsnip.replace(/\%intro/g, g_control_flags["header_json"]["intro"]);
            g_control_flags["json"] = jsonsnip;


            return snip;
        }

        // parser - handle the pagebreak command
        var handle_cmd_pagebreak = function (cmd, src, json = "") {
            // handle html
            var snip = get_template_snip("page break");
            g_control_flags["pageid"] = g_control_flags["pageid"] + 1;
            snip = snip.replace(/\%pageid/g, g_control_flags["pageid"]);
            // handle json
            var jsonsnip = get_template_snip("page break", "json");
            jsonsnip = jsonsnip.replace(/\%instruction/g, json.replace(json.split(" ")[0], "").trim());
            g_control_flags["json"] = g_control_flags["json"]
                .replace("%questions", jsonsnip + ",%questions")
            return snip;
        }

        // parser - handle the instruction command
        var handle_cmd_instruction = function (cmd, src, json = "") {
            // handle html
            var snip = get_template_snip("instruction");
            snip = snip.replace(/\%instruction/g, src.replace(src.split(" ")[0], "").trim());
            // handle json
            var jsonsnip = get_template_snip("instruction", "json");
            jsonsnip = jsonsnip.replace(/\%instruction/g, json.replace(json.split(" ")[0], "").trim());
            g_control_flags["json"] = g_control_flags["json"]
                .replace("%questions", jsonsnip + ",%questions")
                .replace("%rand_order", g_control_flags["question"]["random"]["order"])
                .replace("%rand_options", g_control_flags["question"]["random"]["options"])
                .replace("%lang", g_state["ui"]["lang"])
                ;
            return snip;
        }

        // parser - handle the question command
        var handle_cmd_question = function (cmd, src, json = "") {
            var snip = get_template_snip("question");
            if (cmd == "question" || cmd == "req question") {
                // handle html
                g_control_flags["question"]["text"] = src.replace(src.split(" ")[0], "").trim();
                g_control_flags["question"]["qid"] = g_control_flags["question"]["qid"] + 1;
                snip = snip.replace(/\%question/g, g_control_flags["question"]["text"]);
                snip = snip.replace(/\%qid/g, g_control_flags["question"]["qid"]);
                if (cmd == "req question") {
                    snip = snip.replace(/\%req/g, '<span class="badge red white-text"><span class="en">required</span><span class="fr">requis</span></span>');
                } else {
                    snip = snip.replace(/\%req/g, '');
                }
                g_control_flags["question"]["form"] = snip;
                // handle json
                var jsonsnip = get_template_snip("question", "json");
                g_control_flags["question"]["text"] = json.replace(json.split(" ")[0], "").trim()
                jsonsnip = jsonsnip.replace(/\%question/g, g_control_flags["question"]["text"]);
                jsonsnip = jsonsnip.replace(/\%qid/g, g_control_flags["question"]["qid"]);
                g_control_flags["json"] = g_control_flags["json"]
                    .replace("%questions", jsonsnip + ",%questions")
                    .replace("%rand_order", g_control_flags["question"]["random"]["order"])
                    .replace("%rand_options", g_control_flags["question"]["random"]["options"])
                    ;
                if (cmd == "req question") {
                    g_control_flags["question"]["required"] = true;
                    g_control_flags["json"] = g_control_flags["json"]
                        .replace("%req", "true");
                } else {
                    g_control_flags["question"]["required"] = false;
                    g_control_flags["json"] = g_control_flags["json"]
                        .replace("%req", "false");
                }
            } else if (cmd == "scale" || cmd == "scale1-5") {
                // handle html
                snip = g_control_flags["question"]["form"];
                var scale = "";
                if (cmd == "scale") {
                    scale = get_template_snip("scale").replace(/\%qid/g, g_control_flags["question"]["qid"]);
                } else if (cmd == "scale1-5") {
                    scale = get_template_snip("scale1-5").replace(/\%qid/g, g_control_flags["question"]["qid"]);
                }

                var opts = src.split(",")
                // clean opts
                opts[0] = opts[0]
                    .replace("[SCALE]", "")
                    .replace(/(\/SCALE1\-5|\/scale1\-5)/g, "") // 1-5 scale
                    .replace(/(\/SCALE|\/scale)/g, "")
                    .replace(/(\/ÉCHELLE|\/échelle)/g, "")
                    .replace("|", "")
                    .trim();
                // handle json
                var jsonsnip = "";
                if (cmd == "scale") {
                    jsonsnip = get_template_snip("scale", "json");
                } else if (cmd == "scale1-5") {
                    jsonsnip = get_template_snip("scale1-5", "json");
                }
                jsonsnip = jsonsnip.replace(/\%qid/g, g_control_flags["question"]["qid"]);
                g_control_flags["json"] = g_control_flags["json"].replace(/\%type/g, "dropdown");

                // NOTE: You cant stuff a span inside an <option>, it's bad form.
                // Gotta find another way to biling the option values
                for (var opti = 0; opti < opts.length; opti++) {
                    if (opti == 0) {
                        scale = scale.replace(/\%low/g, opts[opti]);
                        jsonsnip = jsonsnip.replace(/\%low/g, opts[opti].trim());
                    } else if (opti == 1) {
                        scale = scale.replace(/\%high/g, opts[opti]);
                        jsonsnip = jsonsnip.replace(/\%high/g, opts[opti].trim());
                    } else if (opti == 2) {
                        scale = scale.replace(/\%unsure/g, opts[opti]);
                        jsonsnip = jsonsnip.replace(/\%unsure/g, opts[opti].trim());
                    }
                    else {
                        // do nothing
                    }
                }
                // cleanup unused replacement symbol targets
                scale = scale.replace(/\%low/g, "")
                    .replace(/\%high/g, "")
                    .replace(/\%unsure/g, "");
                jsonsnip = jsonsnip.replace(/\%low/g, "")
                    .replace(/\%high/g, "")
                    .replace(/\%unsure/g, "");

                g_control_flags["json"] = g_control_flags["json"].replace("%options", jsonsnip);
                snip = snip.replace(/\%form/g, scale);
                if (g_control_flags["question"]["required"] == true) {
                    snip = snip.replace(/\%reqattr/g, 'required="" aria-required="true"').replace(/\%reqcls/g, "validate");
                } else {
                    snip = snip.replace(/\%reqattr/g, '').replace(/\%reqcls/g, "");
                }
                g_control_flags["question"]["form"] = snip;
            } else if (cmd == "open") {
                //required="" aria-required="true" class="validate"
                // handle html
                snip = g_control_flags["question"]["form"];
                snip = snip.replace(/\%form/g,
                    get_template_snip("open")
                        .replace(/\%qid/g, g_control_flags["question"]["qid"])
                );
                if (g_control_flags["question"]["required"] == true) {
                    snip = snip.replace(/\%reqattr/g, 'required="" aria-required="true"').replace(/\%reqcls/g, "validate");
                } else {
                    snip = snip.replace(/\%reqattr/g, '').replace(/\%reqcls/g, "");
                }
                g_control_flags["question"]["form"] = snip;
                // handle json
                g_control_flags["json"] = g_control_flags["json"].replace("%options", "").replace(/\%type/g, "text");
            } else if (cmd == "generics") {
                // handle html
                snip = g_control_flags["question"]["form"];
                snip = snip.replace(/\%form/g, get_template_snip("generics").replace(/\%qid/g, g_control_flags["question"]["qid"]));
                if (g_control_flags["question"]["required"] == true) {
                    snip = snip.replace(/\%reqattr/g, 'required="" aria-required="true"').replace(/\%reqcls/g, "validate");
                } else {
                    snip = snip.replace(/\%reqattr/g, '').replace(/\%reqcls/g, "");
                }
                g_control_flags["question"]["form"] = snip;
                // todo: handle json
                g_control_flags["json"] = g_control_flags["json"].replace("%options", '"dept","role","region","office"').replace(/\%type/g, "text");
            } else if (cmd == "pick one" || cmd == "pick any" || cmd == "rank") {
                snip = g_control_flags["question"]["form"];
                var opts = src.split("[OPT]")
                opts.shift(); // remove first null item

                var opts_json = json.split("[OPT]")
                opts_json.shift(); // remove first null item

                var form = "";
                var jsonsnip = '';
                // handle html+json same time
                var random_shuffle = [];
                var temp_snip = "";
                // lang opt check for bilingual
                var opt_input_value = ""
                for (var opti = 0; opti < opts.length; opti++) {
                    //
                    // WARN: Brittle code. Tied to HTML structure.
                    // See pack_text, activate_lang
                    // suggest holding off on activate_lang until form is fully built
                    // also, address the JSON render (it will have evalese in the mix)
                    // 
                    opt_input_value = opts[opti].trim()
                    var oa = [];
                    oa = opt_input_value.split("</span>")
                    for (var m = 0; m < oa.length; m++) {
                        if (oa[m].indexOf("<span class='" + g_state["ui"]["lang"] + "'>") !== -1) {
                            opt_input_value = oa[m].replace("<span class='" + g_state["ui"]["lang"] + "'>", "");
                        }
                    }
                    // end WARN

                    temp_snip = get_template_snip(cmd)
                        .replace(/\%qid/g, g_control_flags["question"]["qid"])
                        .replace(/\%pick/g, opts[opti].trim())
                        .replace(/\%oid/g, opti)
                        .replace(/\%vpick/g, opt_input_value.trim())
                        ;
                    form += temp_snip;
                    random_shuffle.push(temp_snip);

                    jsonsnip += "," + get_template_snip(cmd, "json")
                        .replace(/\%pick/g, opts_json[opti].trim());
                }
                if (g_control_flags["question"]["random"]["options"] == true) {
                    shuffle_array(random_shuffle);
                    form = random_shuffle.join(" ");
                }
                if (typeof snip !== "undefined" && snip != false) {
                    if (cmd == "pick one" || cmd == "pick any") {
                        snip = snip.replace(/\%form/g, `<fieldset><legend><span class="en">Pick</span><span class="fr">Choisir</span></legend>${form}</fieldset>`);
                    } else {
                        snip = snip.replace(/\%form/g, form);
                    }
                }

                if (g_control_flags["question"]["required"] == true) {
                    snip = snip.replace(/\%reqattr/g, 'required="" aria-required="true"').replace(/\%reqcls/g, "validate");
                } else {
                    snip = snip.replace(/\%reqattr/g, '').replace(/\%reqcls/g, "");
                }
                g_control_flags["question"]["form"] = snip;
                // handle json
                g_control_flags["json"] = g_control_flags["json"].replace(/\%type/g, "mcq");
                g_control_flags["json"] = g_control_flags["json"].replace("%options", jsonsnip
                    .replace(/(^[,\s]+)|([,\s]+$)/g, ''));
            }
            // TODO: Lang override, replace with actual language control
            g_control_flags["json"] = g_control_flags["json"].replace(/\%lang/g, g_state["ui"]["lang"]);

            return snip;
        }

        //
        // Main proc loop
        //

        // start parsing the input
        var raise_src_to_evalhalla = function (src) {
            var src_a = src.split("\n");
            var i = 0;
            var evalhalla = [];
            var cmd = "";

            for (i = 0; i < src_a.length; i++) {
                cmd = detect_command(src_a[i]);
                if (cmd != "null") {
                    if (
                        cmd["type"] == "survey"
                        || cmd["type"] == "intro"
                        || cmd["type"] == "title"
                    ) {
                        var pack = src_a[i];
                        //if (cmd["type"] == "intro") {
                        var pkg = pack_text(src_a, i, pack);
                        pack = pkg["pack"];
                        i = pkg["i"];
                        //}
                        evalhalla = [handle_cmd_header(cmd["type"], pack, pkg["pack_json"])];
                    } else if (cmd["type"] == "question" || cmd["type"] == "req question"
                        || cmd["type"] == "scale"
                        || cmd["type"] == "scale1-5"
                        || cmd["type"] == "open"
                        || cmd["type"] == "generics"
                        || cmd["type"] == "pick one"
                        || cmd["type"] == "pick any"
                        || cmd["type"] == "rank"
                    ) {
                        var pack = src_a[i];
                        var pkg = (
                            cmd["type"] == "pick one"
                            || cmd["type"] == "pick any"
                            || cmd["type"] == "rank"
                        ) ? pack_text(src_a, i, pack, "[OPT] ") : pack_text(src_a, i, pack);
                        pack = pkg["pack"];
                        i = pkg["i"];

                        if (cmd["type"] == "scale"
                            || cmd["type"] == "scale1-5"
                            || cmd["type"] == "open"
                            || cmd["type"] == "generics"
                            || cmd["type"] == "pick one"
                            || cmd["type"] == "pick any"
                            || cmd["type"] == "rank") {
                            evalhalla.pop();
                            g_state["qlib"].pop();
                        }
                        evalhalla.push(handle_cmd_question(cmd["type"], pack, pkg["pack_json"]));
                        g_state["qlib"].push(pack);
                    } else if (cmd["type"] == "instruction") {
                        var pack = src_a[i];
                        var pkg = pack_text(src_a, i, pack);
                        pack = pkg["pack"];
                        i = pkg["i"];
                        evalhalla.push(handle_cmd_instruction(cmd["type"], pack, pkg["pack_json"]));
                    } else if (cmd["type"] == "page break") {
                        var pack = src_a[i];
                        var pkg = pack_text(src_a, i, pack);
                        pack = pkg["pack"];
                        i = pkg["i"];
                        evalhalla.push(handle_cmd_pagebreak(cmd["type"], pack, pkg["pack_json"]));
                    } else if (cmd["type"] == "random order" || cmd["type"] == "end random order") {
                        // handle randomize order
                        if (cmd["type"] == "random order") {
                            g_control_flags["question"]["random"]["order"] = true;
                        } else if (cmd["type"] == "end random order") {
                            g_control_flags["question"]["random"]["order"] = false;
                        }
                    } else if (cmd["type"] == "random options" || cmd["type"] == "end random options") {
                        // handle random options
                        if (cmd["type"] == "random options") {
                            g_control_flags["question"]["random"]["options"] = true;
                        } else if (cmd["type"] == "end random options") {
                            g_control_flags["question"]["random"]["options"] = false;
                        }
                    } else if (cmd["type"] == "end") {
                        // handle generic end, custom for random
                    } else if (cmd["type"] == "end pick" || cmd["type"] == "end rank") {
                        // skip end tag for now
                    } else {
                        // generic handler, use basic tag wrapping from g_cmd
                        evalhalla.push(cmd["html"].replace(/\%v/g, src_a[i]));
                    }
                }
            }
            // random order handling
            var return_evalhalla = "";
            try {
                var new_evalhalla = [];
                var new_evalhalla_rand = [];
                var q_index = JSON.parse(g_control_flags["json"]
                    .replace(/\,\%questions/g, "")
                    .replace(/\%options/g, "")
                    .replace(/\%questions/g, "")
                );
                var qs = q_index["questions"];
                new_evalhalla.push(evalhalla[0]);

                if (typeof qs !== "undefined") {
                    for (var k = 0; k < qs.length; k++) {
                        if (qs[k].randomOrder == "false") {
                            if (new_evalhalla_rand.length != 0) {
                                shuffle_array(new_evalhalla_rand);
                                new_evalhalla.push(new_evalhalla_rand.join(""));
                                new_evalhalla_rand = [];
                            }
                            new_evalhalla.push(evalhalla[k + 1]);
                        } else {
                            new_evalhalla_rand.push(evalhalla[k + 1]);
                        }
                    }
                }
                shuffle_array(new_evalhalla_rand);
                new_evalhalla.push(new_evalhalla_rand.join());
                new_evalhalla_rand = [];
                return_evalhalla = new_evalhalla.join("");
            } catch (e) {
                return_evalhalla = evalhalla.join("");
                //M.toast({ html: 'JSON ' + e.toString(), classes: 'rounded' });
            }


            // save current survey signature
            ls_update_working_survey(g_control_flags["json"]
                .replace(/\,\%questions/g, "")
                .replace(/\%options/g, "")
                .replace(/\%questions/g, ""));

            return return_evalhalla
                .replace(/\,\%questions/g, "")
                .replace(/\%options/g, "")
                .replace(/\%questions/g, "")
        };

        // 
        // Material UI General
        //

        $(".sidenav").sidenav();
        $(".parallax").parallax();
        $('.fixed-action-btn').floatingActionButton();
        $('.modal').modal();
        $(".dropdown-trigger").dropdown();

        //
        // Non-Material UI general
        //

        $(".update_ls").on("click", function (e) { e.preventDefault(); ls_show_local_storage(); return false; });

        // TODO: refactor. tombstone generic info
        var refresh_generics = function () {
            //alert("Refreshing Generic");

            api_get_generics();

            $(".ev_inline_dept").val(g_state["generics"]["ev_inline_dept"]);
            $(".ev_inline_role").val(g_state["generics"]["ev_inline_role"]);
            $(".ev_inline_region").val(g_state["generics"]["ev_inline_region"]);
            $(".ev_inline_office").val(g_state["generics"]["ev_inline_office"]);

            $(".ev_inline_dept").on("change", function () { g_state["generics"]["ev_inline_dept"] = safe($(this).val()); });
            $(".ev_inline_role").on("change", function () { g_state["generics"]["ev_inline_role"] = safe($(this).val()); });
            $(".ev_inline_region").on("change", function () { g_state["generics"]["ev_inline_region"] = safe($(this).val()); });
            $(".ev_inline_office").on("change", function () { g_state["generics"]["ev_inline_office"] = safe($(this).val()); });

            M.updateTextFields();
        };

        // lang refresh to show the new language spans
        var refresh_lang = function () {
            if (g_state["ui"]["lang"] == "en") {
                $("span.en").show();
                $("span.fr").hide();
            } else if (g_state["ui"]["lang"] == "fr") {
                $("span.en").hide();
                $("span.fr").show();
            }
            ui_resize_textareas();
        };
        // language buttons
        g_state["el"]["lang"].on("click", function () {
            if (g_state["ui"]["lang"] == "en") {
                g_state["ui"]["lang"] = "fr";
                refresh_lang();
                //ui_resize_textareas();
                $(".dropdown-trigger").dropdown();
            } else if (g_state["ui"]["lang"] == "fr") {
                g_state["ui"]["lang"] = "en";
                refresh_lang();
                //ui_resize_textareas();
                $(".dropdown-trigger").dropdown();
            }
        });
        g_state["el"]["lang_set_fr"].on("click", function () {
            g_state["ui"]["lang"] = "fr";
            refresh_lang();
            //ui_resize_textareas();
            $(".dropdown-trigger").dropdown();
            //$("#step_lang").hide();
            //$("#step_offering").show();
            g_control_flags["currpageid"] = "offering"; // advance page
            //console.log(g_control_flags["currpageid"]);
            hs_page_intro_step();
        });
        g_state["el"]["lang_set_en"].on("click", function () {
            g_state["ui"]["lang"] = "en";
            refresh_lang();
            //ui_resize_textareas();
            $(".dropdown-trigger").dropdown();
            //$("#step_lang").hide();
            //$("#step_offering").show();
            g_control_flags["currpageid"] = "offering"; // advance page
            //console.log(g_control_flags["currpageid"]);
            hs_page_intro_step();
        });
        // step advance - tomstone information set
        $(".tombstone-set").on("click", function () {
            //$("#step_tombstone").hide();
            //$(".surveybody").show();
            //g_state["el"]["ui_render"].show();
            g_control_flags["currpageid"] = 1; // advance page, note we're switching types here
            //console.log(g_control_flags["currpageid"]);
            hs_page_step();
        });
        // step advance - ready for next partipant step
        $(".ev-ready-for-next").on("click", function () {
            $("#step_thank_you_cta").hide();
            $("#step_lang").show();
            $("#autocomplete-input-department").val("");
            $("#autocomplete-input-city").val("");
            $("#autocomplete-input-classification").val("");
        });

        // uncomment to generate on load
        //g_state["el"]["lang"].trigger("change");

        // load intro content
        g_state["el"]["c_editor"].val(
            g_intro_script
        );

        // 
        // Question Library
        //

        $("#qlib").on("change", function () {
            update_question_library();
            ls_save_qlib();
        });
        $("#qlib").trigger("change");


        // pagination
        var hs_page_step = function () {
            if (g_control_flags["currpageid"] <= 0) {
                //g_control_flags["currpageid"] = 1;
                g_control_flags["currpageid"] = "tombstone";
                hs_page_intro_step();
                return;
            }
            var pct = 0;
            try {
                pct = ((parseFloat(g_control_flags["currpageid"]) / parseFloat(g_control_flags["pageid"])) * 100).toFixed(0);
            } catch (e) {
                pct = 0;
            }
            $(".surveybody").show();
            g_state["el"]["ui_render"].show();
            $(".ev-page").hide();
            $(".ev-page-" + g_control_flags["currpageid"]).show();
            $(".ev-page-sel").removeClass("active");
            $(".ev-page-sel-" + g_control_flags["currpageid"]).addClass("active");

            $(".determinate").css({ "width": pct + "%" });
            $(".determinate-text").text(pct + "%");
        };
        var hs_page_intro_step = function () {

            /*if (g_control_flags["currpageid"] == "lang") {
                g_control_flags["currpageid"] = "offering";
            } else if (g_control_flags["currpageid"] == "offering") {
                g_control_flags["currpageid"] = "tombstone";
            } else if (g_control_flags["currpageid"] == "tombstone") {
                g_control_flags["currpageid"] = "1";
                $(".surveybody").show();
                hs_page_step();
                return;
            }*/
            $(".surveybody").hide();
            $(".ev-page").hide();
            $(".ev-page-" + g_control_flags["currpageid"]).show();
        };
        var ui_activate_intropagedirection_buttons = function () {
            $(".ev-page-sel-" + "offering").on("click", function () {
                g_control_flags["currpageid"] = "offering";
                hs_page_intro_step();
            });
        };
        var ui_activate_pagedirection_buttons = function () {
            $(".ev-page-sel-" + "left").on("click", { "i": "left" },
                function (e) {
                    if (isNaN(g_control_flags["currpageid"]) == false) {
                        g_control_flags["currpageid"] = g_control_flags["currpageid"] - 1;
                        hs_page_step();
                    } else {
                        hs_page_intro_step();
                    }


                    //alert(e.data.i);
                    $("#evalhalla_submit").addClass("disabled");
                    window.scrollTo(0, 0);
                    if (g_control_flags["currpageid"] == g_control_flags["pageid"]) {
                        $("#evalhalla_submit").removeClass("disabled");
                    }
                });
            $(".ev-page-sel-" + "right").on("click", { "i": "right" },
                function (e) {
                    //alert(e.data.i);
                    g_control_flags["currpageid"] = g_control_flags["currpageid"] + 1;
                    if (g_control_flags["currpageid"] >= g_control_flags["pageid"]) {
                        g_control_flags["currpageid"] = g_control_flags["pageid"];
                    }
                    $(".ev-page").hide();
                    $(".ev-page-" + g_control_flags["currpageid"]).show();
                    $(".ev-page-sel").removeClass("active");
                    $(".ev-page-sel-" + g_control_flags["currpageid"]).addClass("active");
                    $(".determinate").css({ "width": ((parseFloat(g_control_flags["currpageid"]) / parseFloat(g_control_flags["pageid"])) * 100).toFixed(0) + "%" });
                    $(".determinate-text").text(((parseFloat(g_control_flags["currpageid"]) / parseFloat(g_control_flags["pageid"])) * 100).toFixed(0) + "%");

                    //alert(e.data.i);
                    $("#evalhalla_submit").addClass("disabled");
                    window.scrollTo(0, 0);
                    if (g_control_flags["currpageid"] == g_control_flags["pageid"]) {
                        $("#evalhalla_submit").removeClass("disabled");
                    }
                });
        }
        ui_activate_intropagedirection_buttons(); // enable buttons for intro steps

        // Render Trigger
        // Render Timer additions. TODO: Causes flicker of submit. Adjust setting classes.
        var render_buffering = false;
        var render_manager = null;
        var render_delay = 1300; // 1.3 sec delay between renders
        var render_requested = false;
        g_state["el"]["c_editor"].on("change keyup", function () {
            // render timer
            if (render_buffering == true) {
                render_requested = true;
                return false;
            } else {
                render_buffering = true;
                render_manager = setTimeout(function () {
                    render_buffering = false;
                    if (render_requested == true) {
                        render_requested = false;
                        g_state["el"]["c_editor"].trigger("keyup");
                    }
                }, render_delay);
            }
            // end render timer
            // get source
            var src = safe(g_state["el"]["c_editor"].val().replace(/\t/g, ""));
            // prep
            reset_control_flags();
            // E V A L H A L L A
            var survey_html = raise_src_to_evalhalla(src);
            // load render
            g_state["el"]["c_render"].html(form_wrap(survey_html));
            // reinit submit, lang refresh
            $("#evalhalla_submit").on("click", evalhalla_submit);
            refresh_lang();
            refresh_generics();
            // pagination
            $(".ev-page-sel").removeClass("active");
            $(".ev-page-sel-" + g_control_flags["currpageid"]).addClass("active");

            $(".ev-page").hide();
            $(".ev-page-" + g_control_flags["currpageid"]).show();

            $("#evalhalla_submit").addClass("disabled");
            if (g_control_flags["currpageid"] == g_control_flags["pageid"]) {
                $("#evalhalla_submit").removeClass("disabled");
            }

            for (var i = 1; i <= g_control_flags["pageid"]; i++) {
                $(".ev-page-sel-" + i).on("click", { "i": i },
                    function (e) {
                        g_control_flags["currpageid"] = e.data.i
                        $(".ev-page").hide();
                        $(".ev-page-" + e.data.i).show();
                        $(".ev-page-sel").removeClass("active");
                        $(".ev-page-sel-" + e.data.i).addClass("active");
                        $(".determinate").css({ "width": ((parseFloat(g_control_flags["currpageid"]) / parseFloat(g_control_flags["pageid"])) * 100).toFixed(0) + "%" });
                        $(".determinate-text").text(((parseFloat(g_control_flags["currpageid"]) / parseFloat(g_control_flags["pageid"])) * 100).toFixed(0) + "%");
                        //alert(e.data.i);
                        $("#evalhalla_submit").addClass("disabled");
                        window.scrollTo(0, 0);
                        if (g_control_flags["currpageid"] == g_control_flags["pageid"]) {
                            $("#evalhalla_submit").removeClass("disabled");
                        }
                    });
            }

            ui_activate_pagedirection_buttons();

            // load json
            try {
                g_state["el"]["c_json"].val(JSON.stringify(JSON.parse(
                    g_control_flags["json"]
                        .replace(/\,\%questions/g, "")
                        .replace(/\%options/g, "")
                        .replace(/\%questions/g, "")
                ), null, 4));
            } catch (e) {
                M.toast({ html: 'Hint: Use single quotes, JSON ' + e.toString(), classes: 'rounded' });
            }
            // todo: accessibility check on materialize dropdown (there's shadow elements causing label issues)
            //$('select').formSelect();

        });
        // render
        g_state["el"]["c_editor"].trigger("change");
        // resize
        ui_resize_textareas();

        // upload to survista: stub
        // TODO: Fix with correct code (right now just obj/deobj for test)
        g_state["el"]["btn_upload"].on("click", function () {
            alert(
                JSON.stringify(JSON.parse(
                    g_control_flags["json"]
                        .replace(/\,\%questions/g, "")
                        .replace(/\%questions/g, "")
                        .replace(/\%options/g, "")
                ), null, 4)
            );
        });

        // Local storage
        g_state["el"]["adm_clear_ls"].on("click", function () {
            alert("Clearing LocalStorage...");
            ls_clear_saved_entries();
            g_state["el"]["c_ls"].val("");
        });

        g_state["el"]["adm_save_working_survey"].on("click", function () {
            alert("Saving Working Survey...");
            ls_save_survey_signature(g_control_flags["json"]
                .replace(/\,\%questions/g, "")
                .replace(/\%questions/g, "")
                .replace(/\%options/g, ""), safe(g_state["el"]["c_editor"].val()));
        });

        //
        // UI Hide Show
        //

        ui_reset_panels = function () {
            g_state["el"]["ui_render"].addClass("m6").removeClass("m12");
            g_state["el"]["ui_render"].show();
            g_state["el"]["ui_editor"].addClass("m6").removeClass("m12");
            g_state["el"]["ui_editor"].show();
            g_state["el"]["ui_json"].addClass("m6").removeClass("m12");
            g_state["el"]["ui_json"].hide();
            // g_state["el"]["ui_ls"].addClass("m4").removeClass("m12");
            g_state["el"]["ui_ls"].show();
            g_state["el"]["ui_qlib"].show();
            g_state["ui"]["hs_render_window"] = false;
            g_state["ui"]["hs_editor_window"] = false;
            g_state["ui"]["hs_json_window"] = false;
            g_state["ui"]["hs_ls_window"] = false;
            g_state["ui"]["hs_qlib_window"] = false;
        };
        g_state["el"]["btn_hs_qlib"].on("click", function () {
            if (g_state["ui"]["hs_qlib_window"] == true) {
                ui_reset_panels();
            } else {
                //g_state["el"]["ui_ls"].removeClass("m4").addClass("m12");
                g_state["el"]["ui_qlib"].show();
                g_state["el"]["ui_ls"].hide();
                g_state["el"]["ui_render"].hide();
                g_state["el"]["ui_editor"].hide();
                g_state["el"]["ui_json"].hide();
                g_state["ui"]["hs_qlib_window"] = true;
            }
        });
        g_state["el"]["btn_hs_ls"].on("click", function () {
            if (g_state["ui"]["hs_ls_window"] == true) {
                ui_reset_panels();
            } else {
                //g_state["el"]["ui_ls"].removeClass("m4").addClass("m12");
                g_state["el"]["ui_ls"].show();
                g_state["el"]["ui_render"].hide();
                g_state["el"]["ui_editor"].hide();
                g_state["el"]["ui_json"].hide();
                g_state["el"]["ui_qlib"].hide();
                g_state["ui"]["hs_ls_window"] = true;
            }
        });
        g_state["el"]["btn_hs_render"].on("click", function () {
            if (g_state["ui"]["hs_render_window"] == true) {
                ui_reset_panels();
            } else {
                g_state["el"]["ui_render"].removeClass("m6").addClass("m12");
                g_state["el"]["ui_render"].show();
                g_state["el"]["ui_editor"].hide();
                g_state["el"]["ui_json"].hide();
                g_state["el"]["ui_ls"].hide();
                g_state["el"]["ui_qlib"].hide();
                g_state["ui"]["hs_render_window"] = true;
            }
        });
        g_state["el"]["btn_hs_editor"].on("click", function () {
            if (g_state["ui"]["hs_editor_window"] == true) {
                ui_reset_panels();
            } else {
                g_state["el"]["ui_editor"].removeClass("m6").addClass("m12");
                g_state["el"]["ui_editor"].show();
                g_state["el"]["ui_json"].hide();
                g_state["el"]["ui_render"].hide();
                g_state["el"]["ui_ls"].hide();
                g_state["el"]["ui_qlib"].hide();
                g_state["ui"]["hs_editor_window"] = true;
            }
        });
        g_state["el"]["btn_hs_json"].on("click", function () {
            if (g_state["ui"]["hs_json_window"] == true) {
                ui_reset_panels();
            } else {
                g_state["el"]["c_json"].val(JSON.stringify(JSON.parse(g_control_flags["json"]
                    .replace(/\,\%questions/g, "")
                    .replace(/\%options/g, "")
                ), null, 4));
                //g_state["el"]["ui_json"].removeClass("m6").addClass("m12");
                g_state["el"]["ui_json"].show();
                g_state["el"]["ui_editor"].hide();
                g_state["el"]["ui_render"].hide();
                g_state["el"]["ui_ls"].hide();
                g_state["el"]["ui_qlib"].hide();
                g_state["ui"]["hs_json_window"] = true;
            }
        });
        g_state["el"]["btn_audit"].on("click", function () {
            alert("Auditing Evalhalla to Survista Render. Note there may be differences until both systems are fully aligned.");
            audit_json();
        });

        //
        // Editor buttons
        //
        var get_editor_tmpl = function (cmd) {
            if (cmd == "header") {
                return "# 1234\n## Survey Title\n### Survey introduction text\n\n";
            } else if (cmd == "instr") {
                return "// Explanatory text note\n\n";
            } else if (cmd == "qany") {
                return "Q: This is my question?\n/any\nOption\nOption\nOption\n;\n\n";
            } else if (cmd == "qfree") {
                return "Q: This is my question?\n/open\n\n";
            } else if (cmd == "qone") {
                return "Q: This is my question?\n/one\nOption\nOption\nOption\n;\n\n";
            } else if (cmd == "qrank") {
                return "Q: This is my question?\n/rank\nOption\nOption\nOption\n;\n\n";
            } else if (cmd == "qscale") {
                return "Q: This is my question?\n/scale Low, High, Unsure\n\n";
            } else {
                return "";
            }
        }
        var editor_add_template = function (cmd) {
            g_state["el"]["c_editor"].val(
                safe(g_state["el"]["c_editor"].val()) + get_editor_tmpl(cmd)
            );
            g_state["el"]["c_editor"].trigger("keyup");
        }
        var trigger_action = function (curr_action) {
            //console.log(curr_action);
            editor_add_template(curr_action);
        };
        var enable_editor_buttons = function (actions) {
            g_state["el"]["edt_" + "header"].on("click", function () { trigger_action("header"); });
            g_state["el"]["edt_" + "instr"].on("click", function () { trigger_action("instr"); });
            g_state["el"]["edt_" + "qany"].on("click", function () { trigger_action("qany"); });
            g_state["el"]["edt_" + "qfree"].on("click", function () { trigger_action("qfree"); });
            g_state["el"]["edt_" + "qone"].on("click", function () { trigger_action("qone"); });
            g_state["el"]["edt_" + "qrank"].on("click", function () { trigger_action("qrank"); });
            g_state["el"]["edt_" + "qscale"].on("click", function () { trigger_action("qscale"); });
            //
            g_state["el"]["edt_erase"].on("click", function () {
                // probs should confirm here. TODO
                g_state["el"]["c_editor"].val("");
                g_state["el"]["c_editor"].trigger("keyup");
            });
        };
        enable_editor_buttons();

        //
        // Tutorial runner setup
        //

        var run_type_it = function (type_this = "type_it_short") {
            g_state["tut"]["char_at"] = 0;
            g_state["el"]["c_editor"].val("");
            reset_control_flags(true);
            clearInterval(g_state["tut"]["typer"]);
            g_state["tut"]["typer"] = null;
            g_state["tut"]["typer"] = setInterval(function () {
                if (g_state["tut"]["char_at"] > g_state["tut"]["" + type_this].length) {
                    clearInterval(g_state["tut"]["typer"]);
                    g_state["tut"]["typer"] = null;
                } else {
                    try {
                        if (typeof g_state["tut"]["" + type_this][g_state["tut"]["char_at"]] !== "undefined") {
                            g_state["el"]["c_editor"].val(
                                g_state["el"]["c_editor"].val() + g_state["tut"]["" + type_this][g_state["tut"]["char_at"]]
                            );
                            g_state["el"]["c_editor"].trigger("keyup");
                            g_state["tut"]["char_at"] = g_state["tut"]["char_at"] + 1;
                            ui_resize_textareas();
                        }
                    } catch (e) {
                        // do nothing
                    }
                }
            }, 80);
        };

        g_state["el"]["btn_tutorial"].on("click", function () {
            if (g_state["ui"]["lang"] == "en") {
                run_type_it("type_it_short");
            } else {
                run_type_it("type_it_short_fr");
            }
        });

        // 
        // JSON Render
        //

        var audit_json = function () {
            var src = JSON.parse(
                g_control_flags["json"]
                    .replace(/\,\%questions/g, "")
                    .replace(/\%options/g, "")
            );
            var render = [];

            //alert(JSON.stringify(src));
            var snip = get_template_snip("header");
            snip = snip.replace(/\%title/g, src["title"]);
            snip = snip.replace(/\%survey/g, src["language"]);
            snip = snip.replace(/\%intro/g, src["description"]);
            render.push(snip);

            var qs = src["questions"];
            for (var k = 0; k < qs.length; k++) {
                qsnip = "";
                if (qs[k]["questionType"] == "instruction") {
                    qsnip = get_template_snip("instruction");
                } else {
                    qsnip = get_template_snip("question");
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
                    opts_snip = get_template_snip("scale")
                        .replace(/\%qid/g, qs[k]["qid"])
                        .replace(/\%low/g, "Low")
                        .replace(/\%high/g, "High")
                        .replace(/\%unsure/g, "Unsure")
                        ;
                } else if (qs[k]["questionType"] == "text") {
                    opts_snip = get_template_snip("open")
                        .replace(/\%qid/g, qs[k]["qid"])
                        ;
                }
                if (qs[k]["questionType"] == "mcq") {
                    for (var l = 0; l < opts.length; l++) {

                        opts_snip = get_template_snip("pick one");
                        //opts_snip = get_template_snip("pick any"); // survista handles it?
                        //opts_snip = get_template_snip("rank"); // survista handles it?

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

            render = form_wrap(render.join(""));
            g_state["el"]["btn_hs_render"].trigger("click");
            g_state["el"]["c_render"].html(render);
            // reinit submit, lang refresh
            refresh_lang();
            $("#evalhalla_submit").on("click", evalhalla_submit);
            $("select").formSelect();

        };

        //
        //  Auto Display Mode
        //

        if (auto_display_mode == true) {
            //alert("auto");
            g_state["el"]["ui_render"].removeClass("m6").addClass("m12");

            $("#step_lang").show();
            $("#step_offering").hide();
            $("#step_tombstone").hide();
            $("#step_thank_you_cta").hide();

            g_state["el"]["ui_render"].hide();
            g_state["el"]["ui_editor"].hide();
            g_state["el"]["ui_json"].hide();
            g_state["el"]["ui_ls"].hide();
            g_state["el"]["ui_qlib"].hide();
            $("#admin_footer").hide();
            $("#admin_footer_end").hide();
            $(".adm-function").hide();
            g_state["ui"]["hs_render_window"] = true;
            // HACK: hidden textareas have real height for some reason.
            // adding display none kills resize capability of textarea.
            // we're dynamically adding the maxsize when we need it in presentation mode
            $(".hiddendiv").addClass("hiddendiv-maxsized");
        } else {
            $("#step_lang").hide();
            $("#step_offering").hide();
            $("#step_tombstone").hide();
            $("#step_thank_you_cta").hide();
        }

        //
        // MVP 0.1 Connection, Registhor
        //

        // Registhor Connection
        /*
        {
            "results": [
            {
                "offering_id": 119472,
                "course_code": "A313",
                "course_title": "Fundamentals of Writing for the Web (A313)",
                "offering_city": "NATIONAL CAPITAL REGION (NCR)",
                "offering_province": "NCR/RCN"
            },
        */
        var populate_offerings = function () {
            var date = new Date();
            var date_string = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
                .toISOString()
                .split("T")[0];
            $.ajax({
                url: api_get_offering_route.replace("%currentdate", date_string) + api_key,
                contentType: "application/json",
                type: "GET",
                //data: data_in,
                success: function (response) {
                    var offs = response.results ? response.results : [];
                    var offs_html = "";
                    var suggested = "";
                    // to enable testing when no courses load. delete this code
                    if (offs.length == 0) {
                        offs_html += "<h2><span class='en'>No courses today</span><span class='fr'>Aucune de cours aujourd'hui</span></h2>";
                        offs = [
                            {
                                "offering_id": 000000,
                                "course_code": "X000",
                                "course_title": "(dev) Test Course",
                                "offering_city": "NATIONAL CAPITAL REGION (NCR)",
                                "offering_province": "NCR/RCN"
                            }];
                    }
                    // end delete
                    for (var i = 0; i < offs.length; i++) {
                        if (i == 0) {
                            suggested = `<div style="padding: 1em;">
                                        <span class="badge red white-text" style="float:none;padding:0.3em;font-size:1.1em;">
                                            <span class="en">Suggested</span><span class="fr">Suggéré</span>
                                        </span></div>
                                        `
                        } else {
                            suggested = "";
                        }
                        offs_html += `<div class="card-panel purp-canada-ca-edged">
                                        <div class="padbox badgelarge">
                                            ${suggested}
                                            <div class="row">
                                                ${offs[i]["offering_id"]} - ${offs[i]["course_code"]}<br />
                                                <strong>${offs[i]["course_title"]}</strong><br />
                                                ${offs[i]["offering_city"]}, ${offs[i]["offering_province"]}
                                            </div>
                                            <div class="row">
                                                <a href="#editor" id="off_${offs[i]["offering_id"]}" class="select-offering btn btn-large purp-canada-ca">
                                                    <span class="en">Select</span><span class="fr">Choisir</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>`;

                    }
                    g_state["tombstone"]["offerings"] = offs;

                    $(".offering_target").html(offs_html);
                    refresh_lang();
                    $(".select-offering").on("click", function () {
                        //alert($(this).attr("id").split("_")[1]);
                        g_state["tombstone"]["offering_id"] = $(this).attr("id").split("_")[1];
                        for (var i = 0; i < g_state["tombstone"]["offerings"].length; i++) {
                            if (g_state["tombstone"]["offering_id"] == g_state["tombstone"]["offerings"][i]["offering_id"]) {
                                $("#autocomplete-input-city").val(
                                    g_state["tombstone"]["offerings"][i]["offering_city"]
                                );
                                M.updateTextFields();
                            }
                        }

                        g_control_flags["currpageid"] = "tombstone";
                        //console.log(g_control_flags["currpageid"]);
                        hs_page_intro_step();
                        //$("#step_offering").hide();
                        //$("#step_tombstone").show();
                    });
                }
            });
        }
        populate_offerings();

    });
})(jQuery);