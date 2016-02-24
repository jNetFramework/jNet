jNet.smpl = function (selectorOrHTML) {

    var _html = [];

    if (typeof selectorOrHTML == "string" && selectorOrHTML.isHTML()) {
        _html.push(selectorOrHTML.parseHTML().body);
    }
    else {
        jNet.each(jNet(selectorOrHTML), function (key, value) {
            _html.push(value);
        });
    }

    return new (function (_html) {

        this._html = _html;
        this._cache = {};

        this.fn = this.prototype = {
            method: {}

        };

        this._get = function (vars, key) {
            var param = vars;
            jNet.each(key.split('.'), function (key, value) {
                param = param[value];
            });
            return param;
        };

        this.render = function (vars) {

            var self = this;
            var html = [];
            jNet.each(self._html, function (key, value) {

                value = jNet(value);

                function _render(_html, vars) {
                    return _html.replace(/%[\s\t]*([._\w]+)[\s\t]*%/g, function () {
                        return self._get(vars, arguments[1].jNTrim('\t\n\s'));
                    });
                }

                var $attr = value.attr('data-smpl-for');
                var data = self._get(vars, $attr);

                var _html = value.attr('data-smpl-for', null)
                                    .attr('data-smpl', '').outerHTML();

                value.attr('data-smpl', 'jNet');
                value.attr('data-smpl-for', $attr);

                if (typeof data == "object") {
                    html[key] = [];
                    jNet.each(data, function (k, v) {
                        html[key].push(_render(_html, {
                            '_': v
                        }));
                    });
                    html[key] = html[key].join('\n');
                }
                else {
                    html[key] = _render(_html, vars);
                }

            });

            return html;

        };

        return this;

    })(_html);

};

//'data-smpl-for'