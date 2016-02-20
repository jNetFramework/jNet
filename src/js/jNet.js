/**
 * jNet Framework
 * @constructor
 */
var jNet = new (function () {

    /**
     * @param selector {string}
     * @returns {Array}
     */
    this.querySelectorAll = function (selector) {
        var _tmp = new jNArray();
        var _arr = document.querySelectorAll(selector.selectorReplaceId());
        for (var i = 0; i < _arr.length; ++i) {
            _tmp.push(new jNDocQuery(_arr[i]));
        }
        return _tmp;
    };

    /**
     * @param name
     * @param value
     * @returns {string}
     */
    this.toQuery = function (name, value) {
        return name + "=" + encodeURIComponent(value).replace(/%20/g, '+');
    };

    /**
     * @param objData {{}}
     * @returns {string}
     */
    this.serialize = function (objData) {
        var self = this;
        return Object.keys(objData).map(function (key) {
            return self.toQuery(key, objData[key]);
        }).join('&');
    };

    /**
     * @returns {number}
     */
    this.now = function () {
        return Math.floor((new Date()).getTime() / 1000);
    };

    /**
     * @param obj {{}}
     * @returns {Array.<T>|*}
     */
    this.clone = function (obj) {
        if (Array.isArray(obj)) {
            return obj.splice();
        }
        return JSON.parse(JSON.stringify(obj));
    };

    /**
     * @param listener {function}
     * @param useCapture {boolean}
     * @returns {*}
     */
    this.ready = function (listener, useCapture) {
        document.addEventListener("DOMContentLoaded", listener, useCapture);
        return this;
    };

    /**
     * @param options {{}}
     * @returns {XMLHttpRequest}
     */
    this.ajax = function (options) {

        /**
         * @type {XMLHttpRequest}
         */
        var http = new XMLHttpRequest();

        /**
         * @type {string}
         */
        options.method = options.method || 'GET';
        options.method = options.method.toUpperCase();

        /**
         * @type {{}}
         */
        options.data = options.data || {};

        /**
         * @type {{}}
         */
        options.files = options.files || {};

        /**
         * @type {string|null}
         */
        options.user = options.user || null;

        /**
         * @type {string|null}
         */
        options.password = options.password || null;

        if (typeof options.async == "undefined") {
            /**
             * @type {boolean}
             */
            options.async = true;
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
         * @type {options.fail|*}
         */
        http.onerror = options.fail;

        /**
         * @type {options.success|*}
         */
        http.onload = options.success;

        /**
         * @type {options.progress|*}
         */
        http.onprogress = options.progress;

        /**
         * @type {options.stateChange|*}
         */
        http.onreadystatechange = options.stateChange;

        if (typeof options.data == "object") {

            if (options.data.toString() === '[jNDocQuery]') {
                options.data = options.data.first().serialize(options.method);
            }
            else {
                switch (options.method) {
                    case 'GET':
                    case 'DELETE':
                        options.data = this.serialize(options.data);
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

    return this;

})();