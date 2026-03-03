const socketIo = require("socket.io");
const userModel = require("./models/user-model");
const captainModel = require("./models/captain.model");
let io;

const initializeSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: "*", // Adjust for your frontend URL
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);


        socket.on("join", async (data) => {
            const { userId, userType } = data;
            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on("updateCaptainLocation", async (data) => {
            const { captainId, location } = data;

            if(!location || !location.ltd || !location.lng){
                return socket.emit('error', 'Invalid location data');
            }
            await captainModel.findByIdAndUpdate(captainId, { location:{
                ltd: location.ltd,
                lng: location.lng,
            } });
        })

        socket.on("disconnect", () => console.log("Client disconnected"));
    });

    return io;
};

function SendMessageToSocketId(socketId, messageObeject){
    console.log(`Sending message to socketId ${socketId}:`, messageObeject)
    if(io){
        io.to(socketId).emit(messageObeject.event, messageObeject.data);
    }else{
        console.log('Socket.io not initialized')
    }
}
module.exports = { initializeSocket, SendMessageToSocketId };
