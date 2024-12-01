import * as z from "zod";
export const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string(),
  pages: z.coerce.number().positive(),
  image: z.string(),
  authorImage: z.string(),
});

export type bookFormType = z.infer<typeof bookSchema>;
