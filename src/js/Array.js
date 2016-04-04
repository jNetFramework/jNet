Array.prototype.first = function () {
    return this.at(0);
};

Array.prototype.last = function () {
    return this.at(this.length - 1);
};

Array.prototype.at = function (key) {
    return this[key];
};

Array.prototype.clone = function () {
    return this.slice();
};

Array.prototype.swap = function (i, j) {
    var b = this[i];
    this[i] = this[j];
    this[j] = b;
    return this;
};

Array.prototype.unique = function () {
    var ko = {};
    this.forEach(function (item) {
        ko[item] = 1;
    });
    return Object.keys(ko);
};

Array.prototype.shuffle = function () {
    var shuffle = this.clone();
    var n = this.length;
    while (n) {
        var i = Math.random() * n-- | 0;
        shuffle = shuffle.swap(i, n);
    }
    return shuffle;
};

Array.prototype.diff = function (array) {
    return this.filter(function (i) {
        return array.indexOf(i) === -1;
    });
};

Array.prototype.remove = function (item) {
    this.splice(this.indexOf(item), 1);
    return this;
};

Array.prototype.contains = function (item) {
    return this.indexOf(item) !== -1;
};