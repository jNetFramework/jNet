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
     * @param min {int}
     * @param max {int}
     * @returns {*}
     */
    Math.rand = function (min, max) {
        return this.floor(this.random() * (max - min + 1)) + min;
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
         * @returns {Array.<T>|*}
         */
        this.clone = function () {
            return new jNet.jNArray(this.slice());
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
         * @returns {*}
         */
        this.shuffle = function () {
            var shuffle = this.clone();
            shuffle.sort(function (a, b) {
                return Math.random() - 0.5;
            });
            return shuffle;
        };

        /**
         * @param a
         * @returns {Array.<T>|*}
         */
        this.diff = function (a) {
            return this.filter(function (i) {
                return a.indexOf(i) === -1;
            });
        };

        /**
         * @param item
         */
        this.remove = function (item) {
            this.splice(this.indexOf(item), 1);
            return this;
        };

        /**
         * @param item
         * @returns {boolean}
         */
        this.contains = function (item) {
            return this.indexOf(item) !== -1;
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
            return this._array.sort(compareFn);
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
            this._array.forEach(callback, thisArg);
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
         * @param callback
         * @returns {*}
         */
        this.each = function (callback) {
            if (this._array.length()) {
                this._array.forEach(callback);
            }
            else {
                callback(this, null);
            }
            return this;
        };

        /**
         * @returns {*}
         */
        this.reverse = function () {
            if (this._array.length()) {
                return this._array.reverse();
            }
            return this;
        };

        /**
         * Alias at
         *
         * @param index
         * @returns {*}
         */
        this.eq = function (index) {
            return this.at(index);
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
         * @param callback
         * @returns {*}
         */
        this.odd = function (callback) {
            this.each(function ($element, key) {
                if (key % 2) {
                    callback($element);
                }
            });
            return this;
        };

        /**
         * @param callback
         * @returns {*}
         */
        this.even = function (callback) {
            this.each(function ($element, key) {
                if (!(key % 2)) {
                    callback($element);
                }
            });
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
         * @param $element
         * @returns {*}
         */
        this.insertAfter = function ($element) {
            $element = new jNet.jNDocQuery($element);
            return this._call.call(this, {
                callback: '_insertAfterBefore',
                element: $element.first(),
                insertBefore: false
            });
        };

        /**
         * @param $element
         * @returns {*}
         */
        this.insertBefore = function ($element) {
            $element = new jNet.jNDocQuery($element);
            return this._call.call(this, {
                callback: '_insertAfterBefore',
                element: $element.first(),
                insertBefore: true
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._insertAfterBefore = function (obj) {
            obj.element._d.parentNode.insertBefore(this._d, obj.element._d.nextSibling);
            if (obj.insertBefore) {
                this._d.parentNode.insertBefore(obj.element._d, this._d.nextSibling);
            }
            return this;
        };

        /**
         * @param html
         * @returns {*}
         */
        this.append = function (html) {
            return this._call.call(this, {
                callback: '_prependAppend',
                html: html,
                type: 'append'
            });
        };

        /**
         * @param html
         * @returns {*}
         */
        this.prepend = function (html) {
            return this._call.call(this, {
                callback: '_prependAppend',
                html: html,
                type: 'prepend'
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._prependAppend = function (obj) {

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
                if (obj.type == 'prepend') {
                    this._d.insertBefore(html.body.firstChild, this._d.firstChild);
                }
                else if (obj.type == 'append') {
                    this._d.appendChild(html.body.firstChild);
                }
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
            if (typeof this._d.parentNode == 'undefined') {
                this.outerHTML("");
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
         * @returns {*}
         */
        this.cleanSelection = function () {
            var $selection = this.getSelection();
            if (typeof $selection.empty == "function") {
                $selection.empty();
            }
            else if (typeof $selection.removeAllRanges == "function") {
                $selection.removeAllRanges();
            }
            return this;
        };

        /**
         * @returns {Selection}
         */
        this.getSelection = function () {
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
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.select = function (listener, useCapture) {
            return this._call.call(this, {
                callback: '_select',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._select = function (obj) {
            this.addEventListener('select', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.selectionchange = function (listener, useCapture) {
            return this._call.call(this, {
                callback: '_selectionchange',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._selectionchange = function (obj) {
            this.addEventListener('selectionchange', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.selectstart = function (listener, useCapture) {
            return this._call.call(this, {
                callback: '_selectstart',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._selectstart = function (obj) {
            this.addEventListener('selectstart', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.copy = function (listener, useCapture) {
            return this._call.call(this, {
                callback: '_copy',
                listener: listener,
                useCapture: useCapture
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._copy = function (obj) {
            this.addEventListener('copy', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.keypress = function (listener, useCapture) {
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
        this._keypress = function (obj) {
            this.addEventListener('keypress', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.keydown = function (listener, useCapture) {
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
        this._keydown = function (obj) {
            this.addEventListener('keydown', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.keyup = function (listener, useCapture) {
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
        this._keyup = function (obj) {
            this.addEventListener('keyup', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.mousemove = function (listener, useCapture) {
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
        this._mousemove = function (obj) {
            this.addEventListener('mousemove', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.mouseover = function (listener, useCapture) {
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
        this._mouseover = function (obj) {
            this.addEventListener('mouseover', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.mouseout = function (listener, useCapture) {
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
        this._mouseout = function (obj) {
            this.addEventListener('mouseout', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.mousedown = function (listener, useCapture) {
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
        this._mousedown = function (obj) {
            this.addEventListener('mousedown', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.mouseup = function (listener, useCapture) {
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
        this._mouseup = function (obj) {
            this.addEventListener('mouseup', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.dblclick = function (listener, useCapture) {
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
        this._dblclick = function (obj) {
            this.addEventListener('dblclick', obj.listener, obj.useCapture);
            return this;
        };

        /**
         * @param listener
         * @param useCapture
         * @returns {*}
         */
        this.contextmenu = function (listener, useCapture) {
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
        this._contextmenu = function (obj) {
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
         * Alias addEventListener
         *
         * @param type
         * @param listener
         * @param useCapture
         */
        this.on = function (type, listener, useCapture) {
            return this.addEventListener(type, listener, useCapture);
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
         * Alias removeEventListener
         *
         * @param type
         * @param listener
         * @param useCapture
         */
        this.off = function (type, listener, useCapture) {
            return this.removeEventListener(type, listener, useCapture);
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

        /**
         * @returns {*}
         * @private
         */
        this._easing = function () {

            /**
             * @param progress
             * @returns {*}
             */
            this.linear = function (progress) {
                return progress;
            };

            /**
             * @param progress
             * @returns {number}
             */
            this.quadratic = function (progress) {
                return Math.pow(progress, 2);
            };

            /**
             * @param progress
             * @returns {number}
             */
            this.swing = function (progress) {
                return 0.5 - Math.cos(progress * Math.PI) / 2;
            };

            /**
             * @param progress
             * @returns {number}
             */
            this.circ = function (progress) {
                return 1 - Math.sin(Math.acos(progress));
            };

            /**
             * @param progress
             * @param x
             * @returns {number}
             */
            this.back = function (progress, x) {
                return Math.pow(progress, 2) * ((x + 1) * progress - x);
            };

            /**
             * @param progress
             * @returns {number}
             */
            this.bounce = function (progress) {
                for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                    if (progress >= (7 - 4 * a) / 11) {
                        return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                    }
                }
            };

            /**
             * @param progress
             * @param x
             * @returns {number}
             */
            this.elastic = function (progress, x) {
                return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
            };

            return this;

        };

        /**
         * @param options
         * @returns {number}
         */
        this.animate = function (options) {

            /**
             * @type {Date}
             */
            var start = new Date;

            /**
             * @type {number}
             */
            var id = setInterval(function () {

                /**
                 * @type {number}
                 */
                var timePassed = new Date - start;

                /**
                 * @type {number}
                 */
                var progress = timePassed / options.duration;

                if (progress > 1) {
                    progress = 1;
                }

                /**
                 * @type {number}
                 */
                options.progress = progress;
                var delta = options.delta(progress);
                options.step(delta);

                if (progress == 1) {
                    clearInterval(id);
                    options.complete();
                }

            }, options.delay || 10);

            return id;

        };

        /**
         * @param duration
         * @returns {*}
         */
        this.show = function (duration) {
            return this._call.call(this, {
                callback: '_show',
                duration: duration
            });
        };

        /**
         * @param obj
         * @returns {*|{opacity}}
         * @private
         */
        this._show = function (obj) {
            var self = this;
            if (self._d.style.display !== 'none') {
                return this;
            }
            return this.fadeIn({
                duration: obj.duration,
                complete: function () {
                    self._d.style.display = '';
                }
            });
        };

        /**
         * @param duration
         * @returns {*}
         */
        this.hide = function (duration) {
            return this._call.call(this, {
                callback: '_hide',
                duration: duration
            });
        };

        /**
         * @param obj
         * @returns {*|{opacity}}
         * @private
         */
        this._hide = function (obj) {
            var self = this;
            if (self._d.style.display === 'none') {
                return this;
            }
            return this.fadeOut({
                duration: obj.duration,
                complete: function () {
                    self._d.style.display = 'none';
                }
            });
        };

        /**
         * @param options
         * @returns {*}
         */
        this.fadeIn = function (options) {
            return this._call.call(this, {
                callback: '_fadeUniversal',
                options: options,
                to: 0
            });
        };

        /**
         * @param options
         * @returns {*}
         */
        this.fadeOut = function (options) {
            return this._call.call(this, {
                callback: '_fadeUniversal',
                options: options,
                to: 1
            });
        };

        /**
         * @param obj
         * @returns {*}
         * @private
         */
        this._fadeUniversal = function (obj) {

            var self = this;

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

            this.animate({
                duration: obj.options.duration,
                delta: function (progress) {
                    progress = this.progress;
                    return self._easing()[obj.options.easing](progress, 0);
                },
                complete: obj.options.complete,
                step: function (delta) {
                    if (obj.to) { // Out
                        self._d.style.opacity = obj.to - delta;
                    }
                    else { // In
                        self._d.style.opacity = obj.to + delta;
                    }
                }
            });

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
                    attributes.expires && '; expires=' + attributes.expires.toUTCString(),
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
                var rDecode = /(%[0-9A-Z]{2})+/g;
                var obj = {};
                this._cookies.forEach(function (line) {
                    var parts = line.split('=');
                    var name = parts[0].replace(rDecode, decodeURIComponent);
                    var cookie = parts.slice(1).join('=');
                    cookie = cookie.jNTrim('["]+');
                    cookie = cookie.replace(rDecode, decodeURIComponent);
                    obj[name] = cookie;
                });
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
        if (Array.isArray(obj)) {
            return obj.splice();
        }
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
         * @type {string|null}
         */
        options.user = options.user || null;

        /**
         * @type {string|null}
         */
        options.password = options.password || null;

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

        var query = this.serialize(options.data);
        if (query && (options.method === 'GET' || options.method === 'DELETE')) {
            if (options.url.indexOf('?') === -1) {
                options.url += '?' + query;
            }
            else {
                options.url += '&' + query;
            }
            query = null;
        }

        http.open(options.method, options.url, options.async, options.user, options.password);

        if (options.method === 'POST' && Object.keys(options.files).length) {
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
            query = formData;
        }
        else {
            http.setRequestHeader('Content-Type', options.contentType);
        }

        http.send(query);

        return http;

    };

    return this;

})();