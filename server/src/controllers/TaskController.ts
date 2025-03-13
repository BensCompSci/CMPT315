import { Request, Response } from 'express';
import {Task} from '../models/Task';
import { createTask, deleteTask, getAllTasks, updateTask } from '../services/TaskService';
import { get } from 'http';

class TaskController {
    // Get all tasks
    public async getAllTasks(req: Request, res: Response): Promise<Response> {
        try {
            const tasks = await getAllTasks(req.params.owner);
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Create a new task
    public async createTask(req: Request, res: Response): Promise<Response> {
        try {
            const newTask = new Task(req.body);
            await createTask(newTask);
            return res.status(201).json(newTask);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Update an existing task
    public async updateTask(req: Request, res: Response): Promise<Response> {
        try {
            const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedTask) {
                return res.status(404).json({ error: 'Task not found' });
            }
            return res.status(200).json(updatedTask);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Delete a task
    public async deleteTask(req: Request, res: Response): Promise<Response> {
        try {
            const deletedTask = await Task.findByIdAndDelete(req.params.id);
            if (!deletedTask) {
                return res.status(404).json({ error: 'Task not found' });
            }
            return res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new TaskController();