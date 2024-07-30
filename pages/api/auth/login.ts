// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    console.log('Received credentials:', { username, password });
    // Verificar as credenciais
    if (username === 'user' && password === 'pass') {
      const cookies = new Cookies(req, res);
      cookies.set('token', 'your-token', { httpOnly: true });
      cookies.set('username', username);
      return res.status(200).json({ message: 'Login successful' });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
