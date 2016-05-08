'use strict'

isHTML = (string) ->
  elementObject = document.createElement('div')
  elementObject.innerHTML = string
  iteratorChildNodes = elementObject.childNodes
  i = iteratorChildNodes.length
  while i--
    if iteratorChildNodes[i].nodeType is 1
      return true
  false

matchesSelector = (element, selector) ->
  allElements = document.querySelectorAll(selector)
  for currentElement in allElements
    if currentElement is element
      return true
  false

###*
# the method is used for the
#  majority of methods which
#    return value or the array
###
returnList = (list) ->

  ###*
  # if length equal zero
  #  then the return null
  ###
  if list.length is 0
    return null

  ###*
  # if length equal 1
  #  then return mixed without
  #   array, one element(int,string..)
  ###
  if list.length is 1
    return list.pop()

  ###*
  # return array
  ###
  list

#ucFirst = (str) ->
#  f = str[0].toUpperCase
#  f + str.substr 1, str.length - 1

#parseXML = (string) ->
#  domParser = new DOMParser()
#  domParser.parseFromString string, "text/xml"

#trim = (string, regex) ->
#  if typeof regex is "undefined"
#    if typeof string.trim is "function"
#      return string.trim()
#    regex = "\s+"
#  string.replace new RegExp("/^" + regex + "|" + regex + "$/gm"), ""

parseHTML = (string) ->
  rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
  rtagName = /<([\w:]+)/
  rhtml = /<|&#?\w+;/
  wrapMap =
    option: [
      1
      "<select multiple='multiple'>"
      "</select>"
    ]
    thead: [
      1
      "<table>"
      "</table>"
    ]
    col: [
      2
      "<table><colgroup>"
      "</colgroup></table>"
    ]
    tr: [
      2
      "<table><tbody>"
      "</tbody></table>"
    ]
    td: [
      3
      "<table><tbody><tr>"
      "</tr></tbody></table>"
    ]
    _default: [0, "", ""]

  fragment = document.createDocumentFragment()

  if !rhtml.test(string)
    fragment.appendChild document.createTextNode(string)
  else
    tmp = fragment.appendChild(document.createElement("div"))
    tag = (rtagName.exec(string) or ["", ""])[1].toLowerCase()
    wrap = wrapMap[tag] or wrapMap._default
    tmp.innerHTML = wrap[1] + string.replace(rxhtmlTag, "<$1></$2>") + wrap[2]
    j = wrap[0]
    while j--
      tmp = tmp.lastChild
    fragment.removeChild fragment.firstChild
    while tmp.firstChild
      fragment.appendChild tmp.firstChild

  fragment.childNodes

###*
# Object for working with DOMTree
#
# @param object
# @returns {*}
###
jNetObject = (object) ->

  ###*
  # If parameter object is not Array
  ###
  if !Array.isArray object

    ###*
    # Find element from DOMTree
    #  with method find
    #
    # @returns jNetObject
    ###
    return @find object

  ###*
  # With helped prototype Array, method's
  #  appended elements in object
  ###
  Array::push.apply this, object

  ###*
  # @returns {*}
  ###
  this

###*
# created prototype for jNetObject
#  and created alias prototype, FN
###
jNetObject.prototype = jNetObject.fn =

  ###*
  # returns element DOMTree with index, without jNetObject
  ###
  get: (index) ->
    index += @length if index < 0
    @[index]

  ###*
  # get element with index DOMTree as jNetObject
  # @returns jNetObject
  ###
  eq: (index) ->
    jNet @get index

  ###*
  # get first element DOMTree as jNetObject
  # @returns jNetObject
  ###
  first: ->
    @eq 0

  ###*
  # get last element DOMTree as jNetObject
  # @returns jNetObject
  ###
  last: ->
    @eq @length - 1

  odd: (iterator) ->
    list = []
    iterator = 1 if typeof iterator is "undefined"
    while iterator < @length
      list.push @[iterator]
      iterator += 2
    new jNetObject(list)

  even: ->
    return @odd(0)

  clone: (object) ->
    object = this if typeof object is "undefined"
    Object.create object

  ###*
  # current method returns name this object
  #
  # @returns string
  ###
  toString: ->
    "jNetObject"

  ###*
  # cycle implement in jNetFramework for objects jNet
  #
  # First parameter callback is Iterator
  #   Next parameter callback is Value
  #     Next parameter callback is this (array)
  #
  # @returns {*}
  ###
  each: (callback) ->
    iterator = 0
    while iterator < @length
      callback iterator, @[iterator], this
      ++iterator
    this

  find: (object) ->

    if object instanceof jNetObject
      return object

    list = []
    if object is window
      list.push object

    else if object is document
      list.push document

    else if object and object.nodeType
      list.push object

    else if typeof object is "string"

      if isHTML object # parse html
        Array::push.apply list, parseHTML object

      else # if object is not html then
        elements = if @length then this else [document]
        iterator = 0
        while iterator < elements.length
          Array::push.apply list, elements[iterator].querySelectorAll object
          ++iterator

    new jNetObject(list)

  ###*
  # current method append event on
  #   element's domtree
  #     type -- name event
  #     listener -- callback for event
  #     useCapture
  #
  # @link https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener
  ###
  on: (type, listener, useCapture) ->
    @each (iterator, element) ->
      if typeof element.addEventListener isnt "undefined"
        element.addEventListener type, listener, useCapture
      else if typeof element.attachEvent isnt "undefined"
        element.attachEvent "on" + type, ->
          listener.call element
      return
    this

  ###*
  # current method remove event on
  #   element's domtree
  #     type -- name event
  #     listener -- callback for event
  #     useCapture
  #
  # @link https://developer.mozilla.org/ru/docs/Web/API/EventTarget/removeEventListener
  ###
  off: (type, listener, useCapture) ->
    @each (iterator, element) ->
      if typeof element.removeEventListener isnt "undefined"
        element.removeEventListener type, listener, useCapture
      else if typeof element.detachEvent isnt "undefined"
        element.detachEvent "on" + type, listener
      return
    this

  ###*
  # the browser has completely loaded HTML,
  # and has constructed a DOM tree.
  ###
  ready: (listener, useCapture) ->
    @on "DOMContentLoaded", listener, useCapture

  remove: ->
    @each (iterator, element) ->
      element.remove()
      return

  width: (prototype) ->
    list = []
    prototype = "width" if typeof prototype is "undefined"
    @each (iterator, element) ->
      clientRect = element.getBoundingClientRect()
      list.push clientRect[prototype]
      return
    returnList list

  height: ->
    return @width "height"

  clientWidth: (prototype) ->
    list = []
    prototype = "clientWidth" if typeof prototype is "undefined"
    @each (iterator, element) ->
      list.push element[prototype]
      return
    returnList list

  clientHeight: ->
    return @clientWidth "clientHeight"

  offsetWidth: ->
    return @clientWidth "offsetWidth"

  offsetHeight: ->
    return @clientHeight "offsetHeight"

  isHidden: ->

    offsetHeight = @offsetHeight()
    offsetWidth = @offsetWidth()

    list = []

    if offsetHeight isnt null

      if !Array.isArray(offsetHeight)
        offsetHeight = [offsetHeight]
        offsetWidth = [offsetWidth]

      jNet.each offsetHeight, (index, height) ->
        list.push !height && !offsetWidth[index]

    returnList list

  css: (name, value) ->
    if typeof value is "undefined"
      list = []
      @each (iterator, element) ->
        value = element.style.getPropertyValue name
        if value is '' || typeof value is "undefined"
          value = null
        list.push value
        return
      returnList list

    else
      @each (iterator, element) ->
        element.style.setProperty name, value
        return

  outerHTML: (value, prototype) ->
    prototype = "outerHTML" if typeof prototype is "undefined"
    if typeof value is "undefined"
      list = []
      @each (iterator, element) ->
        value = element[prototype]
        list.push value
        return
      returnList list
    else
      @each (iterator, element) ->
        result = value
        if typeof value is "function"
          result = value jNet(element)[prototype](), element
        if result
          element[prototype] = result
        return

  innerHTML: (value) ->
    @html value

  html: (value) ->
    @outerHTML value, "innerHTML"

  index: ->
    list = []
    @each (iterator, element) ->
      if typeof element.parentNode isnt "undefined"
        parent = element.parentNode
        if typeof parent.children isnt "undefined"
          children = parent.children
          index = 0
          length = children.length
          while index < length
            if children[index] is element
              list.push +index
              break
            index++
    returnList list

  attr: (name, value) ->

    if typeof value is "undefined"
      list = []
      @each (iterator, element) ->
        value = element.getAttribute name
        list.push value
        return
      returnList list
    else if value is null
      @each (iterator, element) ->
        if element.hasAttribute name
          element.removeAttribute name
        return
    else
      @each (iterator, element) ->

        result = value
        if typeof value is "function"
          result = value jNet(element).attr(name), element

        if result
          element.setAttribute name, result

        return

  hasClass: (classname) ->
    list = []
    @each (iterator, element) ->
      value = element.classList.contains classname
      list.push value
    returnList list

  addClass: (classname) ->
    @each (iterator, element) ->
      element.classList.add classname

  removeClass: (classname) ->
    @each (iterator, element) ->
      element.classList.remove classname

  toggleClass: (classname) ->
    @each (iterator, element) ->
      element.classList.toggle classname

  appendTo: (selector) ->
    object = jNet(selector)
    object.append(@)

  prependTo: (selector) ->
    object = jNet(selector)
    object.prepend(@)

  append: (selector) ->
    @each (iterator, element) ->
      jNet.each jNet(selector), (iteratorSelector, elementSelector) ->
        element.appendChild elementSelector

  prepend: (selector) ->
    @each (iterator, element) ->
      jNet.each jNet(selector), (iteratorSelector, elementSelector) ->
        if typeof element.childNodes[0] isnt "undefined"
          element.insertBefore elementSelector, element.childNodes[0]
        else
          element.appendChild elementSelector

  after: (selector) ->
    @each (iterator, element) ->
      jNet.each jNet(selector), (iteratorSelector, elementSelector) ->
        parentNode = element.parentNode
        nextSibling = element.nextSibling
        if nextSibling
          parentNode.insertBefore elementSelector, nextSibling
        else
          parentNode.appendChild elementSelector

  before: (selector) ->
    @each (iterator, element) ->
      jNet.each jNet(selector), (iteratorSelector, elementSelector) ->
        element.parentNode.insertBefore elementSelector, element

  text: (content) ->
    if typeof content isnt "undefined"
      @each (iterator, element) ->
        prototype = "innerText"
        prototype = "value" if typeof element[prototype] is "undefined"
        result = content
        if typeof content is "function"
          result = content jNet(element).text(), element
        if result
          element[prototype] = result
        return
    else
      list = []
      @each (iterator, element) ->
        list.push element.innerText || element.value
      returnList list

  closest: (selector) ->

    closest = (node, selector) ->
      # Element.closest
      # @link https://developer.mozilla.org/ru/docs/Web/API/Element/closest
      node.closest selector

    matches = (node, selector) ->
        node.matches(selector)

    if typeof Element.prototype.matches is "undefined"
      matches = (node, selector) ->
        matchesSelector(node, selector)

    if typeof Element.prototype.closest is "undefined"
      closest = (node, selector) ->
        while node
          if matches(node, selector)
            return node
          else
            node = node.parentElement
        return null

    list = []
    @each (iterator, element) ->

      newElement = closest element, selector
      isExists = false

      jNet.each list, (key, value) ->
        if value is newElement
          isExists = true
          return

      if !isExists
        list.push newElement

      return

    list = returnList list

    if list
      return new jNetObject list

    list

#  parent: (selector) -> # todo: development parent
#    list = []
#    elements = document.querySelectorAll(selector)
#    @each (iterator, element) ->
#
#      return
#    return

  show: (interval) ->

    interval = 1000 if typeof interval is "undefined"
    interval = 1 if interval < 1

    @each (iterator, element) ->
      jNet.dynamics.animate element, {
        opacity: 1,
        scale: 1
      }, {
        type: jNet.dynamics.spring,
        frequency: 200,
        friction: 270,
        duration: interval * 4 / 5,
        delay: iterator * 40
      }
      return

    items = @find('*')
    jNet.each items, (iterator, element) ->

      jNet.dynamics.css element, {
        opacity: 0,
        translateY: 20
      }

      jNet.dynamics.animate element, {
        opacity: 1,
        translateY: 0
      }, {
        type: jNet.dynamics.spring,
        frequency: 300,
        friction: 435,
        duration: interval,
        delay: 100 + iterator * 40
      }

      return
    return

  hide: (interval) ->

    interval = 1000 if typeof interval is "undefined"

    @each (iterator, element) ->
      jNet.dynamics.animate element, {
        opacity: 0,
        scale: 0.1
      }, {
        type: jNet.dynamics.easeInOut,
        duration: interval,
        friction: 100,
        delay: iterator * 40
      }
      return
    return

###*
# Main Object of a Framework.
#  With the aid of developer can manager
#      of elements dom tree and created/destroys events
#
# @param object
# @returns {*}
###
jNet = (object, doc) ->

  if typeof doc isnt "undefined"
    return jNet(doc).find(object)

  if typeof object is "function"
    jnObject = jNet document
    if document.readyState is "complete"
      object()
      return jnObject

    return jnObject.ready object

  else if typeof object is "string"
    return new jNetObject object

  else if typeof object is "object"
    return new jNetObject object

jNet.fn = jNet.prototype =

  each: (object, callback) ->

    if object instanceof jNetObject
      object.each callback

    else if Array.isArray(object)
      length = object.length
      iterator = 0
      while iterator < length
        callback iterator, object[iterator], object
        ++iterator

    else if typeof object is "object"
      objects = Object.keys(object)
      length = object.length
      iterator = 0
      while iterator < length
        key = objects[iterator]
        value = object[key]
        callback key, value, object
        ++iterator

  toString: ->
    "jNetFramework"

###*
# set pointer in jNetObject.prototype
###
jNet.oFn = jNetObject.fn

###*
# method toString override in global object
###
jNet.toString = jNet.fn.toString

###*
# method clone in global Object
###
jNet.clone = jNet.oFn.clone

###*
# method each in global Object
###
jNet.each = jNet.fn.each

###*
# the current method checks whether it is
#  possible to transform a line to html-object
###
jNet.isHTML = isHTML

###*
# Export framework to :
#  window
#  document
#  exports
#  define
###

###*
# Check exists and typeof equal function
#  and check exists define.and
#
# #1 - fixed AMD
###
if typeof define is "function" and define.amd
  define ->
    {"jNet": jNet}

###*
# current method extend jNetObject
#   with helped fn
###
jNet.extend = (object) ->
  @each object, (prototype, value) ->
    jNet.oFn[prototype] = value
    return

###*
# Append in prototype new methods for working jNet Framework, jNetObject
###
jNet.each [
  "click", "contextmenu", "dblclick",
  "mouseup", "mousedown", "mouseout",
  "mouseover", "mousemove", "keyup",
  "keydown", "keypress", "copy",
  "selectstart", "selectionchange", "select"
], (iterator, property) ->
  jNet.oFn[property] = (listener, useCapture) ->
    @on property, listener, useCapture
  return

###*
#  jNet Framework used:
#
#    fetch framework for working in network
#      Project in GitHub:
#          @link https://github.com/undozen/fetch
#
#    js-cookie framework for working with cookies
#      Project in GitHub:
#          @link https://github.com/js-cookie/js-cookie
#
#    dynamics.js framework for working with 'animation'
#       Project in GitHub
#          @link https://github.com/michaelvillar/dynamics.js
###

###*
# included superagent
# @link https://github.com/undozen/fetch
###
jNet.fetch = require? "fetch-polyfill"

###*
# included js-cookie
# @link https://github.com/js-cookie/js-cookie
###
jNet.cookies = require? "js-cookie"

###*
# included dynamics.js
# @link https://github.com/michaelvillar/dynamics.js
###
jNet.dynamics = require? "dynamics.js"

###*
# check exists window and
#  set jNet in window
###
window.jNet = jNet if window?

###*
# check exists document and
#  set jNet in document
###
document.jNet = jNet if document?

###*
# check exists exports and
#  set jNet in exports
###
exports.jNet = jNet if exports?