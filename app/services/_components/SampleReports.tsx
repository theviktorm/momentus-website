"use client";

/**
 * Sample report mocks. Pure visual — no interactivity.
 * Used inside ServiceLayout's "Sample report preview" slot.
 */

export function GeoSampleReport() {
  const platforms = [
    { name: "ChatGPT", you: 38, comp: 24 },
    { name: "Perplexity", you: 31, comp: 28 },
    { name: "Gemini", you: 22, comp: 19 },
  ];
  const winning = [
    "best mid-market analytics platform",
    "compliant data warehouse for fintech",
    "alternatives to [legacy incumbent]",
    "data lineage tool with audit trail",
    "[category] vendors with EU hosting",
  ];
  const gaps = [
    "[category] for healthcare payors",
    "open-source [category] alternatives",
    "[category] under $50k ARR",
    "real-time [category] for ad-tech",
    "[category] with SOC 2 + HIPAA",
  ];

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5 md:p-8">
      {/* Window chrome */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          <span className="ml-3 text-xs text-white/40">geo-report · week-04.pdf</span>
        </div>
        <span className="rounded-full bg-accent/15 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-accent">
          Weekly delta
        </span>
      </div>

      <div className="mb-5">
        <h3 className="font-display text-xl tracking-tight md:text-2xl">
          GEO Visibility Report · Week 4
        </h3>
        <p className="mt-1 text-xs text-white/45">Prepared for: [client] · Issued by: Momentus</p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
        {/* Citation share chart */}
        <div className="rounded-xl bg-black/35 p-5 ring-line">
          <div className="mb-3 flex items-baseline justify-between">
            <h4 className="text-xs uppercase tracking-widest text-white/55">
              Citation share by platform
            </h4>
            <span className="text-[10px] text-accent">you vs. top competitor</span>
          </div>
          <div className="space-y-3">
            {platforms.map((p) => (
              <div key={p.name}>
                <div className="mb-1 flex items-baseline justify-between text-[11px]">
                  <span className="text-white/70">{p.name}</span>
                  <span className="font-mono text-white/45">
                    <span className="text-accent">{p.you}%</span> / {p.comp}%
                  </span>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-white/25"
                    style={{ width: `${p.comp}%` }}
                  />
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-accent"
                    style={{ width: `${p.you}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next-week plan */}
        <div className="rounded-xl bg-black/35 p-5 ring-line">
          <h4 className="text-xs uppercase tracking-widest text-white/55">Next week plan</h4>
          <ul className="mt-3 space-y-2 text-xs text-white/70">
            <li className="flex gap-2">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Publish 2 primary-source explainers on gap queries 1–3
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Submit schema patch + JSON-LD refresh on /platform
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Pitch 3 third-party citations (G2, industry trade)
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
              Re-probe ChatGPT + Perplexity for movement
            </li>
          </ul>
        </div>

        {/* Winning queries */}
        <div className="rounded-xl bg-black/35 p-5 ring-line">
          <h4 className="text-xs uppercase tracking-widest text-white/55">
            Top 5 winning queries
          </h4>
          <ol className="mt-3 space-y-1.5 text-xs">
            {winning.map((q, i) => (
              <li key={q} className="flex items-baseline gap-2">
                <span className="font-mono w-4 text-accent">{i + 1}.</span>
                <span className="text-white/75">{q}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Gap queries */}
        <div className="rounded-xl bg-black/35 p-5 ring-line">
          <h4 className="text-xs uppercase tracking-widest text-white/55">
            Top 5 gap queries
          </h4>
          <ol className="mt-3 space-y-1.5 text-xs">
            {gaps.map((q, i) => (
              <li key={q} className="flex items-baseline gap-2">
                <span className="font-mono w-4 text-white/40">{i + 1}.</span>
                <span className="text-white/75">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export function PaidSampleReport() {
  const channels = [
    { name: "Google Search · brand", spend: 18.2, cpc: 1.42, roas: 9.1, dir: "up" },
    { name: "Google Search · non-brand", spend: 32.4, cpc: 4.18, roas: 3.6, dir: "up" },
    { name: "Meta · prospecting", spend: 14.6, cpc: 2.21, roas: 2.4, dir: "flat" },
    { name: "LinkedIn · ABM", spend: 12.8, cpc: 9.84, roas: 5.2, dir: "up" },
  ];
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5 md:p-8">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          <span className="ml-3 text-xs text-white/40">paid-report · week-04.pdf</span>
        </div>
        <span className="rounded-full bg-accent/15 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-accent">
          Weekly delta
        </span>
      </div>
      <div className="mb-5">
        <h3 className="font-display text-xl tracking-tight md:text-2xl">
          Paid Performance Report · Week 4
        </h3>
        <p className="mt-1 text-xs text-white/45">Spend, CPC, Quality Score, ROAS by channel</p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
        <div className="rounded-xl bg-black/35 p-5 ring-line">
          <div className="mb-3 flex items-baseline justify-between">
            <h4 className="text-xs uppercase tracking-widest text-white/55">CPC trend · 4 weeks</h4>
            <span className="text-[10px] text-accent">−18%</span>
          </div>
          <CpcTrend />
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] text-white/45">
            <div>
              <div className="text-white">W1</div>
              $4.92
            </div>
            <div>
              <div className="text-white">W2</div>
              $4.41
            </div>
            <div>
              <div className="text-white">W4</div>
              <span className="text-accent">$4.03</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-black/35 p-5 ring-line">
          <h4 className="text-xs uppercase tracking-widest text-white/55">
            Quality Score · top campaigns
          </h4>
          <ul className="mt-3 space-y-2">
            {[
              { c: "Brand defense", qs: 9, prev: 8 },
              { c: "Category capture", qs: 8, prev: 6 },
              { c: "Comparison queries", qs: 7, prev: 5 },
            ].map((r) => (
              <li key={r.c} className="flex items-center gap-3">
                <span className="flex-1 truncate text-xs text-white/75">{r.c}</span>
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${(r.qs / 10) * 100}%` }} />
                </div>
                <span className="font-mono w-12 text-right text-xs text-accent">
                  {r.qs}/10 <span className="text-white/35">↑{r.qs - r.prev}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-black/35 p-5 ring-line md:col-span-2">
          <h4 className="text-xs uppercase tracking-widest text-white/55">ROAS by channel</h4>
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
            {channels.map((c) => (
              <div key={c.name} className="rounded-lg border border-white/10 bg-bg/60 p-3">
                <span className="text-[10px] uppercase tracking-widest text-white/40">{c.name}</span>
                <div className="font-mono mt-2 text-lg text-accent">{c.roas}×</div>
                <div className="font-mono mt-0.5 text-[10px] text-white/45">
                  CPC ${c.cpc} · ${c.spend}k
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CpcTrend() {
  const points = [100, 92, 86, 81, 78, 72, 68, 64];
  const max = Math.max(...points);
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - (p / max) * 80 - 10;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-24 w-full">
      <path d={path} fill="none" stroke="#C6FF3D" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function GeoXPaidSampleReport() {
  const cit = [10, 14, 22, 28, 34, 42, 48, 55, 62];
  const cpc = [100, 96, 92, 86, 79, 71, 64, 58, 53];
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5 md:p-8">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          <span className="ml-3 text-xs text-white/40">flywheel-report · week-04.pdf</span>
        </div>
        <span className="rounded-full bg-accent/15 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-accent">
          Joint weekly
        </span>
      </div>
      <div className="mb-5">
        <h3 className="font-display text-xl tracking-tight md:text-2xl">
          Flywheel Report · Week 4
        </h3>
        <p className="mt-1 text-xs text-white/45">
          Citation movement + paid efficiency, in one page
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-black/35 p-5 ring-line">
          <div className="mb-3 flex items-baseline justify-between">
            <h4 className="text-xs uppercase tracking-widest text-white/55">Citation share</h4>
            <span className="text-[10px] text-accent">+52% wk-on-wk</span>
          </div>
          <DualCurve series={cit} color="#C6FF3D" />
        </div>
        <div className="rounded-xl bg-black/35 p-5 ring-line">
          <div className="mb-3 flex items-baseline justify-between">
            <h4 className="text-xs uppercase tracking-widest text-white/55">CPC index</h4>
            <span className="text-[10px] text-accent">−47% vs. baseline</span>
          </div>
          <DualCurve series={cpc} color="#9BD300" inverted />
        </div>

        <div className="rounded-xl bg-black/35 p-5 ring-line md:col-span-2">
          <h4 className="text-xs uppercase tracking-widest text-white/55">
            Compound effect · joint citation × CTR
          </h4>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <Metric label="Citation share" value="+52%" />
            <Metric label="Brand search CTR" value="+38%" />
            <Metric label="Blended LTV : CAC" value="1.7×" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-bg/50 p-3">
      <div className="font-display text-2xl tracking-tight text-accent md:text-3xl">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-widest text-white/45">{label}</div>
    </div>
  );
}

function DualCurve({
  series,
  color,
  inverted = false,
}: {
  series: number[];
  color: string;
  inverted?: boolean;
}) {
  const max = Math.max(...series);
  const path = series
    .map((p, i) => {
      const x = (i / (series.length - 1)) * 100;
      const v = inverted ? max - p + Math.min(...series) : p;
      const y = 100 - (v / max) * 80 - 10;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const area = `${path} L100,100 L0,100 Z`;
  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-24 w-full">
      <defs>
        <linearGradient id={`dual-${color.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#dual-${color.replace("#", "")})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
