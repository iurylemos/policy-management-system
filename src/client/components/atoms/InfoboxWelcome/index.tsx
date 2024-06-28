import Link from "next/link";
import React from "react";
import ApoliceImage01 from "@/public/images/apolice-de-seguro.jpg";
import Image from "next/image";

const InfoBoxWelcome: React.FC = (): JSX.Element => {
  return (
    <div className="flex justify-between py-20 px-10 gap-x-5 bg-indigo-600 text-indigo-100 rounded-lg">
      <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-start">
        <h2 className="text-2xl md:text-4xl lg:text-6xl text-white mb-6 text-center md:text-left">
          Bem vindo ao Gerenciador de Apólices!
        </h2>
        <p className="mb-6 text-center md:text-left">
          Aqui você pode fazer o gerenciamento completo de suas apólices
        </p>
        <a
          href="#"
          className="w-full md:w-auto inline-block py-2 px-5 text-lg bg-gray-400 rounded text-black font-semibold hover:bg-gray-200 mr-2"
        >
          Saber Mais
        </a>
        <Link
          href="/apolice/create"
          className="w-full md:w-auto mt-2 mb:mt-0 inline-block py-2 px-5 text-lg font-semibold bg-yellow-500 text-black rounded hover:bg-yellow-300"
        >
          Criar Apólice
        </Link>
      </div>
      <div className="hidden md:block md:w-1/2">
        <span className="min-w-10 no-underline text-gray-darkest hover:text-lime-500 font-semibold flex relative w-full h-full">
          <Image
            src={ApoliceImage01}
            alt="Happiest Doggo"
            className="rounded shadow-2xl object-cover"
            fill
          />
        </span>
      </div>
    </div>
  );
};

export default InfoBoxWelcome;
