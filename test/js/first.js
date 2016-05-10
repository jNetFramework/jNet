QUnit.test("Equal", function (assert) {

    assert.ok(jNet('ul').find('li').first()[0] === document.querySelector('li'), "Passed!");
    assert.ok(jNet('ul').first()[0] === document.querySelector('ul'), "Passed!");

});