function jNetRegister(window, document, name, fn) {

    'use strict';

    var module = {};
    module[name] = fn;

    if (typeof define === "function" && define.amd) {
        define(function () {
            return module;
        });
    }
    else {
        document[name] = window[name] = module[name];
    }

}