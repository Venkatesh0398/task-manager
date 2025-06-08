import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

router.get('/',async(req,res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
});

router.post('/',async(req,res) => {
    const task = new Task({
        title : req.body.title,
        description : req.body.description,
    });
    try{
        const newTask = await task.save();
        res.status(201).json(newTask);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});

router.delete('/:id',async(req,res) => {
    try{
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({message : 'Task not found'});

        await task.deleteOne();
        res.json({message : 'Task deleted'});
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
});

export default router;