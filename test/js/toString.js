QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    assert.ok($object == jNet.oFn.toString(), "Passed!");

});