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

_E.fxn.common.label_blackart_spacewrap = function (str) {
    // https://en.wikipedia.org/wiki/Zero-width_space
    // &#8203; = zws
    // chunk it into 8 char chunks (arbitary choice) 
    str = str.match(/.{1,8}/g); // ["abc..8", "d"]
    str = str.join("&#8203;"); // inject zws
    return str; // mischief managed
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


/**
* jquery-match-height master by @liabru
* http://brm.io/jquery-match-height/
* License: MIT
*/

; (function (factory) { // eslint-disable-line no-extra-semi
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Global
        factory(jQuery);
    }
})(function ($) {
    /*
    *  internal
    */

    var _previousResizeWidth = -1,
        _updateTimeout = -1;

    /*
    *  _parse
    *  value parse utility function
    */

    var _parse = function (value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

    /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

    var _rows = function (elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function () {
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    /*
    *  _parseOptions
    *  handle plugin options
    */

    var _parseOptions = function (options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };

        if (typeof options === 'object') {
            return $.extend(opts, options);
        }

        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }

        return opts;
    };

    /*
    *  matchHeight
    *  plugin definition
    */

    var matchHeight = $.fn.matchHeight = function (options) {
        var opts = _parseOptions(options);

        // handle remove
        if (opts.remove) {
            var that = this;

            // remove fixed height from all selected elements
            this.css(opts.property, '');

            // remove selected elements from all groups
            $.each(matchHeight._groups, function (key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1 && !opts.target) {
            return this;
        }

        // keep track of this group so we can re-apply later on load and resize events
        matchHeight._groups.push({
            elements: this,
            options: opts
        });

        // match each element's height to the tallest element in the selection
        matchHeight._apply(this, opts);

        return this;
    };

    /*
    *  plugin global options
    */

    matchHeight.version = 'master';
    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;
    matchHeight._rows = _rows;
    matchHeight._parse = _parse;
    matchHeight._parseOptions = _parseOptions;

    /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

    matchHeight._apply = function (elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];

        // take note of scroll position
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);

        // get hidden parents
        var $hiddenParents = $elements.parents().filter(':hidden');

        // cache the original inline style
        $hiddenParents.each(function () {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });

        // temporarily must force hidden parents visible
        $hiddenParents.css('display', 'block');

        // get rows if using byRow, otherwise assume one row
        if (opts.byRow && !opts.target) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.each(function () {
                var $that = $(this),
                    display = $that.css('display');

                // temporarily force a usable display value
                if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                    display = 'block';
                }

                // cache the original inline style
                $that.data('style-cache', $that.attr('style'));

                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px',
                    'overflow': 'hidden'
                });
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert original inline styles
            $elements.each(function () {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }

        $.each(rows, function (key, row) {
            var $row = $(row),
                targetHeight = 0;

            if (!opts.target) {
                // skip apply to rows with only one item
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }

                // iterate the row and find the max height
                $row.each(function () {
                    var $that = $(this),
                        style = $that.attr('style'),
                        display = $that.css('display');

                    // temporarily force a usable display value
                    if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                        display = 'block';
                    }

                    // ensure we get the correct actual height (and not a previously set height value)
                    var css = { 'display': display };
                    css[opts.property] = '';
                    $that.css(css);

                    // find the max height (including padding, but not margin)
                    if ($that.outerHeight(false) > targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }

                    // revert styles
                    if (style) {
                        $that.attr('style', style);
                    } else {
                        $that.css('display', '');
                    }
                });
            } else {
                // if target set, use the height of the target element
                targetHeight = opts.target.outerHeight(false);
            }

            // iterate the row and apply the height to all elements
            $row.each(function () {
                var $that = $(this),
                    verticalPadding = 0;

                // don't apply to a target
                if (opts.target && $that.is(opts.target)) {
                    return;
                }

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
            });
        });

        // revert hidden parents
        $hiddenParents.each(function () {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });

        // restore scroll position if enabled
        if (matchHeight._maintainScroll) {
            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
        }

        return this;
    };

    /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

    matchHeight._applyDataApi = function () {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function () {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function () {
            this.matchHeight(true);
        });
    };

    /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

    var _update = function (event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }

        $.each(matchHeight._groups, function () {
            matchHeight._apply(this.elements, this.options);
        });

        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };

    matchHeight._update = function (throttle, event) {
        // prevent update if fired from a resize event
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function () {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };

    /*
    *  bind events
    */

    // apply on DOM ready event
    $(matchHeight._applyDataApi);

    // use on or bind where supported
    var on = $.fn.on ? 'on' : 'bind';

    // update heights on load and resize events
    $(window)[on]('load', function (event) {
        matchHeight._update(false, event);
    });

    // throttled update heights on resize events
    $(window)[on]('resize orientationchange', function (event) {
        matchHeight._update(true, event);
    });

});
