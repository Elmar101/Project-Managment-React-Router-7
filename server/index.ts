import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

