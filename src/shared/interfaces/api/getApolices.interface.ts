import { Apolice } from "@/src/shared/interfaces/apolice.interface";

export interface GetApolicesApi {
  content: Apolice[];
  page: number;
  totalItens: number;
  totalPages: number;
}
