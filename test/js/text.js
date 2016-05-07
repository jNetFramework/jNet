QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test ul').first();

    var result = [1, 2, 3, 4];

    $object.find('li').text(function (content) {
        assert.ok(+content === result.shift(), "Passed!");

        return +content * 3;
    });

    result = [3, 6, 9, 12];

    $object.find('li').text(function (content) {
        assert.ok(+content === result.shift(), "Passed!");
    });

    result = [3, 6, 9, 12];

    // testing: modification
    $object.find('li').text(function (content) {
        assert.ok(+content === result.shift(), "Passed!");
    });

});