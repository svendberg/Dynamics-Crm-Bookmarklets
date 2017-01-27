/*exported BrReg */
var BrReg = (function () {
    'use strict';
    var newDiv;
    var container;
    var init = function () {
        newDiv = document.createElement('div');
        newDiv.innerHTML = markup.box;

        document.body.appendChild(newDiv);
        document.getElementById('closeBtn').onclick = function () {
            hide();
        };

        var field = document.getElementById('field');
        field.onkeyup = debounce(function () {
            var query = document.getElementById('field').value;
            console.log(query);
            ajax.get(remote, { query: query }, function (result) {
                var list = document.getElementById('results');
                BrReg.container = result;
                console.log(result);
                if (result && result.entries && result.entries.length > 0) {
                    result.entries.forEach(function (item) {
                        console.log(item);
                        var newLi = document.createElement('li');
                        newLi.innerHTML =  item.navn +
                            "<span style='color: #444'> (" + item.orgnr + ")</span>" +
                            "<br /><span>" +
                            (item.forretningsadr != '' ? item.forretningsadr + "<br />" : '') +
                            item.forradrpostnr + " " + item.forradrpoststed + "</span>";
                        list.appendChild(newLi);
                    });
                };
            });
        }, 500);
    };

    var remote = "https://hotell.difi.no/api/json/brreg/enhetsregisteret";

    var hide = function () {
        newDiv.parentNode.removeChild(newDiv);
    };

    var styles = function () {
        var obj = {};
        obj.box = 'position:absolute;' +
            'top:30%;' +
            'left:30%;' +
            'box-shadow:0 5px 15px rgba(0, 0, 0, 0.5);' +
            'border:1px solid rgba(0, 0, 0, 0.2);' +
            'border-radius:6px;' +
            'padding:30px;' +
            'font-family:Helvetica Neue, Helvetica, Arial, sans-serif;' +
            'color:#333333;' +
            'font-size:14px;' +
            'background-color:#ffffff;';

        obj.input = 'padding: 6px 12px;' +
            'border: 1px solid #cccccc;' +
            'border-radius: 4px;' +
            'width:100%;' +
            'box-sizing:border-box;';

        obj.button = 'padding:6px 12px;' +
            'border:1px solid transparent;' +
            'border-radius:4px;' +
            'border-color:#adadad;' +
            'background-color:#ffffff;' +
            'cursor:pointer;' +
            'font-size:14px;' +
            'color:#333333;' +
            'background-image:none;' +
            'height:100%;';

        obj.button_b = 'background-color:#428bca!important;' +
            'color:#ffffff!important;' +
            obj.button;
        return obj;
    } ();

    var markup = function () {
        var obj = {};
        obj.box = '<div id="innerBox" style="' + styles.box + '"><strong>Searchfield:</strong><br /><input type="text" id="field" style="' + styles.input + '"></select><br />' +
            '<br /><strong>Values:</strong><br /><ul id="results"></ul><br /><button id="searchButton" style="' +
            styles.button_b + '">Search</button>' +
            '&nbsp;<button id="closeBtn" style="' + styles.button + '">Close</button></div>';
        return obj;
    } ();

    var ajax = {};
    ajax.x = function () {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        }
        var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];

        var xhr;
        for (var i = 0; i < versions.length; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch (e) {
            }
        }
        return xhr;
    };

    var debounce = function (func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    ajax.send = function (url, callback, method, data, async) {
        if (async === undefined) {
            async = true;
        }
        var x = ajax.x();
        x.open(method, url, async);
        x.onreadystatechange = function () {
            if (x.readyState == 4) {
                callback(JSON.parse(x.responseText))
            }
        };
        if (method == 'POST') {
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        x.send(data)
    };

    ajax.get = function (url, data, callback, async) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
    };

    ajax.post = function (url, data, callback, async) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        ajax.send(url, callback, 'POST', query.join('&'), async)
    };

    return {
        show: init,
        container: container
    };
})();

BrReg.show();
