module.exports = (io)=>{

    const MouseDraw = function(data){
        const socket = this
        const code = data.code
        const x = data.x
        const y = data.y
        const color = data.color
        socket.to(code).emit("mouse:ondraw", {x, y, color})
    }
    return{
        MouseDraw
    }
}