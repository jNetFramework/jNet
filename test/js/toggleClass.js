QUnit.test("Equal", function (assert) {

    jNet(jNet('ul')[0]).toggleClass('hello');

    assert.ok(jNet(jNet('ul')[0]).hasClass('hello') === false, "Passed!");

    jNet(jNet('ul')[0]).toggleClass('hello');

    assert.ok(jNet(jNet('ul')[0]).hasClass('hello') === true, "Passed!");

});