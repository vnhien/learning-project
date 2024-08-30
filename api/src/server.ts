// Import the 'express' module
import express from "express";
import * as dotenv from "dotenv";
import "./overide";
import { authRouter } from "./routes/auth-route";
import { Server } from "socket.io";

dotenv.config();
// Create an Express application
const app = express();
// Set the port number for the server
const port = process.env.DEFAULT_PORT || 3003;

// Define a route for the root path ('/')
app.get("/", (req, res) => {
  // Send a response to the client
  res.send("Hello world !!!!!!!!!!");
});

app.use("/auth", authRouter);

// Start the server and listen on the specified port
var server = app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});

const ioServer = new Server(server);

ioServer.on("connection", (socket) => {
  console.log("A client connected: ", socket);
});
