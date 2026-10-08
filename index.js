import express from 'express';
import messagesRouter from "./routes/api/v1/messages.js";
import mongoose from "mongoose";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// log env variable
console.log("NODE_ENV:", process.env.NODE_ENV);

mongoose.connect(process.env.MONGODB);

app.use("/api/v1/messages", messagesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});