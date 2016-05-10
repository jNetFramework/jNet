QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    $object.html('<h1></h1>');
    assert.ok($object.html() === '<h1></h1>', "Passed!");

});