import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authjs.session-token")?.value;

  // só aplicamos middleware em rotas /web
  if (!pathname.startsWith("/web")) {
    return NextResponse.next();
  }

  const isAuthPage = pathname.startsWith("/web/sign");

  // usuário NÃO logado tentando acessar rota protegida
  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL("/web/signin", request.url));
  }

  // usuário logado tentando acessar rota de login/signup
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/web/dashboard", request.url));
  }

  return NextResponse.next();
}
