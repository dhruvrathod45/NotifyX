const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("NotifyX Backend Running");
});

/* SOCKET CONNECTION */

io.on("connection", (socket) => {

  console.log("User Connected");

  socket.on("send_notification", (data) => {

    io.emit("receive_notification", {
      message: data.message,
      time: new Date()
    });

  });

  socket.on("disconnect", () => {

    console.log("User Disconnected");

  });

});

server.listen(process.env.PORT, () => {

  console.log(
    `Server running on port ${process.env.PORT}`
  );

});