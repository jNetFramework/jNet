jNet.each = jNet.fn.each;

jNet.now = function () {
    return Math.floor((new Date()).getTime() / 1000);
};

jNet.each([
    'click', 'contextmenu', 'dblclick',
    'mouseup', 'mousedown', 'mouseout', 'mouseover', 'mousemove',
    'keyup', 'keydown', 'keypress',
    'copy',
    'selectstart', 'selectionchange', 'select'
], function (index, prop) {

    jNet.fn[prop] = function (listener, useCapture) {
        return this.on(prop, listener, useCapture);
    };

});