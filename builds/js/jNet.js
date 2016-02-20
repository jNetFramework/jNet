/**
 *  @author REZ1DENT3, Babichev Maxim
 *  @site https://babichev.net
 *  @year 2013 - 2016
 *  @version 0.577
 *  @build 1308
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

        toQuery: function (name, value) {
            return name + "=" + encodeURIComponent(value).replace(/%20/g, '+');
        },

        now: function () {
            return Math.floor((new Date()).getTime() / 1000);
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
                                                query.push(jNet.toQuery(field.name, field.options[j].value));
                                            }
                                        }
                                    }
                                    else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                                        query.push(jNet.toQuery(field.name, field.value));
                                    }
                                }
                            }
                        }
                        return query.join('&');
                    }
                    return new FormData(form);
                },
                method: method
            });
        },

        files: function () {
            return this._call.call(this, {
                callback: function (obj) {
                    return obj.document.files;
                }
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
                return this.getAttribute(nameAttribute);
            }
            return this.setAttribute(nameAttribute, valueAttribute);
        },

        getAttribute: function (nameAttribute) {
            return this._call.call(this, {
                callback: this._getAttribute,
                nameAttribute: nameAttribute
            });
        },

        _getAttribute: function (obj) {
            return obj.document.getAttribute(obj.nameAttribute);
        },

        hasAttribute: function (nameAttribute) {
            return this._call.call(this, {
                callback: this._hasAttribute,
                nameAttribute: nameAttribute
            });
        },

        _hasAttribute: function (obj) {
            return obj.document.hasAttribute(obj.nameAttribute);
        },

        setAttribute: function (nameAttribute, valueAttribute) {
            return this._call.call(this, {
                callback: this._setAttribute,
                nameAttribute: nameAttribute,
                valueAttribute: valueAttribute
            });
        },

        _setAttribute: function (obj) {
            obj.document.setAttribute(obj.nameAttribute, obj.valueAttribute);
            return this;
        },

        removeAttribute: function (nameAttribute) {
            return this._call.call(this, {
                callback: this._removeAttribute,
                nameAttribute: nameAttribute
            });
        },

        _removeAttribute: function (obj) {
            if (this._hasAttribute(obj.nameAttribute)) {
                obj.document.removeAttribute(obj.nameAttribute);
            }
            return this;
        },

        width: function () {
            return this._call.call(this, {
                callback: this._width
            });
        },

        _width: function () {
            return obj.document.clientWidth;
        },

        height: function () {
            return this._call.call(this, {
                callback: this._height
            });
        },

        _height: function () {
            return obj.document.clientHeight;
        },

        get: function (options) {
            return this._call.call(this, {
                callback: this._get,
                options: options
            });
        },

        _get: function (obj) {
            obj.options.method = 'GET';
            obj.options.data = this;
            jNet.ajax(obj.options);
        },

        post: function (options) {
            return this._call.call(this, {
                callback: this._post,
                options: options
            });
        },

        _post: function (obj) {
            obj.options.method = 'POST';
            obj.options.data = this;
            jNet.ajax(obj.options);
        },

        remove: function () {
            return this._call.call(this, {
                callback: this._remove
            });
        },

        _remove: function () {
            if (typeof obj.document.parentNode == 'undefined') {
                this.outerHTML('');
            }
            else {
                obj.document.parentNode.removeChild(obj.document);
            }
            return this;
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
            return this;
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
            var self = this;
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
                    options.complete(self);
                }
            }, options.delay || 10);
            return id;
        },

        show: function (duration) {
            return this.fadeIn({
                duration: duration,
                complete: function (target) {
                    target._document.style.display = '';
                }
            });
        },

        hide: function (duration) {
            return this.fadeOut({
                duration: duration,
                complete: function (target) {
                    target._document.style.display = 'none';
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

            if (typeof obj.options.easing !== "string") {
                obj.options.easing = "swing";
            }

            self.animate({
                duration: obj.options.duration,
                delta: function (progress) {
                    progress = this.progress;
                    return self._easing()[obj.options.easing](progress, 0);
                },
                complete: obj.options.complete,
                step: function (delta) {
                    if (obj.to) { // Out
                        obj.document.style.opacity = obj.to - delta;
                    }
                    else { // In
                        obj.document.style.opacity = obj.to + delta;
                    }
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
            options.data = options.data.first().serialize(options.method);
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
