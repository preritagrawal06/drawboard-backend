module.exports = (io)=>{

    const MouseDown = function(data){
        const socket = this
        const code = data.code
        const x = data.x
        const y = data.y
        socket.to(code).emit("mouse:onDown", {x, y})
    }
    return{
        MouseDown
    }
}