QUnit.test("Equal", function (assert) {

    var ul = document.querySelector('ul');
    assert.ok(jNet('ul').first().height() === ul.getBoundingClientRect().height, "Passed!");

});