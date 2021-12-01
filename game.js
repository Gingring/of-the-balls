import * as Lib from "./thelib.js"
const game = new Lib.main()
game.setup()
const mousePos = new Lib.vector(0, 0)
const player = new Lib.drawCircle(game.canvas, new Lib.vector(100, 100), 20, 'white', true, 0)
const lines = []
let canMove
let coldown = 0
const mouseCircle = new Lib.drawCircle(game.canvas, mousePos, 10, 'rgba(0,0,0,0)')
const enemies = []
let animation
let stopGame = false
let restartColdown = 0
const damgeParticles = []
const background = {
    particles: [],
    bGBox: new Lib.drawRect(game.canvas,new Lib.vector(0,0),new Lib.vector(game.width,game.height),"rgba(10,10,10,0.4)",true,0)
}
const scoreEl = document.querySelector("#score-el")
let score = 0
scoreEl.textContent = "Score : "+score
function update() {
    game.c.save()
    background.bGBox.draw()
    const bGPP = new Lib.vector(Lib.math.random(0,game.width),Lib.math.random(0,game.height))
    for (var i = 0; i < 10; i++) {
        const pSize = Lib.math.random(-4,4)
        background.particles.push(new Lib.particles(game.canvas,bGPP,new Lib.vector(pSize,pSize),"rgba(0,100,0,0.2)",1,new Lib.vector(Lib.math.random(-3,3),Lib.math.random(-3,3)),4,0))
    }
    background.particles.forEach((part,i) => {
        part.draw()
        part.defaltMotion()
        part.speed.x *= 0.95
        part.speed.y *= 0.95
        if(Math.abs(part.speed.x) < 0.1 || Math.abs(part.speed.y) < 0.1){
            background.particles.splice(i,1)
        }
    })
    animation = requestAnimationFrame(update)
    mouseCircle.draw()
    lines.forEach((line, i) => {
        line.posTo = mousePos
        if ((player.pos.x > mousePos.x && line.posTo.x <= mousePos.x) || (player.pos.x < mousePos.x && line.posTo.x >= mousePos.x)) {
            coldown += 0.1
            if (coldown >= 1) {
                coldown = 0
                canMove = true
            }
        }
        line.draw()
    })
    if (canMove) {
        player.pos.lockAt(mousePos.x, mousePos.y, new Lib.vector(10, 10))
    }
    if (Lib.collide.circles(player, mouseCircle)) {
        canMove = false
    }
    if (Lib.vector.dist(player.pos, mouseCircle.pos) < 100) {
        lines.pop()
    }
    enemies.forEach((enemy, i) => {
        enemy.pos.lockAt(player.pos.x, player.pos.y, new Lib.vector(1, 1))
        if (Lib.collide.circles(enemy, player)) {
            //kill
            if (canMove) {
                enemies.splice(i, 1)
                const partSize = Lib.math.random(4,10)
                score += 5
                scoreEl.textContent = "Score : "+score
                for (var i = 0; i < 10; i++) {
                    damgeParticles.push(new Lib.particles(game.canvas,new Lib.vector(enemy.pos.x,enemy.pos.y),new Lib.vector(partSize,partSize),enemy.color,true,new Lib.vector(Lib.math.random(-3,3),Lib.math.random(-3,3)),3,0))
            }
            } else {
                cancelAnimationFrame(animation)
                stopGame = true
            }
        }
        enemy.draw()
    })
    player.draw()
    damgeParticles.forEach((part,i) => {
        part.draw()
        part.defaltMotion()
        part.size.x -= 0.1
        part.size.y -= 0.1
        part.speed.x *= 0.97
        part.speed.y *= 0.97
        if(part.size.x <= 0.3 || (Math.abs(part.speed.x) <= 0 && Mathh.abs(part.speed.y) <= 0)){
            damgeParticles.splice(i,1)
        }
    })
    game.c.restore()
}
update()
setInterval(() => {
    const pos = new Lib.vector(Lib.math.random(0, game.canvas.width), Lib.math.random(0, game.canvas.height))
    if (Lib.vector.dist(pos, player.pos) < 100) {
        return
    }
    enemies.push(new Lib.drawCircle(game.canvas, pos, Lib.math.random(10, 30), `hsl(${Lib.math.random(0,360)},100%,50%)`, true, false))
}, 500)

//unstopLoop
function unStopLoop(){
    requestAnimationFrame(unStopLoop)
        //restart
        if (stopGame) {
            restartColdown += 0.02
        }
        if (restartColdown > 2) {
            window.open("main.html")
            // game.c.clearRect(0, 0, game.canvas.width, game.canvas.height)
            // enemies.splice(0,enemies.length)
            // update()
            stopGame = false
            restartColdown=0
            //score = 0
            //scoreEl.textContent = "Score : "+score
        }
}
unStopLoop()
addEventListener("touchstart", ev => {
    if (lines.length == 0) {
        mousePos.equal(game.touchesPos(ev, 0).x, game.touchesPos(ev, 0).y)
        lines.push(new Lib.drawLine(game.canvas, player.pos, new Lib.vector(player.pos.x, player.pos.y), 'white', 5))
    }
})
addEventListener("mousedown", ev => {
    if (lines.length == 0) {
        mousePos.equal(ev.clientX,ev.clientY)
        lines.push(new Lib.drawLine(game.canvas, player.pos, new Lib.vector(player.pos.x, player.pos.y), 'white', 5))
    }
})