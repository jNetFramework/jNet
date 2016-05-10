QUnit.test("Equal", function (assert) {

    var object = {
        a: 'hello'
    };

    assert.ok(jNet.clone(object).a === object.a, "Passed!");
    assert.ok(jNet.clone(object).a === Object.create(object).a, "Passed!");

    var newObject = jNet.clone(object);

    newObject.a = 'world';

    assert.ok(object.a + ' ' + newObject.a === 'hello world', "Passed!");


    assert.ok(jNet('li')[0] === jNet.clone(jNet('li'))[0], "Passed!");

});