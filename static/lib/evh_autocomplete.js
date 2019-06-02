
// REGISTHOR INTEGRATION autocomplete load classifications from registhor
var autoc_load_classifications = function (api_load = false) {
    if (api_load == true) {
        $.ajax({
            url: api_get_classifications_route + api_key,
            contentType: "application/json",
            type: "GET",
            //data: data_in,
            success: function (response) {
                g_state["generics"]["classifications"] = typeof response.results !== "undefined" ? response.results : [];
                var autoc_json = {}
                for (var i = 0; i < g_state["generics"]["classifications"].length; i++) {
                    autoc_json[g_state["generics"]["classifications"][i]] = null;
                }
                g_state["generics"]["classifications"] = autoc_json;
                $('.tombstone_classification').autocomplete({
                    data: g_state["generics"]["classifications"]
                });
            }
        });
    } else {
        g_state["generics"]["classifications"] = typeof autoc_classifications !== "undefined" ? autoc_classifications : [];
        var autoc_json = {}
        for (var i = 0; i < g_state["generics"]["classifications"].length; i++) {
            autoc_json[g_state["generics"]["classifications"][i]] = null;
        }
        g_state["generics"]["classifications"] = autoc_json;
        $('.tombstone_classification').autocomplete({
            data: g_state["generics"]["classifications"]
        });
    }
}

// REGISTHOR INTEGRATION autocomplete load departments from registhor
// local js options are the default to reduce api call load
var autoc_load_departments = function (api_load = false) {
    if (api_load == true) {
        $.ajax({
            url: api_get_departments_route + api_key,
            contentType: "application/json",
            type: "GET",
            //data: data_in,
            success: function (response) {
                g_state["generics"]["department_en"] = typeof response.results !== "undefined" ? response.results : [];
                var autoc_json = {}
                for (var i = 0; i < g_state["generics"]["department_en"].length; i++) {
                    autoc_json[g_state["generics"]["department_en"][i]] = null;
                }
                g_state["generics"]["department_en"] = autoc_json;
                $('.tombstone_department').autocomplete({
                    data: g_state["generics"]["department_en"]
                });
            }
        });
        $.ajax({
            url: api_get_departments_route_fr + api_key,
            contentType: "application/json",
            type: "GET",
            //data: data_in,
            success: function (response) {
                g_state["generics"]["department_fr"] = typeof response.results !== "undefined" ? response.results : [];
                var autoc_json = {}
                for (var i = 0; i < g_state["generics"]["department_fr"].length; i++) {
                    autoc_json[g_state["generics"]["department_fr"][i]] = null;
                }
                g_state["generics"]["department_fr"] = autoc_json;
                // TODO: Merge the two dept arrays
                $('.tombstone_department_fr').autocomplete({
                    data: g_state["generics"]["department_fr"]
                });
            }
        });
    } else {
        g_state["generics"]["department_en"] = typeof autoc_departments !== "undefined" ? autoc_departments : [];
        var autoc_json = {}
        for (var i = 0; i < g_state["generics"]["department_en"].length; i++) {
            autoc_json[g_state["generics"]["department_en"][i]] = null;
        }
        g_state["generics"]["department_en"] = autoc_json;
        $('.tombstone_department').autocomplete({
            data: g_state["generics"]["department_en"]
        });
    }
}

// REGISTHOR INTEGRATION autocomplete load cities from registhor
// local js options are the default to reduce api call load
var autoc_load_cities = function (api_load = false) {
    if (api_load == true) {
        $.ajax({
            url: api_get_cities_route + api_key,
            contentType: "application/json",
            type: "GET",
            //data: data_in,
            success: function (response) {
                g_state["generics"]["cities_en"] = typeof response.results !== "undefined" ? response.results : [];
                var autoc_json = {}
                for (var i = 0; i < g_state["generics"]["cities_en"].length; i++) {
                    autoc_json[g_state["generics"]["cities_en"][i]] = null;
                }
                g_state["generics"]["cities_en"] = autoc_json;
                $('.tombstone_city').autocomplete({
                    data: g_state["generics"]["cities_en"]
                });
            }
        });
        $.ajax({
            url: api_get_cities_route_fr + api_key,
            contentType: "application/json",
            type: "GET",
            //data: data_in,
            success: function (response) {
                g_state["generics"]["cities_fr"] = typeof response.results !== "undefined" ? response.results : [];
                var autoc_json = {}
                for (var i = 0; i < g_state["generics"]["cities_fr"].length; i++) {
                    autoc_json[g_state["generics"]["cities_fr"][i]] = null;
                }
                g_state["generics"]["cities_fr"] = autoc_json;
                $('.tombstone_city_fr').autocomplete({
                    data: g_state["generics"]["cities_fr"]
                });
            }
        });
    } else {
        g_state["generics"]["cities_en"] = typeof autoc_cities !== "undefined" ? autoc_cities : [];
        var autoc_json = {}
        for (var i = 0; i < g_state["generics"]["cities_en"].length; i++) {
            autoc_json[g_state["generics"]["cities_en"][i]] = null;
        }
        g_state["generics"]["cities_en"] = autoc_json;
        $('.tombstone_city').autocomplete({
            data: g_state["generics"]["cities_en"]
        });
    }
}

// refactor
// pull default values into the generics for demonstration
var api_get_generics = function () {
    if (g_state["generics"]["generic_fetched"] == false) {
        //M.toast({ html: "Found this gc data, prefilling...", classes: 'rounded' });
        console.info("Found this gc data, prefilling...")
        g_state["generics"]["ev_inline_dept"] = "CSPS-EFPC";
        g_state["generics"]["ev_inline_role"] = "CS-04";
        g_state["generics"]["ev_inline_region"] = "NCR";
        g_state["generics"]["ev_inline_office"] = "Bayview";
        g_state["generics"]["generic_fetched"] = true;
    }
};
// TODO: init tombstone generics