let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx = canvas.getContext('2d')

let score = 0
let objects = []
let timeToStop = Date.now() + 10000 // 10 seconds

function Object (type) {
    this.radius = 30
    this.x = Math.random() * (window.innerWidth - this.radius) + this.radius
    this.y = Math.random() * (window.innerHeight - this.radius) + this.radius
    this.type = type

    this.draw = () => {
        ctx.fillStyle = this.type === 'Coin'? 'yellow' : this.type === 'Bomb'? 'black' : 'blue'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
        ctx.fill()
    }

}

const draw = () =>{
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

    ctx.fillStyle = 'black'
    ctx.fillText(score, 10, 10)
    ctx.fillText(timeToStop - Date.now(), window.innerWidth/2 - 5, 10)

    objects.forEach((object) => {
        object.draw()
    })
}

const updateScore = (e)=>{
    objects.forEach((object, index) =>{
        if(checkIfClicked(e.x, e.y, object.x, object.y, object.radius)){
            objects.splice(index, 1)
            score += object.type === 'Coin'? 1 : object.type === 'Bomb'? -1 : 0
        }
    })
}

const distance = (xA, yA, xB, yB) => {
    return Math.sqrt(Math.pow(xA-xB, 2) + Math.pow(yA-yB, 2))
}

const checkIfClicked = (mouseX, mouseY, objectX, objectY, objectRadius) => {
    return distance(mouseX, mouseY, objectX, objectY) <= objectRadius
}

const addObject = () => {
    let objectType = Math.random() < 0.5? 'Coin' : 'Bomb'
    objects.push(new Object(objectType))
}

const addingObjectsInterval = setInterval(addObject, 1000)

function play(){
    playAnim = requestAnimationFrame(play)
    if(Date.now() > timeToStop){
        clearInterval(addingObjectsInterval)
        cancelAnimationFrame(playAnim)
        canvas.removeEventListener('click', updateScore)
        return
    }
    draw()
}

canvas.addEventListener('click', updateScore)
play()
