QUnit.test("Equal", function (assert) {

    assert.ok((jNet(document).eq(-1)[0] + '').match(/[A-Z][A-Za-z]*/)[0] === 'HTMLDocument', "Passed!");

    assert.ok(jNet('body')[0] === document.querySelector('body'), "Passed!");

    assert.ok(jNet(document).toString() === jNet.oFn.toString(), "Passed!");
    assert.ok(jNet.fn.toString() !== jNet.oFn.toString(), "Passed!");

    assert.ok(jNet('body').eq(-1)[0] == jNet('body').last()[0], "Passed!");
    assert.ok(jNet('body').eq(0)[0] == jNet('body').first()[0], "Passed!");
    assert.ok(jNet(document)[0] === document, "Passed!");

    assert.ok(jNet('ul').length === 1, "Passed!");
    assert.ok(jNet('ul').find('li').length === 3, "Passed!");
    assert.ok(jNet('ul li').length === 3, "Passed!");

    var sum = 0, result = 6;
    jNet('ul li').each(function (iterator, element) {
         sum += +element.innerText;
    });

    assert.ok(sum === result, "Passed!");

    assert.ok(window.jNet === document.jNet, "Passed!");

    var object = {a: 1};
    assert.ok(Object.create(object).a === jNet.clone(object).a, "Passed!");

    assert.ok(jNet('li')[0] === jNet.clone(jNet('li'))[0], "Passed!");
    assert.ok(jNet('li')[0] === jNet(jNet('li'))[0], "Passed!");

});