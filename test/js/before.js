QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    $object.find('.foo').before('<li>1</li>');
    $object.find('.bar').before('<li>3</li>');

    assert.ok($object.find('li').text().join() === [1, 2, 3, 4].join(), "Passed!");

});