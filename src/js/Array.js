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

Array.prototype.unique = function () {
    var ko = {};
    this.forEach(function (item) {
        ko[item] = 1;
    });
    return Object.keys(ko);
};

Array.prototype.shuffle = function () {
    var shuffle = this.clone();
    shuffle.sort(function (a, b) {
        return Math.random() - 0.5;
    });
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
