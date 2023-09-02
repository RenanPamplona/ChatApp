import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const PORT = 5000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

interface MessageObject {
  fromUser: string;
  message: string;
}

interface SocketData {
  userName: string;
  room: string;
}

const socketDataMap = new Map<string, SocketData>();

async function getUsersInRoom(roomName: string): Promise<string[]> {
  const users: string[] = [];

  const sockets = await io.in(roomName).fetchSockets();
  sockets.forEach((socket) => {
    const userName = socketDataMap.get(socket.id)?.userName!;
    users.push(userName);
  });

  return users;
}

io.on("connection", (socket) => {
  console.log(`${socket.id} connected!`);

  socket.on("join", async (name: string, room: string) => {
    socket.join(room);

    socketDataMap.set(socket.id, { room, userName: name });
    const usersInTheRoom = await getUsersInRoom(room);

    socket.to(room).emit("userIn", name);
    io.to(room).emit("updateUsers", usersInTheRoom);
  });

  socket.on("leave", async () => {
    const socketData = socketDataMap.get(socket.id);
    if (socketData) {
      const { room, userName } = socketData;
      socket.leave(room);

      socketDataMap.delete(socket.id);
      const usersInTheRoom = await getUsersInRoom(room);

      socket.to(room).emit("userOut", userName);
      io.to(room).emit("updateUsers", usersInTheRoom);
    }
  });

  socket.on("disconnect", async () => {
    const socketData = socketDataMap.get(socket.id);
    if (socketData) {
      const { room, userName } = socketData;
      socket.leave(room);

      socketDataMap.delete(socket.id);
      const usersInTheRoom = await getUsersInRoom(room);

      socket.to(room).emit("userOut", userName);
      io.to(room).emit("updateUsers", usersInTheRoom);
    }
  });

  socket.on("messageSent", (messageObject: MessageObject) => {
    const socketData = socketDataMap.get(socket.id);
    if (socketData) {
      const { room } = socketData;
      socket.to(room).emit("messageReceive", messageObject);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`server successfully started at port ${PORT}`);
});
