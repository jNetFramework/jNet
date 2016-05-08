QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    var $too = jNet('#too');

    assert.ok($too.closest('div')[0] === $too[0], "Passed!");

    assert.ok($too.closest('.hello')[0] === $object.find('div')[0], "Passed!");

    assert.ok($too.closest('a') === null, "Passed!");

    assert.ok($too.closest('div[title]')[0] === $object[0], "Passed!");

});