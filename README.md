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

#### 5/5/16, 16:42

Implement closest (Feature #8)

#### 5/5/16, 15:15

Implement hasClass, addClass, removeClass, toggleClass (Feature #7)

- [x] hasClass
- [x] addClass
- [x] removeClass
- [x] toggleClass

#### 5/5/16, 13:56

css (todo: style), Implement css (Feature #6)

attr (without data), Implement attributes (attr) (Feature #5)

remove 'class' jNetPrivate

methods jNetPrivate moved in global namespace

- [x] jNetPrivate.isHTML to isHTML
- [x] jNetPrivate.parseXML to parseXML
- [x] jNetPrivate.trim to trim
- [x] jNetPrivate.parseHTML to parseHTML

#### 5/5/16, 12:40

Implement width, height (Feature #4)

- [x] width
- [x] height

#### 5/5/16, 11:21

show/hide (with dymanics.js) ++

remove    ++ used standard method remove for elements

closest   ++

- [x] forEach rewrite on while
- [x] fixed more bugs

#### 4/5/2016

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
        
