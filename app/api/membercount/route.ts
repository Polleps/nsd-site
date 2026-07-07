export async function GET() {
  const result = await fetch('https://pgksmash.nl/serverinfo/membercount').then((res) => res.json());

  return Response.json(result);
}
