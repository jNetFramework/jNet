// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  var jNet, jNetObject, jNetPrivate;

  jNetPrivate = function() {};

  jNetPrivate.prototype = {
    isHTML: function(string) {
      var elementObject, i, iteratorChildNodes;
      elementObject = document.createElement("div");
      elementObject.innerHTML = string;
      iteratorChildNodes = elementObject.childNodes;
      i = iteratorChildNodes.length;
      while (i--) {
        if (iteratorChildNodes[i].nodeType === 1) {
          return true;
        }
      }
      return false;
    },
    parseXML: function(string) {
      var domParser;
      domParser = new DOMParser();
      return domParser.parseFromString(string, "text/xml");
    },
    trim: function(string, regex) {
      if (typeof regex === "undefined") {
        return string.trim();
      }
      return string.replace(new RegExp("/^" + regex + "|" + regex + "$/gm"), "");
    },
    parseHTML: function(string) {
      var fragment, j, rhtml, rtagName, rxhtmlTag, tag, tmp, wrap, wrapMap;
      rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
      rtagName = /<([\w:]+)/;
      rhtml = /<|&#?\w+;/;
      wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
      };
      tmp = void 0;
      tag = void 0;
      wrap = void 0;
      j = void 0;
      fragment = document.createDocumentFragment();
      if (!rhtml.test(string)) {
        fragment.appendChild(document.createTextNode(string));
      } else {
        tmp = fragment.appendChild(document.createElement("div"));
        tag = (rtagName.exec(string) || ['', ''])[1].toLowerCase();
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

  jNetObject = function(object) {

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
   * created prototype for jNetObject
   *  and created alias prototype, FN
   */

  jNetObject.prototype = jNetObject.fn = {

    /**
     * get element with index DOMTree as jNetObject
     * @returns jNetObject
     */
    eq: function(index) {
      if (index < 0) {
        index += this.length;
      }
      return jNet(this[index]);
    },

    /**
     * get first element DOMTree as jNetObject
     * @returns jNetObject
     */
    first: function() {
      return this.eq(0);
    },

    /**
     * get last element DOMTree as jNetObject
     * @returns jNetObject
     */
    last: function() {
      return this.eq(this.length - 1);
    },
    odd: function(iterator) {
      var list;
      if (iterator == null) {
        iterator = 1;
      }
      list = [];
      while (iterator < this.length) {
        list.push(this[iterator]);
        iterator += 2;
      }
      return new jNetObject(list);
    },
    even: function() {
      return this.odd(0);
    },
    clone: function(object) {
      if (!object) {
        object = this;
      }
      return Object.create(object);
    },
    toString: function() {
      return "jNetObject";
    },

    /**
     * cycle implement in jNetFramework for objects jNet
     *
     * First parameter callback is Key
     *   Next parameter callback is Value
     *     Next parameter callback is this (array)
     *
     * @returns {*}
     */
    each: function(callback) {
      var iterator;
      iterator = 0;
      while (iterator < this.length) {
        callback(iterator, this[iterator], this);
        ++iterator;
      }
      return this;
    },
    find: function(object) {
      var elements, iterator, list;
      if (object.toString() === this.toString()) {
        return object;
      }
      list = [];
      if (object === window) {
        list.push(object);
      } else if (object === document) {
        list.push(document);
      } else if (object && object.nodeType) {
        list.push(object);
      } else if (typeof object === "string") {
        elements = this.length ? this : [document];
        iterator = 0;
        while (iterator < elements.length) {
          Array.prototype.push.apply(list, elements[iterator].querySelectorAll(object));
          ++iterator;
        }
      }
      return new jNetObject(list);
    },
    on: function(type, listener, useCapture) {
      this.each(function(iterator, element) {
        if (element.addEventListener) {
          return element.addEventListener(type, listener, useCapture);
        } else {
          return element.attachEvent("on" + type, function() {
            return listener.call(element);
          });
        }
      });
      return this;
    },
    off: function(type, listener, useCapture) {
      this.each(function(iterator, element) {
        if (element.removeEventListener) {
          element.removeEventListener(type, listener, useCapture);
        } else if (element.detachEvent) {
          element.detachEvent("on" + type, listener);
        }
      });
      return this;
    },
    ready: function(listener, useCapture) {
      return this.on("DOMContentLoaded", listener, useCapture);
    }
  };


  /**
   * Main Object of a Framework.
   *  With the aid of developer can manager
   *      of elements dom tree and created/destroys events
   *
   * @param object
   * @returns {*}
   */

  jNet = function(object) {
    var jnObject;
    if (typeof object === "function") {
      jnObject = jNet(document);
      if (document.readyState === "complete") {
        object();
        return jnObject;
      }
      return jnObject.ready(object);
    } else if (typeof object === "string") {
      return new jNetObject(object);
    } else if (typeof object === "object") {
      return new jNetObject(object);
    }
  };

  jNet.fn = jNet.prototype = {
    each: function(object, callback) {
      var iterator, length;
      if (object.toString() === jNetObject.fn.toString()) {
        object.each(callback);
      } else if (Array.isArray(object)) {
        length = object.length;
        iterator = 0;
        while (iterator < length) {
          callback(iterator, object[iterator], object);
          ++iterator;
        }
      } else if (typeof object === "object") {
        Object.keys(object).forEach(function(key, value) {
          return callback(key, value, object);
        });
      }
      return this;
    },
    toString: function() {
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
    define(function() {
      return {
        "jNet": jNet
      };
    });
  }


  /**
   * Append in prototype new methods for working jNet Framework, jNetObject
   */

  jNet.each(["click", "contextmenu", "dblclick", "mouseup", "mousedown", "mouseout", "mouseover", "mousemove", "keyup", "keydown", "keypress", "copy", "selectstart", "selectionchange", "select"], function(iterator, property) {
    jNet.oFn[property] = function(listener, useCapture) {
      return this.on(property, listener, useCapture);
    };
  });


  /**
   * included extended-jNet file
   */

  if (typeof require === "function") {

    /**
     *  jNet Framework used:
     *
     *    superagent framework for working in network
     *      Project in GitHub:
     *          @link https://github.com/visionmedia/superagent
     *
     *    js-cookie framework for working with cookies
     *      Project in GitHub:
     *          @link https://github.com/js-cookie/js-cookie
     */

    /**
     * included superagent
     * @link https://github.com/visionmedia/superagent
     */
    jNet.fetch = require("superagent");

    /**
     * included js-cookie
     * @link https://github.com/js-cookie/js-cookie
     */
    jNet.cookies = require("js-cookie");
  }


  /**
   * check exists window and
   *  set jNet in window
   */

  if (typeof window !== "undefined" && window !== null) {
    window.jNet = jNet;
  }


  /**
   * check exists document and
   *  set jNet in document
   */

  if (typeof document !== "undefined" && document !== null) {
    document.jNet = jNet;
  }


  /**
   * check exists exports and
   *  set jNet in exports
   */

  if (typeof exports !== "undefined" && exports !== null) {
    exports.jNet = jNet;
  }

}).call(this);

//# sourceMappingURL=core.js.map
