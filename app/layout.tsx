import React from "react";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ContentProvider from "@/src/client/providers/content.provider";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerenciador de Apolice",
  description: "Esse projeto foi criado para criar uma apolice e gerenciar",
};

const RootLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }): JSX.Element => {
  return (
    <html lang="pt-br">
      <body className={openSans.className}>
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
};

export default RootLayout;
