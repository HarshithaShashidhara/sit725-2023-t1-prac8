import express from "express";
import http from "http"; // Import http module for socket.io
import { connectToMongoDB } from "./database.js";
import cardRouter from "./routers/cardRouter.js";
import { Server } from "socket.io"; // Import Server from socket.io
import { fileURLToPath } from 'url'; // Import fileURLToPath function from url module
import path from "path"; // Import path module to work with file paths

const __filename = fileURLToPath(import.meta.url); // Convert the current module's URL to a file path
const __dirname = path.dirname(__filename); // Extract the directory name

const app = express();
const PORT = process.env.PORT || 3004;

const server = http.createServer(app); // Create an HTTP server instance

connectToMongoDB().catch(error => {
    console.error("Error connecting to MongoDB:", error);
});

app.use('/api/cards', cardRouter);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io setup
const io = new Server(server); // Pass the HTTP server instance to Socket.io

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    // Emit a random number every second
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
