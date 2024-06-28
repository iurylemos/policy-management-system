import React from "react";
import Image from "next/image";
import ApoliceImage02 from "@/public/images/help-desk-icon.png";
import ApoliceImage03 from "@/public/images/signature-apolice-02.png";
import ApoliceImage04 from "@/public/images/signature-apolice.png";
import ApoliceImage05 from "@/public/images/seguro-auto-75.jpg";

const Welcome: React.FC = (): JSX.Element => {
  return (
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
  );
};

export default Welcome;
