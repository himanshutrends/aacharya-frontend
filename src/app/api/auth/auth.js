import axios from 'axios';

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    const response = await axios.post('http://localhost:5000/auth/login', { email, password });
    const { access_token } = response.data;

    // Set token in a cookie or local storage
    res.setHeader('Set-Cookie', `token=${access_token}; HttpOnly; Path=/`);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
}