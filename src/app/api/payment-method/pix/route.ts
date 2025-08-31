export async function POST(request: Request) {
  console.log("POST recebido");

  // pegar body em JSON
  const body = await request.json();

  console.log("Payload:", body);

  // aqui você pode processar o callback do hook
  // e retornar uma resposta
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
