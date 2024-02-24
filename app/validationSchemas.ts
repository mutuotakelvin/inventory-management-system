import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1, "Name is required").max(255, "Name is too long"),
    price: z.number().min(0, "Price must be a positive number"),
    description: z.string().min(1, "Description is required").max(255, "Description is too long"),
    category: z.string().min(1, "Category is required").max(255, "Category is too long")
});