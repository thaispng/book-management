"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/ui/sidebar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Pen, X, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BookService from "@/service/bookService";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookFormType, bookSchema } from "@/schemas/bookSchema";
import { Book } from "@/types/book";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { showSuccessToast, showErrorToast } from "@/components/ui/sonner";

export default function Books() {
  const [selectedBookIndex, setSelectedBookIndex] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<bookFormType>({
    resolver: zodResolver(bookSchema),
  });

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

  const { mutate: editBook, isPending: isEditing } = useMutation({
    mutationFn: ({
      id,
      updatedBook,
    }: {
      id: string;
      updatedBook: Partial<Book>;
    }) => BookService.updateBook(id, updatedBook),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      showSuccessToast("Livro editado com sucesso!");
      handleCloseEditModal();
    },
    onError: () => {
      showErrorToast("Erro ao editar o livro. Tente novamente.");
    },
  });

  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["books"], queryFn: BookService.fetchBooks });

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    reset();
  };

  const handleOpenEditModal = (book: Book) => {
    setBookToEdit(book);
    setIsEditModalOpen(true);
    reset(book);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    reset();
  };

  const onAddSubmit = (data: bookFormType) => {
    addBook(data);
  };

  const onEditSubmit = (data: bookFormType) => {
    if (bookToEdit) {
      if (bookToEdit?.id) {
        editBook({ id: bookToEdit.id.toString(), updatedBook: data });
      }
    }
  };

  const filteredBooks = books
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const { mutate: deleteBook } = useMutation({
    mutationFn: BookService.deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      showSuccessToast("Livro deletado com sucesso!");
    },
    onError: () => {
      showErrorToast("Erro ao deletar o livro. Tente novamente.");
    },
  });

  const handleDeleteBook = (book: Book) => {
    setBookToDelete(book);
  };

  const confirmDeleteBook = () => {
    if (bookToDelete) {
      if (bookToDelete?.id) {
        deleteBook(bookToDelete.id.toString());
      }
      setBookToDelete(null);
    }
  };
  return (
    <main className="flex flex-wrap md:flex-nowrap h-svh p-4 md:p-10">
      <Sidebar />
      <div className="flex flex-col w-full pb-10 mt-4 gap-10">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row w-full justify-between">
            <div className="flex flex-col w-full gap- md:w-[500px]">
              <h1 className="text-start text-white font-montserrat font-normal text-xl md:text-2xl">
                Livros adicionados
              </h1>
              <div className="flex flex-col gap-3">
                <p className="font-montserrat text-sm md:text-base font-normal text-zinc-600">
                  Adicione um novo livro à sua coleção.
                </p>
                <Button
                  onClick={handleOpenAddModal}
                  className="rounded-full w-fit bg-amber-500 font-semibold hover:bg-amber-400"
                >
                  Adicionar livro
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 w-full md:w-[500px] px-5">
              {books && (
                <>
                  <div className="flex flex-row justify-start items-center gap-4">
                    <Avatar className="w-16 h-16 mt-5 md:w-20 md:h-20">
                      <AvatarImage
                        className="w-full"
                        src={
                          books[selectedBookIndex]?.authorImage ||
                          "/placeholder-author.jpg"
                        }
                        alt={`Foto de ${books[selectedBookIndex]?.author}`}
                      />
                    </Avatar>
                    <div className="flex flex-col">
                      <h3 className="text-white font-semibold font-montserrat text-sm md:text-base">
                        {books[selectedBookIndex]?.author ||
                          "Autor desconhecido"}
                      </h3>
                      <p className="text-zinc-600 font-montserrat text-xs">
                        autor(a)
                      </p>
                    </div>
                  </div>
                  <p className="italic font-light font-montserrat text-xs md:text-sm h-[80px] text-zinc-600">
                    {books[selectedBookIndex]?.description ||
                      "Citação não disponível para este autor."}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col px-5">
          <div className="py-5">
            <Input
              type="search"
              placeholder="Pesquise por autor, livro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex justify-end w-full gap-4 mt-4">
              <Button
                onClick={() =>
                  setSelectedBookIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : filteredBooks.length - 1
                  )
                }
                className="rounded-full bg-transparent text-white"
                aria-label="Livro anterior"
              >
                <ChevronLeft />
              </Button>
              <Button
                onClick={() =>
                  setSelectedBookIndex((prevIndex) =>
                    prevIndex < filteredBooks.length - 1 ? prevIndex + 1 : 0
                  )
                }
                className="rounded-full bg-transparent text-white"
                aria-label="Próximo livro"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <p className="text-zinc-600">Carregando livros...</p>
          ) : isError ? (
            <p className="text-zinc-600">Erro ao carregar livros.</p>
          ) : (
            <>
              <div className="flex flex-wrap justify-start px-5 gap-4 md:gap-10">
                {filteredBooks &&
                  filteredBooks.map((book, index) => (
                    <div
                      key={book.id}
                      className={`relative group flex flex-col items-center transition-all duration-300 ${
                        index === selectedBookIndex
                          ? "w-[160px] h-[280px] md:w-[210px] md:h-[350px]"
                          : "w-[140px] h-[240px] md:w-[200px] md:h-[300px]"
                      }`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          className="shadow-2xl object-cover rounded-sm"
                          src={book.image!}
                          alt={book.title}
                          fill
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-opacity-50">
                          <button
                            className="mx-2 p-2 text-white rounded-full transition"
                            onClick={() => handleOpenEditModal(book)}
                            aria-label="Editar livro"
                          >
                            <Pen />
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                className="mx-2 p-2 text-white rounded-full transition"
                                onClick={() => handleDeleteBook(book)}
                                aria-label="Deletar livro"
                              >
                                <Trash2 />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-black">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white font-montserrat">
                                  Deletar Livro
                                </AlertDialogTitle>
                                <AlertDialogDescription className="font-montserrat text-sm">
                                  Tem certeza que deseja deletar o livro{" "}
                                  <span className="font-montserrat text-zinc-800">
                                    {" "}
                                  </span>
                                  <strong>{bookToDelete?.title}</strong>? Essa
                                  ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={confirmDeleteBook}>
                                  Deletar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      <p className="mt-4 text-center text-xs font-montserrat text-zinc-600">
                        {book.title}
                      </p>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-60 z-50">
          <Card className="relative w-full max-w-md bg-black shadow-xl p-8 rounded-lg text-white">
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
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                  <Input
                    label="Título"
                    {...register("title")}
                    placeholder="Digite o título"
                  />
                  <Input
                    label="Autor"
                    {...register("author")}
                    placeholder="Nome do autor"
                  />
                </div>
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
                {errors.author && (
                  <p className="text-red-500 text-xs">
                    {errors.author.message}
                  </p>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                  <Input
                    label="Páginas"
                    type="number"
                    {...register("pages")}
                    placeholder="Número de páginas"
                  />
                  <Input
                    label="Capa do Autor"
                    {...register("authorImage")}
                    placeholder="URL da imagem do autor"
                  />
                </div>
                {errors.pages && (
                  <p className="text-red-500 text-xs">{errors.pages.message}</p>
                )}
                {errors.authorImage && (
                  <p className="text-red-500 text-xs">
                    {errors.authorImage.message}
                  </p>
                )}

                <Input
                  label="Capa do Livro"
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
                  className="col-span-2"
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

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-900 bg-opacity-60 z-50">
          <Card className="relative w-fit bg-black shadow-xl p-8 rounded-lg text-white">
            <button
              onClick={handleCloseEditModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 focus:outline-none"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <CardHeader>
              <CardTitle className="text-xl font-bold font-montserrat">
                Editar Livro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onEditSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Título"
                    defaultValue={bookToEdit?.title}
                    {...register("title")}
                    placeholder="Digite o título"
                  />
                  <Input
                    label="Autor"
                    defaultValue={bookToEdit?.author}
                    {...register("author")}
                    placeholder="Nome do autor"
                  />
                </div>
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
                {errors.author && (
                  <p className="text-red-500 text-xs">
                    {errors.author.message}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Páginas"
                    type="number"
                    defaultValue={bookToEdit?.pages}
                    {...register("pages")}
                    placeholder="Número de páginas"
                  />
                  <Input
                    label="Capa do Autor"
                    defaultValue={bookToEdit?.authorImage}
                    {...register("authorImage")}
                    placeholder="URL da imagem do autor"
                  />
                </div>
                {errors.pages && (
                  <p className="text-red-500 text-xs">{errors.pages.message}</p>
                )}
                {errors.authorImage && (
                  <p className="text-red-500 text-xs">
                    {errors.authorImage.message}
                  </p>
                )}

                <Input
                  label="Capa do Livro"
                  defaultValue={bookToEdit?.image}
                  {...register("image")}
                  placeholder="URL da capa do livro"
                />
                {errors.image && (
                  <p className="text-red-500 text-xs">{errors.image.message}</p>
                )}

                <Textarea
                  label="Descrição"
                  defaultValue={bookToEdit?.description}
                  {...register("description")}
                  placeholder="Digite uma breve descrição"
                  className="col-span-2"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}

                <Button
                  isLoading={isEditing}
                  className="w-full bg-amber-500 font-semibold hover:bg-amber-400"
                >
                  Salvar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
