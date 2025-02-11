import { z } from "zod";

export const updateTodoSchema = z.object({
  status: z.enum(["PENDING", "COMPLETED"]),
});

export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;
