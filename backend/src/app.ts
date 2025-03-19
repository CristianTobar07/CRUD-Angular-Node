import dotenv from "dotenv";
import { conectarDB } from "./config/connect";
import { globalUseApp } from "./config/start-app";

require("dotenv").config();
dotenv.config();

conectarDB();
globalUseApp();