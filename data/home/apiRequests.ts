import axios from 'axios';
import { getUsernameGlobal } from "@/lib/utils";

export const fetchPreNotaData = async () => {
  const username = getUsernameGlobal();
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://172.16.99.174:8400/rest/PreNota/ListaPreNota?pag=1&numItem=999999",
    headers: {
      usuario: username,
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
