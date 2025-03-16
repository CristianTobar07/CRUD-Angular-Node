import express from "express";
import {
  getAll,
  create,
  updateTask,
  deleteTask,
} from "../../controllers/tasks";
import {
  tasksValidations,
  tasksValidationsUpdate,
} from "../../validations/tasks-validations";
import { validateEmptyFileds } from "../../middlewares/validate-fields";
import { validateObjectIds } from "../../middlewares/validate-format-uid";

export const routerTasks = express.Router();

routerTasks.get("/tasks/all_tasks", getAll);
routerTasks.post(
  "/tasks/create",
  [...tasksValidationsUpdate, validateEmptyFileds],
  create
);
routerTasks.put(
  "/tasks/update/:id_task",
  [...tasksValidations, validateEmptyFileds, validateObjectIds(["id_task"])],
  updateTask
);
routerTasks.delete(
  "/tasks/delete/:id_task",
  [validateObjectIds(["id_task"])],
  deleteTask
);
