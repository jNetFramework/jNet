!function (document, _array, fn) {

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
                var parameter = [];
                if (typeof this._selector.toString == "string") {
                    if (this._selector.toString == this.toString) {
                        _array.push.apply(this, this._selector);
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
                _array.splice();
                _array.push.apply(this, parameter);
                this._find = true;
                return this;
            }
        },

        toQuery: function (name, value) {
            return name + "=" + encodeURIComponent(value).replace(/%20/g, '+');
        },

        objSerialize: function (objData) {
            var self = this;
            return Object.keys(objData).map(function (key) {
                return self.toQuery(key, objData[key]);
            }).join('&');
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
                        for (var i = 0; i < temp.length; ++i) {
                            res.push(temp[i]);
                        }
                    }
                    else {
                        res.push(temp);
                    }
                }
            });
            return jNet(res);
        },

        eq: function (index) {
            return jNet(this[index]);
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
                }
            });
        },

        hasClass: function (className) {
            return this._call.call(this, {
                callback: function (obj) {
                    return obj.document.classList.contains(obj.className);
                },
                className: className
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
                value: value
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
                value: value
            });
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
                value: value
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
                value: value
            });
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

        on: function (type, listener, useCapture) {
            this.each(function (index, element) {
                element.addEventListener(type, listener, useCapture);
            })
        },

        off: function (type, listener, useCapture) {
            this.each(function (index, element) {
                element.removeEventListener(type, listener, useCapture);
            })
        },

        ready: function (listener, useCapture) {
            return this.on("DOMContentLoaded", listener, useCapture);
        },

        ajax: function (options) {

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

                if (options.data.toString() === '[jNDocQuery]') {
                    options.data = options.data.first().objSerialize(options.method);
                }
                else {
                    switch (options.method) {
                        case 'GET':
                        case 'DELETE':
                            options.data = this.objSerialize(options.data);
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

        },

        toString: "jNet"

    };

    window.jNet = document.jNet = jNet;

}(document, [], 'prototype');