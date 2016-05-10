QUnit.test("Equal", function (assert) {

    var sum = 0, result = 10;
    jNet('ul').first().find('li').each(function (iterator, element) {
        sum += +element.innerText;
    });

    assert.ok(sum === result, "Passed!");

});