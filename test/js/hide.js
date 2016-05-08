QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    assert.ok(!$object.isHidden(), "Passed!");
    
    $object.hide(0);

    jNet.dynamics.setTimeout(function () {
        assert.ok($object.isHidden(), "Passed!");
    }, 200);

});