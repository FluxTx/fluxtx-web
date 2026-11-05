import {useState,useEffect,useRef} from 'react'
import {cx,Reveal,Section,Icon,GRID} from './ui'
const F:[string,string,string,string[]][]=[
["Multi-chain Payments","A single API for working with many blockchains.",'<circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 11l6-4M9 13l6 4"/>',["One unified integration","Target networks listed below"]],
["Smart Invoices","Create and track payment invoices.",'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',["Amount and token","Expiry tracking","Partial and overpayment"]],
["Blockchain Indexer","Watch on-chain activity reliably.",'<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/>',["Transactions and token transfers","Confirmations","Reorg handling"]],
["Automatic Payment Matching","Link transactions to invoices automatically.",'<path d="M5 12l5 5L20 7"/>',["Underpaid and overpaid detection","Duplicate handling","Idempotency"]],
["Real-time Webhooks","Event notifications for merchants.",'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',["HMAC-SHA256 signatures","Automatic retries","Delivery history and event logs"]],
["Developer-first API","REST API built for integration.",'<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',["API keys and docs","Request logs, rate limiting","SDKs: TS, Python, PHP, Go"]],
["Hosted Checkout","A ready-made payment page.",'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v7M14 20h3"/>',["QR code and wallet address","Transaction status","Mobile-friendly"]],
["Merchant Dashboard","Manage everything in one place.",'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',["Invoices, payments, API keys","Webhooks","Analytics"]],
["Non-custodial Security","Designed so FluxTx never holds your funds.",'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>',["No seed phrases or private keys","Access control, audit logs","Secure webhook delivery (planned)"]]];

export function Features(){return <Section id="features" eyebrow="Ecosystem" title="What we’re building." sub="The core pieces of the FluxTx platform. All features below are planned or in development, not yet available.">
<div className={GRID}>{F.map(([t,d,i,l],n)=><Reveal hover as="article" key={t} delay={(n%3)*80} className="liquid-glass liquid-glass-card"><Icon d={i}/><h3 className="mb-1.5 mt-3.5 text-[19px]">{t}</h3><p className="text-sm text-mute">{d}</p><ul className="mt-2 list-disc pl-[18px] text-sm text-mute">{l.map(x=><li key={x}>{x}</li>)}</ul></Reveal>)}</div></Section>}

