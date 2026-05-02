import { Logo } from "./ui/logo";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 pb-10 pt-20">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent p-1 text-bg">
                <Logo />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">Momentus</span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-white/55">
              GEO × Paid. AI decides who deserves attention. Paid decides who profits from it.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-white/45">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <span className="cursor-default text-white/70">Privacy Policy</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-white/45">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <span className="block text-white/40">Northern EU</span>+421 917 301 868
              </li>
              <li>
                <span className="block text-white/40">Southern EU</span>+36 30 178 3642
              </li>
              <li>
                <span className="block text-white/40">US</span>+1 484 983 8442
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/40 md:flex-row md:items-start">
          <p>© {new Date().getFullYear()} Momentus. All rights reserved.</p>
          <p className="max-w-2xl md:text-right">
            This site is not part of the Facebook website or Facebook Inc. Furthermore, this site is not endorsed by
            Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
