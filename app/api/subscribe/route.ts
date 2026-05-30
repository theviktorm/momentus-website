import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Stub handler for the newsletter signup primitive.
 *
 * Accepts { email, source } JSON and validates the email shape. Logs the
 * payload so it shows up in Railway / local dev logs and returns ok so the
 * form's success state fires.
 *
 * TODO: forward to ConvertKit / Beehiiv / Resend audience. Keep the response
 * shape stable — the component reads `{ ok: boolean, error?: string }`.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = (body?.email || "").trim().toLowerCase();
  const source = (body?.source || "").trim();

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid email" }, { status: 400 });
  }

  // eslint-disable-next-line no-console
  console.log("[subscribe]", { email, source });
  return NextResponse.json({ ok: true });
}
