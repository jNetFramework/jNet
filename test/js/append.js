QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    $object.append('<ul></ul>');

    var $ul = $object.find('ul');

    $ul.append('<li>1</li>');
    $ul.append('<li>2</li>');
    $ul.append('<li>3</li>');
    $ul.append('<li>4</li>');
    $ul.append('<li>5</li>');

    assert.ok($ul.find('li').text().join() === [1, 2, 3, 4, 5].join(), "Passed!");

    $object.append('<ul/>');

    assert.ok(jNet($object.find('ul')[1]).find('li').length === 0, "Passed!");

    jNet($object.find('ul')[1]).append(jNet($ul.find('li')));

    assert.ok(jNet($object.find('ul')[1]).find('li').length === 5, "Passed!");

    assert.ok(jNet($object.find('ul')[1]).find('li').text().join() === [1, 2, 3, 4, 5].join(), "Passed!");

    assert.ok($ul.find('li').length === 0, "Passed!");

});