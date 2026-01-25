import { z } from "zod";

export const productSizeFormSchema = z.object({
    name: z.string().min(1, "Size name is required"),
    serial: z.string().optional(),
});
