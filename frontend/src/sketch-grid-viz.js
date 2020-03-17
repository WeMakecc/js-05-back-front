const height = 1150

export function sketch(p) {
  let covidData = null

  fetch('http://127.0.0.1:3000/data')
    .then(response => response.json())
    .then(result => {
      console.log('result from server!', result)
      covidData = result
    })

  p.setup = () => {
    p.createCanvas(p.windowWidth, height)
    p.background(255)
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, height)
  }

  p.draw = () => {
    if (covidData === null) {
      return
    }

    p.background(255)

    const edge = 40
    const textOffset = 120

    drawCaption(edge)

    p.translate(0, 100)
    drawTextRegions(edge, textOffset)
    drawGrid(edge, textOffset)

    let index = 0
    for (let j = 0; j < covidData.dates.length; j++) {
      for (let i = 0; i < covidData.regions.length; i++) {
        const x = j * edge
        const y = i * edge

        const datum = covidData.data[index]

        // console.log({ datum })

        const transparency = p.map(
          datum.tamponi,
          covidData.range[0],
          covidData.range[1],
          0,
          255,
        )
        const circleX = textOffset + x + edge / 2
        const circleY = y + edge / 2

        p.fill(255, 109, 91, transparency)
        p.noStroke()
        p.circle(circleX, circleY, edge * 0.8)

        // p.fill(0, 0, 0)
        // p.text(datum.tamponi, circleX, circleY)

        index++
      }
    }

    p.noLoop()
  }

  function drawTextRegions(edge, textOffset) {
    for (let i = 0; i < covidData.regions.length; i++) {
      const y = edge + i * edge

      const string = covidData.regions[i]
      // console.log({ i, string })
      const textX = textOffset - p.textWidth(string) - 5
      const textY = y - edge / 2

      p.fill(0, 0, 0)
      p.noStroke()
      p.text(string, textX, textY)
    }
  }

  function drawGrid(edge, textOffset) {
    for (let i = 0; i < covidData.regions.length; i++) {
      for (let j = 0; j < covidData.dates.length; j++) {
        const x = j * edge
        const y = i * edge

        const rectX = textOffset + x
        const rectY = y

        p.fill(255, 255, 255)
        p.stroke(0, 0, 0, 50)
        p.rect(rectX, rectY, edge, edge)
      }
    }
  }

  function drawCaption(edge) {
    for (let i = 0; i < 10; i++) {
      const x = 300 + i * (edge + 30)
      const y = edge

      const transparency = p.map(i, 0, 10, 0, 255)
      p.fill(255, 109, 91, transparency)
      p.stroke(0, 0, 0, 50)
      p.circle(x, y, edge)

      const num = Math.round(
        p.map(i, 0, 10, covidData.range[0], covidData.range[1]),
      )
      const textX = x - edge / 2
      const textY = y + edge
      p.fill(0)
      p.noStroke()
      p.text(num, textX, textY)
    }
  }
}
