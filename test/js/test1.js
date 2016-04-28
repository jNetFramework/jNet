QUnit.test("Equal", function (assert) {
    assert.ok((jNet(document).eq(-1)[0] + '').match(/[A-Z][A-Za-z]*/)[0] === 'HTMLDocument', "Passed!");
    assert.ok(jNet('body')[0] === document.querySelector('body'), "Passed!");
    assert.ok(jNet(document).toString() === jNet.oFn.toString(), "Passed!");
    assert.ok(jNet('body').eq(-1)[0] == jNet('body').last()[0], "Passed!");
    assert.ok(jNet('body').eq(0)[0] == jNet('body').first()[0], "Passed!");
    assert.ok(jNet(document)[0] === document, "Passed!");
});