import * as yup from "yup";

export const apoliceSchema = yup.object().shape({
  numero: yup.number().required("Número é obrigatório"),
  valor_premio: yup.number().required("Valor do prêmio é obrigatório"),
  segurado: yup.object().shape({
    nome: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    cpf_cnpj: yup.string().required("CPF/CNPJ é obrigatório"),
  }),
  coberturas: yup
    .array()
    .of(
      yup.object().shape({
        nome: yup.string().required("Nome da cobertura é obrigatório"),
        valor: yup.number().required("Valor da cobertura é obrigatório"),
      })
    )
    .required(),
});
