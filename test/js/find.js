QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    assert.ok($object[0] === document.querySelector('#jnet-unit-test'), "Passed!");

    assert.ok($object.find('ul')[0] === document.querySelector('#jnet-unit-test ul'), "Passed!");

    assert.ok($object.find('ul li').length === document.querySelectorAll('#jnet-unit-test ul li').length, "Passed!");

    assert.ok($object.find('div').find('ul')[0] === document.querySelector('#jnet-unit-test div ul'), "Passed!");

    assert.ok($object.find('div').find('ul').find('li').length ===
        document.querySelectorAll('#jnet-unit-test div ul li').length, "Passed!");

});