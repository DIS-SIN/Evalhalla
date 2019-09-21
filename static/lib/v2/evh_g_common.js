/*

Evalhalla common functions, general purpose.

Put functions here that might end up being used elsewhere
Try to reduce the cargo-culting as much as possible
While at the same time pulling out the "housekeeping" stuff
of the core.

_E["fxn"]["common"]

*/

// slug all the things
// read: https://medium.com/@mhagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1

// init the common package
_E.fxn.common = {};

_E.fxn.common.slugify = function (string) {
    const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
    const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        //.replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with ‘and’
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
        .replace(/\-/g, '_') // dash with underscore (for ids)
}

// Random HSL Color value generation
_E.fxn.common.data_randomHsl = {
    randomCoord: 0,
    lastCoord: 0,
    currCoord: Math.random() * 360,
    slicecount: 0
}
_E.fxn.common.randomHsl = function () {
    _E.fxn.common.data_randomHsl.slicecount = _E.fxn.common.data_randomHsl.slicecount + 1;
    if (_E.fxn.common.data_randomHsl.slicecount % 2 == 0) {
        _E.fxn.common.data_randomHsl.currCoord = (_E.fxn.common.data_randomHsl.currCoord + 90) % 360;
    } else {
        _E.fxn.common.data_randomHsl.currCoord = ((_E.fxn.common.data_randomHsl.lastCoord + _E.fxn.common.data_randomHsl.currCoord) / 2 + 90) % 360;
    }
    _E.fxn.common.data_randomHsl.lastCoord = _E.fxn.common.data_randomHsl.currCoord;
    _E.fxn.common.data_randomHsl.currCoord = _E.fxn.common.data_randomHsl.currCoord + 61; // prime between 45 and 90

    return 'hsla(' + _E.fxn.common.data_randomHsl.currCoord + ', 70%, 70%, 1)';
}

// svg basic pie chart
_E.fxn.common.hackernoon_pie = function (elid, slices) {
    // just read this. trust me: https://hackernoon.com/a-simple-pie-chart-in-svg-dbdd653b6936

    // Note: Attempting IE11 Backwards compatiblity. Hope is this works.

    var svgEls = [document.getElementById(elid)];

    if (slices == null) {
        //slices = [];
        for (var i = 0; i < 100; i++) {
            slices.push({ percent: 0.01, color: _E.fxn.common.randomHsl() })
        }
    }
    let cumulativePercent = 0;

    function getCoordinatesForPercent(percent) {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    }
    for (var i = 0; i < svgEls.length; i++) {
        slices.forEach(slice => {
            // destructuring assignment sets the two variables at once
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
            // each slice starts where the last slice ended, so keep a cumulative percent
            cumulativePercent += slice.percent;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
            // if the slice is more than 50%, take the large arc (the long way around)
            const largeArcFlag = slice.percent > .5 ? 1 : 0;
            // create an array and join it just for code readability

            // Donut chart
            const thickness = .3;
            const pathData = [
                // WARNING: The space here matter. A lot
                'M ' + startX + ' ' + startY + '',
                'A 1 1 0 ' + largeArcFlag + ' 1 ' + endX + ' ' + endY + '',
                // next two lines added for donut chart, as well as thickness constant
                'L ' + (endX * thickness) + ' ' + (endY * thickness) + '',
                'A ' + thickness + ' ' + thickness + ' 0 ' + largeArcFlag + ' 0 ' + (startX * thickness) + ' ' + (startY * thickness) + '',
            ].join(' ');

            // create a <path> and append it to the <svg> element
            const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathEl.setAttribute('d', pathData);
            pathEl.setAttribute('fill', slice.color);
            svgEls[i].appendChild(pathEl);
        })
    }
}

_E.fxn.common.label_truncate = function (str, length) {
    var dots = str.length > length ? '...' : '';
    return str.substring(0, length) + dots;
};

_E.fxn.common.get_random_int = function (max, skew) {
    // https://stackoverflow.com/questions/11383242/how-to-generate-skewed-random-numbers-in-javascript
    // Raise Math.random() to a power to get a gamma curve - this changes the distribution between 0 and 1, 
    // but 0 and 1 stay constant endpoints.
    // For gamma > 1, you will get darker output; for 0 < gamma < 1 you get lighter. 
    // (Here, '2' gives you the x - squared curve; the equidistant lightness would be '0.5' for the square - root curve.)
    // var r = Math.pow(Math.random(), 2);
    let lskew = (typeof skew === "undefined" || skew == null) ? "normal" : skew;
    let r = (lskew != "normal") ? Math.pow(Math.random(), lskew) : Math.random();

    return Math.floor(r * Math.floor(max));
};

_E.fxn.common.trim_json_object_keyvalues = function (obj) {
    //if (!Array.isArray(obj) && typeof obj != 'object') return obj;
    if (obj === null || !Array.isArray(obj) && typeof obj != 'object') return obj;
    return Object.keys(obj).reduce(function (acc, key) {
        acc[key.trim()] = typeof obj[key] == 'string' ? obj[key].trim() : _E.fxn.common.trim_json_object_keyvalues(obj[key]);
        return acc;
    }, Array.isArray(obj) ? [] : {});
}

// Clean HTML string and write into our DIV
// string sanitizer  // <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/1.0.10/purify.min.js"></script>
_E.fxn.common.data_safe = {
    /*ALLOWED_TAGS: ['p', '#text']*/
    SAFE_FOR_JQUERY: true,
    KEEP_CONTENT: false
};
_E.fxn.common.safe = function (dirty) {
    return DOMPurify.sanitize(dirty, _E.fxn.common.data_safe);
};

// shuffles an array. So you can randomize things.
_E.fxn.common.shuffle_array = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// returns the query string as an object. 
// NOTE: Need to protect against injection/XSS
_E.fxn.common.get_params_as_object = function (query) {
    query = query.substring(query.indexOf('?') + 1);
    var re = /([^&=]+)=?([^&]*)/g;
    var decodeRE = /\+/g;

    var decode = function (str) {
        return _E.fxn.common.safe(decodeURIComponent(str.replace(decodeRE, " ")));
    };

    var params = {}, e;
    while (e = re.exec(query)) {
        var k = decode(e[1]), v = decode(e[2]);
        if (k.substring(k.length - 2) === '[]') {
            k = k.substring(0, k.length - 2);
            (params[k] || (params[k] = [])).push(v);
        }
        else params[k] = v;
    }

    var assign = function (obj, keyPath, value) {
        var lastKeyIndex = keyPath.length - 1;
        for (var i = 0; i < lastKeyIndex; ++i) {
            var key = keyPath[i];
            if (!(key in obj))
                obj[key] = {}
            obj = obj[key];
        }
        obj[keyPath[lastKeyIndex]] = value;
    }

    for (var prop in params) {
        var structure = prop.split('[');
        if (structure.length > 1) {
            var levels = [];
            structure.forEach(function (item, i) {
                var key = item.replace(/[?[\]\\ ]/g, '');
                levels.push(key);
            });
            assign(params, levels, params[prop]);
            delete (params[prop]);
        }
    }
    return params;
};

_E.fxn.common.api_post_to_route = function (route, data_in) {
    $.ajax({
        url: route,
        contentType: "application/json",
        type: "POST",
        data: data_in,
        success: function (response) {
            console.log(response);
        }
    });
};
