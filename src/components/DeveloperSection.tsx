import {useState} from 'react'
import {Tabs} from 'radix-ui'
import {Reveal,Section,cx} from './ui'
const SNIP:Record<string,string>={
TypeScript:`// Illustrative only: the FluxTx SDK is not released yet.
const payment = await fluxtx.invoices.create({
  amount: "25.00",
  currency: "USDT",
  network: "base",
  reference: "ORDER-001"
});`,
Python:`# Illustrative only: the FluxTx SDK is not released yet.
payment = fluxtx.invoices.create(
    amount="25.00",
    currency="USDT",
    network="base",
    reference="ORDER-001",
)`,
cURL:`# Illustrative only: this API is not live yet.
curl -X POST https://api.fluxtx.example/v1/invoices \\
  -d amount=25.00 -d currency=USDT \\
  -d network=base -d reference=ORDER-001`}
const TOK=/(\/\/.*|#.*|"[^"]*"|\b(?:const|await|curl)\b)/g
const hl=(code:string)=>code.split(TOK).map((t,i)=>t.startsWith('//')||t.startsWith('#')?<span key={i} className="c">{t}</span>:t.startsWith('"')?<span key={i} className="s">{t}</span>:/^(const|await|curl)$/.test(t)?<span key={i} className="k">{t}</span>:t)
export function DeveloperSection(){const [tab,setTab]=useState('TypeScript');const [c,setC]=useState('Copy')
const copy=async()=>{try{await navigator.clipboard.writeText(SNIP[tab]);setC('Copied')}catch{setC('Press Ctrl+C')}setTimeout(()=>setC('Copy'),1600)}
return <Section id="developers" eyebrow="Developers" title="BUILT FOR DEVELOPERS." sub="Integrate blockchain payments without building the entire infrastructure yourself.">
<Reveal className="liquid-glass liquid-glass-panel"><Tabs.Root value={tab} onValueChange={setTab}>
<div className="bar"><Tabs.List aria-label="Language" className="flex gap-1">{Object.keys(SNIP).map(k=><Tabs.Trigger key={k} value={k} className={cx('min-h-8 rounded-lg px-3 font-mono text-xs text-mute transition-colors hover:text-ink data-[state=active]:bg-teal/10 data-[state=active]:text-teal focus-visible:outline-2 focus-visible:outline-teal')}>{k}</Tabs.Trigger>)}</Tabs.List><button onClick={copy}>{c}</button></div>
{Object.entries(SNIP).map(([k,v])=><Tabs.Content key={k} value={k} className="fade"><pre className="m-0 overflow-x-auto p-[22px] font-mono text-sm leading-[1.7]"><code>{hl(v)}</code><span className="inline-block h-[1em] w-2 animate-pulse bg-teal align-[-2px]"/></pre></Tabs.Content>)}
</Tabs.Root></Reveal>
<p className="mt-3 text-xs text-mute">Planned SDKs: TypeScript, Python, PHP, Go.</p></Section>}
