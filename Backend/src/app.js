
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";

dotenv.config();

import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import matchRoutes from "./routes/match.routes.js";
import connectionRoutes from "./routes/connection.routes.js";

import chatRoutes from "./routes/chat.routes.js";

import reviewRoutes
  from "./routes/review.routes.js";

const app = express();
app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/

// Enable CORS

// console.log(
//   "CLIENT_URL:",
//   process.env.CLIENT_URL
// );

app.use(
  cors({
    origin:
      process.env.CLIENT_URL,
    credentials: true,
  })
);

// Parse JSON request body
app.use(express.json());

// Parse URL encoded data
app.use(express.urlencoded({ extended: true }));

/*
|--------------------------------------------------------------------------
| Health Check Route
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RoomRadar API is running",
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/


app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/matches", matchRoutes);

app.use("/api/connections", connectionRoutes);

app.use("/api/chat", chatRoutes);

app.use(
  "/api/reviews",
  reviewRoutes
);


/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use(notFound);

app.use(errorHandler);



export default app;
