import React from "react";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import SystemProvider from "@/src/client/providers/system.provider";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerenciador de Apolice",
  description: "Esse projeto foi criado para criar uma apolice e gerenciar",
};

type RootLayoutProps = { children: React.ReactNode };

const RootLayout: React.FC<Readonly<RootLayoutProps>> = ({
  children,
}): JSX.Element => {
  return (
    <html lang="pt-br">
      <body className={openSans.className}>
        <SystemProvider>{children}</SystemProvider>
      </body>
    </html>
  );
};

export default RootLayout;
