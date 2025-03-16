import { NextFunction, Response, Request } from "express";
import { tasksModel } from "../../models/tasks";

interface RequestTasks {
  name: string;
  description: string;
  status: number;
}

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await tasksModel.find();
    res.status(200).json({ data: data, status: true });
  } catch (err) {
    next(err);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.params.id;

    if (!uid) {
      return res
        .status(404)
        .json({ message: "El Id del producto es requerido" });
    }

    const data = await tasksModel.findById(uid);
    if (data === null) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json({ data });
    }
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request<{}, {}, RequestTasks>,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const task = await tasksModel.create(body);
    res.status(201).json({ message: "Product created", data: task });
  } catch (err) {
    next(err);
    return res.status(500).json({ status: false, msg: "Error interno" });
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.params.id_task;
    const body = req.body;
    const data = await tasksModel.findByIdAndUpdate(uid, body);

    if (data === null) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(201).json({ message: "Updated!", data });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid = req.params.id_task;

    const data = await tasksModel.findByIdAndDelete(uid);

    if (data === null) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(201).json({ message: "Delete product", data });
    }
  } catch (err) {
    next(err);
  }
};
