/*

Evalhalla Evalese Interpreter/Parser features

Given Boba a survey creator
When Boba writes a survey in Evalese
Then the survey will be converted to <output>
output |
-------|
JSON   |
HTML   |
Evalese|

_E["feature"]["interpreter"]

*/

// init interpreter
_E.core.interpreter = {};

// REFACTOR_PREP: editor, parser, player - detangle
// Render Trigger
// Render Timer additions. TODO: Causes flicker of submit. Adjust setting classes.
// moved to _E.core.state.store render
//var render_buffering = false;
//var render_manager = null;
//var render_delay = 1300; // 1.3 sec delay between renders
//var render_requested = false;


// These are the "EVALESE" command. This is the markdown that builds the forms.
// You can easily add new aliases for the core commands. Just make sure you check
// yourself. There's not much in the way of error catching here. It trusts you.
_E.core.interpreter.evalese = {
    // CMDS in ALLCAPS, but input is any case
    // interpreter v0.1
    "[SURVEY]": { "type": "survey", "html": "<survey>%v</survey>" },
    "#": { "type": "survey", "html": "<survey>%v</survey>" },
    "[TITLE]": { "type": "title", "html": "<title>%v</title>" },
    "##": { "type": "title", "html": "<title>%v</title>" },
    "[INTRO]": { "type": "intro", "html": "<intro>%v</intro>" },
    "###": { "type": "intro", "html": "<intro>%v</intro>" },
    "[QUESTION]": { "type": "question", "html": "<question>%v</question>" },
    "Q:": { "type": "question", "html": "<question>%v</question>" },
    "[*QUESTION]": { "type": "req question", "html": "<question>%v</question>" },
    "*Q:": { "type": "req question", "html": "<question>%v</question>" },
    "[SCALE]": { "type": "scale", "html": "<scale>%v</scale>" },
    "/SCALE": { "type": "scale", "html": "<scale>%v</scale>" },
    "/SCALE1-5": { "type": "scale1-5", "html": "<scale>%v</scale>" },
    "/ÉCHELLE": { "type": "scale", "html": "<scale>%v</scale>" },
    "|": { "type": "scale", "html": "<scale>%v</scale>" },
    "[OPEN]": { "type": "open", "html": "<open>%v</open>" },
    "/OPEN": { "type": "open", "html": "<open>%v</open>" },
    "/OUVRIR": { "type": "open", "html": "<open>%v</open>" },
    "@": { "type": "open", "html": "<open>%v</open>" },
    "[INSTRUCTION]": { "type": "instruction", "html": "<instruction>%v</instruction>" },
    "//": { "type": "instruction", "html": "<instruction>%v</instruction>" },
    "[END]": { "type": "end", "html": "<end>%v</end>" },
    ";": { "type": "end", "html": "<end>%v</end>" },
    "[RANDOMORDER]": { "type": "random order", "html": "<rand>%v</rand>" },
    "~": { "type": "random order", "html": "<rand>%v</rand>" },
    "/RAND": { "type": "random order", "html": "<rand>%v</rand>" },
    "[RANDOMIZEORDER]": { "type": "random order", "html": "<rand>%v</rand>" },
    "[ENDRANDOMORDER]": { "type": "end random order", "html": "<rand>%v</rand>" },
    "[ENDRANDOMIZEORDER]": { "type": "end random order", "html": "<rand>%v</rand>" },
    ";~": { "type": "end random order", "html": "<rand>%v</rand>" },
    ";RAND": { "type": "end random order", "html": "<rand>%v</rand>" },
    "[RANDOMOPTIONS]": { "type": "random options", "html": "<rand>%v</rand>" },
    "~~": { "type": "random options", "html": "<rand>%v</rand>" },
    "/RANDO": { "type": "random options", "html": "<rand>%v</rand>" },
    "[RANDOMIZEOPTIONS]": { "type": "random options", "html": "<rand>%v</rand>" },
    "[ENDRANDOMOPTIONS]": { "type": "end random options", "html": "<rand>%v</rand>" },
    "[ENDRANDOMIZEOPTIONS]": { "type": "end random options", "html": "<rand>%v</rand>" },
    ";~~": { "type": "end random options", "html": "<rand>%v</rand>" },
    ";RANDO": { "type": "end random options", "html": "<rand>%v</rand>" },
    "[PICKONE]": { "type": "pick one", "html": "<pick>%v</pick>" },
    "/ONE": { "type": "pick one", "html": "<pick>%v</pick>" },
    "/UN": { "type": "pick one", "html": "<pick>%v</pick>" },
    ".": { "type": "pick one", "html": "<pick>%v</pick>" },
    "[PICKANY]": { "type": "pick any", "html": "<pick>%v</pick>" },
    "/ANY": { "type": "pick any", "html": "<pick>%v</pick>" },
    "/TOUT": { "type": "pick any", "html": "<pick>%v</pick>" },
    "*": { "type": "pick any", "html": "<pick>%v</pick>" },
    "[ENDPICK]": { "type": "end pick", "html": "<pick>%v</pick>" },
    "[RANK]": { "type": "rank", "html": "<rank>%v</rank>" },
    "/RANK": { "type": "rank", "html": "<rank>%v</rank>" },
    "/TAUX": { "type": "rank", "html": "<rank>%v</rank>" },
    "$": { "type": "rank", "html": "<rank>%v</rank>" },
    "[RATE]": { "type": "rank", "html": "<rank>%v</rank>" },
    "/RATE": { "type": "rank", "html": "<rank>%v</rank>" },
    "[ENDRANK]": { "type": "end rank", "html": "<rank>%v</rank>" },
    "[ENDRATE]": { "type": "end rank", "html": "<rank>%v</rank>" },
    "/GENERICS": { "type": "generics", "html": "<generics>%v</generics>" },
    "[GENERICS]": { "type": "generics", "html": "<generics>%v</generics>" },
    "/PAGEBREAK": { "type": "page break", "html": "<page break>%v</page break>" },
    "[PAGEBREAK]": { "type": "page break", "html": "<page break>%v</page break>" },
    // interpreter v0.2
    "/DEPARTMENT": { "type": "pick one department", "html": "<pick>%v</pick>" },
    "/CLASSIFICATION": { "type": "pick one classification", "html": "<pick>%v</pick>" },
    "/OFFERING": { "type": "pick one offering", "html": "<pick>%v</pick>" },
    "/LOCATION": { "type": "pick one location", "html": "<pick>%v</pick>" },
    "/DROPDOWN": { "type": "pick one dropdown", "html": "<pick>%v</pick>" },
    "/LANGUAGE": { "type": "pick one language", "html": "<pick>%v</pick>" },
    "/NOOFFERINGPAGE": { "type": "no offering page", "html": "<pick>%v</pick>" },
    "/NOTOMBSTONEPAGE": { "type": "no tombstone page", "html": "<pick>%v</pick>" },
};



// REFACTOR_PREP: pull all lang refresh out into lib function, detangle
// convert the en/fr tags into HTML
// might belong to parser/interpreter
_E.core.interpreter.activate_lang = function (pack) {
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

// REFACTOR_PREP: parser - consider refactor
// helper function to take the multiline input and pack it into one object
_E.core.interpreter.pack_text = function (src_a, i, pack, join) {
    join = join || " ";
    var nextcmd = "null";
    var pack_json = "";
    while (nextcmd == "null") {
        if (i + 1 < src_a.length) {
            nextcmd = _E.core.interpreter.detect_command(src_a[i + 1]);
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
    // TODO note: this/entails could be an issue (/en might get picked up)
    pack_json = pack;

    pack = _E.core.interpreter.activate_lang(pack); // adds in the <span> s

    return { "pack": pack, "pack_json": pack_json, "i": i };
}

// 3. Dereference Question Text
_E.core.interpreter.g_qindex = {}; // derefrence question text here

_E.core.interpreter.parse_question_text = function (sur_text) {
    var sa = sur_text.replace(/\n/g, "").split("Q:");
    for (let i = 1; i < sa.length; i++) {
        let evh_sai = sa[i];
        evh_sai = evh_sai.split("/open")[0].split("/OPEN")[0]
            .split("/any")[0].split("/ANY")[0]
            .split("/one")[0].split("/ONE")[0]
            .split("/department")[0].split("/DEPARTMENT")[0]
            .split("/location")[0].split("/LOCATION")[0]
            .split("/offering")[0].split("/OFFERING")[0]
            .split("/classification")[0].split("/CLASSIFICATION")[0]
            .split("/dropdown")[0].split("/DROPDOWN")[0]
            .split("/language")[0].split("/LANGUAGE")[0]
            .split("/scale")[0].split("/SCALE")[0]
            .split("/scale1-5")[0].split("/SCALE1-5")[0];
        evh_sai = evh_sai;

        // split by lang (en for now)
        evh_sai = evh_sai.split("/;")[0];
        evh_sai = evh_sai.replace("/en", "");
        _E.core.interpreter.g_qindex["" + i] = evh_sai;
    }
};
// get the text of the question by index
_E.core.interpreter.get_qindex_text = function (key) {
    let keya = key.split("_");
    try {
        let t = _E.core.interpreter.g_qindex[parseInt(keya[2], 10)];
        if (typeof t === "undefined") {
            t = key;
        }
        return t;
    } catch (e) {
        return "N/A";
    }
};

//
// Command Handlers
//

// REFACTOR_PREP: parser
// parser - detect if we have encountered a command
_E.core.interpreter.detect_command = function (src) {
    var first_word = src.split(" ")[0];
    if (first_word == "" || typeof first_word === "undefined") {
        return "null";
    } else if (first_word == "\n") {
        return "newline";
    } else if (typeof _E.core.interpreter.evalese[first_word.toUpperCase().trim()] !== "undefined") {
        return _E.core.interpreter.evalese[first_word.toUpperCase().trim()];
    }
    return "null";
}
// parser - handle the header command
_E.core.interpreter.handle_cmd_header = function (cmd, src, json) {
    json = json || "";

    _E.core.state.render_state_reset();

    _E.core.state.store["render"]["header"][cmd] = src.replace(src.split(" ")[0], "").trim();
    _E.core.state.store["render"]["header_json"][cmd] = json.replace(json.split(" ")[0], "").trim();
    // handle html
    var snip = _E.core.templates.get("header");
    snip = snip.replace(/\%title/g, _E.core.state.store["render"]["header"]["title"]);
    snip = snip.replace(/\%survey/g, _E.core.state.store["render"]["header"]["survey"]);
    snip = snip.replace(/\%intro/g, _E.core.state.store["render"]["header"]["intro"]);
    // handle json
    var jsonsnip = _E.core.templates.get("header", "json");
    jsonsnip = jsonsnip.replace(/\%title/g, _E.core.state.store["render"]["header_json"]["title"]);
    jsonsnip = jsonsnip.replace(/\%survey/g, _E.core.state.store["render"]["header_json"]["survey"]);
    jsonsnip = jsonsnip.replace(/\%intro/g, _E.core.state.store["render"]["header_json"]["intro"]);
    _E.core.state.store["render"]["json"] = jsonsnip;


    return snip;
}

// parser - handle the pagebreak command
_E.core.interpreter.handle_cmd_pagebreak = function (cmd, src, json) {
    json = json || "";
    // handle html
    var snip = _E.core.templates.get("page break");
    _E.core.state.store["render"]["pageid"] = _E.core.state.store["render"]["pageid"] + 1;
    snip = snip.replace(/\%pageid/g, _E.core.state.store["render"]["pageid"]);
    // handle json
    var jsonsnip = _E.core.templates.get("page break", "json");
    jsonsnip = jsonsnip.replace(/\%instruction/g, json.replace(json.split(" ")[0], "").trim());
    _E.core.state.store["render"]["json"] = _E.core.state.store["render"]["json"]
        .replace("%questions", jsonsnip + ",%questions")
    return snip;
}

// parser - handle the pagebreak command
_E.core.interpreter.handle_cmd_nopresurveypage = function (cmd, src, json) {
    //json = json || "";
    // handle html
    if (cmd == "no tombstone page") {
        //_E.core.state.store["render"]["currpageid"] = 1; // advance page, note we're switching types here
        //_E.feature.player.hs_page_step()
        _E.core.state.store["render"]["no tombstone page"] = true;
    }
    if (cmd == "no offering page") {
        //_E.core.state.store["render"]["currpageid"] = "offering";
        //_E.feature.player.hs_page_intro_step();
        _E.core.state.store["render"]["no offering page"] = true;
    }
    return "";
}

// parser - handle the instruction command
_E.core.interpreter.handle_cmd_instruction = function (cmd, src, json) {
    json = json || "";
    // handle html
    var snip = _E.core.templates.get("instruction");
    snip = snip.replace(/\%instruction/g, src.replace(src.split(" ")[0], "").trim());
    // handle json
    var jsonsnip = _E.core.templates.get("instruction", "json");
    jsonsnip = jsonsnip.replace(/\%instruction/g, json.replace(json.split(" ")[0], "").trim());
    _E.core.state.store["render"]["json"] = _E.core.state.store["render"]["json"]
        .replace("%questions", jsonsnip + ",%questions")
        .replace("%rand_order", _E.core.state.store["render"]["question"]["random"]["order"])
        .replace("%rand_options", _E.core.state.store["render"]["question"]["random"]["options"])
        .replace("%lang", _E.core.state.store["ui"]["lang"])
        ;
    return snip;
}

// parser - handle the question command
_E.core.interpreter.handle_cmd_question = function (cmd, src, json) {
    json = json || "";
    var snip = _E.core.templates.get("question");
    if (cmd == "question" || cmd == "req question") {
        // handle html
        _E.core.state.store["render"]["question"]["text"] = src.replace(src.split(" ")[0], "").trim();
        _E.core.state.store["render"]["question"]["qid"] = _E.core.state.store["render"]["question"]["qid"] + 1;
        snip = snip.replace(/\%question/g, _E.core.state.store["render"]["question"]["text"]);
        snip = snip.replace(/\%qid/g, _E.core.state.store["render"]["question"]["qid"]);
        // TODO: Refactor into templates
        if (cmd == "req question") {
            snip = snip.replace(/\%req/g, '<span class="badge accessiblered white-text"><span class="en">required</span><span class="fr">requis</span></span>');
        } else {
            snip = snip.replace(/\%req/g, '<span class="badge accessiblegrey white-text"><span class="en">optional</span><span class="fr">optionnel</span></span>');
        }
        _E.core.state.store["render"]["question"]["form"] = snip;
        // handle json
        var jsonsnip = _E.core.templates.get("question", "json");
        _E.core.state.store["render"]["question"]["text"] = json.replace(json.split(" ")[0], "").trim()
        jsonsnip = jsonsnip.replace(/\%question/g, _E.core.state.store["render"]["question"]["text"]);
        jsonsnip = jsonsnip.replace(/\%qid/g, _E.core.state.store["render"]["question"]["qid"]);
        _E.core.state.store["render"]["json"] = _E.core.state.store["render"]["json"]
            .replace("%questions", jsonsnip + ",%questions")
            .replace("%rand_order", _E.core.state.store["render"]["question"]["random"]["order"])
            .replace("%rand_options", _E.core.state.store["render"]["question"]["random"]["options"])
            ;
        if (cmd == "req question") {
            _E.core.state.store["render"]["question"]["required"] = true;
            _E.core.state.store["render"]["json"] = _E.core.state.store["render"]["json"]
                .replace("%req", "true");
        } else {
            _E.core.state.store["render"]["question"]["required"] = false;
            _E.core.state.store["render"]["json"] = _E.core.state.store["render"]["json"]
                .replace("%req", "false");
        }
    } else if (cmd == "scale" || cmd == "scale1-5") {
        // handle html
        snip = _E.core.state.store["render"]["question"]["form"];
        var scale = "";
        if (cmd == "scale") {
            scale = _E.core.templates.get("scale").replace(/\%qid/g, _E.core.state.store["render"]["question"]["qid"]);
        } else if (cmd == "scale1-5") {
            scale = _E.core.templates.get("scale1-5").replace(/\%qid/g, _E.core.state.store["render"]["question"]["qid"]);
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
            jsonsnip = _E.core.templates.get("scale", "json");
        } else if (cmd == "scale1-5") {
            jsonsnip = _E.core.templates.get("scale1-5", "json");
        }
        jsonsnip = jsonsnip.replace(/\%qid/g, _E.core.state.store["render"]["question"]["qid"]);
        _E.core.state.store["render"]["json"] = _E.core.state.store["render"]["json"].replace(/\%type/g, "dropdown");


        _E.core.state.store["localmem"]["scale_qid_" + _E.core.state.store["render"]["question"]["qid"]] = {};
        _E.core.state.store["localmem"]["scale_qid_" + _E.core.state.store["render"]["question"]["qid"]]["en"] = '';
        _E.core.state.store["localmem"]["scale_qid_" + _E.core.state.store["render"]["question"]["qid"]]["fr"] = '';

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

        _E.core.state.store["localmem"]["scale_qid_" + _E.core.state.store["render"]["question"]["qid"]]["en"] += '<option value="" disabled selected></option>' +
            scale.split('<option value="" disabled selected></option>')[1]
                .replace(/<\/?span class='fr'.[^>]*>/g, '')
                .replace(/\<span class='en'\>/g, '')
                .replace(/\<\/span\>/g, '')
                .split('</select>')[0]
                .trim();
        _E.core.state.store["localmem"]["scale_qid_" + _E.core.state.store["render"]["question"]["qid"]]["fr"] += '<option value="" disabled selected></option>' +
            scale.split('<option value="" disabled selected></option>')[1]
                .replace(/<\/?span class='en'.[^>]*>/g, '')
                .replace(/\<span class='fr'\>/g, '')
                .replace(/\<\/span\>/g, '')
                .split('</select>')[0]
                .trim();

        let scale_parts = scale.split('%scale_multilang_split');

        scale = scale_parts[0] +
            _E.core.state.store["localmem"]["scale_qid_" + _E.core.state.store["render"]["question"]["qid"]][_E.core.state.store["ui"]["lang"]] +
            scale_parts[2];
        //console.log(_E.core.state.store["localmem"]);

        _E.core.state.store["render"]["json"] = _E.core.state.store["render"]["json"].replace("%options", jsonsnip);
        snip = snip.replace(/\%form/g, scale).replace(/\%scale_multilang_split/g, '');
        if (_E.core.state.store["render"]["question"]["required"] == true) {
            snip = snip.replace(/\%reqattr/g, 'required="" aria-required="true"').replace(/\%reqcls/g, "validate");
        } else {
            snip = snip.replace(/\%reqattr/g, '').replace(/\%reqcls/g, "");
        }
        _E.core.state.store["render"]["question"]["form"] = snip;
    } else if (cmd == "open"
        || cmd == "pick one department"
        || cmd == "pick one classification"
        || cmd == "pick one location"
        || cmd == "pick one offering"
        || cmd == "pick one language") { // REFACTOR: added pick one dept
        //required="" aria-required="true" class="validate"
        // handle html
        snip = _E.core.state.store["render"]["question"]["form"];
        snip = snip.replace(/\%form/g,
            _E.core.templates.get(cmd)//("open")
                .replace(/\%qid/g, _E.core.state.store["render"]["question"]["qid"])
        );
        if (_E.core.state.store["render"]["question"]["required"] == true) {
            snip = snip.replace(/\%reqattr/g, 'required="" aria-required="true"').replace(/\%reqcls/g, "validate");
        } else {
            snip = snip.replace(/\%reqattr/g, '').replace(/\%reqcls/g, "");
        }
        _E.core.state.store["render"]["question"]["form"] = snip;
        // handle json
        _E.core.state.store["render"]["json"] = _E.core.state.store["render"]["json"].replace("%options", "").replace(/\%type/g, "text");
    } else if (cmd == "generics") {
        // handle html
        snip = _E.core.state.store["render"]["question"]["form"];
        snip = snip.replace(/\%form/g, _E.core.templates.get("generics").replace(/\%qid/g, _E.core.state.store["render"]["question"]["qid"]));
        if (_E.core.state.store["render"]["question"]["required"] == true) {
            snip = snip.replace(/\%reqattr/g, 'required="" aria-required="true"').replace(/\%reqcls/g, "validate");
        } else {
            snip = snip.replace(/\%reqattr/g, '').replace(/\%reqcls/g, "");
        }
        _E.core.state.store["render"]["question"]["form"] = snip;
        // todo: handle json
        _E.core.state.store["render"]["json"] = _E.core.state.store["render"]["json"].replace("%options", '"dept","role","region","office"').replace(/\%type/g, "text");
    } else if (cmd == "pick one"
        || cmd == "pick one dropdown"
        || cmd == "pick any"
        || cmd == "rank") {
        snip = _E.core.state.store["render"]["question"]["form"];
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
        var opt_input_value = "";

        if (cmd == "pick one dropdown") {
            _E.core.state.store["localmem"]["rgroup_qid_" + _E.core.state.store["render"]["question"]["qid"]] = {};
            _E.core.state.store["localmem"]["rgroup_qid_" + _E.core.state.store["render"]["question"]["qid"]]["en"] = '<option value="" disabled selected></option>';
            _E.core.state.store["localmem"]["rgroup_qid_" + _E.core.state.store["render"]["question"]["qid"]]["fr"] = '<option value="" disabled selected></option>';
        }
        for (var opti = 0; opti < opts.length; opti++) {

            opt_input_value = opts[opti].trim()

            //
            // WARN: Brittle code. Tied to HTML structure.
            // See pack_text, activate_lang
            // suggest holding off on activate_lang until form is fully built
            // also, address the JSON render (it will have evalese in the mix)
            // 

            var oa = [];
            oa = opt_input_value.split("</span>");
            for (var m = 0; m < oa.length; m++) {
                if (oa[m].indexOf("<span class='" + _E.core.state.store["ui"]["lang"] + "'>") !== -1) {
                    opt_input_value = oa[m].replace("<span class='" + _E.core.state.store["ui"]["lang"] + "'>", "");
                }
            }

            // end WARN

            temp_snip = _E.core.templates.get(cmd)
                .replace(/\%qid/g, _E.core.state.store["render"]["question"]["qid"])
                .replace(/\%pick/g, opts[opti].trim())
                .replace(/\%oid/g, opti)
                .replace(/\%vpick/g, opt_input_value.trim())
                ;
            form += temp_snip;

            random_shuffle.push(temp_snip);

            jsonsnip += "," + _E.core.templates.get(cmd, "json")
                .replace(/\%pick/g, opts_json[opti].trim());
        }

        if (cmd == "pick one dropdown") {
            _E.core.state.store["localmem"]["rgroup_qid_" + _E.core.state.store["render"]["question"]["qid"]]["en"] += form.replace(/<\/?span class='fr'.[^>]*>/g, '').replace(/\<span class='en'\>/g, '').replace(/\<\/span\>/g, '').trim();
            _E.core.state.store["localmem"]["rgroup_qid_" + _E.core.state.store["render"]["question"]["qid"]]["fr"] += form.replace(/<\/?span class='en'.[^>]*>/g, '').replace(/\<span class='fr'\>/g, '').replace(/\<\/span\>/g, '').trim();

            form = _E.core.state.store["localmem"]["rgroup_qid_" + _E.core.state.store["render"]["question"]["qid"]][_E.core.state.store["ui"]["lang"]];
            //console.log(_E.core.state.store["localmem"]);
        }

        if (_E.core.state.store["render"]["question"]["random"]["options"] == true) {
            _E.fxn.common.shuffle_array(random_shuffle);
            form = random_shuffle.join(" ");
        }
        if (typeof snip !== "undefined" && snip != false) {
            if (cmd == "pick one" || cmd == "pick any") {
                snip = snip.replace(/\%form/g, '<fieldset><legend><span class="en">Pick</span><span class="fr">Choisir</span></legend>' + form + '</fieldset>');
            } else if (cmd == "pick one dropdown") {

                // store the en and fr options
                // <option value=""><span class="en">rrr</span><span class="fr">ddd</span></option>

                snip = snip.replace(/\%form/g,
                    '<div class="row">' +
                    '<div class="col s12" >' +
                    '<label class="lg-lbl" for="rgroup_qid_%qid" id="lbl_rgroup_qid_%qid"><span class="en">Select one</span><span class="fr">Veuillez choisir</span></label>' +
                    '<select class="%reqcls browser-default" %reqattr id="rgroup_qid_%qid" name="rgroup_qid_%qid" aria-labelledby="lbl_rgroup_qid_%qid">' +
                    '<option value="" disabled selected></option>' + form +
                    '</select></div></div>');
                snip = snip.replace(/\%qid/g, _E.core.state.store["render"]["question"]["qid"]);
            } else {
                snip = snip.replace(/\%form/g, form);
            }
        }

        if (_E.core.state.store["render"]["question"]["required"] == true) {
            snip = snip.replace(/\%reqattr/g, 'required="" aria-required="true"').replace(/\%reqcls/g, "validate");
        } else {
            snip = snip.replace(/\%reqattr/g, '').replace(/\%reqcls/g, "");
        }
        _E.core.state.store["render"]["question"]["form"] = snip;
        // handle json
        _E.core.state.store["render"]["json"] = _E.core.state.store["render"]["json"].replace(/\%type/g, "mcq");
        _E.core.state.store["render"]["json"] = _E.core.state.store["render"]["json"].replace("%options", jsonsnip
            .replace(/(^[,\s]+)|([,\s]+$)/g, ''));
    }
    // TODO: Lang override, replace with actual language control
    _E.core.state.store["render"]["json"] = _E.core.state.store["render"]["json"].replace(/\%lang/g, _E.core.state.store["ui"]["lang"]);

    return snip;
}

//
// Main proc loop
//

// REFACTOR_PREP: parser
// start parsing the input
_E.core.interpreter.raise_src_to_evalhalla = function (src) {
    var src_a = src.split("\n");
    var i = 0;
    var evalhalla = [];
    var cmd = "";

    // build q_index
    _E.core.interpreter.parse_question_text(src);
    //console.log(_E.core.interpreter.g_qindex);

    for (i = 0; i < src_a.length; i++) {
        cmd = _E.core.interpreter.detect_command(src_a[i]);
        if (cmd != "null") {
            if (
                cmd["type"] == "survey"
                || cmd["type"] == "intro"
                || cmd["type"] == "title"
            ) {
                var pack = src_a[i];
                //if (cmd["type"] == "intro") {
                var pkg = _E.core.interpreter.pack_text(src_a, i, pack);
                pack = pkg["pack"];
                i = pkg["i"];
                //}
                evalhalla = [_E.core.interpreter.handle_cmd_header(cmd["type"], pack, pkg["pack_json"])];
            } else if (cmd["type"] == "question" || cmd["type"] == "req question"
                || cmd["type"] == "scale"
                || cmd["type"] == "scale1-5"
                || cmd["type"] == "open"
                || cmd["type"] == "generics"
                || cmd["type"] == "pick one"
                || cmd["type"] == "pick one dropdown"
                || cmd["type"] == "pick one department"
                || cmd["type"] == "pick one classification"
                || cmd["type"] == "pick one offering"
                || cmd["type"] == "pick one location"
                || cmd["type"] == "pick one language"
                || cmd["type"] == "pick any"
                || cmd["type"] == "rank"
            ) {
                var pack = src_a[i];
                var pkg = (
                    cmd["type"] == "pick one"
                    || cmd["type"] == "pick any"
                    || cmd["type"] == "pick one dropdown"
                    || cmd["type"] == "rank"
                ) ? _E.core.interpreter.pack_text(src_a, i, pack, "[OPT] ") : _E.core.interpreter.pack_text(src_a, i, pack);
                pack = pkg["pack"];
                i = pkg["i"];

                if (cmd["type"] == "scale"
                    || cmd["type"] == "scale1-5"
                    || cmd["type"] == "open"
                    || cmd["type"] == "generics"
                    || cmd["type"] == "pick one"
                    || cmd["type"] == "pick one dropdown"
                    || cmd["type"] == "pick one department"
                    || cmd["type"] == "pick one classification"
                    || cmd["type"] == "pick one offering"
                    || cmd["type"] == "pick one location"
                    || cmd["type"] == "pick one language"
                    || cmd["type"] == "pick any"
                    || cmd["type"] == "rank") {
                    evalhalla.pop();
                    _E.core.state.store["qlib"].pop();
                }
                evalhalla.push(_E.core.interpreter.handle_cmd_question(cmd["type"], pack, pkg["pack_json"]));
                _E.core.state.store["qlib"].push(pack);
            } else if (cmd["type"] == "instruction") {
                var pack = src_a[i];
                var pkg = _E.core.interpreter.pack_text(src_a, i, pack);
                pack = pkg["pack"];
                i = pkg["i"];
                evalhalla.push(_E.core.interpreter.handle_cmd_instruction(cmd["type"], pack, pkg["pack_json"]));
            } else if (cmd["type"] == "page break") {
                var pack = src_a[i];
                var pkg = _E.core.interpreter.pack_text(src_a, i, pack);
                pack = pkg["pack"];
                i = pkg["i"];
                evalhalla.push(_E.core.interpreter.handle_cmd_pagebreak(cmd["type"], pack, pkg["pack_json"]));
            } else if (cmd["type"] == "random order" || cmd["type"] == "end random order") {
                // handle randomize order
                if (cmd["type"] == "random order") {
                    _E.core.state.store["render"]["question"]["random"]["order"] = true;
                } else if (cmd["type"] == "end random order") {
                    _E.core.state.store["render"]["question"]["random"]["order"] = false;
                }
            } else if (cmd["type"] == "random options" || cmd["type"] == "end random options") {
                // handle random options
                if (cmd["type"] == "random options") {
                    _E.core.state.store["render"]["question"]["random"]["options"] = true;
                } else if (cmd["type"] == "end random options") {
                    _E.core.state.store["render"]["question"]["random"]["options"] = false;
                }
            } else if (cmd["type"] == "end") {
                // handle generic end, custom for random
            } else if (cmd["type"] == "end pick" || cmd["type"] == "end rank") {
                // skip end tag for now
            } else if (cmd["type"] == "no offering page" || cmd["type"] == "no tombstone page") {
                _E.core.interpreter.handle_cmd_nopresurveypage(cmd["type"], pack, pkg["pack_json"]);
            } else {
                // generic handler, use basic tag wrapping from _E.core.interpreter.evalese
                evalhalla.push(cmd["html"].replace(/\%v/g, src_a[i]));
            }
        }
    }
    // random order handling
    var return_evalhalla = "";
    try {
        var new_evalhalla = [];
        var new_evalhalla_rand = [];
        var q_index = JSON.parse(_E.core.state.store["render"]["json"]
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
                        _E.fxn.common.shuffle_array(new_evalhalla_rand);
                        new_evalhalla.push(new_evalhalla_rand.join(""));
                        new_evalhalla_rand = [];
                    }
                    new_evalhalla.push(evalhalla[k + 1]);
                } else {
                    new_evalhalla_rand.push(evalhalla[k + 1]);
                }
            }
        }
        _E.fxn.common.shuffle_array(new_evalhalla_rand);
        new_evalhalla.push(new_evalhalla_rand.join());
        new_evalhalla_rand = [];
        return_evalhalla = new_evalhalla.join("");
    } catch (e) {
        return_evalhalla = evalhalla.join("");
        //M.toast({ html: 'JSON ' + e.toString(), classes: 'rounded' });
    }


    // save current survey signature
    _E.feature.localstore.ls_update_working_survey(_E.core.state.store["render"]["json"]
        .replace(/\,\%questions/g, "")
        .replace(/\%options/g, "")
        .replace(/\%questions/g, ""));

    return return_evalhalla
        .replace(/\,\%questions/g, "")
        .replace(/\%options/g, "")
        .replace(/\%questions/g, "")
};

_E.core.interpreter.render = function () {
    // render timer
    if (_E.core.state.store["render"]["render_buffering"] == true) {
        _E.core.state.store["render"]["render_requested"] = true;
        return false;
    } else {
        _E.core.state.store["render"]["render_buffering"] = true;
        _E.core.state.store["render"]["render_manager"] = setTimeout(function () {
            _E.core.state.store["render"]["render_buffering"] = false;
            if (_E.core.state.store["render"]["render_requested"] == true) {
                _E.core.state.store["render"]["render_requested"] = false;
                _E.core.state.store["el"]["c_editor"].trigger("keyup");
            }
        }, _E.core.state.store["render"]["render_delay"]);
    }
    // end render timer
    // get source
    var src = _E.fxn.common.safe(_E.core.state.store["el"]["c_editor"].val().replace(/\t/g, ""));
    // prep
    _E.core.state.render_state_reset();
    // E V A L H A L L A
    var survey_html = _E.core.interpreter.raise_src_to_evalhalla(src);

    // load render
    _E.core.state.store["el"]["c_render"].html(_E.core.templates.form_wrap(survey_html));


    // enable the buttons
    //_E.feature.player.activate_html();

    // load json
    try {
        _E.core.state.store["el"]["c_json"].val(JSON.stringify(JSON.parse(
            _E.core.state.store["render"]["json"]
                .replace(/\,\%questions/g, "")
                .replace(/\%options/g, "")
                .replace(/\%questions/g, "")
        ), null, 4));
    } catch (e) {
        M.toast({ html: 'Hint: Use single quotes, JSON ' + e.toString(), classes: 'rounded' });
    }
    // todo: accessibility check on materialize dropdown (there's shadow elements causing label issues)
    //$('select').formSelect();

    // activate the language to stop dual showing
    _E.feature.lang.refresh_lang();
};

_E.core.interpreter.parse = function () {
    // REFACTOR_PREP: player, parser, detangle the render
    // load intro content
    _E.core.state.store["el"]["c_editor"].val(
        g_intro_script
    );

    // REFACTOR_PREP: detangle render
    // render
    _E.core.state.store["el"]["c_editor"].trigger("change");
    // resize
    M.textareaAutoResize(_E.core.state.store["el"]["c_editor"]);//ui_resize_textareas();
};

_E.core.interpreter.enable_feature = function () {

    _E.core.state.store["el"]["c_editor"].on("change keyup", _E.core.interpreter.render);

};

_E.core.interpreter.startup = function () {
    _E.core.interpreter.enable_feature();
    _E.core.interpreter.parse();
};
