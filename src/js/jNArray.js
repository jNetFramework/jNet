/**
 * @param data {Array.<T>|undefined}
 * @returns {*}
 */
var jNArray = function (data) {

    /**
     * @type {Array}
     * @private
     */
    this._array = new Array(0);

    if (typeof data !== "undefined") {
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
     * @param key {int}
     * @returns {*}
     */
    this.at = function (key) {
        return this._array[key];
    };

    /**
     * @returns {Array.<T>|*}
     */
    this.clone = function () {
        return new jNArray(this.slice());
    };

    /**
     * @returns {*}
     */
    this.unique = function () {
        var ko = {};
        this.forEach(function (item) {
            ko[item] = 1;
        });
        return new jNArray(Object.keys(ko));
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
     * @param array {Array.<T>|*}
     * @returns {Array.<T>|*}
     */
    this.diff = function (array) {
        return this.filter(function (i) {
            return array.indexOf(i) === -1;
        });
    };

    /**
     * @param item {string}
     * @returns {*}
     */
    this.remove = function (item) {
        this.splice(this.indexOf(item), 1);
        return this;
    };

    /**
     * @param item {Array.<T>}
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
     * @param items {Array.<T>}
     * @returns {Array.<T>}
     */
    this.concat = function (items) {
        return this._array.concat(items);
    };

    /**
     * @param separator {string}
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
     * @param items {Array.<T>}
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
     * @param start {Number}
     * @param end {Number}
     * @returns {Array.<T>}
     */
    this.slice = function (start, end) {
        return this._array.slice(start, end);
    };

    /**
     * @param compareFn {function}
     * @returns {boolean}
     */
    this.sort = function (compareFn) {
        return this._array.sort(compareFn);
    };

    /**
     * @param start {Number}
     * @param deleteCount {Number}
     * @param items {Array}
     * @returns {Array.<T>}
     */
    this.splice = function (start, deleteCount, items) {
        return this._array.splice(start, deleteCount, items);
    };

    /**
     * @param items {Array}
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
     * @param callback {function}
     * @param initialValue {*}
     * @returns {*}
     */
    this.reduce = function (callback, initialValue) {
        return this._array.reduce(callback, initialValue);
    };

    /**
     * @param callback {function}
     * @param initialValue {*}
     * @returns {*}
     */
    this.reduceRight = function (callback, initialValue) {
        return this._array.reduceRight(callback, initialValue);
    };

    /**
     * @param searchElement {T}
     * @param fromIndex {number}
     * @returns {number}
     */
    this.indexOf = function (searchElement, fromIndex) {
        return this._array.indexOf(searchElement, fromIndex);
    };

    /**
     * @param searchElement {T}
     * @param fromIndex {number}
     * @returns {number}
     */
    this.lastIndexOf = function (searchElement, fromIndex) {
        return this._array.lastIndexOf(searchElement, fromIndex);
    };

    /**
     * @param callback {function}
     * @param thisArg {*}
     * @returns {boolean}
     */
    this.every = function (callback, thisArg) {
        return this._array.every(callback, thisArg);
    };

    /**
     * @param callback {function}
     * @param thisArg {*}
     * @returns {Array.<T>}
     */
    this.filter = function (callback, thisArg) {
        return this._array.filter(callback, thisArg);
    };

    /**
     * @param callback {function}
     * @param thisArg {*}
     */
    this.forEach = function (callback, thisArg) {
        this._array.forEach(callback, thisArg);
    };

    /**
     * @param callback {function}
     * @param thisArg {*}
     * @returns {Array}
     */
    this.map = function (callback, thisArg) {
        return this._array.map(callback, thisArg);
    };

    /**
     * @param callback {function}
     * @param thisArg {*}
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