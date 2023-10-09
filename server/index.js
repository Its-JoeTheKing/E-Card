const e = require("cors");
const http = require("http");

const server = http.createServer().listen(process.env.PORT || 3000);

const io = require("socket.io")(server,
    {
        cors: {
            origin: "*"
        }
    }
);

io.on("connection",(socket)=>{
	socket.on("join-room", (room)=>{
		socket.join(room)
		console.log(socket.id + " joined " + room)
	})
	socket.on("player2",(room)=>{
		socket.to(room).emit("ready")
	})
	socket.on("action", (act, room)=>{
		socket.to(room).emit("action" ,act)
	})
})