QUnit.test("Equal", function (assert) {

    var ul = document.querySelector('ul');
    assert.ok(jNet('ul').first().clientHeight() === ul.clientHeight, "Passed!");

});