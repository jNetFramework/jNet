QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    $object.outerHTML('<h1></h1>');

    $object = jNet('h1').first();

    assert.ok($object.outerHTML() === '<h1></h1>', "Passed!");

});