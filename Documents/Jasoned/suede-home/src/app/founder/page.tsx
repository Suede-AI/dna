import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Fingerprint,
  Globe2,
  Music2,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from "lucide-react";

const links = {
  app: "https://app.suedeai.xyz/dashboard",
  registry: "https://app.suedeai.xyz/registry",
  ios: "/ios",
  images: "/jason-colapietro-images",
  org: "https://suedeai.org/",
  book: "https://suedeai.org/book/",
  contact: "https://suedeai.org/contact/",
};

const principles = [
  {
    title: "Creators need ownership",
    copy: "Music, art, stories, likeness, and catalog work deserve clear records, usable rights, and better paths to revenue.",
  },
  {
    title: "Rights should travel",
    copy: "Songs, visuals, voice, and identity need provenance that survives every release, remix, platform, and collaboration.",
  },
  {
    title: "The work should stay connected",
    copy: "Suede keeps the creative file, ownership record, licensing path, and release story in one flow so the value does not get lost.",
  },
];

const stack = [
  "Music and media creation",
  "Proof of creation",
  "Creator-owned IP",
  "Voice, likeness, and catalog rights",
  "Creator monetization",
  "Licensing and distribution",
];

export const metadata: Metadata = {
  title: "Founder | Suede",
  description:
    "Meet Jason Colapietro, founder of Suede, the creator platform for music, ownership, licensing, and AI-era provenance.",
  keywords: [
    "creator ownership",
    "music rights",
    "creative rights",
    "proof of creation",
    "licensing",
    "artist tools",
    "creator economy",
  ],
  alternates: {
    canonical: "/founder",
  },
  openGraph: {
    title: "Founder | Suede",
    description:
      "Meet Jason Colapietro, founder of Suede, the creator platform for music, ownership, licensing, and AI-era provenance.",
    url: "/founder",
    type: "website",
    images: ["/opengraph.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder | Suede",
    description:
      "Meet Jason Colapietro, founder of Suede, the creator platform for music, ownership, licensing, and AI-era provenance.",
    images: ["/opengraph.png"],
  },
};

export default function FounderPage() {
  return (
    <main className="suede-founder-page min-h-screen overflow-hidden bg-[#05070d] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,205,129,0.20),transparent_28%),radial-gradient(circle_at_80%_8%,rgba(83,174,255,0.22),transparent_26%),linear-gradient(180deg,#05070d_0%,#0b1220_46%,#030407_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-20 pt-10 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.08)]">
              <Image
                src="/suedeLogo.jpg"
                alt="Suede"
                width={44}
                height={44}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-[0.28em] text-white">
                SUEDE
              </span>
              <span className="block text-xs text-white/50">
                Founder
              </span>
            </span>
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href={links.images}
              className="rounded-full border border-white/12 bg-[rgba(255,255,255,0.07)] px-4 py-2 text-sm text-white/72 transition hover:bg-[rgba(255,255,255,0.12)] hover:text-white"
            >
              Images
            </Link>
            <Link
              href={links.ios}
              className="rounded-full border border-white/12 bg-[rgba(255,255,255,0.07)] px-4 py-2 text-sm text-white/72 transition hover:bg-[rgba(255,255,255,0.12)] hover:text-white"
            >
              iOS Apps
            </Link>
            <Link
              href={links.org}
              className="rounded-full border border-white/12 bg-[rgba(255,255,255,0.07)] px-4 py-2 text-sm text-white/72 transition hover:bg-[rgba(255,255,255,0.12)] hover:text-white"
            >
              Foundation
            </Link>
            <Link
              href={links.app}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[#f5d69a]"
            >
              Launch Studio
            </Link>
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.08fr)_0.92fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f5d69a]/25 bg-[#f5d69a]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-[#f5d69a]">
              <Sparkles className="h-4 w-4" />
              Founder
            </div>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
              Jason Colapietro is building the ownership layer for creators.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Suede gives musicians, artists, producers, and creative teams a
              practical way to create work, register ownership, license rights,
              and keep provenance attached as AI changes how media moves.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={links.app}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#f7d99f,#ff8d6b)] px-6 py-4 text-base font-bold text-[#08111f] shadow-[0_22px_70px_rgba(255,141,107,0.28)] transition hover:brightness-105"
              >
                Open the Studio
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={links.registry}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-[rgba(255,255,255,0.08)] px-6 py-4 text-base font-semibold text-white transition hover:bg-[rgba(255,255,255,0.14)]"
              >
                View the Registry
              </Link>
              <Link
                href={links.images}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-transparent px-6 py-4 text-base font-semibold text-white/76 transition hover:bg-[rgba(255,255,255,0.10)] hover:text-white"
              >
                Image Gallery
              </Link>
              <Link
                href={links.ios}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-transparent px-6 py-4 text-base font-semibold text-white/76 transition hover:bg-[rgba(255,255,255,0.10)] hover:text-white"
              >
                Download iOS Apps
              </Link>
              <Link
                href={links.org}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-transparent px-6 py-4 text-base font-semibold text-white/76 transition hover:bg-[rgba(255,255,255,0.10)] hover:text-white"
              >
                Go to .org
              </Link>
            </div>
          </div>

          <aside className="relative">
            <div className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(245,214,154,0.30),transparent_42%)] blur-2xl" />
            <div
              className="relative overflow-hidden rounded-[2rem] border border-white/12 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.48)] backdrop-blur-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
            >
              <div
                className="overflow-hidden rounded-[1.5rem] border border-white/10"
                style={{ backgroundColor: "rgba(7,16,29,0.88)" }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-black">
                  <Image
                    src="/founderlegit.png"
                    alt="Jason Colapietro, founder of Suede"
                    fill
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    className="object-cover object-[50%_18%]"
                    priority
                  />
                </div>
                <div className="border-t border-white/10 bg-[#07101d] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#f5d69a]">
                    Founder
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-white">
                    Jason Colapietro
                  </h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-200">
                    Building Suede for musicians, artists, producers, and
                    creative teams who want their work, identity, and rights to
                    stay connected.
                  </p>
                </div>
                <div className="grid gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.28em] text-white/45">
                      Suede platform
                    </span>
                    <span className="rounded-full bg-emerald-400/12 px-3 py-1 text-xs font-medium text-emerald-200 ring-1 ring-emerald-300/20">
                      Live
                    </span>
                  </div>
                  {[
                    ["Create", "Tools for music, visuals, and creative media"],
                    ["Prove", "Ownership records and provenance"],
                    ["License", "Rights that can be used, shared, and paid"],
                    ["Scale", "Creators, teams, platforms, and commerce"],
                  ].map(([label, copy]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 p-4"
                      style={{ backgroundColor: "rgba(255,255,255,0.055)" }}
                    >
                      <div className="text-lg font-semibold text-white">
                        {label}
                      </div>
                      <div className="mt-1 text-sm leading-6 text-slate-300">
                        {copy}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-[rgba(255,255,255,0.04)]">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:px-8 md:grid-cols-3 lg:px-10">
          {principles.map((item) => (
            <article key={item.title} className="rounded-2xl p-4">
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#f5d69a]">
            What Suede Is Building
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            A home for the work behind the work.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300">
            Every song, visual, voice note, draft, and collaboration carries a
            story of who made it and what it can become. Suede is built to keep
            that story attached, from first idea to release, registration,
            licensing, and the next opportunity.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {stack.map((item, index) => {
            const Icon =
              [Music2, Fingerprint, ShieldCheck, Globe2, Waypoints, BookOpen][
                index
              ];
            return (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.06)] p-5"
              >
                <Icon className="h-5 w-5 text-[#f5d69a]" />
                <div className="mt-4 font-semibold text-white">{item}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(135deg,rgba(245,214,154,0.16),rgba(255,255,255,0.065),rgba(83,174,255,0.14))] p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#f5d69a]">
                Public Links
              </span>
              <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.035em] text-white sm:text-5xl">
                Start with the studio. Leave with something you own.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[28rem]">
              <Link className="rounded-2xl bg-white px-5 py-4 font-bold text-slate-950" href={links.app}>
                Studio
              </Link>
              <Link className="rounded-2xl bg-[rgba(255,255,255,0.10)] px-5 py-4 font-bold text-white ring-1 ring-white/12" href={links.registry}>
                Registry
              </Link>
              <Link className="rounded-2xl bg-[rgba(255,255,255,0.10)] px-5 py-4 font-bold text-white ring-1 ring-white/12" href={links.images}>
                Images
              </Link>
              <Link className="rounded-2xl bg-[rgba(255,255,255,0.10)] px-5 py-4 font-bold text-white ring-1 ring-white/12" href={links.book}>
                Book
              </Link>
              <Link className="rounded-2xl bg-[rgba(255,255,255,0.10)] px-5 py-4 font-bold text-white ring-1 ring-white/12" href={links.contact}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
