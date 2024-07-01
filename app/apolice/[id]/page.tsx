"use client";

import {
  SubmitHandler,
  useForm,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Apolice } from "@/src/shared/interfaces/apolice.interface";
import { apoliceSchema } from "@/src/client/lib/yup/schemas/apolice.schema";
import { usePathname, useRouter } from "next/navigation";
import { routerUtil } from "@/src/client/utils/router.util";
import Loading from "@/src/client/components/atoms/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import InputFieldMask from "@/src/client/components/organisms/InputFieldMask";
import InputFieldMaskCurrency from "@/src/client/components/organisms/InputFieldMaskCurrency";

const ApoliceFormPage: React.FC = (): JSX.Element => {
  const [apolice, setApolice] = useState<Apolice | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const getApoliceById = async (apoliceId: string): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await axios.get<Apolice>(
        `/api/apolice?${new URLSearchParams({
          id: apoliceId,
        }).toString()}`
      );
      setLoading(false);
      setApolice(data);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (!pathname.includes("/create")) {
      const apoliceId = routerUtil.getLastValue(pathname);
      getApoliceById(apoliceId);
    }
  }, [pathname]);

  const methods = useForm<Apolice>({
    resolver: yupResolver(apoliceSchema),
    defaultValues: {
      coberturas: [{ nome: "", valor: 0 }],
      numero: 0,
      segurado: {
        cpfCnpj: "",
        email: "",
        nome: "",
      },
      valorPremio: 0,
    },
    mode: "all",
    shouldUnregister: false,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "coberturas",
  });

  useEffect(() => {
    if (apolice) {
      setValue("numero", apolice.numero);
      setValue("valorPremio", apolice.valorPremio);
      setValue("segurado.nome", apolice.segurado.nome);
      setValue("segurado.email", apolice.segurado.email);
      setValue("segurado.cpfCnpj", apolice.segurado.cpfCnpj);
      setValue("coberturas", apolice.coberturas); // Corrected here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apolice]);

  const onSubmit: SubmitHandler<Apolice> = async (
    data: Apolice
  ): Promise<void> => {
    try {
      if (data.coberturas.filter((cob) => !cob.valor || !cob.nome).length) {
        throw new Error("missing values");
      }

      if (apolice) {
        setLoading(true);

        await axios.put(`/api/apolice?id=${apolice.id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        toast.success("Apólice atualizada com sucesso", {
          onClose: () => router.push("/apolice"),
        });
      } else {
        setLoading(true);

        await axios.post("/api/apolice", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        reset();
        toast.success("Apólice criada com sucesso", {
          onClose: () => router.push("/apolice"),
        });
      }
    } catch (error) {
      toast.error("Apólice com error");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-4">
          {apolice ? "Atualizar Apólice" : "Criar Apólice"}
        </h1>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Número:</label>
          <input
            type="number"
            {...register("numero")}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.numero && (
            <p className="text-red-500">{errors.numero.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">
            Valor do Prêmio:
          </label>
          <InputFieldMaskCurrency
            name="valorPremio"
            placeholder="Valor do Prêmio"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.valorPremio && (
            <p className="text-red-500">{errors.valorPremio.message}</p>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Segurado:</h2>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Nome:</label>
            <input
              {...register("segurado.nome")}
              placeholder="Nome"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.segurado?.nome && (
              <p className="text-red-500">{errors.segurado.nome.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Email:</label>
            <input
              {...register("segurado.email")}
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.segurado?.email && (
              <p className="text-red-500">{errors.segurado.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">
              CPF/CNPJ:
            </label>
            <InputFieldMask
              mask="000.000.000-00"
              name="segurado.cpfCnpj"
              placeholder="CPF/CNPJ"
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.segurado?.cpfCnpj && (
              <p className="text-red-500">{errors.segurado.cpfCnpj.message}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Coberturas:</h2>
          <div>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="mb-4 flex items-start flex-col md:flex-row"
              >
                <div className="flex flex-col w-full">
                  <input
                    {...register(`coberturas.${index}.nome`)}
                    defaultValue={field.nome}
                    placeholder={`Nome da Cobertura ${index + 1}`}
                    className="w-full px-3 py-2 border rounded-lg mr-1 mb-2 md:mb-0"
                  />
                  {errors.coberturas?.[index]?.nome && (
                    <p className="text-red-500 mb-2">
                      {errors.coberturas[index]?.nome?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <InputFieldMaskCurrency
                    name={`coberturas.${index}.valor`}
                    placeholder={`Valor da Cobertura ${index + 1}`}
                    className="w-full px-3 py-2 border rounded-lg mb-2 md:mb-0"
                  />
                  {errors.coberturas?.[index]?.valor && (
                    <p className="text-red-500">
                      {errors.coberturas[index]?.valor?.message}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded md:ml-2 flex flex-row gap-4 h-full"
                  disabled={fields.length === 1}
                >
                  Remover
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ nome: "", valor: 0 })}
              className="bg-green-500 text-white px-4 py-2 rounded flex flex-row gap-4"
            >
              Adicionar Cobertura
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded w-full sm:w-auto mt-4"
        >
          {apolice ? (
            <span className="flex flex-row gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Atualizar
            </span>
          ) : (
            <span className="flex flex-row gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Criar
            </span>
          )}
        </button>
        {loading ? <Loading /> : <></>}
      </form>
    </FormProvider>
  );
};

export default ApoliceFormPage;
