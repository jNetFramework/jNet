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

returnList = (list) ->
  if list.length is 1
    return list.pop()
  return list

parseXML = (string) ->
  domParser = new DOMParser()
  domParser.parseFromString string, "text/xml"

trim = (string, regex) ->
  if typeof regex is "undefined"
    return string.trim()
  string.replace new RegExp("/^" + regex + "|" + regex + "$/gm"), ""

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

  tmp = undefined
  tag = undefined
  wrap = undefined
  j = undefined
  fragment = document.createDocumentFragment()

  if !rhtml.test(string)
    fragment.appendChild document.createTextNode(string)
  else
    tmp = fragment.appendChild(document.createElement("div"))
    tag = (rtagName.exec(string) or ['', ''])[1].toLowerCase()
    wrap = wrapMap[tag] or wrapMap._default
    tmp.innerHTML = wrap[1] + string.replace(rxhtmlTag, "<$1></$2>") + wrap[2]
    j = wrap[0]
    while j--
      tmp = tmp.lastChild
    fragment.removeChild fragment.firstChild
    while tmp.firstChild
      fragment.appendChild tmp.firstChild
  fragment

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
  if !Array.isArray(object)

    ###*
    # Find element from DOMTree
    #  with method find
    #
    # @returns jNetObject
    ###
    return @find(object)

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
  # get element with index DOMTree as jNetObject
  # @returns jNetObject
  ###
  eq: (index) ->
    index += @length if index < 0
    jNet @[index]

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
    if object.toString() is @toString()
      return object

    list = []
    if object is window
      list.push object

    else if object is document
      list.push document

    else if object and object.nodeType
      list.push object

    else if typeof object is "string"

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
      if element.addEventListener
        element.addEventListener type, listener, useCapture
      else
        element.attachEvent "on" + type, ->
          listener.call element
          return
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
    @each iterator, element ->
      if element.removeEventListener
        element.removeEventListener type, listener, useCapture
      else if element.detachEvent
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
    prototype = "clientWidth" if typeof prototype is "undefined"
    @each (iterator, element) ->
      list.push element[prototype]
      return
    returnList list

  height: ->
    return @width "clientHeight"

  css: (name, value) ->
    if typeof value is "undefined"
      list = []
      @each (iterator, element) ->
        value = element.style.getPropertyValue name
        list.push value
        return
      returnList list

    else
      @each (iterator, element) ->
        element.style.setProperty name, value
        return

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
        element.setAttribute name, value
        return

  closest: (selector) ->

    closest = (node, selector) ->
      node.closest selector

    if typeof Element.prototype.closest is "undefined"
      closest = (node, selector) ->
        while node
          if node.matches(css)
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
    return new jNetObject list

#  parent: (selector) -> # todo: development parent
#    list = []
#    elements = document.querySelectorAll(selector)
#    @each (iterator, element) ->
#
#      return
#    return

  show: (interval) ->

    interval = 1000 if typeof interval is "undefined"

    @each (iterator, element) ->
      jNet.dynamics.animate element, {
        opacity: 1,
        scale: 1
      }, {
        type: jNet.dynamics.spring,
        frequency: 200,
        friction: 270,
        duration: 800,
        delay: interval + iterator * 40
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
        duration: 1000,
        delay: interval + 100 + iterator * 40
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
        duration: 300,
        friction: 100,
        delay: interval + iterator * 40
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
jNet = (object) ->

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
    if object.toString() is jNetObject.fn.toString()
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
#    superagent framework for working in network
#      Project in GitHub:
#          @link https://github.com/visionmedia/superagent
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
# @link https://github.com/visionmedia/superagent
###
jNet.fetch = require? "superagent"

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