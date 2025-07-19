import axios from "axios";

type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export async function consultaCepGet(cep: string): Promise<ViaCepResponse> {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
  .then(function (response) {
    const data: ViaCepResponse = response.data;
    return data;
  })
  .catch(function (error) {
    throw error;
  });
}