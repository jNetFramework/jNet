QUnit.test("Equal", function (assert) {

    assert.ok(jNet('body').eq(-1)[0] == jNet('body').last()[0], "Passed!");
    assert.ok(jNet('body').eq(0)[0] == jNet('body').first()[0], "Passed!");

});