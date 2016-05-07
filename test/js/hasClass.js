QUnit.test("Equal", function (assert) {

    assert.ok(jNet(jNet('ul')[0]).hasClass('hello') === true, "Passed!");
    assert.ok(jNet(jNet('ul')[0]).hasClass('world') === false, "Passed!");

});