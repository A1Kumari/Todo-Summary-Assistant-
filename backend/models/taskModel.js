import mongoose from "mongoose";
const taskInstance = mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    userId:{type:String, required:true},
    dueDate: { type: Date },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    completed: { type: Boolean, default: false },
   
}, {timestamps:true});

const taskModel = mongoose.model("Task", taskInstance);
export default taskModel;