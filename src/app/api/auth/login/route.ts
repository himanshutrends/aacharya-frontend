import axios from 'axios';

export async function POST(request: Request) {
  try {
    const req = await request.json()
    const response = await axios.post(`${process.env.API_DOMAIN}auth/login`, req)
    const { access_token } = response.data
    return Response.json({ access_token }, { status: response.status })
  } catch (error: any) {
    if (error.response) {
      return Response.json(error.response.data, { status: error.response.status })
    }
    return Response.json(error, { status: 500 })
  }
}
