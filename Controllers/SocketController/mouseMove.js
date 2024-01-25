module.exports = (io)=>{

    const MouseMove = function(data){
        const socket = this
        const code = data.code
        const x = data.x
        const y = data.y
        socket.to(code).emit("mouse:location", {x, y})
    }
    return{
        MouseMove
    }
}