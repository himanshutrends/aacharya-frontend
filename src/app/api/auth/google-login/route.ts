export async function GET() {
  try {
    const googleLoginUrl = `${process.env.API_DOMAIN}auth/login/google`;
    return Response.redirect(googleLoginUrl, 302)
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}
