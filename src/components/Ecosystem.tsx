import {useState,useEffect,useRef} from 'react'
import {Tooltip} from 'radix-ui'
import {cx,Reveal,Section,Icon,GRID} from './ui'
const N:[string,'dev'|'road'][]=[["Ethereum","road"],["BNB Chain","road"],["Polygon","road"],["Arbitrum","road"],["Optimism","road"],["Base","dev"],["Avalanche","road"],["TRON","road"],["Solana","road"],["Bitcoin","road"]];
const TIP={dev:'Adapter in development. Not yet tested or supported.',road:'Planned for a future release.'}
export const Badge=({s}:{s:'dev'|'road'})=><Tooltip.Root><Tooltip.Trigger asChild><span tabIndex={0} className={cx('cursor-help rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-wider focus-visible:outline-2 focus-visible:outline-teal',s==='dev'?'border-cyan/50 text-cyan':'border-mute/40 text-mute')}>{s==='dev'?'IN DEVELOPMENT':'ROADMAP'}</span></Tooltip.Trigger><Tooltip.Portal><Tooltip.Content sideOffset={8} className="tip liquid-glass z-50 max-w-[220px] px-3 py-2 text-xs text-ink">{TIP[s]}<Tooltip.Arrow className="fill-cyan/30"/></Tooltip.Content></Tooltip.Portal></Tooltip.Root>
export function Ecosystem(){return <Section id="ecosystem" eyebrow="Networks" title="Every chain, one integration." sub="Target networks for FluxTx. No network is marked SUPPORTED until its adapter is implemented and tested on-chain.">
<div className={GRID}>{N.map(([n,s])=><Reveal hover key={n} className="liquid-glass liquid-glass-card flex items-center justify-between"><b className="font-medium">{n}</b><Badge s={s}/></Reveal>)}</div>
<p className="mt-5 text-[13px] text-mute"><Badge s="dev"/> adapter being built &nbsp; <Badge s="road"/> planned &nbsp; SUPPORTED: none yet.</p></Section>}

