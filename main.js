import * as Lib from "./thelib.js"
const game = new Lib.main()
game.setup()
const background = {
    particles: [],
    bGBox: new Lib.drawRect(game.canvas, new Lib.vector(0, 0), new Lib.vector(game.width, game.height), "rgba(10,10,10,0.4)", true, 0)
}
function update(){
    background.bGBox.draw()
    const bGPP = new Lib.vector(Lib.math.random(0, game.width), Lib.math.random(0, game.height))
    for (var i = 0; i < 10; i++) {
        const pSize = Lib.math.random(-4, 4)
        background.particles.push(new Lib.particles(game.canvas, bGPP, new Lib.vector(pSize, pSize), "rgba(0,100,0,0.2)", 1, new Lib.vector(Lib.math.random(-3, 3), Lib.math.random(-3, 3)), 4, 0))
    }
    background.particles.forEach((part, i) => {
        part.draw()
        part.defaltMotion()
        part.speed.x *= 0.95
        part.speed.y *= 0.95
        if (Math.abs(part.speed.x) < 0.1 || Math.abs(part.speed.y) < 0.1) {
            background.particles.splice(i, 1)
        }
    })
    requestAnimationFrame(update)
}
update()