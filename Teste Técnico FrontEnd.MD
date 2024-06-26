# Teste Técnico - Front End

Hoje, as operações gerenciais de apólices são feitas de forma manual. Para facilitar a vida dos operadores deve-se criar uma interface web para digitalizar o processo.

Portanto, construa uma interface web, utilizando ReactJS e que atenda aos requisitos abaixo.

O prazo limite é de uma semana a partir do recebimento do teste.

Hospede o código em uma plataforma de versionamento (github, gitlab e etc) e envie o link para o email jose_vinnicius@sicredi.com.br. Dúvidas tambem podem ser encaminhadas ao e-mail.

## Requisitos

- ReactJS e Vite e/ou NextJS.
- Typescript.
- A aplicação precisa ter interface coesa e responsiva.
- Deve-se mockar a API baseando-se nos JSONS de exemplo (vide seção API). Recomendamos o uso da lib MirageJS mas qualquer outra pode ser utilizada.
- Todas as operações devem ser implementadas (CRUD).
- Qualquer lib é liberada desde que importada corretamente.
- Testes
- O código será executado, portanto ele precisa estar compilável e executável.

## API

#### GET /apolices
Params:
- page: int
- pageSize: int
- search: string

```json
{   
    "content": [{
        "id": 1,
        "numero": 125456,
        "valor_premio": 100.0,
        "segurado": {
            "nome": "Rita de Cassia da Silva",
            "email": "ritadecassia@email.com",
            "cpf_cnpj": "123.456.789-00"
        },
        "coberturas": [
            {
                "nome": "Incêndio",
                "valor": 14.0
            }
        ]
    }],
    "page": 1,
    "totalItens": 1,
    "totalPages": 1
}
```

#### POST /apolices
```json
{
    "numero": 125456,
    "valor_premio": 100.0,
    "segurado": {
        "nome": "Rita de Cassia",
        "email": "ritadecassia@email.com",
        "cpf_cnpj": "123.456.789-00"
    },
    "coberturas": [
        {
            "nome": "Incêndio",
            "valor": 14.0
        }
    ]
}
```

#### PUT /apolices/{id}
```json
{
    "numero": 125456,
    "valor_premio": 1000.0,
    "segurado": {
        "nome": "Rita de Cassia",
        "email": "ritadecassia@email.com",
        "cpf_cnpj": "123.456.789-00"
    },
    "coberturas": [
        {
            "nome": "Incêndio",
            "valor": 14.0
        }
    ]
}
```


#### GET /apolices/{id}
```json
{
    "id": 1,
    "numero": 125456,
    "valor_premio": 100.0,
    "segurado": {
        "nome": "Rita de Cassia",
        "email": "ritadecassia@email.com",
        "cpf_cnpj": "123.456.789-00"
    },
    "coberturas": [
        {
            "nome": "Incêndio",
            "valor": 14.0
        }
    ]
}
```

#### DELETE /apolices/{id}

