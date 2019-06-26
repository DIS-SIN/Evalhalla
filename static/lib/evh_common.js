// slug all the things
// read: https://medium.com/@mhagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1
function slugify(string) {
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
}

// Random HSL Color value generation
var randomCoord = 0;
var lastCoord = 0;
var currCoord = Math.random() * 360;
var slicecount = 0;
var randomHsl = function () {
    slicecount = slicecount + 1;
    if (slicecount % 2 == 0) {
        currCoord = (currCoord + 90) % 360;
    } else {
        currCoord = ((lastCoord + currCoord) / 2 + 90) % 360;
    }
    lastCoord = currCoord;
    currCoord = currCoord + 61; // prime between 45 and 90

    return 'hsla(' + currCoord + ', 70%, 70%, 1)';
}

// svg basic pie chart
var hackernoon_pie = function (elid, slices) {
    // just read this. trust me: https://hackernoon.com/a-simple-pie-chart-in-svg-dbdd653b6936

    // Note: Attempting IE11 Backwards compatiblity. Hope is this works.

    /* 
    var svgEls = [document.getElementById(elid)];

    if (slices == null) {
        //slices = [];
        for (var i = 0; i < 100; i++) {
            slices.push({ percent: 0.01, color: randomHsl() })
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
    */
}

// string sanitizer  // <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/1.0.10/purify.min.js"></script>
const config_DOMPurify = {
    /*ALLOWED_TAGS: ['p', '#text']*/
    SAFE_FOR_JQUERY: true,
    KEEP_CONTENT: false
};

// Clean HTML string and write into our DIV
const safe = function (dirty) {
    return DOMPurify.sanitize(dirty, config_DOMPurify);
};

// shuffles an array. So you can randomize things.
const shuffle_array = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// returns the query string as an object. 
// NOTE: Need to protect against injection/XSS
const get_params_as_object = function (query) {
    query = query.substring(query.indexOf('?') + 1);
    var re = /([^&=]+)=?([^&]*)/g;
    var decodeRE = /\+/g;

    var decode = function (str) {
        return safe(decodeURIComponent(str.replace(decodeRE, " ")));
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
