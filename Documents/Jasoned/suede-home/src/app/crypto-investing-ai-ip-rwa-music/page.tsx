import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Blocks,
  BrainCircuit,
  CheckCircle2,
  Coins,
  FileCheck2,
  Music2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const pageTitle =
  "Jason Colapietro on Crypto Investing, AI IP, RWA Music & Creator Ownership";
const pageDescription =
  "Jason Colapietro, author, Forbes contributor, CEO and founder of Suede AI, explains the crypto investing thesis around AI IP, music RWAs, programmable rights, provenance, licensing, and creator ownership infrastructure.";
const canonicalPath = "/crypto-investing-ai-ip-rwa-music";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "crypto investing AI IP RWA music",
    "AI IP investing",
    "music RWA",
    "music real world assets",
    "creator ownership infrastructure",
    "programmable IP",
    "AI music rights",
    "music IP crypto",
    "RWA music investing",
    "Jason Colapietro",
    "Jason Colapietro crypto investing",
    "Jason Colapietro AI IP",
    "Jason Colapietro Suede AI",
    "Suede AI",
  ],
  authors: [{ name: "Jason Colapietro", url: "https://suedeai.ai/founder" }],
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalPath,
    type: "article",
    siteName: "Suede Labs",
    images: [
      {
        url: "/opengraph.png",
        width: 2940,
        height: 1486,
        alt: "Suede AI creator ownership infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AISUEDE",
    creator: "@johnnysuede",
    title: pageTitle,
    description: pageDescription,
    images: ["/opengraph.png"],
  },
};

const thesisCards = [
  {
    icon: BrainCircuit,
    title: "AI changes the IP surface area",
    copy: "Generative tools make music, likeness, voice, samples, stems, and derivative media easier to create. That raises the need for clear authorship, consent, and rights data.",
  },
  {
    icon: Coins,
    title: "RWA starts with verifiable ownership",
    copy: "A music asset cannot become a credible real-world asset until the market can inspect who made it, who controls it, what rights exist, and how usage can be licensed.",
  },
  {
    icon: Blocks,
    title: "Crypto rails make rights programmable",
    copy: "On-chain records, payment rails, and agent-readable metadata can turn rights from static paperwork into software that platforms and buyers can check before use.",
  },
];

const stack = [
  "Proof of creation",
  "Creator and rights-holder identity",
  "Timestamped provenance",
  "Consent and usage status",
  "Programmable licenses",
  "Derivative attribution",
  "Royalty and revenue paths",
  "Agent-readable rights checks",
];

const faqs = [
  {
    question: "What does AI IP mean in music?",
    answer:
      "AI IP in music refers to the ownership, rights, provenance, consent, and licensing records connected to songs, stems, vocals, likeness, generated tracks, and derivative works made or transformed with AI tools.",
  },
  {
    question: "What is a music RWA?",
    answer:
      "A music RWA, or music real-world asset, is a music-related right or revenue-linked asset represented with digital ownership, metadata, or on-chain infrastructure. The asset still needs credible rights verification before it can be trusted.",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No. This page explains a technology and market thesis around creator ownership, programmable IP, music rights, AI, and crypto infrastructure. It is not investment, legal, or financial advice.",
  },
  {
    question: "Where does Suede AI fit?",
    answer:
      "Suede AI focuses on the ownership layer: helping creators connect creative assets to proof, provenance, registration, licensing, verification, monetization, and agent-ready commerce workflows.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: pageTitle,
  description: pageDescription,
  author: {
    "@type": "Person",
    name: "Jason Colapietro",
    url: "https://suedeai.ai/founder",
    jobTitle: "CEO and Founder of Suede AI",
  },
  publisher: {
    "@type": "Organization",
    name: "Suede AI",
    url: "https://suedeai.ai",
  },
  mainEntityOfPage: "https://suedeai.ai/crypto-investing-ai-ip-rwa-music",
  about: [
    "AI intellectual property",
    "Music real-world assets",
    "Crypto investing thesis",
    "Creator ownership",
    "Programmable IP",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function CryptoInvestingAiIpRwaMusicPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(86,144,255,0.28),transparent_30%),radial-gradient(circle_at_82%_0%,rgba(245,214,154,0.20),transparent_26%),linear-gradient(180deg,#05070d_0%,#0b1220_48%,#030407_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:76px_76px]" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-16 pt-8 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/8">
              <Image
                src="/suedeLogo.jpg"
                alt="Suede AI"
                width={44}
                height={44}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-[0.28em] text-white">
                JASON COLAPIETRO
              </span>
              <span className="block text-xs text-white/50">
                Suede AI founder thesis
              </span>
            </span>
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/founder"
              className="rounded-full border border-white/12 bg-white/7 px-4 py-2 text-sm text-white/72 transition hover:bg-white/12 hover:text-white"
            >
              Founder
            </Link>
            <Link
              href="/ios"
              className="rounded-full border border-white/12 bg-white/7 px-4 py-2 text-sm text-white/72 transition hover:bg-white/12 hover:text-white"
            >
              iOS Apps
            </Link>
            <Link
              href="https://app.suedeai.xyz/dashboard"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[#f5d69a]"
            >
              Open Suede
            </Link>
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.08fr)_0.92fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f5d69a]/25 bg-[#f5d69a]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#f5d69a]">
              <Sparkles className="h-4 w-4" />
              Jason Colapietro thesis
            </div>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
              Jason Colapietro on AI IP, music RWAs, and crypto investing.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Jason Colapietro, author, Forbes contributor, CEO and founder of
              Suede AI, is building the creator ownership layer for the AI era.
              His thesis: the next wave of crypto investing may focus less on
              speculation and more on verifiable creative assets: AI music,
              programmable IP, provenance, licensing, rights verification, and
              real-world asset infrastructure.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="https://app.suedeai.xyz/registry"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#f7d99f,#ff8d6b)] px-6 py-4 text-base font-bold text-[#08111f] shadow-[0_22px_70px_rgba(255,141,107,0.28)] transition hover:brightness-105"
              >
                Explore IP registry
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/founder"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white/8 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/14"
              >
                About Jason
              </Link>
            </div>
            <p className="mt-5 max-w-2xl text-xs leading-6 text-slate-500">
              Educational technology thesis only. Nothing on this page is
              financial, legal, tax, or investment advice.
            </p>
          </div>

          <aside className="relative">
            <div className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(83,174,255,0.28),transparent_42%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/7 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.48)] backdrop-blur-2xl">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07101d]">
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <Image
                    src="/stake-your-claim-cover.jpg"
                    alt="Stake Your Claim creator ownership thesis"
                    fill
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#f5d69a]">
                    Jason Colapietro category thesis
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-white">
                    Music rights become programmable assets.
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    The investable surface is not just the song. It is the
                    proof, rights, license, attribution, and usage data that
                    can travel with the asset.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {thesisCards.map(({ icon: Icon, title, copy }) => (
            <article
              key={title}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.065] p-6 backdrop-blur-xl"
            >
              <Icon className="h-7 w-7 text-[#f5d69a]" />
              <h2 className="mt-5 text-2xl font-bold tracking-[-0.035em] text-white">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-sky-200">
            <Music2 className="h-4 w-4" />
            Music RWA infrastructure
          </div>
          <h2 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl">
            Why music is one of the clearest AI IP markets.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Music already has rights, royalties, catalogs, splits, samples,
            remixes, licensing, distribution, and fan demand. AI adds scale and
            complexity. Crypto infrastructure can add ownership records, payment
            rails, verification, and agent-readable rules.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {stack.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm font-medium text-slate-100"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.035))] p-6 backdrop-blur-xl sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#f5d69a]/25 bg-[#f5d69a]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#f5d69a]">
                <ShieldCheck className="h-4 w-4" />
                Jason Colapietro / Suede AI
              </div>
              <h2 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl">
                The ownership layer is the missing primitive.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-slate-300">
              <p>
                The phrase “crypto investing AI IP RWA music” sounds like a
                pile of buzzwords until the stack is separated. Crypto supplies
                programmable rails. AI expands creative output. IP defines what
                can be owned or licensed. RWA asks whether the digital record is
                connected to something real. Music is the live test case because
                rights and usage already have market value.
              </p>
              <p>
                Jason Colapietro is building Suede AI around that intersection.
                The goal is to make creative work legible: who created it, who
                controls the rights, what permissions exist, how derivatives
                connect back to source, and how platforms, buyers, or agents
                can verify use before action.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [FileCheck2, "Proof", "Authorship, identity, timestamp, provenance, and consent need to be visible before markets can trust the asset."],
            [BarChart3, "Markets", "Licensing, rewards, marketplaces, and analytics become stronger when the underlying rights record is inspectable."],
            [Coins, "Commerce", "x402 and agent payment rails make it possible for software buyers and AI agents to pay for permissioned access."],
          ].map(([Icon, title, copy]) => {
            const TypedIcon = Icon as typeof FileCheck2;
            return (
              <article
                key={title as string}
                className="rounded-[1.5rem] border border-white/10 bg-[#07101d]/80 p-6"
              >
                <TypedIcon className="h-7 w-7 text-sky-200" />
                <h3 className="mt-5 text-2xl font-bold text-white">
                  {title as string}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {copy as string}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:px-10">
        <h2 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
          FAQ: crypto investing, AI IP, RWA, and music
        </h2>
        <div className="mt-8 divide-y divide-white/10 rounded-[1.5rem] border border-white/10 bg-white/[0.055]">
          {faqs.map((faq) => (
            <article key={faq.question} className="p-6">
              <h3 className="text-lg font-bold text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:px-10">
        <div className="rounded-[2rem] border border-[#f5d69a]/20 bg-[#f5d69a]/10 p-6 sm:p-10">
          <h2 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl">
            Build where AI, IP, crypto, and music converge.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Suede AI turns creative work into programmable ownership by
            connecting assets to proof, registry records, licensing,
            verification, monetization, and agent-ready commerce.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="https://app.suedeai.xyz/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-[#f5d69a]"
            >
              Enter Suede AI
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/founder"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-6 py-4 text-base font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              Read the founder thesis
            </Link>
            <Link
              href="/ios"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-6 py-4 text-base font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              Download iOS apps
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
