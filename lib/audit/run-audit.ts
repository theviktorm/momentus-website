import type { AuditInput, AuditResult } from "./types";
import { runMockAudit } from "./mock-engine";

/**
 * Orchestrator: input → result. Today this is the deterministic mock.
 * TODO: when backend keys land, swap the inner call for a real probe
 * against /api/peec/observations/scan-now or equivalent.
 */
export async function runAudit(input: AuditInput): Promise<AuditResult> {
  return runMockAudit(input);
}
