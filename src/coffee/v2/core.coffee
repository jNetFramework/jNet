'use strict'

jNetPrivate = ->

jNetPrivate.prototype =

  isHTML: (string) ->
    elementObject = document.createElement('div')
    elementObject.innerHTML = string
    iteratorChildNodes = elementObject.childNodes
    i = iteratorChildNodes.length
    while i--
      if iteratorChildNodes[i].nodeType == 1
        return true
    false

  parseXML: (string) ->
    domParser = new DOMParser()
    domParser.parseFromString string, 'text/xml'

  trim: (string, regex) ->
    if typeof regex == 'undefined'
      return string.trim()
    string.replace new RegExp('/^' + regex + '|' + regex + '$/gm'), ''

  parseHTML: (string) ->
    rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
    rtagName = /<([\w:]+)/
    rhtml = /<|&#?\w+;/
    wrapMap =
      option: [
        1
        '<select multiple=\'multiple\'>'
        '</select>'
      ]
      thead: [
        1
        '<table>'
        '</table>'
      ]
      col: [
        2
        '<table><colgroup>'
        '</colgroup></table>'
      ]
      tr: [
        2
        '<table><tbody>'
        '</tbody></table>'
      ]
      td: [
        3
        '<table><tbody><tr>'
        '</tr></tbody></table>'
      ]
      _default: [0, '', '']

    tmp = undefined
    tag = undefined
    wrap = undefined
    j = undefined
    fragment = document.createDocumentFragment()

    if !rhtml.test(string)
      fragment.appendChild document.createTextNode(string)
    else
      tmp = fragment.appendChild(document.createElement('div'))
      tag = (rtagName.exec(string) or ['', ''])[1].toLowerCase()
      wrap = wrapMap[tag] or wrapMap._default
      tmp.innerHTML = wrap[1] + string.replace(rxhtmlTag, '<$1></$2>') + wrap[2]
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

  eq: (index) ->
    if index < 0
      index += @length
    jNet @[index]

  first: ->
    @eq 0

  last: ->
    @eq @length - 1

  odd: (iterator) ->
    list = []
    iterator = 1 if typeof iterator == 'undefined'
    while iterator < @length
      list.push @[iterator]
      iterator += 2
    new jNetObject(list)

  even: ->
    return @odd(0)

  clone: (object) ->
    Object.create if object then object else this

  toString: ->
    'jNetObject'

  each: (callback) ->
    iterator = 0
    while iterator < @length
      callback iterator, @[iterator], this
      ++iterator
    this

  find: (object) ->

    if object.toString() == @toString()
      return object

    list = []
    if object == window
      list.push object

    else if object and object.nodeType
      list.push object

    else if typeof object == 'string'
      if @length
        @each (iterator, element) ->
          Array::push.apply list, element.querySelectorAll(object)
          return

      else
        Array::push.apply list, document.querySelectorAll(object)

    new jNetObject(list)

  on: (type, listener, useCapture) ->
    @each (iterator, element) ->
      if element.addEventListener
        element.addEventListener type, listener, useCapture
      else
        element.attachEvent 'on' + type, ->
          listener.call element
    this

  off: (type, listener, useCapture) ->
    @each (iterator, element) ->
      if element.removeEventListener
        element.removeEventListener type, listener, useCapture
      else if element.detachEvent
        element.detachEvent 'on' + type, listener
      return
    this

  ready: (listener, useCapture) ->
    @on 'DOMContentLoaded', listener, useCapture

###*
# Main Object of a Framework.
#  With the aid of developer can manager
#      of elements dom tree and created/destroys events
#
# @param object
# @returns {*}
###
jNet = (object) ->

  if typeof object == 'function'
    jnObject = jNet(document)
    if document.readyState == 'complete'
      object()
      return jnObject
    return jnObject.on('DOMContentLoaded', object)

  else if typeof object == 'string'
    return new jNetObject(object)

  else if typeof object == 'object'
    return new jNetObject(object)

  return

jNet.fn = jNet.prototype =

  each: (object, callback) ->

    if object.toString() == jNetObject.fn.toString()
      object.each callback

    else if Array.isArray(object)
      length = object.length
      iterator = 0
      while iterator < length
        callback iterator, object[iterator], object
        ++iterator

    else if typeof object == 'object'
      Object.keys(object).forEach (key, value) ->
        callback key, value, object
        return

    this

  toString: ->
    'jNetFramework'

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
if typeof define == 'function' and define.amd
  define ->
    {'jNet': jNet}

###*
# Append in prototype new methods for working jNet Framework, jNetObject
###
jNet.each [
  'click'
  'contextmenu'
  'dblclick'
  'mouseup'
  'mousedown'
  'mouseout'
  'mouseover'
  'mousemove'
  'keyup'
  'keydown'
  'keypress'
  'copy'
  'selectstart'
  'selectionchange'
  'select'
], (iterator, property) ->
  jNet.oFn[property] = (listener, useCapture) ->
    @on property, listener, useCapture

  return

###*
# included extended-jNet file
###
if typeof require == 'function'

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
  ###

  ###*
  # included superagent
  ###
  jNet.fetch = require('superagent')

  ###*
  # included js-cookie
  ###
  jNet.cookies = require('js-cookie')

###*
# check exists window and
#  set jNet in window
###
if typeof window != 'undefined'
  window.jNet = jNet

###*
# check exists document and
#  set jNet in document
###
if typeof document != 'undefined'
  document.jNet = jNet

###*
# check exists exports and
#  set jNet in exports
###
if typeof exports != 'undefined'
  exports.jNet = jNet