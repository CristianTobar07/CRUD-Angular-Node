import mongoose, { Schema, Document } from "mongoose";

interface TasksType extends Document {
  name: string;
  description: string;
  status: number;
}

const tasksSchema: Schema<TasksType> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Number, required: true, unique: false },
});

tasksSchema.methods.toJSON = function () {
  const { __v, _id, ...task } = this.toObject();
  task.uid = _id;
  return task;
};

const tasksModel = mongoose.model<TasksType>("tasks", tasksSchema);
export { tasksModel, tasksSchema };
