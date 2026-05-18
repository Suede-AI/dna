import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Images, Sparkles } from "lucide-react";

const baseUrl = "https://suedeai.ai";
const canonicalPath = "/jason-colapietro-images";
const pageTitle =
  "Jason Colapietro Images | Suede AI Founder Visual Gallery";
const pageDescription =
  "Official Jason Colapietro image gallery featuring a Suede AI founder portrait, founder quote cards, creator ownership, programmable IP, AI music, music rights, and founder thesis visuals.";

const cards = [
  {
    file: "jason-colapietro-suede-ai-founder-portrait.png",
    title: "Jason Colapietro, founder of Suede AI",
    caption:
      "Official founder portrait of Jason Colapietro for Suede AI, creator ownership, AI music, programmable IP, and music rights coverage.",
    width: 1067,
    height: 1475,
  },
  {
    file: "jason-colapietro-suede-ai-you-build-different-real.png",
    title: "Jason Colapietro, Suede AI founder: You build different when it's real",
    caption:
      "Jason Colapietro founder card for Suede AI, creator ownership, music rights, AI IP, and programmable provenance.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-wave-underneath.png",
    title: "Jason Colapietro on building what moves underneath",
    caption:
      "Suede AI founder image about infrastructure, crypto rails, creator rights, and AI music ownership.",
  },
  {
    file: "jason-colapietro-suede-ai-it-compounds.png",
    title: "Jason Colapietro: It just compounds",
    caption:
      "Founder visual for Jason Colapietro and Suede AI, focused on compounding creator ownership infrastructure.",
  },
  {
    file: "jason-colapietro-suede-ai-game-day-energy.png",
    title: "Jason Colapietro: Game day energy every day",
    caption:
      "Suede AI founder quote card connecting execution, creator tools, and music IP infrastructure.",
  },
  {
    file: "jason-colapietro-suede-ai-built-the-road.png",
    title: "Jason Colapietro: We built the road",
    caption:
      "Jason Colapietro image for Suede AI, programmable IP, AI music, ownership records, and creator commerce.",
  },
  {
    file: "jason-colapietro-suede-ai-flip-the-model.png",
    title: "Jason Colapietro: Sometimes you flip the whole model upside down",
    caption:
      "Suede AI founder image about changing the model for creators, rights, licensing, and provenance.",
  },
  {
    file: "jason-colapietro-suede-ai-creators-paid-nothing.png",
    title: "Jason Colapietro on creators getting paid for work that moved everything",
    caption:
      "Founder photo card for Suede AI, creator monetization, AI-era rights, and ownership infrastructure.",
  },
  {
    file: "jason-colapietro-suede-ai-builders-question-everything.png",
    title: "Jason Colapietro: The best builders question everything",
    caption:
      "Jason Colapietro and Suede AI visual for builders, AI IP, creator economy, and programmable rights.",
  },
  {
    file: "jason-colapietro-suede-ai-voice-get-paid.png",
    title: "Jason Colapietro: If AI can use your voice, you should get paid",
    caption:
      "Suede AI founder card about voice rights, likeness, music AI, consent, licensing, and creator payment.",
  },
  {
    file: "jason-colapietro-suede-ai-building-for-family.png",
    title: "Jason Colapietro: You build differently when you know what you're building for",
    caption:
      "Founder image connecting Jason Colapietro, Suede AI, long-term creator ownership, and family-driven mission.",
  },
  {
    file: "jason-colapietro-suede-ai-reach-further.png",
    title: "Jason Colapietro: Reach further than makes sense",
    caption:
      "Suede AI image about ambitious creator infrastructure, AI music, IP rails, and ownership records.",
  },
  {
    file: "jason-colapietro-suede-ai-voice-infrastructure.png",
    title: "Jason Colapietro: Your voice is infrastructure",
    caption:
      "Founder visual for Suede AI voice infrastructure, creator identity, likeness rights, and AI consent.",
  },
  {
    file: "jason-colapietro-suede-ai-stakes-personal.png",
    title: "Jason Colapietro: The work gets clear when the stakes are personal",
    caption:
      "Jason Colapietro photo card for Suede AI, creator ownership, music rights, and founder mission.",
  },
  {
    file: "jason-colapietro-suede-ai-infrastructure-weekends.png",
    title: "Jason Colapietro: The infrastructure doesn't take weekends",
    caption:
      "Suede AI founder image about building ownership infrastructure for creators and AI-era media.",
  },
  {
    file: "jason-colapietro-suede-ai-everything-gets-clearer.png",
    title: "Jason Colapietro: Everything gets clearer when the stakes are personal",
    caption:
      "Founder photo card for Jason Colapietro, Suede AI, creator rights, provenance, and music IP.",
  },
  {
    file: "jason-colapietro-suede-ai-ledger-registered-first.png",
    title: "Jason Colapietro: The ledger cares who registered first",
    caption:
      "Suede AI image for registration, proof of creation, creator ownership, programmable IP, and provenance.",
  },
  {
    file: "jason-colapietro-suede-ai-programmable-ownership.png",
    title: "Jason Colapietro: Ownership was always the business model",
    caption:
      "Jason Colapietro founder visual about programmable ownership, music rights, and creator monetization.",
  },
  {
    file: "jason-colapietro-suede-ai-now-it-exists-story.png",
    title: "Jason Colapietro: This didn't exist. Now it does.",
    caption:
      "Suede AI founder image about building new creator ownership infrastructure for AI music and IP.",
  },
  {
    file: "jason-colapietro-suede-ai-get-in-the-water.png",
    title: "Jason Colapietro: Get in the water and figure out the rest",
    caption:
      "Founder image for Suede AI execution, crypto, AI IP, creator ownership, and music infrastructure.",
  },
  {
    file: "jason-colapietro-suede-ai-she-needs-you-there.png",
    title: "Jason Colapietro: She needs you there",
    caption:
      "Jason Colapietro Suede AI photo card about presence, family, creator tools, and founder mission.",
  },
  {
    file: "jason-colapietro-suede-ai-what-all-of-it-is-for.png",
    title: "Jason Colapietro: This is what all of it is actually for",
    caption:
      "Suede AI founder image connecting creator ownership, AI music, programmable IP, and personal purpose.",
  },
  {
    file: "jason-colapietro-suede-ai-long-game.png",
    title: "Jason Colapietro: Build for the long game",
    caption:
      "Jason Colapietro image about the long game in creator ownership, AI IP, music rights, and Suede AI.",
  },
  {
    file: "jason-colapietro-suede-ai-presence-is-product.png",
    title: "Jason Colapietro: Presence is the product",
    caption:
      "Suede AI founder card on presence, creator experience, AI music infrastructure, and ownership.",
  },
  {
    file: "jason-colapietro-suede-ai-mission-and-moment.png",
    title: "Jason Colapietro: The mission and the moment are the same thing",
    caption:
      "Founder visual for Jason Colapietro, Suede AI, creator economy, programmable rights, and AI media.",
  },
  {
    file: "jason-colapietro-suede-ai-invert-the-model.png",
    title: "Jason Colapietro: Invert the model. Own the outcome.",
    caption:
      "Suede AI founder image about inverting media economics through ownership, licensing, and programmable IP.",
  },
  {
    file: "jason-colapietro-suede-ai-nothing-obvious.png",
    title: "Jason Colapietro: Nothing about this was obvious",
    caption:
      "Jason Colapietro Suede AI image for founder story, category creation, creator rights, and AI music.",
  },
  {
    file: "jason-colapietro-suede-ai-show-up-get-in.png",
    title: "Jason Colapietro: Show up. Get in.",
    caption:
      "Founder photo card for Suede AI execution, creator ownership, AI IP, and music rights infrastructure.",
  },
  {
    file: "jason-colapietro-suede-ai-day-off-building-infrastructure.png",
    title: "Jason Colapietro: Day off. Still building infrastructure.",
    caption:
      "Suede AI founder image about creator infrastructure, ownership, AI music, and founder execution.",
  },
  {
    file: "jason-colapietro-suede-ai-simple-reason.png",
    title: "Jason Colapietro: Every ambitious thing comes down to a simple reason",
    caption:
      "Jason Colapietro founder image connecting Suede AI, family, creator ownership, music rights, and AI IP.",
  },
  {
    file: "jason-colapietro-suede-ai-family-outdoor.png",
    title: "Jason Colapietro family outdoor candid",
    caption:
      "Jason Colapietro candid photo for Suede AI founder visuals, family-driven mission, creator ownership, and authentic founder context.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-reading-candid.png",
    title: "Jason Colapietro reading candid",
    caption:
      "Jason Colapietro candid founder photo for Suede AI, presence, family, creator ownership, and long-term builder storytelling.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-close-reading.png",
    title: "Jason Colapietro close reading moment",
    caption:
      "Close candid image of Jason Colapietro for Suede AI founder media, family context, AI ownership, and creator rights storytelling.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-shoulder-ride.png",
    title: "Jason Colapietro shoulder ride candid",
    caption:
      "Jason Colapietro lifestyle photo for Suede AI founder storytelling, family purpose, creator ownership, and personal mission.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-sunglasses-smile.png",
    title: "Jason Colapietro sunglasses smile",
    caption:
      "Jason Colapietro smiling candid photo for Suede AI founder visuals, authentic media, creator ownership, and personal brand context.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-sunny-candid.png",
    title: "Jason Colapietro sunny candid",
    caption:
      "Jason Colapietro outdoor candid image for Suede AI founder media, family, provenance, creator ownership, and trusted visual context.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-table-candid.png",
    title: "Jason Colapietro table candid",
    caption:
      "Jason Colapietro candid image for Suede AI founder archive, family presence, creator rights, and authentic founder storytelling.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-family-event.png",
    title: "Jason Colapietro family event",
    caption:
      "Jason Colapietro event photo for Suede AI founder gallery, family mission, creator ownership, and long-term media provenance.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-desk-shot.png",
    title: "Jason Colapietro desk shot",
    caption:
      "Jason Colapietro founder workspace image for Suede AI, builder context, creator ownership, AI IP, and provenance infrastructure.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-collage.png",
    title: "Jason Colapietro candid collage",
    caption:
      "Jason Colapietro collage photo for Suede AI founder media, authentic moments, creator ownership, and visual provenance.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-night-out.png",
    title: "Jason Colapietro night out",
    caption:
      "Jason Colapietro night-out photo for Suede AI founder visuals, authentic personal media, creator ownership, and founder discovery.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-painting-date.png",
    title: "Jason Colapietro painting date",
    caption:
      "Jason Colapietro candid painting photo for Suede AI founder gallery, creative context, creator rights, and personal storytelling.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-painting-action.png",
    title: "Jason Colapietro painting action",
    caption:
      "Jason Colapietro creative candid photo for Suede AI founder media, visual provenance, creator ownership, and authentic context.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-two-person-smile.png",
    title: "Jason Colapietro two-person smile",
    caption:
      "Jason Colapietro smiling photo for Suede AI founder archive, authentic media, creator ownership, and personal brand search context.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-birthday-cake.png",
    title: "Jason Colapietro birthday cake",
    caption:
      "Jason Colapietro birthday photo for Suede AI founder visuals, personal media, provenance, and authentic founder storytelling.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-birthday-cake-full.png",
    title: "Jason Colapietro birthday cake full frame",
    caption:
      "Jason Colapietro birthday image for Suede AI founder gallery, personal context, creator ownership, and visual archive coverage.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-fun-closeup.png",
    title: "Jason Colapietro fun closeup",
    caption:
      "Jason Colapietro closeup candid photo for Suede AI founder media, authentic personal visuals, creator ownership, and discovery.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-seated-polo.png",
    title: "Jason Colapietro seated polo portrait",
    caption:
      "Jason Colapietro seated candid portrait for Suede AI founder visuals, personal media, creator ownership, and founder search.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-black-jacket-close.png",
    title: "Jason Colapietro black jacket closeup",
    caption:
      "Jason Colapietro closeup portrait for Suede AI founder gallery, authentic media, AI IP, creator ownership, and provenance.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-black-jacket-seated.png",
    title: "Jason Colapietro black jacket seated",
    caption:
      "Jason Colapietro seated portrait for Suede AI founder image gallery, creator ownership, personal brand, and visual provenance.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-signal.png",
    title: "Jason Colapietro profile signal",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, connecting founder identity, provenance, creator ownership, and public signal.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-standard.png",
    title: "Jason Colapietro profile standard",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, focused on standards, founder credibility, and creator ownership.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-sharp.png",
    title: "Jason Colapietro profile sharp",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, showing focus, founder presence, AI IP, and provenance context.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-current.png",
    title: "Jason Colapietro profile current energy",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, pairing current founder energy with long-horizon ownership work.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-built-in.png",
    title: "Jason Colapietro profile built in public",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, about building in public, ownership at origin, and creator proof.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-proof.png",
    title: "Jason Colapietro profile proof",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, centered on proof, permissionless building, and creator rights.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-waterline.png",
    title: "Jason Colapietro profile waterline",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, about raising the floor for creators through ownership infrastructure.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-ready.png",
    title: "Jason Colapietro profile ready",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, showing readiness before the market catches up.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-origin.png",
    title: "Jason Colapietro profile origin",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, focused on origin as the asset and provenance as the proof layer.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-ownership.png",
    title: "Jason Colapietro profile ownership",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, showing how ownership changes the way creators carry themselves.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-composure.png",
    title: "Jason Colapietro profile composure",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, emphasizing composure, leverage, and founder discipline.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-early.png",
    title: "Jason Colapietro profile early",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, showing that early conviction can still carry serious scale.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-angle.png",
    title: "Jason Colapietro profile angle",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, about finding the angle, building the edge, and owning the work.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-focus.png",
    title: "Jason Colapietro profile focus",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, connecting focus with the rights layer creators need.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-archive.png",
    title: "Jason Colapietro profile archive",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, about archives, receipts, provenance, and creator ownership.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-frame.png",
    title: "Jason Colapietro profile frame",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, showing every frame as evidence creators can own.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-resolve.png",
    title: "Jason Colapietro profile resolve",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, focused on resolve before results and founder execution.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-long-view.png",
    title: "Jason Colapietro profile long view",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, about playing the long view in creator ownership and AI IP.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-signal-stack.png",
    title: "Jason Colapietro profile signal stack",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, about stacking signal, shipping proof, and building provenance.",
    width: 1080,
    height: 1350,
  },
  {
    file: "jason-colapietro-suede-ai-profile-name-on-it.png",
    title: "Jason Colapietro profile name on it",
    caption:
      "Profile-photo card for Jason Colapietro and Suede AI, about putting your name on the work and owning it.",
    width: 1080,
    height: 1350,
  },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "Jason Colapietro images",
    "Jason Colapietro photos",
    "Jason Colapietro Suede AI",
    "Jason Colapietro founder",
    "Suede AI founder",
    "Suede Labs founder",
    "AI music founder",
    "creator ownership",
    "programmable IP",
    "music rights",
    "AI IP",
  ],
  authors: [{ name: "Jason Colapietro", url: `${baseUrl}/founder` }],
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalPath,
    type: "website",
    siteName: "Suede AI",
    images: [
      {
        url: `/jason-colapietro/${cards[0].file}`,
        width: 1080,
        height: 1350,
        alt: cards[0].title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AISUEDE",
    creator: "@johnnysuede",
    title: pageTitle,
    description: pageDescription,
    images: [`/jason-colapietro/${cards[0].file}`],
  },
};

const getSlug = (file: string) => file.replace(/\.(png|jpe?g)$/, "");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: pageTitle,
  description: pageDescription,
  url: `${baseUrl}${canonicalPath}`,
  mainEntity: {
    "@type": "Person",
    name: "Jason Colapietro",
    url: `${baseUrl}/founder`,
    jobTitle: "CEO and Founder of Suede AI",
    sameAs: ["https://github.com/Suede-AI"],
  },
  publisher: {
    "@type": "Organization",
    name: "Suede AI",
    url: baseUrl,
  },
  hasPart: cards.map((card) => ({
    "@type": "ImageObject",
    name: card.title,
    caption: card.caption,
    description: card.caption,
    contentUrl: `${baseUrl}/jason-colapietro/${card.file}`,
    thumbnailUrl: `${baseUrl}/jason-colapietro/${card.file}`,
    url: `${baseUrl}${canonicalPath}/${getSlug(card.file)}`,
    width: card.width ?? 1080,
    height: card.height ?? 1350,
    encodingFormat: card.file.endsWith(".png") ? "image/png" : "image/jpeg",
    creditText: "Suede AI",
    copyrightNotice: "Suede AI",
    representativeOfPage: card.file === cards[0].file,
    creator: {
      "@type": "Person",
      name: "Jason Colapietro",
    },
    copyrightHolder: {
      "@type": "Organization",
      name: "Suede AI",
    },
    about: [
      "Jason Colapietro",
      "Suede AI",
      "creator ownership",
      "AI music",
      "programmable IP",
      "music rights",
    ],
  })),
};

export default function JasonColapietroImagesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#05070d_0%,#0b1220_48%,#030407_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:76px_76px]" />
      </div>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
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
                Official image gallery
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

        <header className="grid gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f5d69a]/25 bg-[#f5d69a]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#f5d69a]">
              <Images className="h-4 w-4" />
              Founder image index
            </div>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
              Jason Colapietro images for Suede AI.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Official image gallery for Jason Colapietro, founder of Suede AI,
              featuring a founder portrait and visual founder quote cards about creator ownership,
              programmable IP, AI music, music rights, provenance, licensing,
              and the Suede Labs mission.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-slate-950">
              {["Jason Colapietro", "Suede AI", "AI Music", "Programmable IP", "Creator Ownership"].map(
                (tag) => (
                  <span key={tag} className="rounded-full bg-white px-4 py-2">
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
          <aside className="rounded-3xl border border-white/10 bg-white/7 p-6">
            <div className="flex items-center gap-3 text-[#f5d69a]">
              <Camera className="h-5 w-5" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em]">
              Founder archive
              </p>
            </div>
            <p className="mt-5 text-base leading-7 text-slate-200">
              A curated set of official Jason Colapietro visuals from Suede
              Labs, organized around creator ownership, AI music,
              programmable IP, provenance, licensing, and the founder thesis
              behind Suede AI.
            </p>
            <Link
              href="/founder"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f5d69a]"
            >
              Read the founder profile
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/ios"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#f5d69a]"
            >
              Download the iOS apps
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </header>

        <section className="grid gap-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <figure
              key={card.file}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/7"
            >
              <Link href={`${canonicalPath}/${getSlug(card.file)}`}>
                <Image
                  src={`/jason-colapietro/${card.file}`}
                  alt={card.title}
                  width={card.width ?? 1080}
                  height={card.height ?? 1350}
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                  className="aspect-[4/5] w-full bg-[#07101d] object-cover"
                  priority={index < 3}
                />
              </Link>
              <figcaption className="p-5">
                <h2 className="text-lg font-bold leading-6 text-white">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {card.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </section>

        <section className="border-t border-white/10 py-12">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#35b9ff]/25 bg-[#35b9ff]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#8bdcff]">
              <Sparkles className="h-4 w-4" />
              About Jason Colapietro
            </div>
            <p className="text-lg leading-8 text-slate-300">
              Jason Colapietro is the founder of Suede AI, a creator ownership
              platform for music, media, AI IP, programmable rights, provenance,
              licensing, and agent-readable commerce. This gallery collects
              official Jason Colapietro founder visuals and quote cards for search, press,
              social context, and Suede AI discovery.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
