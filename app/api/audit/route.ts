import { NextResponse } from "next/server";
import { runAudit } from "@/lib/audit/run-audit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }
  const b = body as Partial<Record<string, string>>;
  if (!b.domain || !b.brand_name || !b.query) {
    return NextResponse.json(
      { ok: false, error: "domain, brand_name and query are required" },
      { status: 400 },
    );
  }
  const result = await runAudit({
    domain: b.domain,
    brand_name: b.brand_name,
    query: b.query,
    market: b.market || "US",
  });
  return NextResponse.json({ ok: true, result });
}
