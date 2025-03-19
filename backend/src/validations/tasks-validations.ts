import { check } from "express-validator";

export const tasksValidations = [
  check("name", "El nombre de la tarea es obligatorio").notEmpty(),
  check("description", "La descripción de la tarea es obligatorio").notEmpty(),
  check(
    "status",
    "El estado de la tarea es obligatorio es obligatorio"
  ).notEmpty(),
];
