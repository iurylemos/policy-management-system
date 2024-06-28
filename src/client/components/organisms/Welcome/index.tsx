import React from "react";
import Image from "next/image";
import ApoliceImage01 from "@/public/images/apolice-de-seguro.jpg";
import ApoliceImage02 from "@/public/images/help-desk-icon.png";
import ApoliceImage03 from "@/public/images/signature-apolice-02.png";
import ApoliceImage04 from "@/public/images/signature-apolice.png";
import ApoliceImage05 from "@/public/images/seguro-auto-75.jpg";
import Link from "next/link";

const Welcome: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="flex justify-between py-20 px-10 gap-x-5 bg-indigo-600 text-indigo-100">
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

      <div className="grid grid-cols-1 mt-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 py-16 px-10 bg-indigo-600 text-indigo-200 text-center">
        <div className="flex flex-col items-center">
          <div className="w-70 h-52 flex relative">
            <Image
              src={ApoliceImage03.src}
              alt="doggy 1"
              className="object-cover rounded-2xl mb-4 border-solid border-2 border-indigo-400"
              width={320}
              height={208}
            />
          </div>
          <p>Acompanhamento!</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-70 h-52 flex relative mt-8 lg:mt-0">
            <Image
              src={ApoliceImage02.src}
              alt="doggy 3"
              className="object-cover rounded-2xl mb-4 border-solid border-2 border-indigo-400"
              width={240}
              height={208}
            />
          </div>
          <p>Help Desk 24 Horas!</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-70 h-52 flex relative">
            <Image
              src={ApoliceImage04.src}
              alt="doggy 3"
              className="object-cover rounded-2xl mb-4 border-solid border-2 border-indigo-400"
              width={240}
              height={208}
            />
          </div>
          <p>Sonho!</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-70 h-52 flex relative mt-8 lg:mt-0">
            <Image
              src={ApoliceImage05.src}
              alt="doggy 3"
              className="object-cover rounded-2xl mb-4 border-solid border-2 border-indigo-400"
              width={240}
              height={208}
            />
          </div>
          <p>Segurança!</p>
        </div>
      </div>
    </>
  );
};

export default Welcome;
