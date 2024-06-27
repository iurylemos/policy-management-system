export interface Apolice {
  id?: number;
  numero: number;
  valorPremio: number;
  seguradoId?: number;
  segurado: Segurado;
  coberturas: Cobertura[];
}

interface Segurado {
  nome: string;
  email: string;
  cpfCnpj: string;
}

interface Cobertura {
  nome: string;
  valor: number;
}
