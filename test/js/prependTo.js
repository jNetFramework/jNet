QUnit.test("Equal", function (assert) {

    var $object = jNet('#jnet-unit-test');

    jNet('<ul></ul>').prependTo($object);

    var $ul = $object.find('ul');

    jNet('<li>5</li>').prependTo($ul);
    jNet('<li>4</li>').prependTo($ul);
    jNet('<li>3</li>').prependTo($ul);
    jNet('<li>2</li>').prependTo($ul);
    jNet('<li>1</li>').prependTo($ul);

    assert.ok($ul.find('li').text().join() === [1, 2, 3, 4, 5].join(), "Passed!");

    jNet('<ul/>').prependTo($object);

    assert.ok(jNet($object.find('ul')[0]).find('li').length === 0, "Passed!");

    jNet($ul.find('li')).prependTo(jNet($object.find('ul')[0]));

    assert.ok(jNet($object.find('ul')[0]).find('li').length === 5, "Passed!");

    assert.ok(jNet($object.find('ul')[0]).find('li').text().join() === [5, 4, 3, 2, 1].join(), "Passed!");

    assert.ok($ul.find('li').length === 0, "Passed!");

});