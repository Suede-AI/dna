"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Apple,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ChevronDown,
  CircleDollarSign,
  FileCheck2,
  Fingerprint,
  Handshake,
  LockKeyhole,
  Music2,
  PenLine,
  ShieldCheck,
  SplitSquareHorizontal,
  TrendingUp,
} from "lucide-react";

const navLinks = [
  { label: "Product", href: "#proof", hasMenu: true },
  { label: "Solutions", href: "#proof", hasMenu: true },
  { label: "Resources", href: "#proof", hasMenu: true },
  { label: "For Investors", href: "#investors" },
  { label: "iOS Apps", href: "/ios" },
];

const workflow = [
  {
    step: "01",
    title: "Create",
    body: "Register songs, films, images, writing, performances, and future IP classes at the moment of creation.",
    icon: Music2,
    status: "Registered Work",
    meta: "Suede SU-87 Sing and Sign",
  },
  {
    step: "02",
    title: "Prove",
    body: "Patented asymmetric signing proves creation, authenticity, and private personage with ZK rails.",
    icon: Fingerprint,
    status: "Proof Verified",
    meta: "Wallet-verifiable signature",
  },
  {
    step: "03",
    title: "License",
    body: "Program rights, negotiate terms, clear approvals, and distribute through preferred partner routes.",
    icon: FileCheck2,
    status: "License Executed",
    meta: "Spotify, Apple Music, sync",
  },
  {
    step: "04",
    title: "Track",
    body: "Track royalties, splits, usage, advances, and payouts without opaque middlemen.",
    icon: BarChart3,
    status: "Revenue Recorded",
    meta: "$418,732.41 USD",
  },
];

const splitRows = [
  ["Velvet Sundown LLC", "Composition / Master", "45.00%", "$188,430.58", "$25,462.17"],
  ["Grace Archive", "Writer", "25.00%", "$104,683.11", "$14,145.22"],
  ["Morrissey House", "Producer", "15.00%", "$62,809.87", "$8,480.33"],
  ["Sundown Studio", "Publisher", "15.00%", "$62,809.87", "$8,480.33"],
];

const metrics = [
  ["12,842", "Rights Passports"],
  ["3,217", "Active Licenses"],
  ["$128.7M+", "YTD Rights Value Secured"],
  ["8.5x", "Preferred Route Uplift"],
];

const counterparties = ["SoundVision Films", "Grace Archive", "Salford Sync"];

function Waveform() {
  return (
    <div className="suede-waveform" aria-hidden="true">
      {Array.from({ length: 70 }).map((_, index) => (
        <i key={index} style={{ height: `${18 + ((index * 17) % 42)}px` }} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="suede-reference-home" data-easter-egg="Allison Colapietro">
      <header className="suede-reference-nav">
        <Link href="/" className="suede-reference-logo" aria-label="Suede Labs home">
          <Image src="/suede-ai-logo-transparent.png" alt="Suede Labs" width={44} height={44} priority />
          <span>
            <strong>SUEDE</strong>
            <small>LABS</small>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          {navLinks.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
              {item.hasMenu ? <ChevronDown size={12} /> : null}
            </Link>
          ))}
        </nav>
        <div className="suede-reference-actions">
          <a href="#proof">Sign in</a>
          <a className="suede-reference-access" href="#investors">
            Request Access
          </a>
        </div>
      </header>

      <section className="suede-reference-hero" id="proof">
        <div className="suede-reference-hero-media" aria-hidden="true" />
        <div className="suede-reference-hero-copy">
          <h1>
            <span>Stop losing rights</span>
            <span><span className="suede-mobile-line">and start owning</span> revenue</span>
          </h1>
          <p className="suede-hero-proofline">Prove ownership. License usage. Collect royalties.</p>
          <p>One system for artists, rights, royalties, and proof.</p>
          <ul>
            <li><ShieldCheck size={16} /> Institutional-grade rights infrastructure</li>
            <li><LockKeyhole size={16} /> Patented programmable IP flows</li>
            <li><CircleDollarSign size={16} /> Distribution, royalties, and payouts in one ledger</li>
          </ul>
          <div className="suede-reference-hero-actions">
            <a href="#investors">Request Early Access</a>
            <a href="#workflow">See Platform Overview</a>
            <Link href="/ios">
              <Apple size={16} />
              Download iOS Apps
            </Link>
          </div>
        </div>

        <section className="suede-rights-console" aria-label="Suede rights terminal">
          <div className="suede-console-breadcrumb">
            <span>Projects</span>
            <span>Velvet Sundown</span>
            <strong>Midnight City</strong>
            <small>v1.2</small>
          </div>
          <div className="suede-console-grid">
            <div className="suede-track-card">
              <div className="suede-album-art">
                <span>MIDNIGHT CITY</span>
                <small>VELVET SUNDOWN</small>
              </div>
              <div className="suede-track-controls">
                <strong>Midnight City</strong>
                <small>03:24</small>
              </div>
              <Waveform />
              <div className="suede-stems">
                {["Vocal", "Drums", "Bass", "Guitar", "Keys"].map((stem) => (
                  <span key={stem}><i /> {stem}</span>
                ))}
              </div>
            </div>

            <div className="suede-passport-panel">
              <div>
                <h2>Rights Passport</h2>
                <span>Verified</span>
              </div>
              <dl>
                <div><dt>Work ID</dt><dd>VS-87FA-19C3-7E2D</dd></div>
                <div><dt>ISWC</dt><dd>T-928.564.672-1</dd></div>
                <div><dt>Archive</dt><dd>Grace session vault</dd></div>
                <div><dt>Protocol</dt><dd>Patented asymmetric signing</dd></div>
                <div><dt>Status</dt><dd>Registered</dd></div>
                <div><dt>Created</dt><dd>May 12, 2026</dd></div>
                <div><dt>Owner</dt><dd>Velvet Sundown LLC</dd></div>
              </dl>
              <div className="suede-certificate">
                <Image src="/suede-ai-logo-transparent.png" alt="" width={24} height={24} />
                <strong>Rights Passport</strong>
                <small>Ownership, private personage, and provenance</small>
                <em>Verified</em>
              </div>
            </div>

            <div className="suede-license-panel">
              <div>
                <h3>License Active</h3>
                <span>Live</span>
              </div>
              <dl>
                <div><dt>Sync License</dt><dd>SoundVision Films</dd></div>
                <div><dt>Clearance</dt><dd>Grace Archive approved</dd></div>
                <div><dt>Distro</dt><dd>Spotify and Apple Music preferred routes</dd></div>
                <div><dt>Term</dt><dd>May 15, 2026 to May 15, 2029</dd></div>
                <div><dt>Territory</dt><dd>Worldwide</dd></div>
                <div><dt>Fee</dt><dd>$45,000.00 USD</dd></div>
              </dl>
            </div>

            <div className="suede-revenue-panel">
              <h3>Revenue Activity</h3>
              <strong>$418,732.41 <small>USD</small></strong>
              <svg viewBox="0 0 320 92" role="img" aria-label="Revenue trend">
                <polyline points="0,70 18,52 36,61 54,35 72,40 90,24 108,31 126,46 144,33 162,42 180,27 198,44 216,36 234,51 252,42 270,47 288,34 306,22 320,12" />
                <path d="M0 78 C50 68 80 72 120 59 C165 45 202 66 248 50 C286 38 302 42 320 28" />
              </svg>
              <div className="suede-revenue-legend">
                <span>Streaming $232,991.12</span>
                <span>Licenses $95,450.00</span>
                <span>Downloads $68,743.21</span>
                <span>Other $21,548.08</span>
              </div>
            </div>

            <div className="suede-payout-panel">
              <h3>Payout Status</h3>
              <p>Next Payout</p>
              <strong>$56,982.21 <small>USD</small></strong>
              <div className="suede-payout-steps">
                <span>Calculated</span>
                <span>Approved</span>
                <span>Scheduled</span>
                <span>Sent</span>
              </div>
            </div>

            <div className="suede-counterparty-panel">
              <h3>Counterparties</h3>
              {counterparties.map((party) => (
                <div key={party}>
                  <span>{party}</span>
                  <small>Active License</small>
                </div>
              ))}
            </div>

            <div className="suede-device-panel">
              <h3>Signing Devices</h3>
              <div>
                <strong>Suede SU-87 Sing and Sign</strong>
                <span>Voice-linked proof of creation</span>
              </div>
              <div>
                <strong>Suede S-Style 6 and Sign</strong>
                <span>Guitar signing device for proof after the fact</span>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="suede-ios-discovery" aria-label="Suede iOS apps">
        <div>
          <span>Now on the App Store</span>
          <strong>Install Suede Studio Inspiration, Guitar, and Voice Studio.</strong>
          <p>Official iPhone and iPad apps for creator ideas, guitar work, voice practice, provenance, and rights-first workflows.</p>
        </div>
        <Link href="/ios">
          <Apple size={18} />
          iOS install hub
          <ArrowRight size={16} />
        </Link>
      </section>

      <section className="suede-reference-workflow" id="workflow">
        <div className="suede-workflow-panel">
          <div className="suede-section-kicker">
            <span>Programmable IP Flow</span>
            <strong>From proof to payout, every right stays visible.</strong>
          </div>
          <div className="suede-workflow-steps">
            {workflow.map((item) => (
              <article key={item.step}>
                <div className="suede-step-head">
                  <item.icon size={24} />
                  <span>{item.step}</span>
                  <strong>{item.title}</strong>
                </div>
                <p>{item.body}</p>
                <div className="suede-step-proof">
                  <BadgeCheck size={15} />
                  <strong>{item.status}</strong>
                  <small>{item.meta}</small>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="suede-split-panel">
          <div className="suede-split-head">
            <div>
              <span>Royalty Ledger</span>
              <h2>Creator Split</h2>
            </div>
            <span><PenLine size={14} /> Edit Split</span>
          </div>
          <div className="suede-split-grid">
            <table>
              <thead>
                <tr>
                  <th>Party</th>
                  <th>Role</th>
                  <th>Ownership</th>
                  <th>YTD Revenue</th>
                  <th>Next Payout</th>
                </tr>
              </thead>
              <tbody>
                {splitRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => <td key={cell}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="suede-donut" aria-label="Ownership chart">
              <i />
              <strong>100%</strong>
              <span>Ownership</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="suede-institutional-footer" id="investors">
        <div className="suede-footer-trust">
          <ShieldCheck size={34} />
          <div>
            <strong>Built for institutions. Trusted by creators.</strong>
            <p>Programmable IP infrastructure for creative rights now, biotech and deeper IP workflows next.</p>
          </div>
        </div>
        <div className="suede-footer-metrics">
          {metrics.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="suede-footer-compliance">
          <span><BadgeCheck size={18} /> SOC 2 Type II</span>
          <span><Handshake size={18} /> Preferred Routes</span>
          <span><SplitSquareHorizontal size={18} /> Split Ledger</span>
          <span><TrendingUp size={18} /> Royalty Ready</span>
        </div>
      </footer>
    </main>
  );
}
