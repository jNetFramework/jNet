jNet.Event = (model) ->

  model.prototype.bind = (event, fn) ->
    events = @__events__ = @__events__ or {}
    parts = event.split(/\s+/)
    num = parts.length
    i = 0
    while i < num
      events[part = parts[i]] = events[part] or []
      index = events[part].indexOf(fn)
      if index is -1
        events[part].push fn
      i++

  model.prototype.unbind = (event, fn) ->

    events = @__events__

    if !events
      return this

    parts = event.split(/\s+/)

    i = 0
    num = parts.length
    while i < num
      if (eventName = parts[i]) of events != false
        index = events[eventName].indexOf(fn)
        if index isnt -1
          events[eventName].splice index, 1
      i++

  model.prototype.trigger = (event) ->
    events = @__events__
    if !events or event of events == false
      return this

    args = Array::slice.call(arguments, 1)
    i = events[event].length - 1
    while i >= 0
      events[event][i].apply this, args
      i--

  model.prototype.one = (event, fn) ->

    fnc = ->
      @unbind event, fnc
      fn.apply this, Array::slice.call(arguments)
      return

    @bind event, fnc
    
  model