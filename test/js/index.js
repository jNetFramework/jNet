QUnit.test("Equal", function (assert) {

    jNet('ul li').text(function (content, element) {
        assert.ok(+content === +jNet(element).index(), "Passed!");
    });

});