"use client";

import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import { Apolice } from "@/src/shared/interfaces/apolice.interface"; // Adjust the import path as needed
import { useRouter } from "next/router";

const prisma = new PrismaClient();

type ApoliceProps = {
  apolice: Apolice | null;
};

const ApolicePage: React.FC<ApoliceProps> = ({ apolice }) => {
  const router = useRouter();

  if (!apolice) {
    return <div className="text-center mt-10">Apolice not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Apolice Details</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Número: {apolice.numero}</h2>
        <p className="text-lg">Valor do Prêmio: R$ {apolice.valor_premio}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Segurado:</h2>
        <p className="text-lg">Nome: {apolice.segurado.nome}</p>
        <p className="text-lg">Email: {apolice.segurado.email}</p>
        <p className="text-lg">CPF/CNPJ: {apolice.segurado.cpf_cnpj}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Coberturas:</h2>
        {apolice.coberturas.map((cobertura, index) => (
          <div key={index} className="text-lg">
            <p>Nome: {cobertura.nome}</p>
            <p>Valor: R$ {cobertura.valor}</p>
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => router.push(`/apolice/edit/${apolice.id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={async () => {
            await fetch(`/api/apolice/${apolice.id}`, { method: "DELETE" });
            router.push("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //   const { id } = context.params;
  const id = context.params ? context.params.id : "";

  const apolice = await prisma.apolice.findUnique({
    where: { id: Number(id) },
    include: {
      segurado: true,
      coberturas: true,
    },
  });

  return {
    props: {
      apolice,
    },
  };
};

export default ApolicePage;
