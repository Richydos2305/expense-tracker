import { z } from "zod";

export const accountSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["savings", "current", "investment", "cash"]),
  balance: z.number(),
  color: z.string(),
  icon: z.string(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  icon: z.string(),
});

export const expenseSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  description: z.string().min(1),
  categoryId: z.string(),
  accountId: z.string(),
  date: z.string(),
  notes: z.string().optional(),
  createdAt: z.string(),
});

export const insertExpenseSchema = expenseSchema.omit({ id: true, createdAt: true });

export type Account = z.infer<typeof accountSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Expense = z.infer<typeof expenseSchema>;
export type InsertExpense = z.infer<typeof insertExpenseSchema>;
