import p5 from 'p5'
import { sketch } from './sketch-grid-random'
// import { sketch } from './sketch-grid-viz'

document.title = '🦄'

console.log('hi! 👋')

const canvasContainer = document.createElement('div')
document.body.appendChild(canvasContainer)

const p5instance = new p5(sketch, canvasContainer)
