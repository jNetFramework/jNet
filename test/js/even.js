QUnit.test("Equal", function (assert) {

    assert.ok(jNet('ul li').even().text().join() === ['1', '3'].join(), "Passed!");

});