const canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')

canvas.width = innerWidth -3.2
canvas.height = innerHeight -3.2

class players{
    constructor({position}){
        this.position=position

        this.velocity = {
            x:0,
            y:0
        }
        this.width = 10
        this.height = 100
    }

    draw(){
        c.fillStyle = 'white'
        c.fillRect(this.position.x,this.position.y, this.width , this.height)

    }

    update(){
        this.draw()
        if(this.position.y + this.velocity.y > 0 
            &&  this.position.y + this.height + this.velocity.y < canvas.height){
            this.position.y += this.velocity.y
        }
        
    }
}

class ball {
    constructor({position}){
        this.position = position
        const speed = 8
        const direction ={
            x: Math.random() - 0.5 >= 0 ? -speed : speed,
            y: Math.random() - 0.5 >= 0 ? -speed : speed
        }
        this.velocity = {
            x: direction.x,
            y: direction.y
        }
        
        this.width = 10
        this.height =10 
    }
    draw(){
        c.beginPath()
        c.fillStyle = 'white'
        c.arc(this.position.x,this.position.y,this.width,0,Math.PI *2 ,false)
        c.fill()
    }
    update(){
        this.draw()
        const rightSide = this.position.x + this.width + this.velocity.x
        const leftSide =this.position.x + this.velocity.x
        const bottomSide = this.position.y + this.height
        const topSide = this.position.y


        if (
            leftSide <= player1.position.x + player1.width &&
            bottomSide >= player1.position.y &&
            topSide <= player1.position.y + player1.height
          ) {
            this.velocity.x = -this.velocity.x
          }
    
          
          if (
            rightSide >= player2.position.x &&
            bottomSide >= player2.position.y &&
            topSide <= player2.position.y + player2.height
          ) {
            this.velocity.x = -this.velocity.x
          }




        if ( this.position.y + this.height + this.velocity.y >= canvas.height || 
            this.position.y + this.velocity.y <=0){
                this.velocity.y = - this.velocity.y
            }

        if ( this.position.x + this.width + this.velocity.x > canvas.width ){
                alert ('player 1 wins')
            }
        if ( this.position.x + this.velocity.x < 0){
            alert ('player 2 wins')
        }


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


let player1= new players({
    position:{
        x:10,
        y:100
    }
})

let player2 = new players({
    position:{
        x : canvas.width - 20 ,
        y : 100
    }
})

let ball1 = new ball({
    position : {
        x :canvas.width /2 ,
        y : canvas.height /2
    }
})

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0,0,0,0.5)'
    c.fillRect(0,0,canvas.width, canvas.height)
    player1.update()
    player2.update()
    ball1.update()

    
}

animate()

window.addEventListener('keydown' , e =>{
    let keyPressed = e.key
    switch (keyPressed){
        case 'w':
            player1.velocity.y = -10
            break
        case 's':
            player1.velocity.y = 10
            break
        case 'ArrowUp':
            player2.velocity.y = -10
            break
        case 'ArrowDown':
            player2.velocity.y = 10
            
    }
})

window.addEventListener('keyup' , e =>{
    let keyPressed = e.key
    switch (keyPressed){
        case 'w':
            player1.velocity.y = 0
            break
        case 's':
            player1.velocity.y =0

        case 'ArrowUp':
            player2.velocity.y = 0
            break
        case 'ArrowDown':
            player2.velocity.y = 0
            
    }
})