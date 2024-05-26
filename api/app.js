import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();

// Middleware for parsing JSON and handling cookies
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'PUT', 'POST'], // Allow specified methods
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Allow specified headers
  credentials: true // Include credentials in CORS requests
}));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// Start server
const PORT = 8012;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
