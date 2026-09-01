import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Esta rota roda no servidor (nunca no navegador), então as variáveis usadas
// aqui NÃO têm o prefixo NEXT_PUBLIC_ — ficam invisíveis no código que vai
// para o browser. Ver README para a lista completa de variáveis.
export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));

  if (!password) {
    return NextResponse.json({ error: "Informe a senha." }, { status: 400 });
  }

  const sharedPassword = process.env.ADMIN_SHARED_PASSWORD;
  const serviceEmail = process.env.ADMIN_ACCOUNT_EMAIL;
  const servicePassword = process.env.ADMIN_ACCOUNT_PASSWORD;

  if (!sharedPassword || !serviceEmail || !servicePassword) {
    return NextResponse.json(
      { error: "Login do admin não configurado no servidor (variáveis de ambiente ausentes)." },
      { status: 500 }
    );
  }

  if (password !== sharedPassword) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  // Senha compartilhada confere: autentica a conta de serviço do admin no
  // Supabase e devolve a sessão para o navegador aplicar no seu próprio
  // cliente Supabase (via supabase.auth.setSession). O e-mail e a senha
  // reais dessa conta nunca chegam ao navegador.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase.auth.signInWithPassword({
    email: serviceEmail,
    password: servicePassword,
  });

  if (error || !data.session) {
    return NextResponse.json(
      { error: "Falha ao autenticar a conta de administração. Confira as variáveis ADMIN_ACCOUNT_EMAIL / ADMIN_ACCOUNT_PASSWORD." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  });
}
