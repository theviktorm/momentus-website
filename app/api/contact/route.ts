import { NextResponse } from "next/server";

/**
 * Stub handler for the /contact brief form. Logs the body so it shows up in
 * Railway / local dev logs; returns ok so the form's success state fires.
 *
 * TODO: wire to real email / CRM (Resend → viktor@momentus.ai, plus push into
 * whatever CRM ends up being canonical).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // eslint-disable-next-line no-console
    console.log("[contact] new brief", body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[contact] failed to parse body", err);
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }
}
