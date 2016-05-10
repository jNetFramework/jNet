QUnit.test("Equal", function (assert) {

    assert.ok(jNet.isHTML('<div/>'), "Passed!");
    assert.ok(!jNet.isHTML('hello'), "Passed!");

});