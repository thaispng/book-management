"use client";
import React, { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useForm, Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookFormType, bookSchema } from "@/schemas/bookSchema";
import { Book } from "@/types/book";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BookService from "@/service/bookService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast, showErrorToast } from "@/components/ui/sonner";
import { X } from "lucide-react";
import Link from "next/link";
export default function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<bookFormType>({
    resolver: zodResolver(bookSchema),
  });
  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    reset();
  };

  const onAddSubmit = (data: bookFormType) => {
    addBook(data);
  };

  const queryClient = useQueryClient();
  const { mutate: addBook, isPending: isAdding } = useMutation({
    mutationFn: BookService.addBook,
    onSuccess: (data: Book) => {
      queryClient.setQueryData(["books"], (prev: Book[] | undefined) =>
        prev ? [...prev, data] : [data]
      );
      showSuccessToast("Livro adicionado com sucesso!");
      handleCloseAddModal();
    },
    onError: () => {
      showErrorToast("Erro ao adicionar o livro. Tente novamente.");
    },
  });

  const getSaudacao = () => {
    const horaAtual = new Date().getHours();
    if (horaAtual >= 0 && horaAtual < 12) return "Bom dia";
    if (horaAtual >= 12 && horaAtual < 18) return "Boa tarde";
    return "Boa noite";
  };
  return (
    <main className=" h-screen flex">
      <Sidebar />
      <div className="flex flex-col w-full h-fit py-20 items-start justify-start">
        <div className="flex flex-col w-full h-fit py-20 gap-3">
          <h1 className="text-start text-white font-montserrat font-normal text-2xl">
            Gerenciador de livros
          </h1>
          <h1 className="font-normal font-montserrat text-xs text-zinc-400">
            {getSaudacao()}, <span className="text-zinc-200">Fulano</span>
          </h1>
          <div>
            <Button
              onClick={handleOpenAddModal}
              className="rounded-full w-fit bg-amber-500 font-semibold hover:bg-amber-400"
            >
              Adicionar livro
            </Button>{" "}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full px-5">
          <div className="flex justify-between w-full">
            <h1 className="font-montserrat font-semibold text-white">
              Últimos livros adicioandos
            </h1>
            <Link
              href="/books"
              className="text-sm font-montserrat underline-offset-2 text-zinc-800"
            >
              ver mais
            </Link>
          </div>
          <div className="flex flex-col w-32 gap-4">
            <Image
              className="shadow-md"
              src="/book-one.png"
              alt="Livro 1"
              width={100}
              height={100}
            />
            <p className="text-foreground font-montserrat text-zinc-700 font-medium text-sm">
              Harry Potter e as Relíquias da Morte
            </p>
          </div>
        </div>
      </div>
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-60 z-50">
          <Card className="relative w-[400px] bg-black shadow-xl p-8 rounded-lg text-white">
            <button
              onClick={handleCloseAddModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 focus:outline-none"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <CardHeader>
              <CardTitle className="text-xl font-bold font-montserrat">
                Adicionar Novo Livro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onAddSubmit)}
                className="flex flex-col gap-4"
              >
                <Input
                  label="Título"
                  {...register("title")}
                  placeholder="Digite o título"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}

                <Input
                  label="Autor"
                  {...register("author")}
                  placeholder="Nome do autor"
                />
                {errors.author && (
                  <p className="text-red-500 text-xs">
                    {errors.author.message}
                  </p>
                )}

                <Input
                  label="Páginas"
                  type="number"
                  {...register("pages")}
                  placeholder="Número de páginas"
                />
                {errors.pages && (
                  <p className="text-red-500 text-xs">{errors.pages.message}</p>
                )}
                <Input
                  label="Capa"
                  {...register("authorImage")}
                  placeholder="URL da imagem do autor"
                />
                {errors.image && (
                  <p className="text-red-500 text-xs">{errors.image.message}</p>
                )}
                <Input
                  label="Capa"
                  {...register("image")}
                  placeholder="URL da capa do livro"
                />
                {errors.image && (
                  <p className="text-red-500 text-xs">{errors.image.message}</p>
                )}

                <Textarea
                  label="Descrição"
                  {...register("description")}
                  placeholder="Digite uma breve descrição"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
                <Button
                  isLoading={isAdding}
                  className="w-full bg-amber-500 font-semibold hover:bg-amber-400"
                >
                  Adicionar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
