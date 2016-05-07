QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    assert.ok($object.get(0) === document.querySelector('#jnet-unit-test'), "Passed!");

});