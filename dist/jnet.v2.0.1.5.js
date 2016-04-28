/**
 * @author Babichev Maxim (REZ1DENT3) 
 * @email <info@babichev.net> 
 * @project jNet 
 * @version 0.1.5 
 * @date 28-04-2016 
 **/
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {

    "use strict";

    var jNetPrivate = function () {
    };
    
    jNetPrivate.prototype = {
        
        isHTML: function (string) {
            var elementObject = document.createElement('div');
            elementObject.innerHTML = string;
            for (var iteratorChildNodes = elementObject.childNodes, i = iteratorChildNodes.length; i--;) {
                if (iteratorChildNodes[i].nodeType == 1) {
                    return true;
                }
            }
            return false;
        },
        
        parseXML: function (string) {
            var domParser = new DOMParser();
            return domParser.parseFromString(string, "text/xml");
        },
        
        trim: function (string, regex) {
            if (typeof regex == 'undefined') {
                return string.trim();
            }
            return string.replace(new RegExp('/^' + regex + '|' + regex + '$/gm'), '');
        },
        
        parseHTML: function (string) {

            var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                rtagName = /<([\w:]+)/,
                rhtml = /<|&#?\w+;/,
                wrapMap = {
                    option: [1, "<select multiple='multiple'>", "</select>"],

                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

                    _default: [0, "", ""]
                };

            var tmp, tag, wrap, j, fragment = document.createDocumentFragment();

            if (!rhtml.test(string)) {
                fragment.appendChild(document.createTextNode(string));
            }
            else {
                tmp = fragment.appendChild(document.createElement("div"));
                tag = (rtagName.exec(string) || ["", ""])[1].toLowerCase();
                wrap = wrapMap[tag] || wrapMap._default;
                tmp.innerHTML = wrap[1] + string.replace(rxhtmlTag, "<$1></$2>") + wrap[2];

                j = wrap[0];
                while (j--) {
                    tmp = tmp.lastChild;
                }
                
                fragment.removeChild(fragment.firstChild);
                while (tmp.firstChild) {
                    fragment.appendChild(tmp.firstChild);
                }
            }
            return fragment;
        }
    };

    /**
     * Object for working with DOMTree
     *
     * @param object
     * @returns {*}
     */
    var jNetObject = function (object) {

        /**
         * If parameter object is not Array
         */
        if (!Array.isArray(object)) {
            /**
             * Find element from DOMTree
             *  with method find
             *
             * @returns jNetObject
             */
            return this.find(object);
        }

        /**
         * With helped prototype Array, method's
         *  appended elements in object
         */
        Array.prototype.push.apply(this, object);

        /**
         * @returns {*}
         */
        return this;

    };

    /**
     * todo
     */
    jNetObject.prototype = jNetObject.fn = {

        /**
         * Returned One element with index
         *
         * @param index
         */
        eq: function (index) {
            if (index < 0) {
                index += this.length;
            }
            return jNet(this[index]);
        },

        /**
         * Returned first element
         *
         * @returns {*}
         */
        first: function () {
            return this.eq(0);
        },

        /**
         * Returned last element
         *
         * @returns {*}
         */
        last: function () {
            return this.eq(this.length - 1);
        },

        /**
         * Returned jNetObject from current
         *  element's with Math
         *      function equal (ind & 1) === 1
         *
         * @returns {jNetObject}
         */
        odd: function () {
            var list = [];
            for (var iterator = 1; iterator < this.length; iterator += 2) {
                list.push(this[iterator]);
            }
            return new jNetObject(list);
        },

        /**
         * Returned jNetObject from current
         *  element's with Math
         *      function equal (ind & 1) === 0
         *
         * @returns {jNetObject}
         */
        even: function () {
            var list = [];
            for (var iterator = 0; iterator < this.length; iterator += 2) {
                list.push(this[iterator]);
            }
            return new jNetObject(list);
        },

        /**
         * This method created copy object with method Object.create
         *
         * If object equal undefined then method cloned current element (this)
         *  else object not equal undefined then method cloned give object
         *
         * @param object
         * @returns {Object}
         */
        clone: function (object) {
            return Object.create(object ? object : this);
        },

        /**
         * Override method Object.toString
         *
         * @returns {string}
         */
        toString: function () {
            return "jNetObject";
        },

        each: function (callback) {
            for (var iterator = 0; iterator < this.length; ++iterator) {
                callback(iterator, this[iterator], this);
            }
            return this;
        },

        find: function (object) {

            if (object.toString() === this.toString()) {
                return object;
            }

            var list = [];
            if (object === window) {
                list.push(object);
            }
            else if (object && object.nodeType) {
                list.push(object);
            }
            else if (typeof object === "string") {
                if (this.length) {
                    this.each(function (iterator, element) {
                        Array.prototype.push.apply(list, element.querySelectorAll(object));
                    });
                }
                else {
                    Array.prototype.push.apply(list, document.querySelectorAll(object));
                }
            }

            return new jNetObject(list);

        },

        on: function (type, listener, useCapture) {
            this.each(function (iterator, element) {
                element.addEventListener(type, listener, useCapture);
            });
            return this;
        },

        off: function (type, listener, useCapture) {
            this.each(function (iterator, element) {
                element.removeEventListener(type, listener, useCapture);
            });
            return this;
        },

        ready: function (listener, useCapture) {
            return this.on("DOMContentLoaded", listener, useCapture);
        }

    };

    var jNet = function (object) {
        if (typeof object === "function") {
            var jnObject = jNet(document);
            if (document.readyState == "complete") {
                object();
                return jnObject;
            }
            return jnObject.on("DOMContentLoaded", object);
        }
        else if (typeof object === "string") {
            return new jNetObject(object);
        }
        else if (typeof object === "object") {
            return new jNetObject(object);
        }
    };

    jNet.fn = jNet.prototype = {

        /**
         * todo
         *
         * @param object
         * @param callback
         * @returns {jNet}
         */
        each: function (object, callback) {

            /**
             *
             */
            if (object.toString() === jNetObject.fn.toString()) {
                object.each(callback);
            }
            else if (Array.isArray(object)) {
                var length = object.length;
                for (var iterator = 0; iterator < length; ++iterator) {
                    callback(iterator, object[iterator], object);
                }
            }
            else if (typeof object === "object") {
                Object.keys(object).forEach(function (key, value) {
                    callback(key, value, object);
                });
            }
            return this;
        },

        /**
         * Override method in global Object
         *
         * @returns {string}
         */
        toString: function () {
            return "jNetFramework";
        }

    };

    /**
     * set pointer in jNetObject.prototype
     */
    jNet.oFn = jNetObject.fn;

    /**
     * method toString override in global object
     */
    jNet.toString = jNet.fn.toString;

    /**
     * method clone in global Object
     */
    jNet.clone = jNet.oFn.clone;

    /**
     * method each in global Object
     */
    jNet.each = jNet.fn.each;

    /**
     * Export framework to :
     *  window
     *  document
     *  exports
     *  define
     */

    /**
     * Check exists and typeof equal function
     *  and check exists define.and
     *
     * #1 - fixed AMD
     */
    if (typeof define === "function" && define.amd) {
        define(function () {
            return {
                'jNet': jNet
            };
        });
    }

    /**
     * check exists window and
     *  set jNet in window
     */
    if (typeof window !== "undefined") {
        window.jNet = jNet;
    }

    /**
     * check exists document and
     *  set jNet in document
     */
    if (typeof document !== "undefined") {
        document.jNet = jNet;
    }

    /**
     * check exists exports and
     *  set jNet in exports
     */
    if (typeof exports !== "undefined") {
        exports.jNet = jNet;
    }

    require('./extended.jnet');

})();
},{"./extended.jnet":2}],2:[function(require,module,exports){
jNet.each([
    'click', 'contextmenu', 'dblclick',
    'mouseup', 'mousedown', 'mouseout', 'mouseover', 'mousemove',
    'keyup', 'keydown', 'keypress',
    'copy',
    'selectstart', 'selectionchange', 'select'
], function (iterator, property) {
    jNet.oFn[property] = function (listener, useCapture) {
        return this.on(property, listener, useCapture);
    };
});

},{}]},{},[1]);
