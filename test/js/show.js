QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    $object.css('display', 'none');

    assert.ok($object.isHidden(), "Passed!");

    $object.show(1);

    jNet.dynamics.setTimeout(function () {
        assert.ok(!$object.isHidden(), "Passed!");
    }, 200);

});