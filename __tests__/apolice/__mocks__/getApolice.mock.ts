import { GetApolicesApi } from "@/src/shared/interfaces/api/getApolices.interface";

export const getApoliceMock: GetApolicesApi = {
  content: [
    {
      id: 1,
      numero: 154752121,
      valorPremio: 100,
      seguradoId: 1,
      segurado: {
        nome: "Rita de Cassia da Silva",
        email: "ritadecassia@email.com",
        cpfCnpj: "123.456.789-00",
      },
      coberturas: [
        {
          nome: "Incêndio",
          valor: 14,
        },
      ],
    },
    {
      id: 2,
      numero: 6122322,
      valorPremio: 100,
      seguradoId: 2,
      segurado: {
        nome: "Italo Gabriel",
        email: "italogabriel@gmail.com",
        cpfCnpj: "2232323232",
      },
      coberturas: [
        {
          nome: "Incêndio",
          valor: 14,
        },
      ],
    },
  ],
  page: 1,
  totalItens: 2,
  totalPages: 1,
};
