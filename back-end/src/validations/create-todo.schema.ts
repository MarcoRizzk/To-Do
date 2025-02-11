import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.preprocess((val) => new Date(val as string), z.date()),
});

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
