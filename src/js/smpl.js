jNet.smpl = function (selectorOrHTML) {

    function SMPLFramework(_html) {

        this._html = _html;

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

                var $attr = value.data('smplFor');
                if ($attr.length) {

                    var data = self._get(vars, $attr);

                    var _html = value.data('for', null)
                        .data('smpl', '').outerHTML();

                    value.data('smpl', 'jNet');
                    value.data('smplFor', $attr);

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
                }
                else {
                    html[key] = _render(value.outerHTML(), vars);
                }

            });

            return html;

        };

        return this;

    }

    var _html = [];

    if (typeof selectorOrHTML == "string" && selectorOrHTML.isHTML()) {
        selectorOrHTML = jNet(selectorOrHTML.parseHTML()).find();
    }

    jNet.each(jNet(selectorOrHTML), function (key, value) {
        _html.push(value);
    });

    return new SMPLFramework(_html);

};

//'data-smpl-for'