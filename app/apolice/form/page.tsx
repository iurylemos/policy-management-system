"use client";

import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Apolice } from "@/src/shared/interfaces/apolice.interface";
import { apoliceSchema } from "@/src/client/lib/yup/schemas/apolice.schema";

type FormProps = {
  apolice?: Apolice;
};

const ApoliceFormPage: React.FC<FormProps> = ({ apolice }): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(apoliceSchema),
    defaultValues: {
      coberturas: [{ nome: "", valor: 0 }],
      numero: 0,
      segurado: {
        cpf_cnpj: "",
        email: "",
        nome: "",
      },
      valor_premio: 0,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "coberturas",
  });
  const router = useRouter();

  useEffect(() => {
    if (apolice) {
      setValue("numero", apolice.numero);
      setValue("valor_premio", apolice.valor_premio);
      setValue("segurado.nome", apolice.segurado.nome);
      setValue("segurado.email", apolice.segurado.email);
      setValue("segurado.cpf_cnpj", apolice.segurado.cpf_cnpj);
      setValue("coberturas", apolice.coberturas); // Corrected here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apolice]);

  const onSubmit: SubmitHandler<Apolice> = async (
    data: Apolice
  ): Promise<void> => {
    try {
      if (apolice) {
        await fetch(`/api/apolice?id=${apolice.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        router.push("/"); // Redirect to homepage after update
      } else {
        await fetch("/api/apolice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        reset(); // Reset form after create
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
        <input
          type="number"
          step="0.01"
          {...register("valor_premio")}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.valor_premio && (
          <p className="text-red-500">{errors.valor_premio.message}</p>
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
          <label className="block text-lg font-semibold mb-2">CPF/CNPJ:</label>
          <input
            {...register("segurado.cpf_cnpj")}
            placeholder="CPF/CNPJ"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.segurado?.cpf_cnpj && (
            <p className="text-red-500">{errors.segurado.cpf_cnpj.message}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Coberturas:</h2>
        {errors.coberturas && Array.isArray(errors.coberturas)
          ? errors.coberturas.map((error, index) => (
              <p key={index} className="text-red-500">
                {error.message}
              </p>
            ))
          : null}
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4 flex items-center">
              <input
                {...register(`coberturas.${index}.nome`)}
                defaultValue={field.nome}
                placeholder={`Nome da Cobertura ${index + 1}`}
                className="w-full px-3 py-2 border rounded-lg mr-1"
              />
              <input
                type="number"
                step="0.01"
                {...register(`coberturas.${index}.valor`)}
                defaultValue={field.valor}
                placeholder={`Valor da Cobertura ${index + 1}`}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                disabled={fields.length === 1}
              >
                Remover
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ nome: "", valor: 0 })}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Adicionar Cobertura
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {apolice ? "Atualizar" : "Criar"}
      </button>
    </form>
  );
};

export default ApoliceFormPage;
