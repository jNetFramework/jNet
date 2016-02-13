/**
 *  @author REZ1DENT3, Babichev Maxim
 *  @site https://babichev.net
 *  @year 2013 - 2016
 *  @version 0.4
 */

var jNet = new (function () {

    /**
     * @returns {Document}
     */
    String.prototype.toDocument = function () {
        domParser = new DOMParser();
        return domParser.parseFromString(this, "text/html");
    };

    /**
     * @param selector
     * @returns {Array}
     */
    this.querySelectorAll = function (selector) {
        _tmp = new jNet.jNArray();
        _arr = document.querySelectorAll(selector);
        for (var i = 0; i < _arr.length; ++i) {
            _tmp.push(new jNet.jNDocQuery(_arr[i]));
        }
        return _tmp;
    };

    /**
     * @param data
     * @returns {*}
     */
    this.jNArray = function (data) {

        /**
         * @type {Array}
         * @private
         */
        this._array = [];

        if (typeof data != "undefined") {
            this._array = data;
        }

        /**
         * @param index
         * @returns {*}
         */
        this.at = function (index) {
            return this._array[index];
        };

        /**
         * @returns {Array}
         */
        this.unique = function () {
            var ko = {};
            this.forEach(function (item) {
                ko[item] = 1;
            });
            return Object.keys(ko);
        };

        /**
         * @param a
         * @returns {Array.<T>|*}
         */
        this.diff = function (a) {
            return this.filter(function (i) {
                return a.indexOf(i) < 0;
            });
        };

        /**
         * @param item
         */
        this.remove = function (item) {
            this.splice(this.indexOf(item), 1);
        };

        /**
         * @param item
         * @returns {boolean}
         */
        this.contains = function (item) {
            return (this.indexOf(item) != -1);
        };

        /**
         * @returns {Number}
         */
        this.length = function () {
            return this._array.length;
        };

        /**
         * @param items
         * @returns {Array.<T>}
         */
        this.concat = function (items) {
            return this._array.concat(items);
        };

        /**
         * @param separator
         * @returns {string}
         */
        this.join = function (separator) {
            return this._array.join(separator);
        };

        /**
         * @returns {T}
         */
        this.pop = function () {
            return this._array.pop();
        };

        /**
         * @param items
         * @returns {Number}
         */
        this.push = function (items) {
            return this._array.push(items);
        };

        /**
         * @returns {Array.<T>}
         */
        this.reverse = function () {
            return this._array.reverse();
        };

        /**
         * @returns {T}
         */
        this.shift = function () {
            return this._array.shift();
        };

        /**
         * @param start
         * @param end
         * @returns {Array.<T>}
         */
        this.slice = function (start, end) {
            return this._array.slice(start, end);
        };

        /**
         * @param compareFn
         * @returns {boolean}
         */
        this.sort = function (compareFn) {
            return this._array.some(compareFn);
        };

        /**
         * @param start
         * @param deleteCount
         * @param items
         * @returns {Array.<T>}
         */
        this.splice = function (start, deleteCount, items) {
            return this._array.splice(start, deleteCount, items);
        };

        /**
         * @param items
         * @returns {Number}
         */
        this.unshift = function (items) {
            return this._array.unshift(items);
        };

        /**
         * @returns {Array}
         */
        this.valueOf = function () {
            return this._array.valueOf();
        };

        /**
         * @param callback
         * @param initialValue
         * @returns {*}
         */
        this.reduce = function (callback, initialValue) {
            return this._array.reduce(callback, initialValue);
        };

        /**
         * @param callback
         * @param initialValue
         * @returns {*}
         */
        this.reduceRight = function (callback, initialValue) {
            return this._array.reduceRight(callback, initialValue);
        };

        /**
         * @param searchElement
         * @param fromIndex
         * @returns {number}
         */
        this.indexOf = function (searchElement, fromIndex) {
            return this._array.indexOf(searchElement, fromIndex);
        };

        /**
         * @param searchElement
         * @param fromIndex
         * @returns {number}
         */
        this.lastIndexOf = function (searchElement, fromIndex) {
            return this._array.lastIndexOf(searchElement, fromIndex);
        };

        /**
         * @param callback
         * @param thisArg
         * @returns {boolean}
         */
        this.every = function (callback, thisArg) {
            return this._array.every(callback, thisArg);
        };

        /**
         * @param callback
         * @param thisArg
         * @returns {Array.<T>}
         */
        this.filter = function (callback, thisArg) {
            return this._array.filter(callback, thisArg);
        };

        /**
         * @param callback
         * @param thisArg
         */
        this.forEach = function (callback, thisArg) {
            return this._array.forEach(callback, thisArg);
        };

        /**
         * @param callback
         * @param thisArg
         * @returns {Array}
         */
        this.map = function (callback, thisArg) {
            return this._array.map(callback, thisArg);
        };

        /**
         * @param callback
         * @param thisArg
         * @returns {boolean}
         */
        this.some = function (callback, thisArg) {
            return this._array.some(callback, thisArg);
        };

        /**
         * @returns {string}
         */
        this.toString = function () {
            return '[jNArray]';
        };

        return this;

    };

    /**
     * @param doc
     * @returns {*}
     */
    this.jNDocQuery = function (doc) {

        /**
         * @type {Window.jNArray}
         * @private
         */
        this._array = new jNet.jNArray();

        /**
         * @private
         */
        this._d = doc;

        switch (typeof doc) {

            case 'object':
                toStringArr = doc.toString().split(',');
                if (toStringArr.length) {
                    switch (toStringArr[0]) {
                        case this.toString():
                            return doc;

                        case jNet.jNArray().toString():
                            this._array = doc;
                            this._d = null;
                            break;
                    }
                }
                break;

            case 'string':
                this._d = document.querySelector(doc);
                break;

        }

        this._call = function () {
            if (typeof this._array != "undefined" && this._array.length()) {
                var args = arguments[0];
                return new jNet.jNArray(this._array.map(function (element) {
                    return element[args.callback].call(element, args);
                }));
            }
            else {
                return this[arguments[0].callback].call(this, arguments[0]);
            }
        };

        /**
         * @param selector
         * @returns {jNDocQuery}
         */
        this.querySelector = function (selector) {
            return this._call.call(this, {
                callback: '_querySelector',
                selector: selector
            });
        };

        /**
         * @param obj
         * @returns {jNDocQuery}
         */
        this._querySelector = function (obj) {
            _tmp = new jNet.jNDocQuery(this._d);
            _tmp._d = this._d.querySelector(obj.selector);
            return _tmp;
        };

        /**
         * @returns {string}
         */
        this.toString = function () {
            return '[jNDocQuery]';
        };

        /**
         * @returns {Array}
         */
        this.classList = function () {
            return this._call.call(this, {
                callback: '_classList'
            });
        };

        /**
         * @returns {Array}
         */
        this._classList = function () {
            _classList = this._d.classList;
            if (typeof _classList == 'undefined') {
                return new jNet.jNArray();
            }
            return new jNet.jNArray(Object.keys(_classList).map(function (key) {
                return _classList[key]
            }));
        };

        /**
         * @param newClass
         * @returns {*}
         */
        this.addClass = function (newClass) {
            return this._call.call(this, {
                callback: '_addClass',
                newClass: newClass
            });
        };

        /**
         * @param obj
         * @returns {*}
         */
        this._addClass = function (obj) {
            this._d.classList.add(obj.newClass);
            return this;
        };

        /**
         * @param className
         * @returns {*}
         */
        this.removeClass = function (className) {
            return this._call.call(this, {
                callback: '_removeClass',
                className: className
            });
        };

        /**
         * @param obj
         * @returns {*}
         */
        this._removeClass = function (obj) {
            this._d.classList.remove(obj.className);
            return this;
        };

        /**
         * @param className
         * @returns {boolean}
         */
        this.hasClass = function (className) {
            return this._call.call(this, {
                callback: '_hasClass',
                className: className
            });
        };

        /**
         * @param obj
         * @returns {boolean}
         */
        this._hasClass = function (obj) {
            return this.classList().contains(obj.className);
        };

        /**
         * @param className
         * @returns {*}
         */
        this.toggleClass = function (className) {
            return this._call.call(this, {
                callback: '_toggleClass',
                className: className
            });
        };

        /**
         * @param obj
         * @returns {*}
         */
        this._toggleClass = function (obj) {
            this._d.classList.toggle(obj.className);
            return this;
        };

        /**
         * @returns {*}
         */
        this.cleanClass = function () {
            return this._call.call(this, {
                callback: '_cleanClass'
            });
        };

        /**
         * @returns {*}
         */
        this._cleanClass = function () {
            var self = this;
            this.classList().forEach(function (element) {
                self.removeClass(element);
            });
            return self;
        };

        /**
         * @returns {*}
         */
        this.parent = function () {
            return this._call.call(this, {
                callback: '_parent'
            });
        };

        /**
         * @returns {*}
         */
        this._parent = function () {
            if (typeof this._d.parentNode != "undefined") {
                return jNet.jNDocQuery(this._d.parentNode);
            }
            return undefined;
        };

        /**
         * @param value
         * @returns string|{*}
         */
        this.text = function (value) {
            return this._call.call(this, {
                callback: '_text',
                value: value
            });
        };

        /**
         * @param obj
         * @returns string|{*}
         */
        this._text = function (obj) {
            if (typeof obj.value != "undefined") {
                this._d.innerText = obj.value;
                return this;
            }
            return this._d.innerText;
        };

        /**
         * @param value
         * @returns string|{*}
         */
        this.innerHTML = function (value) {
            return this._call.call(this, {
                callback: '_innerHTML',
                value: value
            });
        };

        /**
         * @param obj
         * @returns string|{*}
         */
        this._innerHTML = function (obj) {
            if (typeof obj.value != "undefined") {
                this._d.innerHTML = obj.value;
                return this;
            }
            return this._d.innerHTML;
        };

        /**
         * @param value
         * @returns string|{*}
         */
        this.outerHTML = function (value) {
            return this._call.call(this, {
                callback: '_outerHTML',
                value: value
            });
        };

        /**
         * @param obj
         * @returns string|{*}
         */
        this._outerHTML = function (obj) {
            if (typeof obj.value != "undefined") {
                this._d.outerHTML = obj.value;
                return this;
            }
            return this._d.outerHTML;
        };

        /**
         * @param html
         * @returns {*}
         */
        this.append = function (html) {
            return this._call.call(this, {
                callback: '_append',
                html: html
            });
        };

        /**
         * @param obj
         * @returns {*}
         */
        this._append = function (obj) {

            html = obj.html;
            if (typeof html == 'string') {
                html = html.toDocument();
            }
            else {
                switch (html.toString()) {
                    case this.toString():
                        html = html._outerHTML().toDocument();
                        break;
                }
            }

            if (typeof html.outerHTML != 'undefined') {
                html = html.outerHTML.toDocument();
            }

            if (typeof html.body.firstChild != 'undefined') {
                this._d.appendChild(html.body.firstChild);
            }

            return this;
        };

        /**
         * @param nameAttribute
         * @returns {boolean}
         */
        this.hasAttribute = function (nameAttribute) {
            return this._call.call(this, {
                callback: '_hasAttribute',
                nameAttribute: nameAttribute
            });
        };

        /**
         * @param obj
         * @returns {boolean}
         */
        this._hasAttribute = function (obj) {
            return this._d.hasAttribute(obj.nameAttribute);
        };

        /**
         * @param nameAttribute
         * @param valueAttribute
         * @returns {*}
         */
        this.addAttribute = function (nameAttribute, valueAttribute) {
            return this._call.call(this, {
                callback: '_addAttribute',
                nameAttribute: nameAttribute,
                valueAttribute: valueAttribute
            });
        };

        /**
         * @param obj
         * @returns {*}
         */
        this._addAttribute = function (obj) {
            this._d.setAttribute(obj.nameAttribute, obj.valueAttribute);
            return this;
        };

        /**
         * @returns {number}
         */
        this.width = function () {
            return this._call.call(this, {
                callback: '_width'
            });
        };

        /**
         * @returns {number}
         */
        this._width = function () {
            return this._d.clientWidth;
        };

        /**
         * @returns {number}
         */
        this.height = function () {
            return this._call.call(this, {
                callback: '_height'
            });
        };

        /**
         * @returns {number}
         */
        this._height = function () {
            return this._d.clientHeight;
        };

        /**
         * @param nameAttribute
         * @returns {*}
         */
        this.removeAttribute = function (nameAttribute) {
            return this._call.call(this, {
                callback: '_removeAttribute',
                nameAttribute: nameAttribute
            });
        };

        /**
         * @param obj
         * @returns {*}
         */
        this._removeAttribute = function (obj) {
            if (this._hasAttribute(obj.nameAttribute)) {
                this._d.removeAttribute(obj.nameAttribute);
            }
            return this;
        };

        /**
         * @returns {*}
         */
        this.remove = function () {
            return this._call.call(this, {
                callback: '_remove'
            });
        };

        /**
         * @returns {*}
         */
        this._remove = function () {
            if (typeof this.parentNode == 'undefined') {
                this._outerHTML("");
            }
            else {
                this._d.parentNode.removeChild(this._d);
            }
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         */
        this.ready = function (listener, useCapture) {
            return this._call.call(this, {
                callback: '_ready',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         */
        this._ready = function (obj) {
            this._addEventListener("DOMContentLoaded", obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         */
        this.click = function (listener, useCapture) {
            return this._call.call(this, {
                callback: '_click',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         */
        this._click = function (obj) {
            this.addEventListener('click', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param type
         * @param listener
         * @param useCapture
         */
        this.addEventListener = function (type, listener, useCapture) {
            return this._call.call(this, {
                callback: '_addEventListener',
                type: type,
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         */
        this._addEventListener = function (obj) {
            this._d.addEventListener(obj.type, obj.listener, obj.useCapture);
            return this;
        };

        return this;

    };

    /**
     * @param objData
     * @returns {string}
     */
    this.serialize = function (objData) {
        return Object.keys(objData).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(objData[key]);
        }).join('&');
    };

    /**
     * @param options
     */
    this.ajax = function (options) {

        /**
         * @type {XMLHttpRequest}
         */
        var http = new XMLHttpRequest();

        if (typeof options.data == "undefined") {
            /**
             * @type {{}}
             */
            options.data = {};
        }

        if (typeof options.method == "undefined") {
            /**
             * @type {string}
             */
            options.method = "GET";
        }

        if (typeof options.contentType == "undefined") {
            /**
             * @type {string}
             */
            options.contentType = 'application/x-www-form-urlencoded';
        }

        if (typeof options.async == "undefined") {
            /**
             * @type {boolean}
             */
            options.async = true
        }

        if (typeof options.success != "function") {
            /**
             * @param response
             */
            options.success = function (response) {
            }
        }

        if (typeof options.stateChange != "function") {
            /**
             * @param response
             */
            options.stateChange = function (response) {
            }
        }

        if (typeof options.progress != "function") {
            /**
             * @param response
             */
            options.progress = function (response) {
            }
        }

        if (typeof options.fail != "function") {
            /**
             * @param response
             */
            options.fail = function (response) {
            }
        }

        /**
         * @type {options.stateChange|*}
         */
        http.onreadystatechange = options.stateChange;

        /**
         * @type {options.success|*}
         */
        http.onload = options.success;

        /**
         * @type {options.fail|*}
         */
        http.onerror = options.fail;

        /**
         * @type {options.progress|*}
         */
        http.onprogress = options.progress;

        if (options.method == "GET") {
            /**
             * @type {string}
             */
            url = options.url + "?" + this.serialize(options.data);
        }
        else {
            /**
             * @type {string|string}
             */
            url = options.url
        }

        http.open(options.method, url, options.async);
        http.setRequestHeader('Content-Type', options.contentType);

        if (options.method == "GET") {
            http.send();
        }
        else {
            http.send(this.serialize(options.data));
        }

        return http;

    };

    this.cookie = function() {
        // todo
        return this;
    };

    /**
     * @returns {number}
     */
    this.now = function () {
        return Math.floor((new Date()).getTime() / 1000);
    };

    /**
     * @param obj
     */
    this.clone = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };

    /**
     * @param listener
     * @param useCapture
     */
    this.ready = function (listener, useCapture) {
        document.addEventListener("DOMContentLoaded", listener, useCapture);
    };

    return this;

})();