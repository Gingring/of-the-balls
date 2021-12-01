class main {
    constructor() {
        this.canvas = document.createElement("canvas")
        this.c = this.canvas.getContext("2d")
        this.objects = []
        this.looptime = 0
        this.isAdd = true
        this.time = 0
        this.width = this.canvas.width
        this.height = this.canvas.height
    }
    setup() {
        document.body.style.margin = 0
        this.canvas.style.backgroundColor = "black"
        this.canvas.width = innerWidth
        this.canvas.height = innerHeight
        this.canvas.style.position = "absolute"
        document.body.appendChild(this.canvas)
        addEventListener('resize', () => {
            this.setup()
        })
        this.width = this.canvas.width
        this.height = this.canvas.height
    }
    smoothEffect(power, size = new vector(10, 10)) {
        this.c.fillStyle = `rgba(0,0,0,${power})`
        this.c.fillRect(0, 0, size.x, size.y)
    }
    touchesPos(ev, touchNumber) {
        return new vector(ev.touches[touchNumber].clientX, ev.touches[touchNumber].clientY)
    }
    createButton(text = "", id = "") {
        const button = document.createElement("button")
        button.innerText = text
        button.id = id
        button.style.position = "absolute"
        button.style.zIndex = "2"
        document.body.appendChild(button)
    }
    addGameObject(object) {
        this.objects.push(object)
    }
    loopTime() {
        if (this.isAdd) {
            this.looptime += 0.01
        } else {
            this.looptime -= 0.01
        }
        if (this.looptime >= 1) {
            this.isAdd = false
        } else if (this.looptime <= 0) {
            this.isAdd = true
        }
    }
    makeGrid(tilenumberW = 9,tiles = []){
        const tileSize = this.canvas.width / tilenumberW
        let ypos = 0
        for (var i = 0; i < Math.floor(this.canvas.height / tileSize); i++) {
            for (var j = 0; j < this.canvas.width / tileSize; j++) {
                tiles.push(new drawRect(this.canvas, new vector(j * tileSize, ypos), new vector(tileSize, tileSize), 'black', true))
            }
            ypos += tileSize
        }
    }
    resize(){
        this.canvas.width = innerWidth
        this.canvas.height = innerHeight
        this.width = this.canvas.width
        this.height = this.canvas.height
    }
}
class vector {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
    add(x, y) {
        this.x += x
        this.y += y
    }
    subt(x, y) {
        this.x -= x
        this.y -= y
    }
    mult(x, y) {
        this.x *= x
        this.y *= y
    }
    divi(x, y) {
        this.x /= x
        this.y /= v = y
    }
    zero() {
        this.x = 0
        this.y = 0
    }
    one() {
        this.x = 1
        this.y = 1
    }
    norm() {
        if (this.x < 0)
            this.x /= (this.x * -1)
        else if (this.x > 0)
            this.x /= this.x
        if (this.y < -0)
            this.y /= (this.y * -1)
        else if (this.y > 0)
            this.y /= this.y
    }
    equal(x, y) {
        this.x = x
        this.y = y
    }
    lockAt(x, y, speed = new vector(1, 1)) {
        const angle = Math.atan2(y - this.y, x - this.x)
        this.x += Math.cos(angle) * speed.x
        this.y += Math.sin(angle) * speed.y
    }
    static dist(v1 = new vector(), v2 = new vector()) {
        return Math.hypot(v1.x - v2.x, v1.y - v2.y)
    }
}
class drawRect {
    constructor(canvas = document.createElement("canvas"),
        pos = new vector(0, 0),
        size = new vector(10, 10),
        color = 'white',
        fill = true,
        line = true,
        lineColor = 'white',
        lineWidth = 1,
        rotation = 0) {
        this.canvas = canvas
        this.c = this.canvas.getContext("2d")
        this.pos = pos
        this.size = size
        this.color = color
        this.fill = fill
        this.line = line
        this.lineColor = lineColor
        this.lineWidth = lineWidth
        this.type = "box"

    }
    draw() {
        //fill border
        this.c.beginPath()
        this.c.rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
        //fill rect
        if (this.fill) {
            this.c.fillStyle = this.color
            this.c.fill()
        }
        if (this.line) {
            this.c.strokeStyle = this.lineColor
            this.c.lineWidth = this.lineWidth
            this.c.stroke()
        }
    }

}
class drawLine {
    constructor(canvas = document.createElement("canvas"),
        posFrom = new vector(0, 0),
        posTo = new vector(10, 0),
        color,
        lineWidth,
        lineStyle) {
        this.canvas = canvas
        this.c = this.canvas.getContext("2d")
        this.posFrom = posFrom
        this.posTo = posTo
        this.color = color
        this.lineStyle = lineStyle
        this.lineWidth = lineWidth


    }
    draw(close = false) {
        if (!close) {
            this.c.beginPath()
        }
        if (this.lineStyle == 'smooth') {
            this.lineStyle = 'round'
        } else if (this.linestyle == 'square') {
            this.lineStyle = 'square'
        } else {
            this.lineStyle = 'butt'
        }
        this.c.lineCap = this.linetyle
        this.c.strokeStyle = this.color
        this.c.lineWidth = this.lineWidth
        this.c.moveTo(this.posFrom.x, this.posFrom.y)
        this.c.lineTo(this.posTo.x, this.posTo.y)
        this.c.stroke()
    }
}
class drawCircle {
    constructor(canvas = document.createElement("canvas"),
        pos = new vector(0, 0),
        size = 2,
        color = 'white',
        fill = true,
        line,
        lineColor,
        lineWidth) {
        this.canvas = canvas
        this.c = this.canvas.getContext("2d")
        this.pos = pos
        this.size = size
        this.color = color
        this.fill = fill
        this.line = line
        this.lineColor = lineColor
        this.lineWidth = lineWidth
        this.type = "circle"
    }
    draw() {
        this.c.beginPath()
        if (this.fill) {
            this.c.fillStyle = this.color
            this.c.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2, false)
            this.c.fill()
        }
        if (this.line) {
            this.c.strokeStyle = this.lineColor
            this.c.lineWidth = this.lineWidth
            this.c.stroke()
        }
    }
}
class drawImg {
    constructor(canvas = document.createElement("canvas"), pos = new vector(0, 0), size = new vector(1, 1), url, imageSize = new vector(0, 0)) {
        this.url = url
        this.canvas = canvas
        this.c = this.canvas.getContext("2d")
        this.pos = pos
        this.size = size
        this.image = new Image()
        this.image.src = this.url
        this.frame = 0
        this.imageSize = imageSize
        this.posOfAnimation = 0
    }
    draw() {
        this.c.drawImage(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y)
    }
    drawAnimation(speed = 5, length = 5, animationNumber = 0) {
        this.frame++

        if (this.frame === speed) {
            this.frame = 0
            if (this.posOfAnimation >= length) {
                this.posOfAnimation = 1
            }
            else {
                this.posOfAnimation++
            }
        }
        this.c.beginPath()
        this.c.drawImage(this.image, this.posOfAnimation * this.imageSize.x, animationNumber * this.imageSize.y, this.imageSize.x, this.imageSize.y, this.pos.x, this.pos.y, this.size.x, this.size.y)
    }
}
class collide {
    static boxWithCircle(c, b) {
        const line = new drawLine(c.canvas,
            c.pos,
            new vector(
                math.clamp(c.pos.x, b.pos.x, b.pos.x + b.size.x),
                math.clamp(c.pos.y, b.pos.y, b.pos.y + b.size.y)), "blue", 4,
            "smooth")
        const point = new drawRect(c.canvas, new vector(line.posTo.x + c.size, line.posTo.y + c.size), new vector(10, 10), "red", true, false, "blue", 10)
        if (point.pos.x >= c.pos.x && point.pos.y >= c.pos.y && c.pos.x > b.pos.x && c.pos.y > b.pos.y) {
            return true
        } else if (point.pos.x >= c.pos.x && point.pos.y >= c.pos.y && c.pos.x > b.pos.x - c.size && c.pos.y > b.pos.y - c.size) {
            return true
        }
    }
    static boxes(r1, r2) {
        const line = new drawLine(r1.canvas,
            r1.pos,
            new vector(
                math.clamp(r1.pos.x, r2.pos.x, r2.pos.x + r2.size.x),
                math.clamp(r1.pos.y, r2.pos.y, r2.pos.y + r2.size.y)), 1, 'blue', 40,
            "smooth")
        const point = new drawRect(r1.canvas, new vector(line.posTo.x, line.posTo.y), new vector(10, 10), "red", true, false, "blue", 10)
        if (point.pos.x >= r1.pos.x && point.pos.y >= r1.pos.y && r1.pos.x > r2.pos.x && r1.pos.y > r2.pos.y) {
            return true
        } else if (point.pos.x >= r1.pos.x && point.pos.y >= r1.pos.y && r1.pos.x > r2.pos.x - r1.size.x && r1.pos.y > r2.pos.y - r1.size.x) {
            return true
        }
    }
    static circles(c1, c2) {
        const dist = Math.hypot(c1.pos.x - c2.pos.x, c1.pos.y - c2.pos.y)
        if (dist - c2.size - c1.size < 1) {
            return true
        }
    }
    static pointInCircle(p = new vector(), c) {
        if (p.x > c.pos.x - c.size &&
            p.x < c.pos.x + c.size &&
            p.y > c.pos.y - c.size &&
            p.y < c.pos.y + c.size) {
            return true
        }
    }
    static pointInBox(p = new vector(), r = new drawRect()) {
        if (p.x > r.pos.x&&
            p.x < r.pos.x + r.size.x &&
            p.y > r.pos.y &&
            p.y < r.pos.y + r.size.y) {
            return true
        }
    }
    static collideWithThing(object, game = new main()) {
        game.objects.forEach(object2 => {
            //circle circle
            if (object.type == "circle" &&
                object2.type == "circle" &&
                collide.circles(object2, object)
            ) {
                return true
            }
    
            //circle box
            if (object.type == "circle" &&
                object2.type == "box" &&
                collide.boxWithCircle(object2, object)) {
                return true
            }
    
            //box circle
            if (object.type == "box" &&
                object2.type == "circle" &&
                collide.boxWithCircle(object2, object)) {
                return true
            }
    
            //box box
            if (object.type == "box" &&
                object2.type == 'box' &&
                collide.boxes(object2, object)) {
                return true
            }
        })
        return false
    }
}
class particles {
    constructor(canvas = document.createElement("canvas"), pos = new vector(0, 0), size = new vector(0, 0), color, fill, speed = new vector(), timer = 5, line, lineColor, lineWidth) {
        this.canvas = canvas
        this.pos = new vector(pos.x,pos.y)
        this.size = size
        this.color = color
        this.fill = fill
        this.line = line
        this.lineColor = lineColor
        this.lineWidth = lineWidth
        this.speed = speed
        this.timer = 0
        this.maxTime = timer
        this.object
    }
    draw() {
        this.timer += 0.1
        this.object = new drawRect(this.canvas, this.pos, this.size, this.color, this.fill, this.line, this.lineColor, this.lineWidth)
        this.object.draw()
    }
    defaltMotion() {
        this.object.pos.x += this.speed.x
        this.object.pos.y += this.speed.y
    }
}
class math {
    static clamp(value, min, max) {
        if (value > max) {
            return max
        }
        else if (value < min) {
            return min
        }
        else {
            return value
        }
    }
    static random(min, max) {
        return Math.random() * (max - min) + min
    }
    static pingpong(v1, v2, looptime) {
        return math.clamp(looptime * Math.max(v1, v2), Math.min(v1, v2), Math.max(v1, v2))
    }
    static lerp(min, max, speed) {
        return (max - min) * math.clamp(speed,min,max) + min
    }
}
class drawShape {
    constructor(canvas = document.createElement('canvas'), pos, posOfPoints = [], fill, line, lineWidth, color) {
        this.canvas = canvas
        this.c = canvas.getContext('2d')
        this.fill = fill
        this.line = line
        this.lineWidth = lineWidth
        this.posOfPoints = posOfPoints
        this.pos = pos
        this.color = color
    }
    draw() {
        this.c.beginPath()
        this.c.save()
        this.c.translate(this.pos.x, this.pos.y)
        let line = []
        this.posOfPoints.forEach((point, i) => {
            if (this.posOfPoints[i + 1]) {
                line.push(new drawLine(this.canvas, point, this.posOfPoints[i + 1], this.color, this.lineWidth, "round"))
            } else {

            }
        })
        line.forEach(lin => {
            lin.draw()
        })
        this.c.restore()
    }
}
class rigidBody {
    constructor(game = new main(), object) {
        this.object = object
        this.game = game
        this.velocity = new vector(0, 0)
    }
    move() {
        this.object.pos.add(this.velocity.x, this.velocity.y)
    }
    gravity() {

        if (this.velocity.x > 0) {
            this.velocity.x -= 0.005
        } else {
            this.velocity.x += 0.005
        }
        if (collide.collideWithThing(this.object, this.game)) {
            this.velocity.y = 0
            return
        }
        this.velocity.y += 0.02
    }
}
class material {
    constructor(color = "", lighting = false) {
        this.color = color
        this.lighting = lighting
    }
}
export { main, vector, drawRect, drawLine, drawCircle, drawImg, collide, math, particles, drawShape, rigidBody }