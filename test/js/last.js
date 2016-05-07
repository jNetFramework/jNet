QUnit.test("Equal", function (assert) {

    assert.ok(jNet('ul').last().find('li').last()[0] === document.querySelector('ul:last-child li:last-child'), "Passed!");

    assert.ok(jNet('ul').last()[0] === document.querySelector('ul:last-child'), "Passed!");

});