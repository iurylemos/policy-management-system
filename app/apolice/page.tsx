"use client";

import { useEffect, useState } from "react";
import { Apolice } from "@/src/shared/interfaces/apolice.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Pagination from "@/src/client/components/atoms/Pagination";
import Loading from "@/src/client/components/atoms/Loading";

interface PaginatedApolices {
  content: Apolice[];
  page: number;
  totalItens: number;
  totalPages: number;
}

const ApolicePage: React.FC = (): JSX.Element => {
  const [apolices, setApolices] = useState<Apolice[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchData = async (page: number): Promise<void> => {
    setLoading(true);
    try {
      const resp = await fetch(`/api/apolice?page=${page}&pageSize=10`, {
        method: "GET",
      });
      const data = (await resp.json()) as PaginatedApolices;

      setApolices(data.content);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching apolices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleDelete = async (id: number): Promise<void> => {
    try {
      const resp = await fetch(`/api/apolice/${id}`, { method: "DELETE" });
      await resp.json();
      fetchData(page);
    } catch (error) {
      console.error("Error deleting apolice:", error);
    }
  };

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg">
      <div className="flex flex-row gap-4 mb-8 justify-between">
        <h1 className="text-4xl font-bold text-center">Apólices</h1>
        <div className="flex flex-row">
          <Link href="/apolice/create">
            <button
              className="group relative h-12 w-28 md:w-48 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white"
              type="button"
            >
              Criar
              <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
            </button>
          </Link>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        apolices.map((apolice) => (
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
                <span className="font-normal">R$ {apolice.valorPremio}</span>
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Segurado:</h2>
              <p className="text-lg">
                Nome:{" "}
                <span className="font-normal">{apolice.segurado.nome}</span>
              </p>
              <p className="text-lg">
                Email:{" "}
                <span className="font-normal">{apolice.segurado.email}</span>
              </p>
              <p className="text-lg">
                CPF/CNPJ:{" "}
                <span className="font-normal">{apolice.segurado.cpfCnpj}</span>
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Coberturas:</h2>
              <ul className="list-disc list-inside">
                {apolice.coberturas.map((cobertura, index) => (
                  <li
                    key={Math.random().toString() + index}
                    className="text-lg"
                  >
                    Nome: {cobertura.nome} - Valor: R$ {cobertura.valor}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex space-x-4">
              {apolice.id ? (
                <div className="flex items-center gap-4 flex-col w-full lg:flex-row lg:w-auto">
                  <button
                    className="flex select-none items-center gap-3 rounded-lg bg-amber-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-amber-700/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full justify-center lg:w-auto"
                    type="button"
                    data-ripple-light="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                      />
                    </svg>
                    Adicionar a carteira
                  </button>
                  <button
                    className="flex select-none items-center gap-3 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full justify-center lg:w-auto"
                    type="button"
                    data-ripple-light="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>
                    Detalhes
                  </button>
                  <button
                    className="flex select-none items-center gap-3 rounded-lg border border-indigo-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-indigo-500 transition-all hover:opacity-75 focus:ring focus:ring-indigo-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full justify-center lg:w-auto"
                    type="button"
                    onClick={() => router.push(`/apolice/${apolice.id}`)}
                  >
                    Editar
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    className="flex select-none items-center gap-3 rounded-lg border border-indigo-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-indigo-500 transition-all hover:opacity-75 focus:ring focus:ring-indigo-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full justify-center lg:w-auto"
                    type="button"
                    data-ripple-dark="true"
                    onClick={() => handleDelete(apolice.id!)}
                  >
                    Deletar
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ))
      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ApolicePage;
