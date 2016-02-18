/**
 *  @author REZ1DENT3, Babichev Maxim
 *  @site https://babichev.net
 *  @year 2013 - 2016
 *  @version 0.422
 */

/**
 * jNet Framework
 * @constructor
 */
var jNet = new (function () {

    'use strict';

    /**
     * jNToDocument, Converts a line in object (Document)
     * @returns {Document}
     */
    String.prototype.jNToDocument = function () {
        /**
         * @type {DOMParser}
         */
        var domParser = new DOMParser();
        return domParser.parseFromString(this, "text/html");
    };

    /**
     * @param regex
     * @returns {string}
     */
    String.prototype.jNTrim = function (regex) {
        if (typeof regex == 'undefined') {
            return this.trim();
        }
        return this.replace(new RegExp('/^' + regex + '|' + regex + '$/gm'), '');
    };

    /**
     * @param selector
     * @returns {Array}
     */
    this.querySelectorAll = function (selector) {
        var _tmp = new jNet.jNArray();
        var _arr = document.querySelectorAll(selector);
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
         * @returns {*}
         */
        this.first = function () {
            return this.at(0);
        };

        /**
         * @returns {*}
         */
        this.last = function () {
            return this.at(this.length() - 1);
        };

        /**
         * @param key
         * @returns {*}
         */
        this.at = function (key) {
            return this._array[key];
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
                var toStringArr = doc.toString().split(',');
                if (toStringArr.length) {
                    switch (toStringArr[0]) {
                        case jNet.jNDocQuery().toString():
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

        /**
         * @returns {*}
         * @private
         */
        this._call = function () {
            var args = arguments[0];
            if (this._array.length()) {
                var _arr = new jNet.jNArray(this._array.map(function (element) {
                    return element[args.callback].call(element, args);
                }));
                if (_arr.length() == 1) {
                    return _arr.first();
                }
                return _arr;
            }
            return this[args.callback].call(this, args);
        };

        /**
         * @param index
         * @returns {*}
         */
        this.at = function (index) {
            if (this._array.length()) {
                return this._array.at(index);
            }
            return this;
        };

        /**
         * @returns {*}
         */
        this.first = function () {
            if (this._array.length()) {
                return this._array.first();
            }
            return this;
        };

        /**
         * @returns {*}
         */
        this.last = function () {
            if (this._array.length()) {
                return this._array.last();
            }
            return this;
        };

        /**
         * @returns {Window.jNDocQuery}
         */
        this.files = function () {
            return this._call.call(this, {
                callback: '_files'
            });
        };

        /**
         * @returns {files|*|FileList}
         * @private
         */
        this._files = function () {
            return this._d.files;
        };

        /**
         * @param selector
         * @returns {jNDocQuery}
         */
        this.findAll = function (selector) {
            return new jNet.jNDocQuery(this._call.call(this, {
                callback: '_findAll',
                selector: selector
            }));
        };

        /**
         * @param obj
         * @returns {Window.jNArray|*}
         * @private
         */
        this._findAll = function (obj) {
            var _tmp = new jNet.jNArray();
            var _arr = this._d.querySelectorAll(obj.selector);
            for (var i = 0; i < _arr.length; ++i) {
                _tmp.push(new jNet.jNDocQuery(_arr[i]));
            }
            return _tmp;
        };

        /**
         * @param selector
         * @returns {jNDocQuery}
         */
        this.find = function (selector) {
            return this._call.call(this, {
                callback: '_find',
                selector: selector
            });
        };

        /**
         * @param obj
         * @returns {jNDocQuery}
         * @private
         */
        this._find = function (obj) {
            var _tmp = new jNet.jNDocQuery(this._d);
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
         * @private
         */
        this._classList = function () {
            var _classList = this._d.classList;
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
         * @private
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
         * @private
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
         * @private
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
         * @private
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
         * @private
         */
        this._cleanClass = function () {
            var self = this;
            this.classList().forEach(function (element) {
                self.removeClass(element);
            });
            return self;
        };

        /**
         * @param name
         * @param value
         */
        this.css = function (name, value) {
            return this._call.call(this, {
                callback: '_css',
                name: name,
                value: value
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._css = function (obj) {
            if (typeof obj.value == 'undefined') {
                return this._d.style.getPropertyValue(obj.name);
            }
            this._d.style.setProperty(obj.name, obj.value);
            return this;
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
         * @private
         */
        this._parent = function () {
            if (typeof this._d.parentNode != "undefined") {
                this._d = this._d.parentNode;
                return this;
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
         * @private
         */
        this._text = function (obj) {
            if (typeof obj.value != "undefined") {
                try {
                    this._d.innerText = obj.value;
                }
                catch (e) {
                    this._d.value = obj.value;
                }
                return this;
            }
            return this._d.innerText || this._d.value;
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
         * @private
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
         * @private
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
         * @private
         */
        this._append = function (obj) {

            var html = obj.html;
            if (typeof html == 'string') {
                html = html.jNToDocument();
            }
            else {
                switch (html.toString()) {
                    case jNet.jNDocQuery().toString():
                        html = html._outerHTML().jNToDocument();
                        break;
                }
            }

            if (typeof html.outerHTML != 'undefined') {
                html = html.outerHTML.jNToDocument();
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
        this.getAttribute = function (nameAttribute) {
            return this._call.call(this, {
                callback: '_getAttribute',
                nameAttribute: nameAttribute
            });
        };

        /**
         * @param obj
         * @returns {boolean}
         * @private
         */
        this._getAttribute = function (obj) {
            return this._d.getAttribute(obj.nameAttribute);
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
         * @private
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
         * @private
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
         * @private
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
         * @private
         */
        this._height = function () {
            return this._d.clientHeight;
        };

        /**
         * @param nameAttribute
         * @returns {*}
         * @private
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
         * @private
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
         * @private
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
         * @private
         */
        this._ready = function (obj) {
            this._addEventListener("DOMContentLoaded", obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.keypress = function(listener, useCapture) {
            return this._call.call(this, {
                callback: '_keypress',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._keypress = function(obj) {
            this.addEventListener('keypress', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.keydown = function(listener, useCapture) {
            return this._call.call(this, {
                callback: '_keydown',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._keydown = function(obj) {
            this.addEventListener('keydown', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.keyup = function(listener, useCapture) {
            return this._call.call(this, {
                callback: '_keyup',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._keyup = function(obj) {
            this.addEventListener('keyup', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.mousemove = function(listener, useCapture) {
            return this._call.call(this, {
                callback: '_mousemove',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._mousemove = function(obj) {
            this.addEventListener('mousemove', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.mouseover = function(listener, useCapture) {
            return this._call.call(this, {
                callback: '_mouseover',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._mouseover = function(obj) {
            this.addEventListener('mouseover', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.mouseout = function(listener, useCapture) {
            return this._call.call(this, {
                callback: '_mouseout',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._mouseout = function(obj) {
            this.addEventListener('mouseout', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.mousedown = function(listener, useCapture) {
            return this._call.call(this, {
                callback: '_mousedown',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._mousedown = function(obj) {
            this.addEventListener('mousedown', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.mouseup = function(listener, useCapture) {
            return this._call.call(this, {
                callback: '_mouseup',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._mouseup = function(obj) {
            this.addEventListener('mouseup', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.dblclick = function(listener, useCapture) {
            return this._call.call(this, {
                callback: '_dblclick',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._dblclick = function(obj) {
            this.addEventListener('dblclick', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.contextmenu = function(listener, useCapture) {
            return this._call.call(this, {
                callback: '_contextmenu',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._contextmenu = function(obj) {
            this.addEventListener('contextmenu', obj.listener, obj.useCapture);
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
         * @private
         */
        this._click = function (obj) {
            this.addEventListener('click', obj.listener, obj.useCapture);
            return this;
        };


        /**
         * @param listener
         */
        this.submit = function (listener) {
            return this._call.call(this, {
                callback: '_submit',
                listener: listener
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._submit = function (obj) {
            this._d.onsubmit = obj.listener;
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
         * @private
         */
        this._addEventListener = function (obj) {
            this._d.addEventListener(obj.type, obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param type
         * @param listener
         * @param useCapture
         */
        this.removeEventListener = function (type, listener, useCapture) {
            return this._call.call(this, {
                callback: '_removeEventListener',
                type: type,
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @private
         */
        this._removeEventListener = function (obj) {
            this._d.removeEventListener(obj.type, obj.listener, obj.useCapture);
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
     * @returns {*}
     */
    this.jNCookie = function () {

        /**
         * @type {Window.jNArray}
         * @private
         */
        this._cookies = new jNet.jNArray();

        /**
         * @returns {{}}
         * @private
         */
        this._decode = function () {
            var rDecode = /(%[0-9A-Z]{2})+/g;
            var temp = {};
            this._cookies.forEach(function (line) {
                var parts = line.split('=');
                var name = parts[0].replace(rDecode, decodeURIComponent);
                var cookie = parts.slice(1).join('=');
                cookie = cookie.jNTrim('["]+');
                cookie = cookie.replace(rDecode, decodeURIComponent);
                temp[name] = cookie;
            });
            return temp;
        };

        /**
         * @param key
         * @returns {boolean}
         */
        this.remove = function (key) {
            this.set(key, '', {expires: -1});
            return typeof this.get(key) == "undefined";
        };

        /**
         * @param key
         * @param value
         * @param attributes
         * @returns {boolean}
         */
        this.set = function (key, value, attributes) {

            if (typeof attributes == "undefined") {
                /**
                 * @type {{}}
                 */
                attributes = {};
            }

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
                    attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
                    attributes.path && '; path=' + attributes.path,
                    attributes.domain && '; domain=' + attributes.domain,
                    attributes.secure ? '; secure' : ''
                ].join('')).length > 0;

        };

        /**
         * @param key
         * @returns {*}
         */
        this.get = function (key) {
            if (document.cookie.length) {
                this._cookies._array = document.cookie.split('; ');
                var obj = this._decode();
                if (typeof key == "undefined") {
                    return obj;
                }
                return obj[key];
            }
            return {};
        };

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
        return this;
    };

    /**
     * @param options
     * @returns {XMLHttpRequest}
     */
    this.ajax = function (options) {

        /**
         * @type {XMLHttpRequest}
         */
        var http = new XMLHttpRequest();

        /**
         * @type {{}}
         */
        options.data = options.data || {};

        /**
         * @type {{}}
         */
        options.files = options.files || {};

        /**
         * @type {string}
         */
        options.method = options.method || "GET";

        /**
         * @type {string}
         */
        options.contentType = options.contentType || 'application/x-www-form-urlencoded';

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
            };
        }

        if (typeof options.stateChange != "function") {
            /**
             * @param response
             */
            options.stateChange = function (response) {
            };
        }

        if (typeof options.progress != "function") {
            /**
             * @param response
             */
            options.progress = function (response) {
            };
        }

        if (typeof options.fail != "function") {
            /**
             * @param response
             */
            options.fail = function (response) {
            };
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

        var url;

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

        if (options.method == "POST" && Object.keys(options.files).length) {
            var formData = new FormData();
            for (var keyFile in options.files) {
                if (options.files.hasOwnProperty(keyFile)) {
                    formData.append('files[]', options.files[keyFile]);
                }
            }
            for (var keyData in options.data) {
                if (options.data.hasOwnProperty(keyData)) {
                    formData.append(keyData, options.data[keyData]);
                }
            }
            http.send(formData);
        }
        else {
            http.setRequestHeader('Content-Type', options.contentType);
            if (options.method == "GET") {
                http.send();
            }
            else {
                http.send(this.serialize(options.data));
            }
        }

        return http;

    };

    return this;

})();