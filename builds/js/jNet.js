/**
 *  @author REZ1DENT3, Babichev Maxim
 *  @site https://babichev.net
 *  @year 2013 - 2016
 *  @version 0.6
 *  @build 1361
 */

String.prototype.jNToDocument = function () {
    var domParser = new DOMParser();
    return domParser.parseFromString(this, "text/html");
};

String.prototype.jNTrim = function (regex) {
    if (typeof regex == 'undefined') {
        return this.trim();
    }
    return this.replace(new RegExp('/^' + regex + '|' + regex + '$/gm'), '');
};

String.prototype.selectorReplaceId = function () {
    return this.replace(/#([-\w]+)/g, "[id=$1]");
};

Math.rand = function (min, max) {
    return this.floor(this.random() * (max - min + 1)) + min;
};

Array.prototype.first = function () {
    return this.at(0);
};

Array.prototype.last = function () {
    return this.at(this.length - 1);
};

Array.prototype.at = function (key) {
    return this[key];
};

Array.prototype.clone = function () {
    return this.slice();
};

Array.prototype.unique = function () {
    var ko = {};
    this.forEach(function (item) {
        ko[item] = 1;
    });
    return Object.keys(ko);
};

Array.prototype.shuffle = function () {
    var shuffle = this.clone();
    shuffle.sort(function (a, b) {
        return Math.random() - 0.5;
    });
    return shuffle;
};

Array.prototype.diff = function (array) {
    return this.filter(function (i) {
        return array.indexOf(i) === -1;
    });
};

Array.prototype.remove = function (item) {
    this.splice(this.indexOf(item), 1);
    return this;
};

Array.prototype.contains = function (item) {
    return this.indexOf(item) !== -1;
};

Object.prototype.clone = function () {
    return JSON.parse(JSON.stringify(this));
};

!function (document, fn) {

    'use strict';

    function jNetFramework(parameter) {
        this._document = document;
        this._selector = parameter;
        this.getDocuments();
    }

    var jNet = function (parameter) {
        if (/^f/.test(typeof parameter)) {
            if (/c/.test(document.readyState)) {
                return parameter();
            }
            return jNet(document).ready(parameter);
        }
        return new jNetFramework(parameter);
    };

    jNet[fn] = jNetFramework[fn] = jNet.fn = jNetFramework.fn = {

        _selector: '',
        _document: '',
        _find: false,

        getDocuments: function () {
            if (this._find) {
                return this;
            }
            else {
                while (this.length) {
                    delete this[this.length - 1];
                }
                var parameter = [];
                if (typeof this._selector.toString == "string") {
                    if (this._selector.toString == this.toString) {
                        Array.prototype.push.apply(this, this._selector);
                        this._find = true;
                        return this;
                    }
                }

                if (this._selector && this._selector.nodeType) {
                    parameter = [this._selector];
                    if (typeof this._selector.parentNode !== "undefined") {
                        this._document = this._selector.parentNode;
                    }
                }
                else if (Array.isArray(this._selector)) {
                    parameter = this._selector;
                }
                else if (typeof this._selector === "string") {
                    this._selector = this._selector.selectorReplaceId();
                    parameter = this._document.querySelectorAll(this._selector);
                }
                Array.prototype.push.apply(this, parameter);
                this._find = true;
                return this;
            }
        },

        _call: function () {

            var args = arguments[0];
            var res = [];

            this.each(function (key, element) {
                args.document = element;
                args.docInd = key;
                var temp = args.callback.call(this, args);
                if (typeof temp !== "undefined") {
                    if (typeof temp.length !== "undefined") {
                        if (Array.isArray(temp)) {
                            Array.prototype.push.apply(res, temp);
                        }
                        else if (typeof temp == "string") {
                            res.push(temp);
                        }
                        else {
                            for (var i = 0; i < temp.length; ++i) {
                                res.push(temp[i]);
                            }
                        }
                    }
                    else {
                        res.push(temp);
                    }
                }
            });

            if (typeof args.value === "undefined" && typeof args.jNetToType !== "undefined") {
                switch (args.jNetToType) {
                    case "string":
                        if (res.length == 1) {
                            return res[0];
                        }
                        return res.join("\n");

                    case "array":
                        if (res.length == 1) {
                            return res[0];
                        }
                        return res;
                }
            }
            return jNet(res);
        },

        eq: function (index) {
            return jNet(this[index]);
        },

        at: function (index) {
            return this.eq(index);
        },

        first: function () {
            return this.eq(0);
        },

        last: function () {
            return this.eq(this.length - 1);
        },

        odd: function () {
            return this._call.call(this, {
                callback: function (obj) {
                    if ((obj.docInd & 1) == 1) {
                        return obj.document;
                    }
                    return undefined;
                }
            });
        },

        even: function () {
            return this._call.call(this, {
                callback: function (obj) {
                    if ((obj.docInd & 1) == 0) {
                        return obj.document;
                    }
                    return undefined;
                }
            });
        },

        serialize: function (method) {
            return this._call.call(this, {
                callback: function (obj) {
                    function toQuery(name, value) {
                        return name + "=" + encodeURIComponent(value).replace(/%20/g, '+');
                    }

                    var query = [];
                    var form = obj.document;
                    var method = obj.method || 'GET';
                    if (method === 'GET' || method === 'DELETE') {
                        if (typeof form == 'object' && form.nodeName == "FORM") {
                            for (var i = 0; i < form.elements.length; ++i) {
                                var field = form.elements[i];
                                if (['reset', 'submit', 'button', 'file'].indexOf(field.type) !== -1) {
                                    continue;
                                }
                                if (field.name) {
                                    if (field.type == 'select-multiple') {
                                        for (var j = 0; j < form.elements[i].options.length; ++j) {
                                            if (field.options[j].selected) {
                                                query.push(toQuery(field.name, field.options[j].value));
                                            }
                                        }
                                    }
                                    else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                                        query.push(this.toQuery(field.name, field.value));
                                    }
                                }
                            }
                        }
                        return query.join('&');
                    }
                    return new FormData(form);
                },
                method: method,
                jNetToType: "array"
            });
        },

        files: function () {
            return this._call.call(this, {
                callback: function (obj) {
                    return obj.document.files;
                },
                jNetToType: "array"
            });
        },

        parent: function () {
            return this._call.call(this, {
                callback: function (obj) {
                    if (typeof obj.document.parentNode != "undefined") {
                        obj.document = obj.document.parentNode;
                        return obj.document;
                    }
                    return undefined;
                }
            });
        },

        find: function (selector) {
            return this._call.call(this, {
                callback: function (obj) {
                    return obj.document.querySelectorAll(selector)
                },
                selector: selector
            });
        },

        classList: function () {
            return this._call.call(this, {
                callback: function (obj) {
                    return obj.document.classList;
                },
                jNetToType: "array"
            });
        },

        hasClass: function (className) {
            return this._call.call(this, {
                callback: function (obj) {
                    return obj.document.classList.contains(obj.className);
                },
                className: className,
                jNetToType: "array"
            });
        },

        addClass: function (className) {
            return this._call.call(this, {
                callback: function (obj) {
                    return obj.document.classList.add(obj.className);
                },
                className: className
            });
        },

        removeClass: function (className) {
            return this._call.call(this, {
                callback: function (obj) {
                    return obj.document.classList.remove(obj.className);
                },
                className: className
            });
        },

        toggleClass: function (className) {
            return this._call.call(this, {
                callback: function (obj) {
                    return obj.document.classList.toggle(obj.className);
                },
                className: className
            });
        },

        css: function (name, value) {
            return this._call.call(this, {
                callback: function (obj) {
                    if (typeof obj.value == 'undefined') {
                        return obj.document.style.getPropertyValue(obj.name);
                    }
                    obj.document.style.setProperty(obj.name, obj.value);
                    return obj.document;
                },
                name: name,
                value: value,
                jNetToType: "array"
            });
        },

        text: function (value) {
            return this._call.call(this, {
                callback: function (obj) {
                    if (typeof obj.value != "undefined") {
                        try {
                            obj.document.innerText = obj.value;
                        }
                        catch (e) {
                            obj.document.value = obj.value;
                        }
                        return this;
                    }
                    return obj.document.innerText || obj.document.value;
                },
                value: value,
                jNetToType: "array"
            });
        },

        append: function (html) {
            return this._call.call(this, {
                callback: this._prependAppend,
                html: html,
                type: 'append'
            });
        },

        prepend: function (html) {
            return this._call.call(this, {
                callback: this._prependAppend,
                html: html,
                type: 'prepend'
            });
        },

        _prependAppend: function (obj) {

            var html = obj.html;
            if (typeof html == 'string') {
                html = html.jNToDocument();
            }
            else {
                switch (html.toString) {
                    case this.toString:
                        html = html._outerHTML().jNToDocument();
                        break;
                }
            }

            if (typeof html.outerHTML != 'undefined') {
                html = html.outerHTML.jNToDocument();
            }

            if (typeof html.body.firstChild != 'undefined') {
                if (obj.type == 'prepend') {
                    obj.document.insertBefore(html.body.firstChild, obj.document.firstChild);
                }
                else if (obj.type == 'append') {
                    obj.document.appendChild(html.body.firstChild);
                }
            }

            return jNet(obj.document);

        },

        innerHTML: function (value) {
            return this._call.call(this, {
                callback: function (obj) {
                    if (typeof obj.value != "undefined") {
                        obj.document.innerHTML = obj.value;
                        return this;
                    }
                    return obj.document.innerHTML;
                },
                value: value,
                jNetToType: "array"
            });
        },

        outerHTML: function (value) {
            return this._call.call(this, {
                callback: function (obj) {
                    if (typeof obj.value != "undefined") {
                        obj.document.outerHTML = obj.value;
                        return this;
                    }
                    return obj.document.outerHTML;
                },
                value: value,
                jNetToType: "array"
            });
        },

        attr: function (nameAttribute, valueAttribute) {

            if (typeof valueAttribute == "undefined") {
                return this._call.call(this, {
                    callback: function (obj) {
                        return obj.document.getAttribute(obj.nameAttribute);
                    },
                    nameAttribute: nameAttribute,
                    jNetToType: "array"
                })
            }

            if (valueAttribute == null || valueAttribute == '') {
                return this._call.call(this, {
                    callback: function (obj) {
                        if (this._hasAttribute(obj.nameAttribute)) {
                            obj.document.removeAttribute(obj.nameAttribute);
                        }
                        return this;
                    },
                    nameAttribute: nameAttribute
                });
            }

            return this._call.call(this, {
                callback: function (obj) {
                    obj.document.setAttribute(obj.nameAttribute, obj.valueAttribute);
                    return this;
                },
                nameAttribute: nameAttribute,
                valueAttribute: valueAttribute
            });

        },

        width: function () {
            return this._call.call(this, {
                callback: function (obj) {
                    return obj.document.clientWidth;
                },
                jNetToType: "array"
            });
        },

        height: function () {
            return this._call.call(this, {
                callback: function (obj) {
                    return obj.document.clientHeight;
                },
                jNetToType: "array"
            });
        },

        get: function (options) {
            return this._call.call(this, {
                callback: function (obj) {
                    obj.options.method = 'GET';
                    obj.options.data = jNet(this);
                    return jNet.ajax(obj.options);
                },
                options: options,
                jNetToType: "array"
            });
        },

        post: function (options) {
            return this._call.call(this, {
                callback: function (obj) {
                    obj.options.method = 'POST';
                    obj.options.data = jNet(this);
                    return jNet.ajax(obj.options);
                },
                options: options,
                jNetToType: "array"
            });
        },

        remove: function () {
            return this._call.call(this, {
                callback: function (obj) {
                    if (typeof obj.document.parentNode == 'undefined') {
                        this.outerHTML('');
                    }
                    else {
                        obj.document.parentNode.removeChild(obj.document);
                    }
                    return this;
                }
            });
        },

        cleanSelection: function () {
            var $selection = this.getSelection();
            if (typeof $selection.empty == "function") {
                $selection.empty();
            }
            else if (typeof $selection.removeAllRanges == "function") {
                $selection.removeAllRanges();
            }
            return this;
        },

        getSelection: function () {
            if (typeof window.getSelection == "function") {
                return window.getSelection();
            }
            else if (typeof document.getSelection == "function") {
                return document.getSelection();
            }
            else if (typeof document.selection != "undefined") {
                return document.selection;
            }
            return undefined;
        },

        insertAfter: function (element) {
            element = jNet(element);
            return this._call.call(this, {
                callback: function (obj) {
                    obj.element[0].parentNode.insertBefore(obj.document, obj.element[0].nextSibling);
                },
                element: element.first()
            });
        },

        insertBefore: function (element) {
            element = jNet(element);
            return this._call.call(this, {
                callback: function (obj) {
                    obj.element[0].parentNode.insertBefore(obj.document, obj.element[0].nextSibling);
                    obj.document.parentNode.insertBefore(obj.element[0], obj.document.nextSibling);
                },
                element: element.first()
            });
        },

        each: function (arr, callback) {
            if (typeof callback == "undefined") {
                callback = arr;
                arr = this.getDocuments();
            }
            var length = arr.length;
            for (var i = 0; i < length; ++i) {
                callback.call(arr[i], i, arr[i]);
            }
        },

        submit: function (listener) {
            return this._call.call(this, {
                callback: function (obj) {
                    obj.document.onsubmit = obj.listener;
                    return this;
                },
                listener: listener
            });
        },

        on: function (type, listener, useCapture) {
            this.each(function (index, element) {
                element.addEventListener(type, listener, useCapture);
            });
            return this;
        },

        off: function (type, listener, useCapture) {
            this.each(function (index, element) {
                element.removeEventListener(type, listener, useCapture);
            });
            return this;
        },

        ready: function (listener, useCapture) {
            return this.on("DOMContentLoaded", listener, useCapture);
        },

        // fixme
        _easing: function () {
            this.linear = function (progress) {
                return progress;
            };

            this.quadratic = function (progress) {
                return Math.pow(progress, 2);
            };

            this.swing = function (progress) {
                return 0.5 - Math.cos(progress * Math.PI) / 2;
            };

            this.circ = function (progress) {
                return 1 - Math.sin(Math.acos(progress));
            };

            this.back = function (progress, x) {
                return Math.pow(progress, 2) * ((x + 1) * progress - x);
            };

            this.bounce = function (progress) {
                for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                    if (progress >= (7 - 4 * a) / 11) {
                        return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                    }
                }
            };

            this.elastic = function (progress, x) {
                return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
            };

            return this;
        },

        animate: function (options) {
            var start = new Date;
            var id = setInterval(function () {
                var timePassed = new Date - start;
                var progress = timePassed / options.duration;
                if (progress > 1) {
                    progress = 1;
                }
                options.progress = progress;
                var delta = options.delta(progress);
                options.step(delta);
                if (progress == 1) {
                    clearInterval(id);
                    options.complete(options.jNetDoc);
                }
            }, options.delay || 10);
            return id;
        },

        show: function (duration) {
            return this.fadeIn({
                duration: duration,
                after: function (self, obj) {
                    self.css('display', '');
                }
            });
        },

        hide: function (duration) {
            return this.fadeOut({
                duration: duration,
                complete: function (self) {
                    self.css('display', 'none');
                }
            });
        },

        fadeIn: function (options) {
            var self = this;
            return this._call.call(this, {
                callback: self._fadeUniversal,
                options: options,
                to: 0
            });
        },

        fadeOut: function (options) {
            var self = this;
            return this._call.call(this, {
                callback: self._fadeUniversal,
                options: options,
                to: 1
            });
        },

        _fadeUniversal: function (obj) {

            var self = jNet(this);

            if (typeof obj.options !== "object") {
                obj.options = {};
            }

            if (typeof obj.options.duration !== "number") {
                obj.options.duration = 400;
            }

            if (typeof obj.options.complete !== "function") {
                obj.options.complete = function () {
                }
            }

            if (typeof obj.options.after !== "function") {
                obj.options.after = function (self, obj) {
                };
            }

            if (typeof obj.options.easing !== "string") {
                obj.options.easing = "swing";
            }

            obj.options.after(self, obj);

            self.animate({
                jNetDoc: self,
                duration: obj.options.duration,
                delta: function (progress) {
                    progress = this.progress;
                    return self._easing()[obj.options.easing](progress, 0);
                },
                complete: obj.options.complete,
                step: function (delta) {
                    var value = obj.to + delta;
                    if (obj.to) { // Out
                        value = obj.to - delta;
                    }
                    self.css('opacity', value);
                }
            });

            return this;

        },

        toString: "jNet"

    };

    window.jNet = document.jNet = jNet;

}(document, 'prototype');

var jNet = window.jNet || document.jNet;

var props = [
    'click', 'contextmenu', 'dblclick',
    'mouseup', 'mousedown', 'mouseout', 'mouseover', 'mousemove',
    'keyup', 'keydown', 'keypress',
    'copy',
    'selectstart', 'selectionchange', 'select'
];

props.forEach(function (prop, index) {
    jNet.prototype[prop] = function (listener, useCapture) {
        return this.on(prop, listener, useCapture);
    };
});

jNet.each = jNet.fn.each;

jNet.now = function () {
    return Math.floor((new Date()).getTime() / 1000);
};
jNet.ajax = function (options) {

    function serialize(objData) {
        return Object.keys(objData).map(function (key) {
            return key + "=" + encodeURIComponent(objData[key]).replace(/%20/g, '+');
        }).join('&');
    }

    var http = new XMLHttpRequest();

    options.method = options.method || 'GET';
    options.method = options.method.toUpperCase();

    options.data = options.data || {};

    options.files = options.files || {};

    options.user = options.user || null;

    options.password = options.password || null;

    if (typeof options.async == "undefined") {
        options.async = true;
    }

    if (typeof options.success != "function") {
        options.success = function (response) {
        };
    }

    if (typeof options.stateChange != "function") {
        options.stateChange = function (response) {
        };
    }

    if (typeof options.progress != "function") {
        options.progress = function (response) {
        };
    }

    if (typeof options.fail != "function") {
        options.fail = function (response) {
        };
    }

    http.onerror = options.fail;
    http.onload = options.success;
    http.onprogress = options.progress;
    http.onreadystatechange = options.stateChange;

    if (typeof options.data == "object") {

        if (options.data.toString === "jNet") {
            options.data = options.data.serialize(options.method);
        }
        else {
            switch (options.method) {
                case 'GET':
                case 'DELETE':
                    options.data = serialize(options.data);
                    break;

                case 'PUT':
                case 'HEAD':
                case 'POST':
                case 'OPTIONS':
                    var formData = new FormData();
                    for (var keyFile in options.files) {
                        if (options.files.hasOwnProperty(keyFile)) {
                            formData.append(keyFile, options.files[keyFile]);
                        }
                    }

                    for (var keyData in options.data) {
                        if (options.data.hasOwnProperty(keyData)) {
                            formData.append(keyData, options.data[keyData]);
                        }
                    }

                    options.data = formData;
                    break;

            }
        }
    }

    if (typeof options.data == "string") {
        if (options.url.indexOf('?') === -1) {
            options.url += '?' + options.data;
        }
        else {
            options.url += '&' + options.data;
        }
        options.data = null;
    }

    http.open(options.method, options.url, options.async, options.user, options.password);
    http.send(options.data);
    return http;

};

jNet.cookie = function () {

    /**
     * @param key {string}
     */
    this.remove = function (key) {
        this.set(key, '', {expires: -1});
    };

    /**
     * @param key {string}
     * @param value {string}
     * @param attributes {{}}
     * @returns {boolean}
     */
    this.set = function (key, value, attributes) {

        attributes = attributes || {};

        if (typeof attributes.expires === 'number') {
            /**
             * @type {Date}
             */
            var expires = new Date();
            expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);

            /**
             * @type {Date}
             */
            attributes.expires = expires;
        }

        if (typeof attributes.path == "undefined") {
            /**
             * @type {string}
             */
            attributes.path = '/';
        }

        try {
            var result = JSON.stringify(value);
            if (/^[\{\[]/.test(result)) {
                value = result;
            }
        }
        catch (e) {
        }

        /**
         * @type {string}
         */
        value = encodeURIComponent(String(value))
            .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

        /**
         * @type {string}
         */
        key = encodeURIComponent(String(key));
        key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
        key = key.replace(/[\(\)]/g, encodeURI);

        return (document.cookie = [
                key, '=', value,
                attributes.expires && '; expires=' + attributes.expires.toUTCString(),
                attributes.path && '; path=' + attributes.path,
                attributes.domain && '; domain=' + attributes.domain,
                attributes.secure ? '; secure' : ''
            ].join('')).length > 0;

    };

    /**
     * @param key {string}
     * @returns {*}
     */
    this.get = function (key) {
        var obj = {};
        if (document.cookie.length) {
            var rDecode = /(%[0-9A-Z]{2})+/g;
            document.cookie.split('; ').forEach(function (line) {
                var parts = line.split('=');
                var name = parts[0].replace(rDecode, decodeURIComponent);
                var cookie = parts.slice(1).join('=');
                cookie = cookie.jNTrim('["]+');
                cookie = cookie.replace(rDecode, decodeURIComponent);
                obj[name] = cookie;
            });
        }
        if (typeof key == "undefined") {
            return obj;
        }
        return obj[key];
    };

    return this;

}();
