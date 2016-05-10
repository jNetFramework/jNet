dots = document.querySelectorAll('.dot')
colors = [
  '#007EFF'
  '#FF3700'
  '#92FF00'
]

animateDots = ->
  i = 0
  while i < dots.length
    jNet.dynamics.animate dots[i], {
      translateY: -70
      backgroundColor: colors[i]
    },
      type: jNet.dynamics.forceWithGravity
      bounciness: 800
      elasticity: 200
      duration: 2000
      delay: i * 450
    i++
  jNet.dynamics.setTimeout animateDots, 2500
  return

animateDots()