QUnit.test("Equal", function (assert) {

    assert.ok(jNet('#test').css('color') === null, "Passed!");

    jNet('#test').css('color', 'blue');
    assert.ok(jNet('#test').css('color') === "blue", "Passed!");

    jNet('#test').css('color', null);
    assert.ok(jNet('#test').css('color') === null, "Passed!");

});