export interface Apolice {
  id?: number;
  numero: number;
  valor_premio: number;
  segurado: Segurado;
  coberturas: Cobertura[];
}

interface Segurado {
  nome: string;
  email: string;
  cpf_cnpj: string;
}

interface Cobertura {
  nome: string;
  valor: number;
}
