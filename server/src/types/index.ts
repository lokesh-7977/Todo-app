import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const todoSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(6),
  completed : z.boolean().optional()
});

export const todoUpdateSchema = z.object({
  id: z.string().uuid(), 
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional()
});




