/**
 * @param doc
 * @returns {*}
 */
var jNDocQuery = function (doc) {

    /**
     * @type {Window.jNArray}
     * @private
     */
    this._array = new jNArray();

    /**
     * @private
     */
    this._d = doc;

    switch (typeof doc) {

        case 'object':
            var toStringArr = doc.toString().split(',');
            if (toStringArr.length) {
                switch (toStringArr[0]) {
                    case this.toString():
                        return doc;

                    case this._array.toString():
                        this._array = doc;
                        this._d = null;
                        break;
                }
            }
            break;

        case 'string':
            this._d = document.querySelector(doc.selectorReplaceId());
            break;

    }

    /**
     * @returns {*}
     * @private
     */
    this._call = function () {
        var args = arguments[0];
        if (this._array.length()) {
            var _arr = new jNArray(this._array.map(function (element) {
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
     * @param callback {function}
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
     * @param index {int}
     * @returns {*}
     */
    this.eq = function (index) {
        return this.at(index);
    };

    /**
     * @param index {int}
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
     * @param callback {function}
     * @returns {*}
     */
    this.odd = function (callback) {
        if (this._array.length()) {
            for (var i = 1; i < this._array.length(); i += 2) {
                callback(this.at(i));
            }
        }
        return this;
    };

    /**
     * @param callback {function}
     * @returns {*}
     */
    this.even = function (callback) {
        if (this._array.length()) {
            for (var i = 0; i < this._array.length(); i += 2) {
                callback(this.at(i));
            }
        }
        else {
            callback(this, null);
        }
        return this;
    };

    /**
     * @param method
     * @returns {*}
     */
    this.serialize = function (method) {
        return this._call.call(this, {
            callback: '_serialize',
            method: method
        });
    };

    /**
     * @returns {string}
     */
    this._serialize = function (obj) {
        var query = [];
        var form = this._d;
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
        else {
            return new FormData(form);
        }
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
        return new jNDocQuery(this._call.call(this, {
            callback: '_findAll',
            selector: selector
        }));
    };

    /**
     * @param obj {{}}
     * @returns {Window.jNArray|*}
     * @private
     */
    this._findAll = function (obj) {
        var _tmp = new jNArray();
        var _arr = this._d.querySelectorAll(obj.selector.selectorReplaceId());
        for (var i = 0; i < _arr.length; ++i) {
            _tmp.push(new jNDocQuery(_arr[i]));
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
     * @param obj {{}}
     * @returns {jNDocQuery}
     * @private
     */
    this._find = function (obj) {
        var _tmp = new jNDocQuery(this._d);
        _tmp._d = this._d.querySelector(obj.selector.selectorReplaceId());
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
            return new jNArray();
        }
        return new jNArray(Object.keys(_classList).map(function (key) {
            return _classList[key]
        }));
    };

    /**
     * @param newClass {string}
     * @returns {*}
     */
    this.addClass = function (newClass) {
        return this._call.call(this, {
            callback: '_addClass',
            newClass: newClass
        });
    };

    /**
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._addClass = function (obj) {
        this._d.classList.add(obj.newClass);
        return this;
    };

    /**
     * @param className {string}
     * @returns {*}
     */
    this.removeClass = function (className) {
        return this._call.call(this, {
            callback: '_removeClass',
            className: className
        });
    };

    /**
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._removeClass = function (obj) {
        this._d.classList.remove(obj.className);
        return this;
    };

    /**
     * @param className {string}
     * @returns {boolean}
     */
    this.hasClass = function (className) {
        return this._call.call(this, {
            callback: '_hasClass',
            className: className
        });
    };

    /**
     * @param obj {{}}
     * @returns {boolean}
     * @private
     */
    this._hasClass = function (obj) {
        return this.classList().contains(obj.className);
    };

    /**
     * @param className {string}
     * @returns {*}
     */
    this.toggleClass = function (className) {
        return this._call.call(this, {
            callback: '_toggleClass',
            className: className
        });
    };

    /**
     * @param obj {{}}
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
        this.classList().forEach(function (className) {
            self.removeClass(className);
        });
        return self;
    };

    /**
     * @param name {string}
     * @param value {string}
     */
    this.css = function (name, value) {
        return this._call.call(this, {
            callback: '_css',
            name: name,
            value: value
        });
    };

    /**
     * @param obj {{}}
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
     * @param value {string}
     * @returns string|{*}
     */
    this.text = function (value) {
        return this._call.call(this, {
            callback: '_text',
            value: value
        });
    };

    /**
     * @param obj {{}}
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
     * @param value {string}
     * @returns string|{*}
     */
    this.innerHTML = function (value) {
        return this._call.call(this, {
            callback: '_innerHTML',
            value: value
        });
    };

    /**
     * @param obj {{}}
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
     * @param value {string}
     * @returns string|{*}
     */
    this.outerHTML = function (value) {
        return this._call.call(this, {
            callback: '_outerHTML',
            value: value
        });
    };

    /**
     * @param obj {{}}
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
     * @param $element {string|jNDocQuery}
     * @returns {*}
     */
    this.insertAfter = function ($element) {
        $element = new jNDocQuery($element);
        return this._call.call(this, {
            callback: '_insertAfterBefore',
            element: $element.first(),
            insertBefore: false
        });
    };

    /**
     * @param $element {string|jNDocQuery}
     * @returns {*}
     */
    this.insertBefore = function ($element) {
        $element = new jNDocQuery($element);
        return this._call.call(this, {
            callback: '_insertAfterBefore',
            element: $element.first(),
            insertBefore: true
        });
    };

    /**
     * @param obj {{}}
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
     * @param html {string|jNDocQuery}
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
     * @param html {string|jNDocQuery}
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
     * @param obj {{}}
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
                case this.toString():
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
     * @param nameAttribute {string}
     * @param valueAttribute {string}
     * @returns {*}
     */
    this.attr = function (nameAttribute, valueAttribute) {
        if (typeof valueAttribute == "undefined") {
            return this.getAttribute(nameAttribute);
        }
        return this.setAttribute(nameAttribute, valueAttribute);
    };

    /**
     * @param nameAttribute {string}
     * @returns {boolean}
     */
    this.getAttribute = function (nameAttribute) {
        return this._call.call(this, {
            callback: '_getAttribute',
            nameAttribute: nameAttribute
        });
    };

    /**
     * @param obj {{}}
     * @returns {boolean}
     * @private
     */
    this._getAttribute = function (obj) {
        return this._d.getAttribute(obj.nameAttribute);
    };

    /**
     * @param nameAttribute {string}
     * @returns {boolean}
     */
    this.hasAttribute = function (nameAttribute) {
        return this._call.call(this, {
            callback: '_hasAttribute',
            nameAttribute: nameAttribute
        });
    };

    /**
     * @param obj {{}}
     * @returns {boolean}
     * @private
     */
    this._hasAttribute = function (obj) {
        return this._d.hasAttribute(obj.nameAttribute);
    };

    /**
     * @param nameAttribute {string}
     * @param valueAttribute {string}
     * @returns {*}
     */
    this.setAttribute = function (nameAttribute, valueAttribute) {
        return this._call.call(this, {
            callback: '_setAttribute',
            nameAttribute: nameAttribute,
            valueAttribute: valueAttribute
        });
    };

    /**
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._setAttribute = function (obj) {
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
     * @param options
     * @returns {*}
     */
    this.get = function (options) {
        return this._call.call(this, {
            callback: '_get',
            options: options
        });
    };

    /**
     * @param obj
     * @private
     */
    this._get = function (obj) {
        obj.options.method = 'GET';
        obj.options.data = this;
        jNet.ajax(obj.options);
    };

    /**
     * @param options
     * @returns {*}
     */
    this.post = function (options) {
        return this._call.call(this, {
            callback: '_post',
            options: options
        });
    };

    /**
     * @param obj
     * @private
     */
    this._post = function (obj) {
        obj.options.method = 'POST';
        obj.options.data = this;
        jNet.ajax(obj.options);
    };

    /**
     * @returns {number}
     */
    this.ajax = function (options) {
        return this._call.call(this, {
            callback: '_ajax',
            options: options
        });
    };

    /**
     * @param obj
     * @private
     */
    this._ajax = function (obj) {
        obj.options.data = this;
        jNet.ajax(obj.options);
    };

    /**
     * @param nameAttribute {string}
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
     * @param obj {{}}
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
            this.outerHTML('');
        }
        else {
            this._d.parentNode.removeChild(this._d);
        }
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
     */
    this.ready = function (listener, useCapture) {
        return this._call.call(this, {
            callback: '_ready',
            listener: listener,
            useCapture: useCapture
        });
    };

    /**
     * @param obj {{}}
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
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._select = function (obj) {
        this.addEventListener('select', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._selectionchange = function (obj) {
        this.addEventListener('selectionchange', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._selectstart = function (obj) {
        this.addEventListener('selectstart', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    /**
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._copy = function (obj) {
        this.addEventListener('copy', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._keypress = function (obj) {
        this.addEventListener('keypress', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._keydown = function (obj) {
        this.addEventListener('keydown', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._keyup = function (obj) {
        this.addEventListener('keyup', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._mousemove = function (obj) {
        this.addEventListener('mousemove', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._mouseover = function (obj) {
        this.addEventListener('mouseover', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._mouseout = function (obj) {
        this.addEventListener('mouseout', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._mousedown = function (obj) {
        this.addEventListener('mousedown', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._mouseup = function (obj) {
        this.addEventListener('mouseup', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._dblclick = function (obj) {
        this.addEventListener('dblclick', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._contextmenu = function (obj) {
        this.addEventListener('contextmenu', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
     * @returns {*}
     */
    this.click = function (listener, useCapture) {
        return this._call.call(this, {
            callback: '_click',
            listener: listener,
            useCapture: useCapture
        });
    };

    /**
     * @param obj {{}}
     * @returns {*}
     * @private
     */
    this._click = function (obj) {
        this.addEventListener('click', obj.listener, obj.useCapture);
        return this;
    };

    /**
     * @param listener {function}
     * @returns {*}
     */
    this.submit = function (listener) {
        return this._call.call(this, {
            callback: '_submit',
            listener: listener
        });
    };

    /**
     * @param obj {{}}
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
     * @param type {string}
     * @param listener {function}
     * @param useCapture {boolean}
     */
    this.on = function (type, listener, useCapture) {
        return this.addEventListener(type, listener, useCapture);
    };

    /**
     * @param type {string}
     * @param listener {function}
     * @param useCapture {boolean}
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
     * @param obj {{}}
     * @private
     */
    this._addEventListener = function (obj) {
        this._d.addEventListener(obj.type, obj.listener, obj.useCapture);
        return this;
    };

    /**
     * Alias removeEventListener
     *
     * @param type {string}
     * @param listener {function}
     * @param useCapture {boolean}
     */
    this.off = function (type, listener, useCapture) {
        return this.removeEventListener(type, listener, useCapture);
    };

    /**
     * @param type {string}
     * @param listener {function}
     * @param useCapture {boolean}
     * @returns {*}
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
     * @param obj {{}}
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
         * @param progress {number}
         * @returns {*}
         */
        this.linear = function (progress) {
            return progress;
        };

        /**
         * @param progress {number}
         * @returns {number}
         */
        this.quadratic = function (progress) {
            return Math.pow(progress, 2);
        };

        /**
         * @param progress {number}
         * @returns {number}
         */
        this.swing = function (progress) {
            return 0.5 - Math.cos(progress * Math.PI) / 2;
        };

        /**
         * @param progress {number}
         * @returns {number}
         */
        this.circ = function (progress) {
            return 1 - Math.sin(Math.acos(progress));
        };

        /**
         * @param progress {number}
         * @param x {number}
         * @returns {number}
         */
        this.back = function (progress, x) {
            return Math.pow(progress, 2) * ((x + 1) * progress - x);
        };

        /**
         * @param progress {number}
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
         * @param progress {number}
         * @param x {number}
         * @returns {number}
         */
        this.elastic = function (progress, x) {
            return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
        };

        return this;

    };

    /**
     * @param options {{}}
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
     * @param duration {int}
     * @returns {*}
     */
    this.show = function (duration) {
        return this._call.call(this, {
            callback: '_show',
            duration: duration
        });
    };

    /**
     * @param obj {{}}
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
     * @param duration {int}
     * @returns {*}
     */
    this.hide = function (duration) {
        return this._call.call(this, {
            callback: '_hide',
            duration: duration
        });
    };

    /**
     * @param obj {{}}
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
     * @param options {{}}
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
     * @param options {{}}
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
     * @param obj {{}}
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