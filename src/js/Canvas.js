window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

window.cancelAnimationFrame = window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    function (callback) {
        window.clearTimeout(callback);
    };

jNet.Canvas = function (canvas) {

    this._canvas = jNet(canvas);
    this._context = undefined;
    this._id = undefined;

    this.getCanvas = function () {
        return this._canvas[0];
    };

    this.getContext = function () {
        return this._context;
    };

    this.setContext2D = function () {
        this._context = this.getCanvas().getContext('2d');
        return this;
    };

    this.setContext3D = function () {
        this._context = this.getCanvas().getContext('3d');
        return this;
    };

    this.setWidth = function (width) {
        this.getCanvas().width = width;
    };

    this.setHeight = function (height) {
        this.getCanvas().height = height;
    };

    this.setSize = function (width, height) {
        this.setWidth(width);
        this.setHeight(height);
    };

    this.start = function () {
        var self = this;
        this._id = requestAnimationFrame(function () {
            return self.start();
        });
        this.draw();
    };

    this.stop = function () {
        if (this._id) {
            cancelAnimationFrame(this._id);
            this._id = undefined;
        }
    };

    this.draw = function () {
    };

    if (!this._canvas._find) {
        this._canvas = jNet(document.createElement('canvas'));
        jNet(document.body).append(this._canvas);
        this.setSize(256, 256);
        this.setContext2D();
    }

    return this;

};