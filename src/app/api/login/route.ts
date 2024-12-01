import { NextResponse } from "next/server";
import { users } from "../../../../mocks/db.json";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    return NextResponse.json({ user, token: "mock-token" });
  }

  return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
}
