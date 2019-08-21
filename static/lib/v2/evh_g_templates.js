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
_E.core.templates = {};

_E.core.templates.library = {
    "html": {
        "step_lang": `<div id="step_lang" class="row bannerbgbacked center ev-page ev-page-lang">
                <div class="col hide-on-small-only m3"></div>
                <div class="col s12 m6 center">
                    <div>
                        <img src="../../../static/images/csps_flag.png" class="csps-flag-center"
                            alt="CSPS-EFPC Flag, Maple leaf in book" />
                    </div>
                    <div class="card-panel">
                        <div class="row center">
                            <h1>
                                <span class="en">Survey</span>
                                <span class="fr">Enquête</span>
                            </h1>
                            <p>
                                Language of preference - Langue de préférence
                            </p>
                        </div>

                        <div class="row center">
                            <div class="col s12 m6 center">
                                <div class="row center">
                                    <button class="lang-set-en purp-canada-ca btn-large">English</button>
                                </div>
                            </div>
                            <div class="col s12 m6 center">
                                <div class="row center">
                                    <button class="lang-set-fr purp-canada-ca btn-large">Français</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col hide-on-small-only m3"></div>
            </div>
            `,
        "step_offering": `<div id="step_offering" class="row bannerbgbacked center ev-page ev-page-offering">
                <div class="col hide-on-small-only m2"></div>
                <div class="col s12 m8 center">
                    <div>
                        <img src="../../../static/images/csps_flag.png" class="csps-flag-center"
                            alt="CSPS-EFPC Flag, Maple leaf in book" />
                    </div>
                    <div class="card-panel">
                        <div class="row center">
                            <h2>
                                <span class="en">Survey</span>
                                <span class="fr">Enquête</span>
                            </h2>
                            <p>
                                <span class="en">Please choose your event/course</span>
                                <span class="fr">Veuillez choisir votre événement/cours</span>
                            </p>
                        </div>

                        <div class="row center offering_target">
                            OFFERINGS
                        </div>

                    </div>
                </div>
                <div class="col hide-on-small-only m2"></div>
            </div>`,
        "step_tombstone": `<div id="step_tombstone" class="row bannerbgbacked center ev-page ev-page-tombstone">
                <div class="col hide-on-small-only m1"></div>
                <div class="col s12 m10 center">
                    <div>
                        <img src="../../../static/images/csps_flag.png" class="csps-flag-center"
                            alt="CSPS-EFPC Flag, Maple leaf in book" />
                    </div>
                    <div class="card-panel">
                        <div class="row center">
                            <h2>
                                <span class="en">Survey</span>
                                <span class="fr">Enquête</span>
                            </h2>
                            <p>
                                <span class="en">A bit about you</span>
                                <span class="fr">Un peu de vous</span>
                                <span class="badge accessiblegrey white-text"><span class="en">optional</span><span
                                        class="fr">optionnel</span></span>
                            </p>
                        </div>
                        <div class="row center tombstone_target">
                            <div class="row">
                                <div class="col s12">
                                    <div class="input-field col s12">
                                        <input type="text" id="autocomplete-input-department"
                                            class="autocomplete tombstone_department">
                                        <label for="autocomplete-input-department">
                                            <span class="en">Department</span>
                                            <span class="fr">Ministère</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col s12">
                                    <div class="input-field col s12">
                                        <input type="text" id="autocomplete-input-classification"
                                            class="autocomplete tombstone_classification">
                                        <label for="autocomplete-input-classification">
                                            <span class="en">Classification</span>
                                            <span class="fr">Niveau du poste</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col s12">
                                    <div class="input-field col s12">
                                        <input type="text" id="autocomplete-input-city"
                                            class="autocomplete tombstone_city">
                                        <label for="autocomplete-input-city">
                                            <span class="en">City</span>
                                            <span class="fr">Ville</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col s12">
                                    <div class="row center">
                                        <a href="#editor"
                                            class="btn btn-large purp-canada-ca tombstone-prev left padleft">
                                            <em class="material-icons fab-align">chevron_left</em>
                                        </a>
                                        <button class="tombstone-next purp-canada-ca btn-large right padright">
                                            <span class="en">Start</span>
                                            <span class="fr">Début</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col hide-on-small-only m1"></div>
            </div>`,
        "step_thank_you_cta": `<div id="step_thank_you_cta" class="row bannerbgbacked center ev-page ev-page-thanks">
                <div class="col hide-on-small-only m2"></div>
                <div class="col s12 m8 center">
                    <div>
                        <img src="../../../static/images/csps_flag.png" class="csps-flag-center"
                            alt="CSPS-EFPC Flag, Maple leaf in book" />
                    </div>
                    <div class="card-panel">
                        <div class="row center">
                            <em class="material-icons ok-check" style="font-size:5em;"
                                aria-hidden="true">check_circle</em>
                            <h2>
                                <span class="en">You're Awesome!</span>
                                <span class="fr">Vous êtes génial!</span>
                            </h2>
                            <p>
                                <span class="en">Thank you for taking the time</span>
                                <span class="fr">Merci d'avoir pris le temps de répondre</span>
                            </p>
                            <div class="row center">
                                <button class="ev-ready-for-next purp-canada-ca btn-large"><span
                                        class="en">Goodbye</span>
                                    <span class="fr">Au revoir</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col hide-on-small-only m2"></div>
            </div>`,
        "form wrap": '' +
            '<div class="surveybody">' +
            '<div class="row">' +
            '<div class="col s12 center">' +
            '<strong class="center-align determinate-text">%pctdisplay%</strong>' +
            '</div>' +
            '<div class="progress">' +
            '<div class="determinate" style="width: %pct%"></div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col s12 center bannered">' +
            '<img src="../../../static/images/csps_flag.png" class="responsive-img csps-flag" alt="CSPS-EFPC Flag, Maple leaf in book" />' +
            '</div>' +
            '</div>' +
            '<form id="evalhalla_form" action="#">' +
            '<div class="ev-page ev-page-1 card-panel">' +
            '%src' +
            '</div>' +
            '<div class="row">' +
            '<div class="col s12 center">' +
            '<a href="#editor" class="btn btn-large purp-canada-ca ev-page-sel-left left"><em class="material-icons fab-align dark-grey-text">chevron_left</em></a>' +
            '<a href="#editor" id="evalhalla_submit" class="waves-effect waves-light green-canada-ca btn-large ">' +
            '<span class="en">SUBMIT</span><span class="fr">SOUMETTRE</span></a>' +
            '<a href="#editor" class="btn btn-large purp-canada-ca ev-page-sel-right right"><em class="material-icons fab-align dark-grey-text">chevron_right</em></a>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<ul class="pagination center-align" style="marigin:0;">' +
            '%pages' +
            '</ul>' +
            '</div>' +
            '</form>' +
            '</div>' +
            '',
        /**
         * <li class="waves-effect ev-page-sel-left"><a><em class="material-icons">chevron_left</em></a></li>
                        <li class="waves-effect ev-page-sel-right"><a><em class="material-icons">chevron_right</em></a></li>
                        
                        <div class="row">
                    <div class="col s12 center">
                        <a id="evalhalla_submit" class="waves-effect waves-light purp-canada-ca btn-large">
                        <span class="en">SUBMIT</span><span class="fr">SOUMETTRE</span></a>
                    </div>
                </div> */
        "header": '' +
            '<div class="row">' +
            '<div class="col s12 center">' +
            '<h2>%title<br/>(%survey)</h2>' +
            '<p class="flow-text left-align light">%intro</p>' +
            '</div>' +
            '</div>' +
            '',
        "question": '' +
            '<div class="card-panel purp-canada-ca-edged">' +
            '<blockquote><span class="badge" style="font-size:1.5em;margin:0px;">' +
            '%req</span> %question</blockquote><div class="padbox">%form</div>' +
            '</div>' +
            '',
        "scale": '' +
            '<div class="row">' +
            '<div class="col s12" >' +
            '<label class="lg-lbl" for="scale_qid_%qid" id="lbl_scale_qid_%qid"><span class="en evh-parser-ignore">Select one</span><span class="fr evh-parser-ignore">Veuillez choisir</span></label>' +
            '<select class="%reqcls browser-default" %reqattr id="scale_qid_%qid" name="scale_qid_%qid" aria-labelledby="lbl_scale_qid_%qid">' +
            '%scale_multilang_split' +
            '<option value="" disabled selected></option>' +
            '<option value="1">1 %low</option>' +
            '<option value="2">2</option>' +
            '<option value="3">3</option>' +
            '<option value="4">4</option>' +
            '<option value="5">5</option>' +
            '<option value="6">6</option>' +
            '<option value="7">7</option>' +
            '<option value="8">8</option>' +
            '<option value="9">9</option>' +
            '<option value="10">10 %high</option>' +
            '<option value="77">%unsure</option>' +
            '%scale_multilang_split' +
            '</select>' +
            '</div>' +
            '</div>' +
            '',
        "scale1-5": '' +
            '<div class="row">' +
            '<div class="col s12" >' +
            '<label class="lg-lbl" for="scale_qid_%qid" id="lbl_scale_qid_%qid"><span class="en">Select one</span><span class="fr">Veuillez choisir</span></label>' +
            '<select class="%reqcls browser-default" %reqattr id="scale_qid_%qid" name="scale_qid_%qid" aria-labelledby="lbl_scale_qid_%qid">' +
            '%scale_multilang_split' +
            '<option value="" disabled selected></option>' +
            '<option value="1">1 %low</option>' +
            '<option value="2">2</option>' +
            '<option value="3">3</option>' +
            '<option value="4">4</option>' +
            '<option value="5">5 %high</option>' +
            '<option value="77">%unsure</option>' +
            '%scale_multilang_split' +
            '</select>' +
            '</div>' +
            '</div>' +
            '',
        "open": '' +
            '<div class="row">' +
            '<div class="row">' +
            '<div class="input-field col s12">' +
            '<label for="textarea_qid_%qid"><span class="en">Enter your answer</span><span class="fr">Inscrivez votre réponse</span></label>' +
            '<textarea type="text" %reqattr id="textarea_qid_%qid" name="textarea_qid_%qid" class="%reqcls materialize-textarea"></textarea>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '',
        // REFACTOR: interpreter v0.2 updates
        "pick one classification": '' +
            '<div class="row">' + // id="autocomplete-input-department" // REFACTOR: add new subtype (note the rgroup)
            '<div class="col s12 input-field">' +
            '<input type="text" id="rgroup_qid_%qid" name="rgroup_qid_%qid" class="autocomplete tombstone_classification %reqcls" %reqattr >' +
            '<label for="rgroup_qid_%qid">' +
            '<span class="en">Classification</span>' +
            '<span class="fr">Niveau du poste</span>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '',
        "pick one location": '' +
            '<div class="row">' + // id="autocomplete-input-department" // REFACTOR: add new subtype (note the rgroup)
            '<div class="col s12 input-field">' +
            '<input type="text" id="rgroup_qid_%qid" name="rgroup_qid_%qid" class="autocomplete tombstone_city %reqcls" %reqattr >' +
            '<label for="rgroup_qid_%qid">' +
            '<span class="en">City</span>' +
            '<span class="fr">Ville</span>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '',
        "pick one language": '' +
            '<div class="row">' + // id="autocomplete-input-department" // REFACTOR: add new subtype (note the rgroup)
            '<div class="col s12 input-field">' +
            '<input type="text" id="rgroup_qid_%qid" name="rgroup_qid_%qid" class="autocomplete autoc_language %reqcls" %reqattr >' +
            '<label for="rgroup_qid_%qid">' +
            '<span class="en">Language</span>' +
            '<span class="fr">Langue</span>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '',
        "pick one department": '' +
            '<div class="row">' + // id="autocomplete-input-department" // REFACTOR: add new subtype (note the rgroup)
            '<div class="col s12 input-field">' +
            '<input type="text" id="rgroup_qid_%qid" name="rgroup_qid_%qid" class="autocomplete tombstone_department %reqcls" %reqattr >' +
            '<label for="rgroup_qid_%qid">' +
            '<span class="en">Department</span>' +
            '<span class="fr">Ministère</span>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '',
        "pick one offering": '' +
            '<div class="row">' + // id="autocomplete-input-department" // REFACTOR: add new subtype (note the rgroup)
            '<div class="col s12 input-field">' +
            '<input type="text" id="rgroup_qid_%qid" name="rgroup_qid_%qid" class="autocomplete autoc_offering %reqcls" %reqattr >' +
            '<label for="rgroup_qid_%qid">' +
            '<span class="en">Offering</span>' +
            '<span class="fr">Offre</span>' +
            '</label>' +
            '</div>' +
            '</div>' +
            '',
        "pick one dropdown": '' +
            '<option value="%vpick">%pick</option>' +
            '',
        // end interpreter v0.2 updates
        "pick one": '' +
            '<div class="row">' +
            '<label>' +
            '<input class="with-gap %reqcls" %reqattr name="rgroup_qid_%qid" type="radio" value="%vpick" />' +
            '<span>%pick</span>' +
            '</label>' +
            '</div>' +
            '',
        "pick any": '' +
            '<div class="row">' +
            '<label>' +
            '<input class="with-gap" name="cgroup_qid_%qid[]" type="checkbox" value="%vpick" />' +
            '<span>%pick</span>' +
            '</label>' +
            '</div>' +
            '',
        "rank": '' +
            '<div class="row">' +
            '<div class="col s12">' +
            '<div class="input-field s12">' +
            '<input class="%reqcls" %reqattr id="inline_qid_%qid_oid_%oid" name="inline_qid_%qid_oid_%oid" type="text">' +
            '<label for="inline_qid_%qid_oid_%oid">%pick</label>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '',
        "instruction": '' +
            '<div class="card-panel blue-canada-ca darken-2">' +
            '<span class="white-text">%instruction</span>' +
            '</div>' +
            '',
        "ls": '' +
            '<table class="highlight responsive-table">' +
            '<thead>' +
            '<tr>' +
            '<th><span class="en">Survey</span><span class="fr">Enquête</span></th>' +
            '<th><span class="en">Details</span><span class="fr">Details</span></th>' +
            '<th><span class="en">Lang</span><span class="fr">Lang</span></th>' +
            '<th><span class="en">Items</span><span class="fr">Articles</span></th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '%tbody' +
            '</tbody>' +
            '</table>' +
            '',
        "ls_header": '' +
            '<nav>' +
            '<div class="nav-wrapper blue-canada-ca darken-1">' +
            '<div class="col s12">' +
            '<span class="en">%en</span>' +
            '<span class="fr">%fr</span>' +
            '</div>' +
            '</div>' +
            '</nav>' +
            '',
        "generics": '' +
            '<div class="row">' +
            '<div class="col s6">' +
            '<div class="input-field s6">' +
            '<input id="inline_qid_%qid_dept_0" class="ev_inline_dept %reqcls" %reqattr name="inline_qid_%qid_dept_0" type="text">' +
            '<label for="inline_qid_%qid_dept_0"><span class="en">Department</span><span class="fr">Ministère</span></label>' +
            '</div>' +
            '</div>' +
            '<div class="col s6">' +
            '<div class="input-field s6">' +
            '<input id="inline_qid_%qid_role_1" class="ev_inline_role %reqcls" %reqattr  name="inline_qid_%qid_role_1" type="text">' +
            '<label for="inline_qid_%qid_role_1"><span class="en">Role</span><span class="fr">Role</span></label>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col s6">' +
            '<div class="input-field s6">' +
            '<input id="inline_qid_%qid_region_2" class="ev_inline_region %reqcls" %reqattr  name="inline_qid_%qid_region_2" type="text">' +
            '<label for="inline_qid_%qid_region_2"><span class="en">Region</span><span class="fr">Region</span></label>' +
            '</div>' +
            '</div>' +
            '<div class="col s6">' +
            '<div class="input-field s6">' +
            '<input id="inline_qid_%qid_office_3" class="ev_inline_office %reqcls" %reqattr  name="inline_qid_%qid_office_3" type="text">' +
            '<label for="inline_qid_%qid_office_3"><span class="en">Office</span><span class="fr">Office</span></label>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '',
        "qlib entry": '' +
            '<tr>' +
            '<td>' +
            '<div id="bqlib_%bqid">%question' +
            '</div>' +
            '</td>' +
            '<td>%ctrl</td>' +
            '</tr>' +
            '',
        "page break": '</div><div class="ev-page ev-page-%pageid card-panel">',
    },
    "json": {
        "header": '{' +
            '"survey": "%survey",' +
            '"title": "%title",' +
            '"description": "%intro",' +
            '"language": "%lang",' +
            '"questions": [%questions]' +
            '}',
        "question": '{' +
            '"qid": "%qid",' +
            '"question": "%question",' +
            '"description": "%question",' +
            '"language": "%lang",' +
            '"questionType": "%type",' +
            '"cortexAtOrder": "%cortexatorder",' +
            '"cortexQuestionType": "%cortextype",' +
            '"cortexClassifiedAs": "%cortexclassified",' +
            '"required": "%req",' +
            '"randomOrder": "%rand_order",' +
            '"randomOptions": "%rand_options",' +
            '"options": [%options]' +
            '}',
        "scale": '' +
            '"1 %low",' +
            '"2",' +
            '"3",' +
            '"4",' +
            '"5",' +
            '"6",' +
            '"7",' +
            '"8",' +
            '"9",' +
            '"10 %high",' +
            '"%unsure"' +
            '',
        "scale1-5": '' +
            '"1 %low",' +
            '"2",' +
            '"3",' +
            '"4",' +
            '"5 %high",' +
            '"%unsure"' +
            '',
        "open": '',
        // REFACTOR: interpreter v0.2 updates
        "pick one department": '"%pick"',
        "pick one classification": '"%pick"',
        "pick one location": '"%pick"',
        "pick one offering": '"%pick"',
        "pick one pop language": '"%pick"',
        "pick one dropdown": '"%pick"',
        // end interpreter v0.2 updates
        "pick one": '"%pick"',
        "pick any": '"%pick"',
        "rank": '"%pick"',
        "instruction": '{' +
            '"qid": "none",' +
            '"question": "%instruction",' +
            '"description": "%instruction",' +
            '"language": "%lang",' +
            '"questionType": "instruction",' +
            '"cortexAtOrder": "%cortexatorder",' +
            '"cortexQuestionType": "IGNORE",' +
            '"cortexClassifiedAs": "IGNORE",' +
            '"randomOrder": "%rand_order",' +
            '"randomOptions": "%rand_options",' +
            '"options": []' +
            '}',
        "ls": '',
        "ls_header": '',
        "generics": '"%field"',
        "qlib entry": '',
        "page break": '{' +
            '"qid": "none",' +
            '"question": "none",' +
            '"description": "none",' +
            '"language": "none",' +
            '"questionType": "page break",' +
            '"cortexAtOrder": "%cortexatorder",' +
            '"cortexQuestionType": "IGNORE",' +
            '"cortexClassifiedAs": "IGNORE",' +
            '"randomOrder": "false",' +
            '"randomOptions": "false",' +
            '"options": []' +
            '}',
    }
};

// REFACTOR_PREP: parser
// return a json or html snip with %replaceme codons/tokens sprinkled in
// the general idea here is to use these like a templating lang. Just waaaay simpler
// For huge surveys we might get into hot water performance wise
// theres about 160 .replace regexes - but for our problem domain we're aiming
// for small short and light surveys.
_E.core.templates.get = function (snip, format) {
    format = format || 'html';
    if (snip == "header") {
        if (format == "json") {
            return _E.core.templates.library["json"]["header"];
        }
        return _E.core.templates.library["html"]["header"];
    } else if (snip == "question" || snip == "req question") {
        if (format == "json") {
            return _E.core.templates.library["json"]["question"];
        }
        return _E.core.templates.library["html"]["question"];
    } else if (snip == "scale") {
        if (format == "json") {
            return _E.core.templates.library["json"]["scale"];
        }
        return _E.core.templates.library["html"]["scale"];
    } else if (snip == "scale1-5") {
        if (format == "json") {
            return _E.core.templates.library["json"]["scale1-5"];
        }
        return _E.core.templates.library["html"]["scale1-5"];
    } else if (snip == "open") {
        if (format == "json") {
            return _E.core.templates.library["json"]["open"];
        }
        return _E.core.templates.library["html"]["open"];
    } else if (snip == "pick one department"
        || snip == "pick one classification"
        || snip == "pick one language"
        || snip == "pick one offering"
        || snip == "pick one location") {
        if (format == "json") {
            return _E.core.templates.library["json"][snip];//'"%pick"';
        }
        return _E.core.templates.library["html"][snip];
    } else if (snip == "pick one dropdown") {
        if (format == "json") {
            return _E.core.templates.library["json"][snip];//'"%pick"';
        }
        return _E.core.templates.library["html"][snip];
    } else if (snip == "pick one") {
        if (format == "json") {
            return _E.core.templates.library["json"]["pick one"];//'"%pick"';
        }
        return _E.core.templates.library["html"]["pick one"];
    } else if (snip == "pick any") {
        if (format == "json") {
            return _E.core.templates.library["json"]["pick any"];//'"%pick"';
        }
        return _E.core.templates.library["html"]["pick any"];
    } else if (snip == "rank") {
        if (format == "json") {
            return _E.core.templates.library["json"]["rank"];//'"%pick"';
        }
        return _E.core.templates.library["html"]["rank"];
    } else if (snip == "instruction") {
        if (format == "json") {
            return _E.core.templates.library["json"]["instruction"];
        }
        return _E.core.templates.library["html"]["instruction"];
    } else if (snip == "ls") {
        return _E.core.templates.library["html"]["ls"];
    } else if (snip == "ls_header") {
        return _E.core.templates.library["html"]["ls_header"];
    } else if (snip == "generics") {
        // todo only one generics
        // TODO JSON
        // Generics was the prototype of tombstone. Repurpose for other "generic fields"
        if (format == "json") {
            return _E.core.templates.library["json"]["generics"];//'"%field"';
        }
        return _E.core.templates.library["html"]["generics"];
    } else if (snip == "qlib entry") {
        return _E.core.templates.library["html"]["qlib entry"];
    } else if (snip == "page break") {
        if (format == "json") {
            return _E.core.templates.library["json"]["page break"];
        }
        return _E.core.templates.library["html"]["page break"];
    } else if (snip == "step lang") {
        return _E.core.templates.library["html"]["step_lang"];
    } else if (snip == "step offering") {
        return _E.core.templates.library["html"]["step_offering"];
    } else if (snip == "step tombstone") {
        return _E.core.templates.library["html"]["step_tombstone"];
    } else if (snip == "step thanks") {
        return _E.core.templates.library["html"]["step_thank_you_cta"];
    }

    return "";
};

// REFACTOR_PREP: parser
// wraps the generated elements in a form and a paginator
_E.core.templates.form_wrap = function (src) {
    var pages = "";
    for (var i = 1; i <= _E.core.state.store["render"]["pageid"]; i++) {
        pages += '<li class="waves-effect ev-page-sel ev-page-sel-' + i + '"><a>' + i + '</a></li>';
    }
    var fwtmpl = _E.core.templates.library["html"]["form wrap"];
    var currpct = 0;
    try {
        currpct = ((parseFloat(_E.core.state.store["render"]["currpageid"]) / parseFloat(_E.core.state.store["render"]["pageid"])) * 100).toFixed(0)
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

_E.core.templates.select_control_wrap = function (src) {
    var pages = "";
    for (var i = 1; i <= _E.core.state.store["render"]["pageid"]; i++) {
        pages += '<li class="waves-effect ev-page-sel ev-page-sel-' + i + '"><a>' + i + '</a></li>';
    }
    var fwtmpl = _E.core.templates.library["html"]["form wrap"];
    var currpct = 0;
    try {
        currpct = ((parseFloat(_E.core.state.store["render"]["currpageid"]) / parseFloat(_E.core.state.store["render"]["pageid"])) * 100).toFixed(0)
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