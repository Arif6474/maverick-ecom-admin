import { z } from "zod";

export const productColorFormSchema = z.object({
    image: z.string().optional(),
    serial: z.string().optional(),
});
