import mongoose, { Schema } from "mongoose";
import ITask from "../interfaces/task.interface";

// https://mongoosejs.com/docs/schematypes.html
const TaskSchema: Schema = new Schema(
    {
        content: { type: String, required: true, minlength: 1, maxLength: 50 },
        priority: { type: Number, default: 0, min: 0, max: 3 },
        done: { type: Boolean, default: false },
        createdDatetime: { type: Date, default: Date.now },
    },
);

export default mongoose.model<ITask>("model", TaskSchema);