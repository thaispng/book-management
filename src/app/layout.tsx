import type { Metadata } from "next";
import ReactQueryProvider from './ReactQueryProvider';
import "./globals.css";

export const metadata: Metadata = {
  title: "Gerenciador de Livros",
  description: " Gerenciador de Livros",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head />
      <body className="font-montserrat bg-amber-50" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
