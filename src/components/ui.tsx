import {motion} from 'motion/react'
import type {ReactNode} from 'react'
export const cx=(...a:(string|false|undefined)[])=>a.filter(Boolean).join(' ')

export const GRID='grid gap-[18px] grid-cols-[repeat(auto-fit,minmax(260px,1fr))]'
type Tag='div'|'article'|'section'
export function Reveal({as='div',delay=0,hover=false,className='',children}:{as?:Tag;delay?:number;hover?:boolean;className?:string;children:ReactNode}){const M=motion[as];return <M initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} whileHover={hover?{y:-6}:undefined} transition={{duration:.7,delay:delay/1000}} className={className}>{children}</M>}
export function Section({id,eyebrow,title,sub,children}){return <section id={id} className="mx-auto max-w-[1160px] px-6 py-24">
<div className="font-mono text-xs tracking-[.2em] uppercase text-teal mb-3">{eyebrow}</div>
<h2 className="text-[clamp(28px,4.5vw,48px)] leading-tight mb-3">{title}</h2>
<p className="text-mute max-w-[620px] mb-10">{sub}</p>{children}</section>}
export const Icon=({d})=><span className="grid place-items-center w-[42px] h-[42px] rounded-xl bg-teal/10 text-teal"><svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{__html:d}}/></span>;

