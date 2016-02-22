jNet.smpl = function (selectorOrHTML) {

    var _html = [];

    if (typeof selectorOrHTML == "string" && selectorOrHTML.isHTML()) {
        _html.push(selectorOrHTML);
    }
    else {
        jNet.each(jNet(selectorOrHTML), function (key, value) {
            if (typeof value.innerHTML !== "undefined") {
                value = value.innerHTML;
            }
            _html.push(value);
        });
    }

    return new (function (_html) {

        this._html = _html;
        this._cache = {};

        this._get = function (vars, key) {
            if (typeof this._cache[key] != "undefined") {
                return this._cache[key];
            }
            var param = vars;
            jNet.each(key.split('.'), function (key, value) {
                param = param[value];
            });
            if (typeof param == "object") {
                param = JSON.stringify(param);
            }
            return this._cache[key] = param;
        };

        this.render = function (vars) {
            this._cache = {};
            var self = this;
            var html = [];
            jNet.each(self._html, function (key, value) {
                html[key] = value.replace(/\{\{([\w\s\t.]+)\}\}/g, function () {
                    return self._get(vars, arguments[1].jNTrim('\t\n\s'));
                });
            });
            return html.join('\n');
        };

        return this;

    })(_html);

};