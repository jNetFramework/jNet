QUnit.test("Equal", function (assert) {

    assert.ok(jNet('ul li').odd().text().join() === ['2', '4'].join(), "Passed!");

});