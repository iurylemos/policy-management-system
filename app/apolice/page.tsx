"use client";

import { useEffect, useState } from "react";
import { Apolice } from "@/src/shared/interfaces/apolice.interface";
import { ApoliceTable } from "@/src/shared/interfaces/apoliceTable.interface";
import Link from "next/link";

const ApolicePage: React.FC = (): JSX.Element => {
  const [apolices, setApolices] = useState<Apolice[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      const resp = await fetch("/api/apolice", { method: "GET" });
      const data = (await resp.json()) as ApoliceTable[];

      const dataApolice: Apolice[] = data.map((it) => ({
        coberturas: it.coberturas,
        numero: it.numero,
        segurado: {
          ...it.segurado,
          cpf_cnpj: it.segurado.cpfCnpj,
        },
        valor_premio: it.valorPremio,
      }));

      setApolices(dataApolice);
    } catch (error) {
      console.error("Error fetching apolices:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await fetch(`/api/apolice/${id}`, { method: "DELETE" });
      fetchData(); // Refresh data after delete
    } catch (error) {
      console.error("Error deleting apolice:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-row gap-4 mb-8 justify-between">
        <h1 className="text-3xl font-bold text-center">Apolices</h1>
        <div className="flex flex-row">
          <Link href="/apolice/form">
            <button
              className="border border-black p-2 border-solid rounded-lg leading-5 bg-white font-bold"
              type="button"
            >
              Criar
            </button>
          </Link>
        </div>
      </div>
      {apolices.map((apolice) => (
        <div
          key={apolice.id}
          className="bg-white shadow-md rounded-lg p-6 mb-6"
        >
          <div className="mb-4">
            <p className="text-lg font-semibold">
              Número: <span className="font-normal">{apolice.numero}</span>
            </p>
            <p className="text-lg font-semibold">
              Valor do Prêmio:{" "}
              <span className="font-normal">R$ {apolice.valor_premio}</span>
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Segurado:</h2>
            <p className="text-lg">
              Nome: <span className="font-normal">{apolice.segurado.nome}</span>
            </p>
            <p className="text-lg">
              Email:{" "}
              <span className="font-normal">{apolice.segurado.email}</span>
            </p>
            <p className="text-lg">
              CPF/CNPJ:{" "}
              <span className="font-normal">{apolice.segurado.cpf_cnpj}</span>
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Coberturas:</h2>
            <ul className="list-disc list-inside">
              {apolice.coberturas.map((cobertura, index) => (
                <li key={index} className="text-lg">
                  Nome: {cobertura.nome} - Valor: R$ {cobertura.valor}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex space-x-4">
            {apolice.id ? (
              <button
                onClick={() => handleDelete(apolice.id ?? 0)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            ) : null}
            {/* Add update functionality here */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApolicePage;
