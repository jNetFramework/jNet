QUnit.test("Equal", function (assert) {

    var sum = 0, result = 10;
    jNet.each([1, 2, 3, 4], function (key, value) {
        sum += value;
    });

    assert.ok(sum === result, "Passed!");

});