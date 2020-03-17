const height = 950

export function sketch(p) {
  p.setup = () => {
    p.createCanvas(p.windowWidth, height)
    p.noLoop()
    p.background(255)
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, height)
  }

  p.draw = () => {
    p.background(255)
    p.translate(30, 30)

    const edge = 40

    let index = 0
    for (let j = 0; j < 23; j++) {
      for (let i = 0; i < 21; i++) {
        const x = j * edge
        const y = i * edge
        p.fill(255, 255, 255)
        p.stroke(0, 0, 0, 50)
        p.rect(x, y, edge, edge)

        // const transparency = p.map(index, 0, 21 * 23, 0, 255)
        const transparency = Math.random() * 255
        const circleX = x + edge / 2
        const circleY = y + edge / 2

        p.fill(255, 109, 91, transparency)
        p.noStroke()
        p.circle(circleX, circleY, 30)

        // p.fill(50)
        // const textString = j + ', ' + i
        // p.text(textString, x + 2, circleY)
        // p.text(index, x + 2, circleY + 10)

        index++
      }
    }
  }
}
