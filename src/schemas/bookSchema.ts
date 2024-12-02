import * as z from "zod";

export const bookSchema = z.object({
  title: z.string().nonempty("O título é obrigatório."),
  author: z.string().nonempty("O autor é obrigatório."),
  description: z.string().nonempty("A descrição é obrigatória."),
  pages: z.coerce
    .number()
    .positive("O número de páginas deve ser maior que zero.")
    .int("O número de páginas deve ser um número inteiro."),
  image: z.string().optional(),
  authorImage: z.string().optional(),
});

export type bookFormType = z.infer<typeof bookSchema>;
