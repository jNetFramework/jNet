String.prototype.jNToDocument = function () {
    var domParser = new DOMParser();
    return domParser.parseFromString(this, "text/html");
};

String.prototype.parseXML = function () {
    var domParser = new DOMParser();
    return domParser.parseFromString(this, "text/xml");
};

String.prototype.jNTrim = function (regex) {
    if (typeof regex == 'undefined') {
        return this.trim();
    }
    return this.replace(new RegExp('/^' + regex + '|' + regex + '$/gm'), '');
};

String.prototype.selectorReplaceId = function () {
    return this.replace(/#([-\w]+)/g, "[id=$1]");
};

String.prototype.isHTML = function () {
    var a = document.createElement('div');
    a.innerHTML = this;
    for (var c = a.childNodes, i = c.length; i--;) {
        if (c[i].nodeType == 1) return true;
    }
    return false;
};
