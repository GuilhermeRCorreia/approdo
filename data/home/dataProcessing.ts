import { fetchPreNotaData } from "./apiRequests";

export const fetchStatusCounts = async () => {
  const data = await fetchPreNotaData();
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  let aClassificarCount = 0;
  let classificadaCount = 0;
  let revisarCount = 0;

  data.forEach(
    (item: { F1_DTDIGIT: string; F1_STATUS: string; F1_XREV: string }) => {
      const dataDigitacao = item.F1_DTDIGIT;
      const ano = parseInt(dataDigitacao.substring(0, 4), 10);
      const mes = parseInt(dataDigitacao.substring(4, 6), 10);

      if (ano === currentYear && mes === currentMonth) {
        const status = item.F1_STATUS.trim();
        const xRev = item.F1_XREV.trim();

        if (status && /[a-zA-Z]/.test(status)) {
          classificadaCount++;
        } else if (xRev && /[a-zA-Z]/.test(xRev)) {
          revisarCount++;
        } else {
          aClassificarCount++;
        }
      }
    }
  );

  return {
    aClassificar: aClassificarCount,
    classificada: classificadaCount,
    revisar: revisarCount,
  };
};

export const fetchMonthlySumF1ValBrut = async () => {
  const data = await fetchPreNotaData();
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const monthlySum = Array(6)
    .fill(0)
    .map((_, i) => {
      const date = new Date();
      date.setMonth(currentMonth - i - 1);
      return {
        month: date.toLocaleString("default", { month: "short" }),
        sum: 0,
      };
    });

  data.forEach((item: { F1_VALBRUT: string; F1_DTDIGIT: string }) => {
    const valor = parseFloat(item.F1_VALBRUT.replace(",", "."));
    const dataDigitacao = item.F1_DTDIGIT;
    const ano = parseInt(dataDigitacao.substring(0, 4), 10);
    const mes = parseInt(dataDigitacao.substring(4, 6), 10);

    const monthIndex = currentMonth - mes - 1;
    if (ano === currentYear && monthIndex < 6 && monthIndex >= 0) {
      monthlySum[monthIndex].sum += isNaN(valor) ? 0 : valor;
    }
  });

  // Format the sum values for each month
  monthlySum.forEach(item => {
    item.sum = parseFloat(item.sum.toFixed(2));
  });

  return monthlySum.filter((item) => item.sum > 0).map(item => ({
    ...item,
    formattedSum: item.sum.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    })
  }));
};

export const getTipoData = async () => {
  const data = await fetchPreNotaData();
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const tipoData = {
    despesa: 0,
    revenda: 0,
    materiaPrima: 0,
    collection: 0,
    outros: 0,
  };

  data.forEach((item: { F1_DTDIGIT: string; F1_XTIPO: string }) => {
    const dataDigitacao = item.F1_DTDIGIT;
    const tipo = item.F1_XTIPO.trim();
    const ano = parseInt(dataDigitacao.substring(0, 4), 10);
    const mes = parseInt(dataDigitacao.substring(4, 6), 10);

    if (ano === currentYear) {
      switch (tipo) {
        case "Despesa/Imobilizado":
          tipoData.despesa++;
          break;
        case "Revenda":
          tipoData.revenda++;
          break;
        case "Materia Prima":
          tipoData.materiaPrima++;
          break;
        case "Collection":
          tipoData.collection++;
          break;
        default:
          console.log(`${item.F1_XTIPO}`);
          tipoData.outros++;
          break;
      }
    }
  });

  return tipoData;
};
