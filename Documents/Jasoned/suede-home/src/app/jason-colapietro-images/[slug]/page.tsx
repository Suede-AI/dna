import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const baseUrl = "https://suedeai.ai";
const galleryPath = "/jason-colapietro-images";
const imageDir = join(process.cwd(), "public", "jason-colapietro");
const imageDimensions: Record<string, { width: number; height: number }> = {
  "jason-colapietro-suede-ai-founder-portrait.png": { width: 1067, height: 1475 },
  "jason-colapietro-suede-ai-family-outdoor.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-reading-candid.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-close-reading.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-shoulder-ride.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-sunglasses-smile.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-sunny-candid.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-table-candid.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-family-event.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-desk-shot.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-collage.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-night-out.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-painting-date.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-painting-action.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-two-person-smile.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-birthday-cake.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-birthday-cake-full.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-fun-closeup.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-seated-polo.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-black-jacket-close.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-black-jacket-seated.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-signal.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-standard.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-sharp.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-current.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-built-in.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-proof.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-waterline.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-ready.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-origin.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-ownership.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-composure.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-early.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-angle.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-focus.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-archive.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-frame.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-resolve.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-long-view.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-signal-stack.png": { width: 1080, height: 1350 },
  "jason-colapietro-suede-ai-profile-name-on-it.png": { width: 1080, height: 1350 },
};

function getImageFiles() {
  return readdirSync(imageDir)
    .filter(
      (file) =>
        /\.(png|jpe?g)$/.test(file) && file.startsWith("jason-colapietro-"),
    )
    .sort();
}

function titleFromSlug(slug: string) {
  const clean = slug
    .replace(/^jason-colapietro-suede-ai-/, "")
    .replace(/-/g, " ");

  if (clean === "founder portrait") {
    return "Jason Colapietro, founder of Suede AI";
  }

  return `Jason Colapietro Suede AI founder visual: ${clean}`;
}

function getImage(slug: string) {
  const file = getImageFiles().find((imageFile) =>
    imageFile.replace(/\.(png|jpe?g)$/, "") === slug,
  );
  if (!file) {
    return null;
  }

  const title = titleFromSlug(slug);
  const isPortrait = slug === "jason-colapietro-suede-ai-founder-portrait";
  const dimensions = imageDimensions[file] ?? { width: 1080, height: 1350 };

  return {
    file,
    slug,
    title,
    width: dimensions.width,
    height: dimensions.height,
    path: `/jason-colapietro/${file}`,
    url: `${baseUrl}/jason-colapietro/${file}`,
    pageUrl: `${baseUrl}${galleryPath}/${slug}`,
    alt: isPortrait
      ? "Jason Colapietro, founder of Suede AI, in an official founder portrait."
      : `${title}, a Suede Labs quote-card image for creator ownership, AI music, programmable IP, and music rights.`,
  };
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getImageFiles().map((file) => ({
    slug: file.replace(/\.(png|jpe?g)$/, ""),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const image = getImage(slug);

  if (!image) {
    return {};
  }

  const description = `${image.title}. Official Jason Colapietro and Suede AI image page for creator ownership, AI music, programmable IP, music rights, provenance, licensing, and founder search context.`;

  return {
    title: image.title,
    description,
    alternates: {
      canonical: `${galleryPath}/${slug}`,
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    openGraph: {
      title: image.title,
      description,
      url: `${galleryPath}/${slug}`,
      type: "article",
      siteName: "Suede AI",
      images: [
        {
          url: image.path,
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@AISUEDE",
      creator: "@johnnysuede",
      title: image.title,
      description,
      images: [image.path],
    },
  };
}

export default async function JasonColapietroImageDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const image = getImage(slug);

  if (!image) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: image.title,
    caption: image.alt,
    description: image.alt,
    contentUrl: image.url,
    thumbnailUrl: image.url,
    url: image.pageUrl,
    width: image.width,
    height: image.height,
    encodingFormat: image.file.endsWith(".png") ? "image/png" : "image/jpeg",
    creditText: "Suede AI",
    copyrightNotice: "Suede AI",
    representativeOfPage: true,
    creator: {
      "@type": "Person",
      name: "Jason Colapietro",
      url: `${baseUrl}/founder`,
      jobTitle: "CEO and Founder of Suede AI",
    },
    publisher: {
      "@type": "Organization",
      name: "Suede AI",
      url: baseUrl,
    },
    about: [
      "Jason Colapietro",
      "Suede AI",
      "creator ownership",
      "AI music",
      "programmable IP",
      "music rights",
    ],
  };

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto grid min-h-screen w-full max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(340px,0.52fr)] lg:px-10">
        <div className="flex flex-col gap-5">
          <Link
            href={galleryPath}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 py-2 text-sm font-semibold text-white/72 transition hover:bg-white/12 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to gallery
          </Link>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/7">
            <Image
              src={image.path}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 58vw, 92vw"
              className="h-auto w-full"
              priority
            />
          </div>
        </div>

        <aside className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f5d69a]">
            Jason Colapietro Image
          </p>
          <h1 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-5xl">
            {image.title}
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-300">
            {image.alt} This official Suede AI image page gives search engines
            a dedicated source for Jason Colapietro, founder visuals, creator
            ownership, AI music, programmable IP, provenance, licensing, and
            music rights context.
          </p>
          <dl className="mt-8 grid gap-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-white/7 p-4">
              <dt className="font-semibold text-white">Creator</dt>
              <dd className="mt-1">Jason Colapietro / Suede AI</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/7 p-4">
              <dt className="font-semibold text-white">Topics</dt>
              <dd className="mt-1">
                Suede AI, AI music, creator ownership, programmable IP, music
                rights
              </dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/7 p-4">
              <dt className="font-semibold text-white">File</dt>
              <dd className="mt-1 break-words">{image.file}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href={image.path}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#f5d69a]"
            >
              <Download className="h-4 w-4" />
              Open Image File
            </Link>
            <Link
              href="/founder"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/7 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/12"
            >
              Founder Profile
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="/ios"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/7 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/12"
            >
              iOS Apps
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
