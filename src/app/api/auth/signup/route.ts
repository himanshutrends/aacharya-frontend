import axios from 'axios';

export async function POST(request: Request) {
  try {
      const req = await request.json()
      console.log(req, 'req.body')
      const { data } = await axios.post(`${process.env.API_DOMAIN}/auth/signup`, req)
    // console.log(data)
    return Response.json(data, { status: 200 })
  } catch (error: any) {
    // console.error(error)
    if (error.response) {
      return Response.json(error.response.data, { status: error.response.status })
    }
    return Response.json(error, { status: 500 })
  }
}