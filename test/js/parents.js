QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    var $too = jNet('#too');

    assert.ok($too.parents('div').length === 2, "Passed!");
    assert.ok($too.parents().length === 4, "Passed!");
    assert.ok($too.parents('#jnet-unit-test')[0] === $object[0], "Passed!");

});