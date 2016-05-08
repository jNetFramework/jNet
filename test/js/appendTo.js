QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    jNet('<ul></ul>').appendTo($object);

    var $ul = $object.find('ul');

    jNet('<li>1</li>').appendTo($ul);
    jNet('<li>2</li>').appendTo($ul);
    jNet('<li>3</li>').appendTo($ul);
    jNet('<li>4</li>').appendTo($ul);
    jNet('<li>5</li>').appendTo($ul);

    assert.ok($ul.find('li').text().join() === [1, 2, 3, 4, 5].join(), "Passed!");

    jNet('<ul/>').appendTo($object);

    assert.ok(jNet($object.find('ul')[1]).find('li').length === 0, "Passed!");

    jNet($ul.find('li')).appendTo(jNet($object.find('ul')[1]));

    assert.ok(jNet($object.find('ul')[1]).find('li').length === 5, "Passed!");

    assert.ok(jNet($object.find('ul')[1]).find('li').text().join() === [1, 2, 3, 4, 5].join(), "Passed!");

    assert.ok($ul.find('li').length === 0, "Passed!");

});