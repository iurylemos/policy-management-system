export interface ApoliceTable {
  id: number;
  numero: number;
  valorPremio: number;
  seguradoId: number;
  segurado: {
    id: number;
    nome: string;
    email: string;
    cpfCnpj: string;
  };
  coberturas: {
    id: number;
    nome: string;
    valor: number;
    apoliceId: number;
  }[];
}
