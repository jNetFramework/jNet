QUnit.test("Equal", function (assert) {

    jNet('ul').addClass('hello');
    jNet('ul').addClass('world');

    assert.ok(jNet('ul').length === jNet('.hello').length, "Passed!");
    assert.ok(jNet('.world').length === jNet('.hello').length, "Passed!");

});