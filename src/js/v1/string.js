String.prototype.parseHTML = function (context) {

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

    context = context || document;

    var tmp, tag, wrap, j,
        fragment = context.createDocumentFragment();

    if (!rhtml.test(this)) {
        fragment.appendChild(context.createTextNode(this));
    }
    else {
        tmp = fragment.appendChild(context.createElement("div"));
        tag = (rtagName.exec(this) || ["", ""])[1].toLowerCase();
        wrap = wrapMap[tag] || wrapMap._default;
        tmp.innerHTML = wrap[1] + this.replace(rxhtmlTag, "<$1></$2>") + wrap[2];

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

};

String.prototype.isHTML = function () {
    var a = document.createElement('div');
    a.innerHTML = this;
    for (var c = a.childNodes, i = c.length; i--;) {
        if (c[i].nodeType == 1) return true;
    }
    return false;
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