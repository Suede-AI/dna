# Suede Docs

Public documentation for Suede Labs, programmable IP, creator ownership, and agent-ready media commerce.

## What Is Suede?

Suede Labs is building programmable IP and creator ownership infrastructure for AI-native media.

The core idea is simple: as media becomes easier to generate, remix, license, and distribute through agents, creators need a clearer ownership layer. Suede connects creative assets to provenance, rights metadata, licensing workflows, token-enabled access, and agent-accessible commerce.

AI music is a core media use case, but Suede is not only a music generation product. Music is an early, high-signal category for proving the broader system: creation, ownership, rights, licensing, monetization, and agent commerce.

## Core Pillars

### Programmable IP

Creative assets should carry usable ownership and rights information.

Suede focuses on making IP easier to register, verify, license, route, and monetize across product surfaces, chains, and agent workflows.

### Creator Ownership

Creators need a durable record of what they made, what rights attach to it, and how it can be used.

Suede treats ownership as infrastructure, not just a profile, a file upload, or a social claim.

### Provenance

Provenance connects a media asset to its creator, metadata, source context, and downstream use.

In an AI-native media environment, provenance becomes a practical requirement for trust, attribution, licensing, and payments.

### Licensing and Monetization

Creative assets need paths to usage rights, licensing terms, and revenue flow.

Suede's direction is to connect registered media and IP metadata to licensing actions, programmable access, and creator-aligned monetization.

### Agent Commerce

Agents increasingly need to discover, pay for, generate, license, and use media services.

Suede exposes current public x402 and ACP-ready surfaces for paid media workflows and commerce intent capture.

## Current Public Surfaces

| Area | Public Reference | Status |
|---|---|---|
| Company site | `https://suedeai.ai` | Live |
| iOS install hub | `https://suedeai.ai/ios` | Prepared in `suede-home`; production deploy pending |
| Studio app | `https://app.suedeai.ai/create` | Live |
| App / x402 host | `https://app.suedeai.xyz/create` | Live |
| Vaults | `https://suedeai.ai/vaults` | Live |
| Swap | `https://suedeai.ai/swap` | Live; resolves to the vaults swap section |
| NFT | `https://nft.suedeai.ai` | Live |
| Launchpad | `https://launchpad.suedeai.ai` | Live |
| Distro | `https://distro.suedeai.ai` | Live |
| IP registry | `https://ip.suedeai.xyz` | Live |
| Public docs / foundation site | `https://suedeai.org` | Live |
| Suede Studio Inspiration | `https://apps.apple.com/us/app/suede-studio-inspiration/id6765461286?uo=4` | App Store |
| Suede Studio Guitar | `https://apps.apple.com/us/app/suede-studio-guitar/id6767552764?uo=4` | App Store |
| Suede Voice Studio | `https://apps.apple.com/us/app/suede-voice-studio/id6767763231?uo=4` | App Store |
| Token | `SUEDE_TOKEN_PUBLIC_README.md` | Local public packet |
| x402 / ACP endpoints | `SUEDE_X402_ACP_PUBLIC_README.md` | Local public packet |
| Brand assets | `SUEDE_BRAND_ASSETS_README.md` | Local public packet |

## Token

`SUEDE` is the utility token connected to Suede Labs.

Primary token references:

- Solana mint: `2nCeHpECQvnMfzjU5fDMAKws1vBxMzxvWr6qqLpApump`
- Base contract: `0x40461291347e1eCbb09499F3371D3f17f10d7159`
- CoinGecko: `https://www.coingecko.com/en/coins/johnny-suede`

See:

```text
SUEDE_TOKEN_PUBLIC_README.md
```

## x402 and ACP

Suede currently exposes public x402 endpoints for paid music and video generation workflows, plus an ACP-ready backend endpoint for recording agent commerce intents.

Current public x402 discovery:

```text
https://app.suedeai.xyz/.well-known/x402
https://app.suedeai.xyz/.well-known/x402.json
```

Current public paid endpoints:

```text
POST https://app.suedeai.xyz/agent/generate
POST https://app.suedeai.xyz/create-music
POST https://app.suedeai.xyz/agent/video
```

Current ACP-ready commerce endpoint:

```text
POST https://suede-ai-app.onrender.com/agents/commerce
```

See:

```text
SUEDE_X402_ACP_PUBLIC_README.md
```

## Ecosystem

The broader Suede ecosystem includes independent community launches and experiments. Public docs distinguish those from non-independent, officially live production ecosystem references.

Current production ecosystem references documented in the public packet:

| Name | Chain | Contract / Mint |
|---|---|---|
| `Suedette` | Solana | `2PD1MnKURYLCCtds9hfvXpvJc6mjhMC5ruUWdFkZbonk` |
| `Producer by Suede Labs: Clawdbot` (`SVID`) | Base | `0x2aed2c4dCB3D61938e36f3481dEFE553fac0ADbd` |
| `JBDAO` | Solana | `2zEQm6mLbbU5uoEoGQk3JUX3XJB7qUSkGmjjVHd4VGb7` |

## Language Guide

Use:

- Programmable IP
- Creator ownership
- Creative RWA media assets
- Provenance
- Licensing
- x402 payments
- ACP-ready agent commerce
- AI music as a core media use case

Avoid:

- Describing Suede as only an AI music app
- Presenting planned endpoints as live
- Treating independent community launches as official production references
- Overstating integrations that are not publicly verifiable

## Suggested Repo Structure

```text
README.md
docs/
  programmable-ip.md
  creator-ownership.md
  provenance.md
  licensing.md
  x402-acp.md
  ecosystem.md
```

## Related Public Repos

Recommended public GitHub package:

- `suede-token`
- `suede-x402-acp`
- `suede-brand-assets`
- `suede-docs`

See:

```text
SUEDE_PUBLIC_GITHUB_INDEX.md
```

## Verification

Last updated: 2026-05-18.

This public documentation is intended for reviewers, wallets, directories, agent indexes, partners, and community members who need a factual overview of Suede Labs and its public surfaces.
