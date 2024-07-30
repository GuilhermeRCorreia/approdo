// pages/api/dashboard.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchStatusCounts, fetchMonthlySumF1ValBrut, fetchMonthlyCountNotas } from '@/data/home/apiRequests';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const statusCounts = await fetchStatusCounts();
      const monthlySumF1ValBrut = await fetchMonthlySumF1ValBrut();
      const monthlyCountNotas = await fetchMonthlyCountNotas();

      return res.status(200).json({
        statusCounts,
        monthlySumF1ValBrut,
        monthlyCountNotas,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
