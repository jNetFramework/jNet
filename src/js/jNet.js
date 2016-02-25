!function (window, document, module) {

    if (typeof define === "function" && define.amd) {
        define(function () {
            return module;
        });
    } else {
        document.jNet = window.jNet = module.jNet;
    }

}(window, document, {

    jNet: function (document, fn) {

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

                while (this.length) {
                    delete this[this.length - 1];
                }

                var parameter = [];
                if (typeof this._selector.toString == "string" &&
                    this._selector.toString == this.toString) {
                    parameter = this._selector;
                }
                else {
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
                }

                Array.prototype.push.apply(this, parameter);
                this._find = true;
                return this;

            },

            _call: function () {

                var args = arguments[0];
                var res = [];

                this.each(function (key, element) {
                    args.document = element;
                    args.docInd = key;
                    var temp = args.callback.call(this, args);
                    if (typeof temp !== "undefined" && temp != null) {
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
                if (typeof selector == "undefined") {
                    selector = '*';
                }
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
                    jNetToType: "string"
                });
            },

            append: function (html) {
                return this._call.call(this, {
                    callback: this._prependAppend,
                    _html: html,
                    type: 'append'
                });
            },

            prepend: function (html) {
                return this._call.call(this, {
                    callback: this._prependAppend,
                    _html: html,
                    type: 'prepend'
                });
            },

            _prependAppend: function (obj) {

                var html = obj._html;
                if (typeof html == 'string') {
                    html = [html.parseHTML()];
                }
                else if (typeof html == "object" && html.toString !== 'jNet') {
                    html = [html];
                }

                jNet.each(html, function (key, _html) {

                    var data = _html;
                    if (typeof _html.body != 'undefined' && typeof _html.body.firstChild != 'undefined') {
                        data = _html.body.firstChild;
                    }
                    else if (typeof _html.body != 'undefined') {
                        data = _html.body;
                    }

                    if (obj.type == 'prepend') {
                        obj.document.insertBefore(data, obj.document.firstChild);
                    }
                    else if (obj.type == 'append') {
                        obj.document.appendChild(data);
                    }
                });

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
                    jNetToType: "string"
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
                    jNetToType: "string"
                });
            },

            data: function (nameAttribute, valueAttribute) {

                if (typeof nameAttribute == "undefined") {
                    return this._call.call(this, {
                        callback: function (obj) {
                            return obj.document.dataset;
                        },
                        jNetToType: "array"
                    });
                }

                if (typeof valueAttribute == "undefined") {
                    return this._call.call(this, {
                        callback: function (obj) {
                            return obj.document.dataset[obj.nameAttribute];
                        },
                        nameAttribute: nameAttribute,
                        jNetToType: "array"
                    })
                }

                return this._call.call(this, {
                    callback: function (obj) {
                        obj.document.dataset[obj.nameAttribute] = obj.valueAttribute;
                        return this;
                    },
                    nameAttribute: nameAttribute,
                    valueAttribute: valueAttribute
                });

            },

            attr: function (nameAttribute, valueAttribute) {

                if (typeof valueAttribute == "undefined") {
                    return this._call.call(this, {
                        callback: function (obj) {
                            return obj.document.getAttribute(obj.nameAttribute);
                        },
                        nameAttribute: nameAttribute,
                        jNetToType: "string"
                    })
                }

                if (valueAttribute == null || valueAttribute == '') {
                    return this._call.call(this, {
                        callback: function (obj) {
                            if (this.hasAttribute(obj.nameAttribute)) {
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
                        obj.element[0].parentNode.insertBefore(obj.document, obj.element[0]);
                    },
                    element: element.first()
                });
            },

            each: function (arr, callback) {

                var isArray = Array.isArray(arr) ||
                    (typeof arr.toString == "string" && arr.toString == "jNet");

                if (typeof callback == "undefined") {
                    callback = arr;
                    arr = this.getDocuments();
                    isArray = true;
                }

                if (isArray) {
                    var length = arr.length;
                    for (var i = 0; i < length; ++i) {
                        callback.call(arr[i], i, arr[i]);
                    }
                }
                else {
                    Object.keys(arr).forEach(function (key, value) {
                        callback.call(value, key, value);
                    });
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

        return jNet;

    }(document, 'prototype')

});

jNet.each = jNet.fn.each;

jNet.now = function () {
    return Math.floor((new Date()).getTime() / 1000);
};

jNet.each([
    'click', 'contextmenu', 'dblclick',
    'mouseup', 'mousedown', 'mouseout', 'mouseover', 'mousemove',
    'keyup', 'keydown', 'keypress',
    'copy',
    'selectstart', 'selectionchange', 'select'
], function (index, prop) {

    jNet.fn[prop] = function (listener, useCapture) {
        return this.on(prop, listener, useCapture);
    };
});
