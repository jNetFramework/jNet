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
- [ ] text
- [ ] append
- [ ] appendTo
- [ ] prepend
- [ ] prependTo
- [ ] innerHTML (alias html)
- [ ] outerHTML
- [ ] insertAfter ?
- [ ] insertBefore ?

### Changelog

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
