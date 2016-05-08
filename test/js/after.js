QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    $object.find('.foo').after('<li>2</li>');
    $object.find('.bar').after('<li>4</li>');

    assert.ok($object.find('li').text().join() === [1, 2, 3, 4].join(), "Passed!");

});