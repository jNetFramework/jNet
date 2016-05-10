QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    assert.ok($object == jNetObject.fn.toString(), "Passed!");

});