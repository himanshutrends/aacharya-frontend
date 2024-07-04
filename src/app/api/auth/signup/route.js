import axios from 'axios';
export async function POST(request) {
    try {
        const req = await request.json();
        console.log(req, 'req.body');
        const { data } = await axios.post(`${process.env.API_DOMAIN}/auth/signup`, req);
        // console.log(data)
        return Response.json(data, { status: 200 });
    }
    catch (error) {
        // console.error(error)
        if (error.response) {
            return Response.json(error.response.data, { status: error.response.status });
        }
        return Response.json(error, { status: 500 });
    }
}
