module.exports = (io)=>{

    const MouseDraw = function(data){
        const socket = this
        const code = data.code
        const x = data.x
        const y = data.y
        socket.to(code).emit("mouse:ondraw", {x, y})
    }
    return{
        MouseDraw
    }
}