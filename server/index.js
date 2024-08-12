import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { bannerRoute } from "./routes/bannerRoutes.js";
import { userRoute } from "./routes/userRoutes.js";
import { Server as SocketIOServer } from "socket.io"; 
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL, 
  },
});

console.log("Environment Variables:", process.env);


io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/hello", (req, res) => {
  res.send("Hello World! Its Working")
})

app.use("/api/banner", bannerRoute);
app.use("/api/user", userRoute);
