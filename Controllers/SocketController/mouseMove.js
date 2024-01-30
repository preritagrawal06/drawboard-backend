module.exports = (io)=>{

    const MouseMove = function(data){
        const socket = this
        const code = data.code
        const x = data.x
        const y = data.y
        const memberName = data.memberName
        socket.to(code).emit("mouse:location", {x, y, memberName})
    }
    return{
        MouseMove
    }
}