"use client";
import React from "react";
import Image from "next/image";
import Sidebar from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="bg-amber-50 h-screen flex">
            <Sidebar />
            <div className="flex flex-col w-full h-fit py-20 items-start justify-start">
                <div className="flex flex-col w-full h-fit py-20 gap-2">
                    <h1 className="font-normal text-4xl">
                        Boa noite, <span className="text-amber-500">Fulano</span>
                    </h1>
                    <p
                        className="text-start italic text-foreground font-montserrat font-normal text-sm"
                    >
                        &quot;A vida é um livro e há mil páginas que ainda não li.&quot;
                    </p>
                    <div>
                        <Button className="rounded-full">Adicionar livro</Button>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full px-5">
                    <h1 className="font-libreCaslon font-semibold">
                        Últimos livros adicioandos
                    </h1>
                    <div className="flex flex-col w-32 gap-4">
                        <Image className="shadow-md" src="/book-one.png" alt="Livro 1" width={100} height={100} />
                        <p
                            className="text-foreground font-montserrat font-medium text-sm"
                        >
                            Harry Potter e as Relíquias da Morte
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
