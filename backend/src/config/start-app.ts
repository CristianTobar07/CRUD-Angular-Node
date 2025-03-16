import { routerTasks } from "../routes/tasks";
import express from "express";
import cors from "cors";

export const globalUseApp = () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cors());

  app.use(routerTasks);

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`Listen port: ${PORT}`);
  });
};
