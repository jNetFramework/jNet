QUnit.test("Equal", function (assert) {

    assert.ok(jNet(jNet('ul')[0]).hasClass('hello') === true, "Passed!");

    jNet(jNet('ul')[0]).removeClass('hello');

    assert.ok(jNet(jNet('ul')[0]).hasClass('hello') === false, "Passed!");

});