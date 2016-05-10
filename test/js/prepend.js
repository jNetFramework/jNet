QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    $object.prepend('<ul></ul>');

    var $ul = $object.find('ul');

    $ul.prepend('<li>1</li>');
    $ul.prepend('<li>2</li>');
    $ul.prepend('<li>3</li>');
    $ul.prepend('<li>4</li>');
    $ul.prepend('<li>5</li>');

    assert.ok($ul.find('li').text().join() === [5, 4, 3, 2, 1].join(), "Passed!");

    $object.prepend('<ul/>');

    assert.ok(jNet($object.find('ul')[0]).find('li').length === 0, "Passed!");

    jNet($object.find('ul')[0]).prepend(jNet($ul.find('li')));

    assert.ok(jNet($object.find('ul')[0]).find('li').length === 5, "Passed!");

    assert.ok(jNet($object.find('ul')[0]).find('li').text().join() === [1, 2, 3, 4, 5].join(), "Passed!");

    assert.ok($ul.find('li').length === 0, "Passed!");

});