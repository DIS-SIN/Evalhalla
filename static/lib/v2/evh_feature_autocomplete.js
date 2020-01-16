/*

Evalhalla autocomplete feature

Given HWorld, a survey taker
When HWorld starts to type a response
Then suggestions based on the response will be offered as choices


_E["feature"]["autocomplete"]

*/

// init the package
_E.feature.autocomplete = {};



// REGISTHOR INTEGRATION autocomplete load classifications from registhor
_E.feature.autocomplete.autoc_load_languages = function () {
    _E.core.state.store["generics"]["languages"] = typeof autoc_languages !== "undefined" ? autoc_languages : [];
    var autoc_json = {}
    for (var i = 0; i < _E.core.state.store["generics"]["languages"].length; i++) {
        autoc_json[_E.core.state.store["generics"]["languages"][i]] = null;
    }
    _E.core.state.store["generics"]["languages"] = autoc_json;
    $('.autoc_language').autocomplete({
        data: _E.core.state.store["generics"]["languages"]
    });
}


// REGISTHOR INTEGRATION autocomplete load classifications from registhor
_E.feature.autocomplete.autoc_load_classifications = function (api_load) {
    api_load = api_load || false;
    // override: disconnecting Registhor for now. Running self contained as much as possible.
    api_load = false;
    if (api_load == true) {
        $.ajax({
            url: api_get_classifications_route + api_key,
            contentType: "application/json",
            type: "GET",
            //data: data_in,
            success: function (response) {
                _E.core.state.store["generics"]["classifications"] = typeof response.results !== "undefined" ? response.results : [];
                var autoc_json = {}
                for (var i = 0; i < _E.core.state.store["generics"]["classifications"].length; i++) {
                    autoc_json[_E.core.state.store["generics"]["classifications"][i]] = null;
                }
                _E.core.state.store["generics"]["classifications"] = autoc_json;
                $('.tombstone_classification').autocomplete({
                    data: _E.core.state.store["generics"]["classifications"]
                });
            }
        });
    } else {
        _E.core.state.store["generics"]["classifications"] = typeof autoc_classifications !== "undefined" ? autoc_classifications : [];
        var autoc_json = {}
        for (var i = 0; i < _E.core.state.store["generics"]["classifications"].length; i++) {
            autoc_json[_E.core.state.store["generics"]["classifications"][i]] = null;
        }
        _E.core.state.store["generics"]["classifications"] = autoc_json;
        $('.tombstone_classification').autocomplete({
            data: _E.core.state.store["generics"]["classifications"]
        });
    }
}

// REGISTHOR INTEGRATION autocomplete load departments from registhor
// local js options are the default to reduce api call load
_E.feature.autocomplete.autoc_load_departments = function (api_load) {
    api_load = api_load || false;
    // override: disconnecting Registhor for now. Running self contained as much as possible.
    api_load = false;
    if (api_load == true) {
        $.ajax({
            url: api_get_departments_route + api_key,
            contentType: "application/json",
            type: "GET",
            //data: data_in,
            success: function (response) {
                _E.core.state.store["generics"]["department_en"] = typeof response.results !== "undefined" ? response.results : [];
                var autoc_json = {}
                for (var i = 0; i < _E.core.state.store["generics"]["department_en"].length; i++) {
                    autoc_json[_E.core.state.store["generics"]["department_en"][i]] = null;
                }
                _E.core.state.store["generics"]["department_en"] = autoc_json;
                $('.tombstone_department').autocomplete({
                    data: _E.core.state.store["generics"]["department_en"]
                });
            }
        });
        $.ajax({
            url: api_get_departments_route_fr + api_key,
            contentType: "application/json",
            type: "GET",
            //data: data_in,
            success: function (response) {
                _E.core.state.store["generics"]["department_fr"] = typeof response.results !== "undefined" ? response.results : [];
                var autoc_json = {}
                for (var i = 0; i < _E.core.state.store["generics"]["department_fr"].length; i++) {
                    autoc_json[_E.core.state.store["generics"]["department_fr"][i]] = null;
                }
                _E.core.state.store["generics"]["department_fr"] = autoc_json;
                // TODO: Merge the two dept arrays
                $('.tombstone_department_fr').autocomplete({
                    data: _E.core.state.store["generics"]["department_fr"]
                });
            }
        });
    } else {
        _E.core.state.store["generics"]["department_en"] = typeof autoc_departments !== "undefined" ? autoc_departments : [];
        var autoc_json = {}
        for (var i = 0; i < _E.core.state.store["generics"]["department_en"].length; i++) {
            autoc_json[_E.core.state.store["generics"]["department_en"][i]] = null;
        }
        _E.core.state.store["generics"]["department_en"] = autoc_json;
        $('.tombstone_department').autocomplete({
            data: _E.core.state.store["generics"]["department_en"]
        });
    }
}

// REGISTHOR INTEGRATION autocomplete load cities from registhor
// local js options are the default to reduce api call load
_E.feature.autocomplete.autoc_load_cities = function (api_load) {
    api_load = api_load || false;
    // override: disconnecting Registhor for now. Running self contained as much as possible.
    api_load = false;
    if (api_load == true) {
        $.ajax({
            url: api_get_cities_route + api_key,
            contentType: "application/json",
            type: "GET",
            //data: data_in,
            success: function (response) {
                _E.core.state.store["generics"]["cities_en"] = typeof response.results !== "undefined" ? response.results : [];
                var autoc_json = {}
                for (var i = 0; i < _E.core.state.store["generics"]["cities_en"].length; i++) {
                    autoc_json[_E.core.state.store["generics"]["cities_en"][i]] = null;
                }
                _E.core.state.store["generics"]["cities_en"] = autoc_json;
                $('.tombstone_city').autocomplete({
                    data: _E.core.state.store["generics"]["cities_en"]
                });
            }
        });
        $.ajax({
            url: api_get_cities_route_fr + api_key,
            contentType: "application/json",
            type: "GET",
            //data: data_in,
            success: function (response) {
                _E.core.state.store["generics"]["cities_fr"] = typeof response.results !== "undefined" ? response.results : [];
                var autoc_json = {}
                for (var i = 0; i < _E.core.state.store["generics"]["cities_fr"].length; i++) {
                    autoc_json[_E.core.state.store["generics"]["cities_fr"][i]] = null;
                }
                _E.core.state.store["generics"]["cities_fr"] = autoc_json;
                $('.tombstone_city_fr').autocomplete({
                    data: _E.core.state.store["generics"]["cities_fr"]
                });
            }
        });
    } else {
        _E.core.state.store["generics"]["cities_en"] = typeof autoc_cities !== "undefined" ? autoc_cities : [];
        var autoc_json = {}
        for (var i = 0; i < _E.core.state.store["generics"]["cities_en"].length; i++) {
            autoc_json[_E.core.state.store["generics"]["cities_en"][i]] = null;
        }
        _E.core.state.store["generics"]["cities_en"] = autoc_json;
        $('.tombstone_city').autocomplete({
            data: _E.core.state.store["generics"]["cities_en"]
        });
    }
}


// TODO: init tombstone generics
// REFACTOR_PREP: dead code? pull out old demo generics
// TODO: refactor. tombstone generic info
// refactor
// pull default values into the generics for demonstration
_E.feature.autocomplete.api_get_generics = function () {
    if (_E.core.state.store["generics"]["generic_fetched"] == false) {
        //M.toast({ html: "Found this gc data, prefilling...", classes: 'rounded' });
        console.info("Found this gc data, prefilling...")
        _E.core.state.store["generics"]["ev_inline_dept"] = "CSPS-EFPC";
        _E.core.state.store["generics"]["ev_inline_role"] = "CS-04";
        _E.core.state.store["generics"]["ev_inline_region"] = "NCR";
        _E.core.state.store["generics"]["ev_inline_office"] = "Bayview";
        _E.core.state.store["generics"]["generic_fetched"] = true;
    }
};

_E.feature.autocomplete.refresh_generics = function () {
    //alert("Refreshing Generic");

    _E.feature.autocomplete.api_get_generics();

    $(".ev_inline_dept").val(_E.core.state.store["generics"]["ev_inline_dept"]);
    $(".ev_inline_role").val(_E.core.state.store["generics"]["ev_inline_role"]);
    $(".ev_inline_region").val(_E.core.state.store["generics"]["ev_inline_region"]);
    $(".ev_inline_office").val(_E.core.state.store["generics"]["ev_inline_office"]);

    $(".ev_inline_dept").on("change", function () { _E.core.state.store["generics"]["ev_inline_dept"] = _E.fxn.common.safe($(this).val()); });
    $(".ev_inline_role").on("change", function () { _E.core.state.store["generics"]["ev_inline_role"] = _E.fxn.common.safe($(this).val()); });
    $(".ev_inline_region").on("change", function () { _E.core.state.store["generics"]["ev_inline_region"] = _E.fxn.common.safe($(this).val()); });
    $(".ev_inline_office").on("change", function () { _E.core.state.store["generics"]["ev_inline_office"] = _E.fxn.common.safe($(this).val()); });

    M.updateTextFields();
};

// REFACTOR_PREP: api, populate offerings
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
_E.feature.autocomplete.populate_offerings_demodata = {
    "eldp": {
        "offering_id": "000008",
        "course_code": "ELDP",
        "course_title": "Executive Leadership Development Program / Programme de développement en leadership pour les cadres supérieurs",
        "offering_city": "NATIONAL CAPITAL REGION (NCR)",
        "offering_province": "NCR/RCN"
    },
    "dmb": {
        "offering_id": "000008",
        "course_code": "DMB",
        "course_title": "DM Breakfast / Petit déjeuner DM",
        "offering_city": "NATIONAL CAPITAL REGION (NCR)",
        "offering_province": "NCR/RCN"
    },
    "dmb2":
    {
        "offering_id": "000011",
        "course_code": "DMB",
        "course_title": "DM Breakfast / Petit déjeuner DM",
        "offering_city": "NATIONAL CAPITAL REGION (NCR)",
        "offering_province": "NCR/RCN"
    },
    "openhouse":
    {
        "offering_id": "000009",
        "course_code": "OPENHOUSE",
        "course_title": "Digital Academy Open House",
        "offering_city": "NATIONAL CAPITAL REGION (NCR)",
        "offering_province": "NCR/RCN"
    },
    "ut0_da_interest":
    {
        "offering_id": "000000",
        "course_code": "EVH-UT0",
        "course_title": "Stratosphere Event",
        "offering_city": "NATIONAL CAPITAL REGION (NCR)",
        "offering_province": "NCR/RCN"
    },
    "ut1_june18_event":
    {
        "offering_id": "000001",
        "course_code": "EVH-UT1",
        "course_title": "June 18 Event",
        "offering_city": "NATIONAL CAPITAL REGION (NCR)",
        "offering_province": "NCR/RCN"
    },
    "example_nanos": {
        "offering_id": "000002",
        "course_code": "EVH-NN1-P",
        "course_title": "General Satisfaction Survey",
        "offering_city": "NATIONAL CAPITAL REGION (NCR)",
        "offering_province": "NCR/RCN"
    },
    "example_nanos_paged":
    {
        "offering_id": "000002",
        "course_code": "EVH-NN1-P",
        "course_title": "General Satisfaction Survey",
        "offering_city": "NATIONAL CAPITAL REGION (NCR)",
        "offering_province": "NCR/RCN"
    },
    "engage":
    {
        "offering_id": "000003",
        "course_code": "Engage",
        "course_title": "Learning Together for Better Public Engagement",
        "offering_city": "ONLINE",
        "offering_province": "WEB"
    },
    "inclusive":
    {
        "offering_id": "000004",
        "course_code": "IPS-004",
        "course_title": "Digital Accessibility Matters: Creating a More Inclusive Public Service",
        "offering_city": "NATIONAL CAPITAL REGION (NCR)",
        "offering_province": "NCR/RCN"
    },
    "busrides":
    {
        "offering_id": "000005",
        "course_code": "SUR-BR1",
        "course_title": "Episode review / Revue d'épisode",
        "offering_city": "ONLINE",
        "offering_province": "WEB"
    },
    "ypn":
    {
        "offering_id": "000007",
        "course_code": "YPN-INO",
        "course_title": "Youth Professional Network / Réseau professionnel des jeunes",
        "offering_city": "ONLINE",
        "offering_province": "WEB"
    },
    "test_sur":
    {
        "offering_id": "000006",
        "course_code": "TST-006",
        "course_title": "Test Survey",
        "offering_city": "ONLINE",
        "offering_province": "WEB"
    },
    "tsq":
    {
        "offering_id": "0000010",
        "course_code": "TSQ-010",
        "course_title": "Transferable Skills",
        "offering_city": "ONLINE",
        "offering_province": "WEB"
    },
    "discover":
    {
        "offering_id": "0000010",
        "course_code": "DSC-011",
        "course_title": "Registration: Discover Digital CSPS Pilot / Inscription: Pilote EFPC Découvrez le numérique",
        "offering_city": "ONLINE",
        "offering_province": "WEB"
    }
};
_E.feature.autocomplete.autoc_offering_string = function (pod) {
    return "" +
        pod.course_code + ', ' +
        pod.offering_id + ', ' +
        pod.course_title + ', ' +
        pod.offering_city + ', ' +
        pod.offering_province;
};
_E.feature.autocomplete.autoc_load_offerings = function () {
    _E.core.state.store["generics"]["offerings"] = typeof autoc_offerings !== "undefined" ? autoc_offerings : [];

    // override: disconnecting Registhor for now. Running self contained as much as possible.
    var api_load = false;

    if (api_load == true) {

        var date = new Date();
        // for testing on the weekend when no offerings will show
        //date.setTime(date.getTime() + 3 * 86400000)
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
                var demo_offering = [
                    _E.feature.autocomplete.autoc_offering_string(_E.feature.autocomplete.populate_offerings_demodata["test_sur"])
                ];

                if (typeof _E.feature.autocomplete.populate_offerings_demodata[_E.feature.qparam.settings.sur] !== "undefined") {
                    demo_offering = [
                        _E.feature.autocomplete.autoc_offering_string(_E.feature.autocomplete.populate_offerings_demodata[_E.feature.qparam.settings.sur])
                    ];
                }

                // end delete
                for (var i = 0; i < offs.length; i++) {
                    demo_offering.push(
                        _E.feature.autocomplete.autoc_offering_string(offs[i])
                    );
                }

                var autoc_json = {}
                for (var i = 0; i < demo_offering.length; i++) {
                    autoc_json[demo_offering[i]] = null;
                }
                _E.core.state.store["generics"]["offerings"] = autoc_json;

                $('.autoc_offering').autocomplete({
                    data: _E.core.state.store["generics"]["offerings"]
                });
            }
        });
    } else {
        var offs = [];
        var offs_html = "";
        var suggested = "";
        var demo_offering = [
            _E.feature.autocomplete.autoc_offering_string(_E.feature.autocomplete.populate_offerings_demodata["test_sur"])
        ];

        // end delete
        for (var i = 0; i < offs.length; i++) {
            demo_offering.push(
                _E.feature.autocomplete.autoc_offering_string(offs[i])
            );
        }

        var autoc_json = {}
        for (var i = 0; i < demo_offering.length; i++) {
            autoc_json[demo_offering[i]] = null;
        }
        _E.core.state.store["generics"]["offerings"] = autoc_json;

        $('.autoc_offering').autocomplete({
            data: _E.core.state.store["generics"]["offerings"]
        });
    }

}
_E.feature.autocomplete.populate_offerings_html = function (response) {
    var offs = response.results ? response.results : [];
    var offs_html = "";
    var suggested = "";
    var demo_offering = [
        _E.feature.autocomplete.populate_offerings_demodata["test_sur"]
    ];

    if (typeof _E.feature.autocomplete.populate_offerings_demodata[_E.feature.qparam.settings.sur] !== "undefined") {
        demo_offering = [
            _E.feature.autocomplete.populate_offerings_demodata[_E.feature.qparam.settings.sur]
        ];
    }

    // to enable testing when no courses load. delete this code
    //TODO: renable course selection
    offs = demo_offering; //demo_offering.concat(offs);
    if (offs.length == 0) {
        offs_html += "<h2><span class='en'>No courses today</span><span class='fr'>Aucune de cours aujourd'hui</span></h2>";
        offs = demo_offering;
    } else {
        // offs = demo_offering.concat(offs);
    }
    // end delete
    for (var i = 0; i < offs.length; i++) {
        if (i == 0) {
            suggested = '<div style="padding: 1em;">' +
                '<span class="badge accessiblered white-text" style="float:none;padding:0.3em;font-size:1.1em;">' +
                '<span class="en">Suggested</span><span class="fr">Suggéré</span>' +
                '</span></div>' +
                '';
        } else {
            suggested = "";
        }
        offs_html += '<div class="card-panel purp-canada-ca-edged">' +
            '<div class="padbox badgelarge">' +
            suggested +
            '<div class="row">' +
            '<p>' +
            '<span class="offeringtitle">' + offs[i]["course_title"] + '</span><br />' +
            '<em>' + offs[i]["offering_city"] + ', ' + offs[i]["offering_province"] + '</em><br />' +
            '<sub>' + offs[i]["offering_id"] + ' - ' + offs[i]["course_code"] + '</sub>' +
            '</p>' +
            '</div>' +
            '<div class="row">' +
            '<a href="#editor" id="off_' + offs[i]["offering_id"] + '" class="select-offering btn btn-large purp-canada-ca">' +
            '<span class="en">Select</span><span class="fr">Choisir</span>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>';

    }
    _E.core.state.store["tombstone"]["offerings"] = offs;

    $(".offering_target").html(offs_html);
    _E.feature.lang.refresh_lang();

    let prepop_city_with_offering_location = false;
    $(".select-offering").on("click", function () {
        //alert($(this).attr("id").split("_")[1]);
        _E.core.state.store["tombstone"]["offering_id"] = $(this).attr("id").split("_")[1];
        for (var i = 0; i < _E.core.state.store["tombstone"]["offerings"].length; i++) {
            if (prepop_city_with_offering_location == false) {
                break;
            }
            if (_E.core.state.store["tombstone"]["offering_id"] == _E.core.state.store["tombstone"]["offerings"][i]["offering_id"]) {
                $("#autocomplete-input-city").val(
                    _E.core.state.store["tombstone"]["offerings"][i]["offering_city"] + ", " +
                    _E.core.state.store["tombstone"]["offerings"][i]["offering_province"]
                );
                M.updateTextFields();
            }
        }

        //_E.core.state.store["render"]["currpageid"] = "tombstone";
        //console.log(_E.core.state.store["render"]["currpageid"]);
        _E.feature.player.next_page();
        //$("#step_offering").hide();
        //$("#step_tombstone").show();
    });
}
_E.feature.autocomplete.populate_offerings = function () {
    // override: disconnecting Registhor for now. Running self contained as much as possible.
    var api_load = false;

    if (api_load == true) {
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
                _E.feature.autocomplete.populate_offerings_html(response);
            }
        });
    } else {
        _E.feature.autocomplete.populate_offerings_html({});
    }
}

// REFACTOR_PREP: autocompletes, remove the generics demo code
// get from tombstone: stub
// TODO: Refactor Fix with correct code (right now just obj/deobj for test)
_E.feature.autocomplete.enable_feature = function () {
    _E.core.state.store["generics"]["generic_fetched"] = false;
    _E.feature.autocomplete.autoc_load_classifications();
    _E.feature.autocomplete.autoc_load_departments();
    _E.feature.autocomplete.autoc_load_offerings();
    _E.feature.autocomplete.autoc_load_cities();
    _E.feature.autocomplete.autoc_load_languages();
    //_E.feature.autocomplete.api_get_generics();
    // for pre-survey pages
    _E.feature.autocomplete.populate_offerings();
};
