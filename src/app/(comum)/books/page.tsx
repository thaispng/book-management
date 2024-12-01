"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/ui/sidebar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import BookService from "@/service/bookService";
import { Textarea } from "@/components/ui/textarea"

export default function Books() {
    const [selectedBookIndex, setSelectedBookIndex] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { data: books, isLoading, isError } = useQuery({ queryKey: ["books"], queryFn: BookService.fetchBooks });

    const handleNext = () => {
        if (books) {
            setSelectedBookIndex((prevIndex) =>
                prevIndex < books.length - 1 ? prevIndex + 1 : 0
            );
        }
    };

    const handlePrevious = () => {
        if (books) {
            setSelectedBookIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : books.length - 1
            );
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <main className="flex h-svh">
            <Sidebar />
            <div className="flex flex-col w-full pb-10">
                <div className="py-5">
                    <Input type="search" placeholder="Pesquise por autor, livro..." />
                </div>
                <div className="flex flex-row w-full justify-between">
                    <div className="flex flex-col w-[500px]">
                        <h2 className="font-libreCaslon text-4xl font-medium">
                            Comece uma história...
                        </h2>
                        <div>
                            <p className="font-montserrat text-base font-normal">
                                Adicione um novo livro à sua coleção.
                            </p>
                            <Button onClick={handleOpenModal} className="rounded-full">Adicionar livro</Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-4 w-[500px] px-5">
                        {books && (
                            <>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <Avatar className="w-20 h-20">
                                        <AvatarImage
                                            className="w-full"
                                            src={books[selectedBookIndex]?.authorImage || "/placeholder-author.jpg"}
                                            alt={`Foto de ${books[selectedBookIndex]?.author}`}
                                        />
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <h2 className="text-zinc-950 font-semibold font-montserrat">{books[selectedBookIndex]?.author || "Autor desconhecido"}</h2>
                                        <p className="text-zinc-400 font-montserrat text-xs">autor(a)</p>
                                    </div>
                                </div>
                                <p className="italic font-light font-montserrat text-xs">
                                    {books[selectedBookIndex]?.description || "Citação não disponível para este autor."}
                                </p>
                            </>
                        )}
                    </div>

                </div>
                <div className="flex flex-col mt-24 px-5">
                    {isLoading ? (
                        <p>Carregando livros...</p>
                    ) : isError ? (
                        <p>Erro ao carregar livros.</p>
                    ) : (
                        <>
                            <div className="flex flex-row w-full justify-end">
                                <button
                                    className="flex items-center gap-2"
                                    onClick={handlePrevious}
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    className="flex items-center gap-2"
                                    onClick={handleNext}
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                            <div className="flex justify-start px-5 gap-10">
                                {books && books.map((book, index) => (
                                    <div
                                        key={book.id}
                                        className={`flex flex-col items-center transition-all duration-300 ${selectedBookIndex === index ? "scale-125" : "scale-90 opacity-75"
                                            }`}
                                    >
                                        <Image
                                            className="shadow-2xl"
                                            src={book.image}
                                            alt={book.title}
                                            width={150}
                                            height={200}
                                        />
                                        <p className="mt-4 text-center text-xs font-montserrat">
                                            {book.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="absolute bottom-10 right-10 text-lg font-semibold">
                {books && `${String(selectedBookIndex + 1).padStart(2, "0")}/${String(books.length).padStart(2, "0")} Livros`}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Card className="relative w-[400px] bg-white shadow-2xl p-6 rounded-lg">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Fechar"
                        >
                            <X />
                        </button>
                        <CardHeader>
                            <CardTitle className="font-montserrat font-medium text-lg text-gray-800">
                                Adicionar Novo Livro
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <Input label="Título" type="text" />
                            <Input label="Autor" type="text" />
                            <Textarea label="Descrição" />
                            <Input id="picture" type="file" />
                            <Button className="mt-4">Adicionar</Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </main>
    );
}
