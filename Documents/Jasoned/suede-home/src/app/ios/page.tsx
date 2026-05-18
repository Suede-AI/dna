import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Apple,
  ArrowRight,
  BadgeCheck,
  ExternalLink,
  Mic2,
  Music2,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

const baseUrl = "https://suedeai.ai";
const canonicalPath = "/ios";
const pageTitle = "Suede iOS Apps | Official App Store Download Hub";
const pageDescription =
  "Download the approved Suede iOS apps for creator inspiration, guitar practice, voice training, music ideas, provenance, and rights-first creative workflows.";

const apps = [
  {
    name: "Suede Studio Inspiration",
    subtitle: "Ideas, rights, provenance",
    description:
      "A creator rights workspace for AI-assisted music ideas, provenance notes, ownership context, and signed creative records.",
    href: "https://apps.apple.com/us/app/suede-studio-inspiration/id6765461286?uo=4",
    bundleId: "xyz.suedeai.app",
    version: "1.0.3",
    icon: Sparkles,
    accent: "from-[#f7d99f] to-[#ff8d6b]",
    proof: ["AI-assisted music ideas", "Rights-first records", "Creative provenance"],
  },
  {
    name: "Suede Studio Guitar",
    subtitle: "Tuner, rigs, timing, ideas",
    description:
      "A serious guitar studio with tuner, timing practice, chord tools, rig workbench, setup diagnostics, room health, and session capture.",
    href: "https://apps.apple.com/us/app/suede-studio-guitar/id6767552764?uo=4",
    bundleId: "ai.suede.fretpulse",
    version: "1.1.3",
    icon: Music2,
    accent: "from-[#8fd7ff] to-[#87f1c8]",
    proof: ["Strobe tuner", "Rig and pedalboard tools", "Practice and session capture"],
  },
  {
    name: "Suede Voice Studio",
    subtitle: "Range, registers, warmups",
    description:
      "A local-first vocal studio for measuring range, tracking register shifts, and building practical voice training routines.",
    href: "https://apps.apple.com/us/app/suede-voice-studio/id6767763231?uo=4",
    bundleId: "ai.suedeai.SuedeVoice",
    version: "1.0",
    icon: Mic2,
    accent: "from-[#9dc9ff] to-[#d8f0ff]",
    proof: ["Vocal range checks", "Register-shift tracking", "Local-first voice routines"],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: pageTitle,
  description: pageDescription,
  url: `${baseUrl}${canonicalPath}`,
  publisher: {
    "@type": "Organization",
    name: "Suede Labs AI",
    url: baseUrl,
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: apps.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: app.name,
        applicationCategory: "MusicApplication",
        operatingSystem: "iOS",
        softwareVersion: app.version,
        url: app.href,
        description: app.description,
        identifier: app.bundleId,
      },
    })),
  },
};

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "Suede iOS apps",
    "Suede Studio Inspiration",
    "Suede Studio Guitar",
    "Suede Voice Studio",
    "creator rights app",
    "music provenance app",
    "guitar tuner app",
    "voice training app",
  ],
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalPath,
    type: "website",
    siteName: "Suede Labs",
    images: [
      {
        url: "/opengraph.png",
        width: 2940,
        height: 1486,
        alt: "Suede iOS app download hub",
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

function AppStoreBadge({ href, appName }: { href: string; appName: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download ${appName} on the App Store`}
      className="inline-flex min-h-14 items-center gap-3 rounded-2xl bg-black px-5 py-3 text-left text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-[#111827]"
    >
      <Apple className="h-7 w-7 shrink-0" aria-hidden="true" />
      <span className="grid leading-none">
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/70">
          Download on the
        </span>
        <span className="mt-1 text-xl font-black tracking-[-0.03em]">
          App Store
        </span>
      </span>
    </a>
  );
}

export default function IosDownloadHubPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(94,177,255,0.24),transparent_30%),radial-gradient(circle_at_82%_4%,rgba(245,214,154,0.18),transparent_28%),linear-gradient(180deg,#05070d_0%,#0b1220_48%,#030407_100%)]" />
        <div className="absolute inset-0 opacity-[0.075] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:74px_74px]" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-20 pt-8 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/8">
              <Image
                src="/suedeLogo.jpg"
                alt="Suede"
                width={44}
                height={44}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold tracking-[0.28em] text-white">
                SUEDE
              </span>
              <span className="block text-xs text-white/50">
                iOS apps
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
              href="/crypto-investing-ai-ip-rwa-music"
              className="rounded-full border border-white/12 bg-white/7 px-4 py-2 text-sm text-white/72 transition hover:bg-white/12 hover:text-white"
            >
              AI IP thesis
            </Link>
            <a
              href={apps[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[#f5d69a]"
            >
              App Store
            </a>
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[minmax(0,0.92fr)_1.08fr]">
          <div>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
              Install the Suede apps for iPhone and iPad.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              The approved Suede iOS apps bring creator inspiration, guitar
              practice, voice training, provenance, and rights-first workflows
              into native App Store experiences.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AppStoreBadge href={apps[0].href} appName={apps[0].name} />
              <Link
                href="#apps"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/14 bg-white/8 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/14"
              >
                View all apps
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-3">
              {[
                "Official Apple App Store links",
                "iPhone and iPad ready",
                "Built by Suede Labs AI",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-[#f5d69a]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="relative">
            <div className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(94,177,255,0.22),transparent_45%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.075] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.48)] backdrop-blur-2xl">
              <div className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-[#07101d] p-4">
                {apps.map((app) => (
                  <a
                    key={app.bundleId}
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.095] sm:grid-cols-[3.75rem_1fr_auto] sm:items-center"
                  >
                    <span
                      className={`grid h-[3.75rem] w-[3.75rem] place-items-center rounded-[1.25rem] bg-gradient-to-br ${app.accent} text-[#07101d] shadow-[0_16px_48px_rgba(0,0,0,0.28)]`}
                    >
                      <app.icon className="h-7 w-7" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-lg font-black tracking-[-0.03em] text-white">
                        {app.name}
                      </span>
                      <span className="mt-1 block text-sm text-slate-400">
                        {app.subtitle}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#f5d69a]">
                      Open
                      <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="apps"
        className="relative border-y border-white/10 bg-[rgba(255,255,255,0.035)]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="grid gap-5 lg:grid-cols-3">
            {apps.map((app) => (
              <article
                key={app.bundleId}
                className="flex min-h-full flex-col rounded-[1.5rem] border border-white/10 bg-[#07101d]/82 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${app.accent} text-[#07101d]`}
                  >
                    <app.icon className="h-7 w-7" />
                  </span>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    Approved
                  </span>
                </div>

                <h2 className="mt-6 text-3xl font-black leading-none tracking-[-0.045em] text-white">
                  {app.name}
                </h2>
                <p className="mt-3 text-sm font-semibold text-[#f5d69a]">
                  {app.subtitle}
                </p>
                <p className="mt-5 flex-1 text-sm leading-7 text-slate-300">
                  {app.description}
                </p>

                <div className="mt-6 grid gap-2">
                  {app.proof.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-slate-300">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f5d69a]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 grid gap-3">
                  <AppStoreBadge href={app.href} appName={app.name} />
                  <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span className="truncate">{app.bundleId}</span>
                    <span>v{app.version}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="rounded-[1.5rem] border border-[#f5d69a]/20 bg-[#f5d69a]/10 p-6 sm:p-8">
          <div className="flex items-center gap-3 text-[#f5d69a]">
            <Smartphone className="h-5 w-5" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em]">
              One Suede mobile family
            </p>
          </div>
          <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl">
            Create, practice, protect, and carry the context with you.
          </h2>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-6 sm:p-8">
          <p className="text-base leading-8 text-slate-300">
            Suede keeps the public web, app store surfaces, and creator tools
            connected: inspiration flows into rights records, instrument work
            stays useful, and voice practice remains private by default.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/founder"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              Founder thesis
            </Link>
            <Link
              href="/crypto-investing-ai-ip-rwa-music"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              AI IP thesis
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
