QUnit.test("Equal", function (assert) {

    assert.ok(jNet('#test').attr('class') === null, "Passed!");

    jNet('#test').attr('class', 'hello');
    assert.ok(jNet('#test').attr('class') === "hello", "Passed!");

    jNet('#test').attr('class', null);
    assert.ok(jNet('#test').attr('class') === null, "Passed!");

});