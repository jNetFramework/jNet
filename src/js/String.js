/**
 * jNToDocument, Converts a line in object (Document)
 *
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
 * @param regex {string}
 * @returns {string}
 */
String.prototype.jNTrim = function (regex) {
    if (typeof regex == 'undefined') {
        return this.trim();
    }
    return this.replace(new RegExp('/^' + regex + '|' + regex + '$/gm'), '');
};

/**
 * @returns {String}
 */
String.prototype.selectorReplaceId = function () {
    return this.replace(/#([-\w]+)/g, "[id=$1]");
};