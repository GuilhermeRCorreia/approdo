import axios from "axios";

export const fetchPreNotaData = async () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://172.16.99.174:8400/rest/PreNota/ListaPreNota?pag=1&numItem=999999",
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTipoData = async () => {
  const data = await fetchPreNotaData();
  const now = new Date();
  const currentYear = now.getFullYear();

  const tipoData = new Map();

  data.forEach((item) => {
    const dataDigitacao = item.F1_DTDIGIT;
    const tipo = item.F1_XTIPO.trim();
    const ano = parseInt(dataDigitacao.substring(0, 4), 10);
    const mes = parseInt(dataDigitacao.substring(4, 6), 10);
    const dia = parseInt(dataDigitacao.substring(6, 8), 10);

    if (ano === currentYear) {
      const dateKey = `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
      if (!tipoData.has(dateKey)) {
        tipoData.set(dateKey, { date: dateKey, despesa: 0, revenda: 0, materiaPrima: 0, collection: 0 });
      }
      const dataEntry = tipoData.get(dateKey);
      switch (tipo) {
        case "Despesa/Imobilizado":
          dataEntry.despesa++;
          break;
        case "Revenda":
          dataEntry.revenda++;
          break;
        case "Materia Prima":
          dataEntry.materiaPrima++;
          break;
        case "Collection":
          dataEntry.collection++;
          break;
      }
      tipoData.set(dateKey, dataEntry);
    }
  });

  // Preencher valores zerados para todas as datas no intervalo
  const allDates = Array.from(tipoData.keys());
  const startDate = new Date(allDates[0]);
  const endDate = new Date(allDates[allDates.length - 1]);
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateKey = currentDate.toISOString().split("T")[0];
    if (!tipoData.has(dateKey)) {
      tipoData.set(dateKey, { date: dateKey, despesa: 0, revenda: 0, materiaPrima: 0, collection: 0 });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return Array.from(tipoData.values());
};
