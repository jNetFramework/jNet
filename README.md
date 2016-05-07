# jNet

JavaScript Framework

```JavaScript
// todo: description jNetFramework
```

jNetFramework includes others frameworks

1. https://github.com/visionmedia/superagent
1. https://github.com/js-cookie/js-cookie
1. https://github.com/michaelvillar/dynamics.js

Used [1] framework in jNet Framework can with halped constraction 

```JavaScript
var superagent = jNet.fetch;
```

Used [2] ...

```JavaScript
var cookies = jNet.cookies;
```


Used [3] ...

```JavaScript
var dynamics = jNet.dynamics;
```

## todo list
- [ ] parent
- [ ] parents
- [x] text
- [x] append
- [x] appendTo
- [x] prepend
- [x] prependTo
- [x] innerHTML (alias html)
- [x] outerHTML
- [x] after
- [x] before

### Changelog

#### 7/6/16, 12:56

Implement index (Feature #22)

Example:

```haml
%ul
  %li 1
  %li.foo 2
  %li 3
```

```JavaScript
jNet('.foo').index() // 1
jNet('li').index() // [0, 1, 2]
```

#### 6/6/16, 22:55

Implement appendTo (Feature #18)

Implement prepend (Feature #17)

- [x] appendTo
- [x] prependTo

Example (appendTo):

```haml
%ul
    %li 1
    %li 2
    %li 3
```

```JavaScript
jNet('body').append('<hr/>')
// jNetObject {0: body, length: 1}

jNet('body').append('<ul/>')
// jNetObject {0: body, length: 1}

jNet('li').appendTo(jNet('ul').last())
// jNetObject {0: ul, length: 1}
```

```haml
%ul
%hr
%ul
    %li 1
    %li 2
    %li 3
```

```JavaScript
jNet('<li>4</li>').appendTo(jNet('ul').last())
// jNetObject {0: ul, length: 1}
```

```haml
%ul
%hr
%ul
    %li 1
    %li 2
    %li 3
    %li 4
```

Example (prependTo):

```haml
%ul
    %li 1
    %li 2
    %li 3
```

```JavaScript
jNet('<li>0</li>').prependTo(jNet('ul'))
// jNetObject {0: ul, length: 1}
```

```haml
%ul
    %li 0
    %li 1
    %li 2
    %li 3
```

#### 6/6/16, 22:15

Implement clientHeight, clientWidth (Feature #21)

- [x] clientHeight
- [x] clientWidth

fixed height, width (Feature #20)

fixed off (Feature #19)

Example (clientHeight, clientWidth):

```haml
%nav
  %ul
    %li 1
    %li 2
    %li 3
```

```JavaScript
jNet('nav').clientHeight(); // element
jNet('nav').clientWidth(); // element

jNet('li').clientHeight(); // returns array
jNet('li').clientWidth(); // returns array
```

#### 6/6/16, 19:49

Implement prepend (Feature #16)

Implement append (Feature #15)

Implement text (Feature #13)

Implement insertAfter, insertBefore (Feature #14)

- [x] prepend
- [x] append
- [x] text
- [x] after (old name is insertAfter)
- [x] before (old name is insertBefore)

rename insertAfter to after

rename insertBefore to before

Example (prepend):

```html
<div id="myProjects">
    <a href="https://fktpm.ru">fktpm.ru</a>
</div>
```

```JavaScript
jNet('#myProjects').prepend('<a href="https://babichev.net">Babichev</a>');
```

```html
<div id="myProjects">
    <a href="https://babichev.net">Babichev</a>
    <a href="https://fktpm.ru">fktpm.ru</a>
</div>
```

Example (text):

```html
<div id="myProjects">
    <a href="https://babichev.net">Babichev</a>
    <a href="https://fktpm.ru">fktpm.ru</a>
</div>
```

```JavaScript
jNet('#myProjects').text(); // Babichev fktpm.ru
jNet('#myProjects a').text(); // ["Babichev", "fktpm.ru"]

jNet('#myProjects a').text(function (content, element) {
  console.log([content, element]); // no modification text in element a
});

jNet('#myProjects a').text(function (content, element) {
  return content + '!'; // result: "Babichev!", "fktpm.ru!"
});
```

Example (after):

```html
<ul id="test1">
    <li><a href="">1</a></li>
    <li><a href="">2</a></li>
    <li><a href="">3</a></li>
</ul>
```

```JavaScript
jNet('li').after('<li>' + jNet('ul').outerHTML() + '</li>')
```

```html
<ul id="test1">
    <li><a href="">1</a></li>
    <li>
        <ul id="test1">
            <li><a href="">1</a></li>
            <li><a href="">2</a></li>
            <li><a href="">3</a></li>
        </ul>
    </li>
    <li><a href="">2</a></li>
    <li>
        <ul id="test1">
            <li><a href="">1</a></li>
            <li><a href="">2</a></li>
            <li><a href="">3</a></li>
        </ul>
    </li>
    <li><a href="">3</a></li>
    <li>
        <ul id="test1">
            <li><a href="">1</a></li>
            <li><a href="">2</a></li>
            <li><a href="">3</a></li>
        </ul>
    </li>
</ul>
```

Example (before):

```html
<ul id="test1">
    <li><a href="">1</a></li>
    <li><a href="">2</a></li>
    <li><a href="">3</a></li>
</ul>
```

```JavaScript
jNet('li').before('<li>' + jNet('ul').outerHTML() + '</li>')
```

```html
<ul id="test1">
    <li>
        <ul id="test1">
            <li><a href="">1</a></li>
            <li><a href="">2</a></li>
            <li><a href="">3</a></li>
        </ul>
    </li>
    <li><a href="">1</a></li>
    <li>
        <ul id="test1">
            <li><a href="">1</a></li>
            <li><a href="">2</a></li>
            <li><a href="">3</a></li>
        </ul>
    </li>
    <li><a href="">2</a></li>
    <li>
        <ul id="test1">
            <li><a href="">1</a></li>
            <li><a href="">2</a></li>
            <li><a href="">3</a></li>
        </ul>
    </li>
    <li><a href="">3</a></li>
</ul>
```

#### 6/6/16, 11:12

fixed bug hide/show (Feature #12)

- [x] hide
- [x] show

#### 6/6/16, 11:12

Implement valid 
```JavaScript
jNet('<ul></ul>')
```
with find, and preview element (without document-fragment) (Feature #11)

#### 6/5/16, 00:05

Optimization jNet(selector, dom) (Feature #10)

#### 5/5/16, 22:25

Implement innerHTML (alias html), outerHTML (Feature #9)

- [x] innerHTML [alias] html
- [x] outerHTML

Example:

```JavaScript
// ["<a href="">1</a>", "<a href="">2</a>", "<a href="">3</a>"]
jNet('li').html()

//["<li><a href="">1</a></li>", "<li><a href="">2</a></li>", "<li><a href="">3</a></li>"]
jNet('li').outerHTML()

// console.log 1
// console.log 2
// console.log 3
// jNetObject [li, li, li], values (3, 6, 9)
jNet('li').html(function (html, element) {
  var newObject = jNet(html).find('*');
  var integer = newObject[0].innerText;
  console.log(integer);
  return integer * 3;
});
```

#### 5/5/16, 21:55

possibilities of selection are expanded.
at the moment doesn't support: string, jNetObject...

Example:

```JavaScript
jNet('*', document.body)
```

#### 5/5/16, 20:33

the new feature is added in Implement attributes (attr) (Feature #5),
an opportunity to transfer callback by the second parameter

Example:

```JavaScript
jNet('a:not([alt])').attr("alt", function (altText, element) {
   console.log([altText, element]);
   return 'hello';
});
```

#### 5/5/16, 16:42

Implement closest (Feature #8)

- [x] clisest

#### 5/5/16, 15:15

Implement hasClass, addClass, removeClass, toggleClass (Feature #7)

- [x] hasClass
- [x] addClass
- [x] removeClass
- [x] toggleClass

Example:

```JavaScript
jNet('p').addClass('hello') // p.hello

jNet('p').toggleClass('world') // p.hello.world
jNet('p').toggleClass('hello') // p.world

jNet('p').hasClass('hello') // false
jNet('p').hasClass('world') // true

jNet('p').removeClass('world') // p

jNet('li').hasClass('hello') // [false, false, false]

jNet('li').addClass('hello') // [li.hello, li.hello, li.hello]

jNet('li').hasClass('hello') // [true, true, true]
```

#### 5/5/16, 13:56

css (todo: style), Implement css (Feature #6)

attr (without data), Implement attributes (attr) (Feature #5)

remove 'class' jNetPrivate

methods jNetPrivate moved in global namespace

- [x] jNetPrivate.isHTML to isHTML
- [x] jNetPrivate.parseXML to parseXML
- [x] jNetPrivate.trim to trim
- [x] jNetPrivate.parseHTML to parseHTML

Example (css):

```JavaScript
jNet('li').css('color', null) // remove
jNet('li').css('color', 'yellow') // set
jNet('li').css('color') // get
```

Example (attr):

```JavaScript
jNet('li').attr('style', null) // remove
jNet('li').attr('style', 'color: blue;') // set
jNet('li').attr('style') // get
```

#### 5/5/16, 12:40

Implement width, height (Feature #4)

- [x] width
- [x] height

Example:

```JavaScript
jNet('div').width() // 100
jNet('div').height() // 100
jNet('li').height() // [20, 20]
```

#### 5/5/16, 11:21

show/hide (with dymanics.js) ++

remove    ++ used standard method remove for elements

closest   ++

- [x] forEach rewrite on while
- [x] fixed more bugs

#### 4/5/16

rewrite js to cs

jNetPrivate

jNetPrivate.fn

- [x] isHTML
- [x] parseXML
- [x] trim
- [x] parseHTML

jNetObject

jNetObject.fn 

- [x] eq
- [x] first
- [x] last
- [x] odd
- [x] even
- [x] clone
- [x] toString
- [x] each
- [x] find
- [x] on
- [x] off
- [x] ready

jNet (jNetFramework)

jNet.fn

- [x] each
- [x] toString

jNet.oFn [alias] jNetObject.fn

jNet -- public

jNetObject -- private

jNetPrivate -- private

jNet.toString = jNet.fn.toString

jNet.clone = jNet.oFn.clone

jNet.each = jNet.fn.each

event's

- [x] click
- [x] contextmenu
- [x] dblclick
- [x] mouseup
- [x] mousedown
- [x] mouseout
- [x] mouseover
- [x] mousemove
- [x] keyup
- [x] keydown
- [x] keypress
- [x] copy
- [x] selectstart
- [x] selectionchange
- [x] select

jNet.fetch = require? "superagent"

jNet.cookies = require? "js-cookie"

jNet.dynamics = require? "dynamics.js"
