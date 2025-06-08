import mongoose, { mongo } from "mongoose";

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    completed : {
        type : Boolean,
        default : false,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

export default mongoose.model('Task',taskSchema);