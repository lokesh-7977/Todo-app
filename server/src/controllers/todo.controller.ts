import { Request, Response } from "express";
import { TodoModel } from "../models/todo.model";
import { v4 as uuidv4 } from "uuid"; 
import { todoSchema, todoUpdateSchema } from "../types/index";

export const getTodos = async (req: Request, res: Response): Promise<any> => {
  try {
    const todos = await TodoModel.find();
    return res.json(todos);
  } catch (error) {
    return res.status(500).json({ message: "Error: " + (error as Error).message });
  }
};

export const getTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const todo = await TodoModel.findOne({ id: req.params.id }); 
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    return res.json(todo);
  } catch (error) {
    return res.status(500).json({ msg: "Error: " + (error as Error).message });
  }
};

export const createTodo = async (req: Request, res: Response): Promise<any> => {
  const body = req.body;

  try {
    const parsedData = todoSchema.parse(body);

    const { title, description, completed = false } = parsedData;

    const newTodo = new TodoModel({
      id: uuidv4(),
      title,
      description,
      completed,
    });

    const savedTodo = await newTodo.save();
    return res.status(201).json(savedTodo);
  } catch (error) {
    console.error("Error in createTodo:", error);
    return res.status(500).json({ msg: "Error: " + (error as Error).message });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body; 
    const parsedData = todoUpdateSchema.parse(body); 
    
    const { id, ...updateFields } = parsedData; 

    const updatedTodo = await TodoModel.findOneAndUpdate(
      { id }, 
      updateFields, 
      { new: true } 
    );

    if (!updatedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    return res.json(updatedTodo);
  } catch (error) {
    return res.status(500).json({ msg: "Error: " + (error as Error).message });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const deletedTodo = await TodoModel.findOneAndDelete({ id: req.params.id }); 

    if (!deletedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    return res.json({ msg: "Todo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Error: " + (error as Error).message });
  }
};
