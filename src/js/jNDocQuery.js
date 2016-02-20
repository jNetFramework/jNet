/**
 * @param doc
 * @returns {*}
 */
var jNDocQuery = function (doc) {

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
                obj.document.insertBefore(html.body.firstChild, obj.document.firstChild);
            }
            else if (obj.type == 'append') {
                obj.document.appendChild(html.body.firstChild);
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
        return obj.document.getAttribute(obj.nameAttribute);
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
        return obj.document.hasAttribute(obj.nameAttribute);
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
        obj.document.setAttribute(obj.nameAttribute, obj.valueAttribute);
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
        return obj.document.clientWidth;
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
        return obj.document.clientHeight;
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
            obj.document.removeAttribute(obj.nameAttribute);
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
        if (typeof obj.document.parentNode == 'undefined') {
            this.outerHTML('');
        }
        else {
            obj.document.parentNode.removeChild(obj.document);
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
        obj.document.onsubmit = obj.listener;
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
        obj.document.addEventListener(obj.type, obj.listener, obj.useCapture);
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
        obj.document.removeEventListener(obj.type, obj.listener, obj.useCapture);
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