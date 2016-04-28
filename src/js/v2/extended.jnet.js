jNet.each([
    'click', 'contextmenu', 'dblclick',
    'mouseup', 'mousedown', 'mouseout', 'mouseover', 'mousemove',
    'keyup', 'keydown', 'keypress',
    'copy',
    'selectstart', 'selectionchange', 'select'
], function (iterator, property) {
    jNet.oFn[property] = function (listener, useCapture) {
        return this.on(property, listener, useCapture);
    };
});
