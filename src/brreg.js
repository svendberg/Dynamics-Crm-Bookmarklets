var BrReg = (function () {
    var newDiv;
    var Xrm = frames[0].Xrm;
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
            var list = document.getElementById('results');
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
            if (query.length > 2) {
                ajax.get(remote, { query: query }, function (result) {
                    if (result && result.entries && result.entries.length > 0) {
                        result.entries.forEach(function (item) {
                            var newLi = document.createElement('li');
                            newLi.setAttribute("style", styles.element);
                            newLi.id = item.orgnr;
                            newLi.innerHTML = "<b>" + item.navn + "</b>" + 
                                "<span> (" + item.orgnr + ")</span>" +
                                "<br /><span>" +
                                (item.forretningsadr != '' ? item.forretningsadr + "<br />" : '') +
                                item.forradrpostnr + " " + item.forradrpoststed + "</span>";
                            list.appendChild(newLi);

                            document.getElementById(item.orgnr).onclick = function () {
                                sendToCrm(item)
                            };
                        });
                    };
                });
            }
        }, 500);
    };

    var remote = "https://hotell.difi.no/api/json/brreg/enhetsregisteret";

    var hide = function () {
        newDiv.parentNode.removeChild(newDiv);
    };

    var sendToCrm = function (item) {
        Xrm.Page.getAttribute("name").setValue(item.navn);
        Xrm.Page.getAttribute("telephone1").setValue(item.tlf);
        Xrm.Page.getAttribute("address1_line1").setValue(item.forretningsadr);
        Xrm.Page.getAttribute("address1_city").setValue(item.forradrpoststed);
        Xrm.Page.getAttribute("address1_postalcode").setValue(item.forradrpostnr);
        Xrm.Page.getAttribute("accountnumber").setValue(item.orgnr);
        Xrm.Page.getAttribute("websiteurl").setValue(item.url);
        hide();
    };

    var styles = function () {
        var obj = {};

        obj.element = 'padding:6px 12px;' +
            'border:1px solid transparent;' +
            'border-radius:4px;' +
            'border-color:#adadad;' +
            'background-color:#ffffff;' +
            'cursor:pointer;' +
            'font-size:14px;' +
            'color:#333333;' + 
            'margin-bottom:5px;' 

        obj.box = 'position:absolute;' +
            'top:10%;' +
            'left:30%;' +
            'width:500px;' +
            'box-shadow:0 5px 15px rgba(0, 0, 0, 0.5);' +
            'border:1px solid rgba(0, 0, 0, 0.2);' +
            'border-radius:6px;' +
            'padding-top:30px;' +
            'padding-left:30px;' +
            'padding-right:30px;' +
            'padding-bottom:0px;' +
            'font-family:Helvetica Neue, Helvetica, Arial, sans-serif;' +
            'color:#333333;' +
            'font-size:14px;' +
            'background-color:#ffffff;';
        
        obj.innerbox = 'overflow-y:auto;' + 
            'max-height: 300px;';

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
            'height:40px;';

        obj.button_b = 'background-color:#428bca!important;' +
            'color:#ffffff!important;' +
            obj.button;

        return obj;
    } ();

    var markup = function () {
        var obj = {};
        obj.box = '<div id="innerBox" style="' + styles.box + '" class="box"><strong>Søk etter firmanavn</strong><br />' + 
            'Klikk på firma for å velge<br/><input type="text" id="field" style="' + styles.input + '"></select><br />' +
            '<br /><br /><div style="' + styles.innerbox + '"><ul id="results"></ul></div><br />' +
            '&nbsp;<button id="closeBtn" style="' + styles.button + '">Lukk</button><br/><br/>' + 
            '<span><span style="float:left;line-height:50px;">Data hentes fra Brønnøysund</span><span style="float:right;line-height:50px;"><a href="codemover.com" target="_blank"><img src="https://codemover.azureedge.net/logo_xs.png"></img></a></span></span></div>';
        return obj;
    } ();

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

    return {
        show: init,
    };
})();

BrReg.show();
