import {useState,useEffect,useRef} from 'react'
import {motion} from 'motion/react'
import {cx,Reveal,Section,Icon,GRID} from './ui'
const S=[["CREATE INVOICE","Merchant creates an invoice via the API."],["RECEIVE PAYMENT","Customer pays from a blockchain wallet."],["DETECT TRANSACTION","Indexer watches the chain."],["VERIFY PAYMENT","Checks amount, token and confirmations."],["SEND WEBHOOK","Result is sent to the merchant."],["COMPLETE","Merchant updates the order status."]];
export function HowItWorks(){return <Section id="how" eyebrow="Workflow" title="How FluxTx works." sub="The intended payment flow. This is a design target, not a live production system.">
<motion.div initial={{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true}} transition={{duration:1.4,ease:"easeOut"}} className="mb-6 hidden h-px origin-left bg-gradient-to-r from-teal via-cyan to-transparent md:block"/><div className="grid gap-[18px] grid-cols-[repeat(auto-fit,minmax(170px,1fr))]">{S.map(([t,d],i)=><Reveal hover key={t} delay={i*80} className="liquid-glass p-5"><div className="font-mono text-[13px] text-teal">0{i+1}</div><h3 className="mb-1.5 mt-2 text-[15px] tracking-widest">{t}</h3><p className="text-[13px] text-mute">{d}</p></Reveal>)}</div></Section>}

