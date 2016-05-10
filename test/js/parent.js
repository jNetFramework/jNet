QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    var $too = jNet('#too');

    assert.ok($too.parent('div')[0] === $too[0].parentNode, "Passed!");
    assert.ok($too.parent()[0] === $too[0].parentNode, "Passed!");
    assert.ok(jNet('a').parent()[0] === $object[0], "Passed!");

});