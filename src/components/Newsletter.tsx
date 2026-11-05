import {useState} from 'react'
import type {FormEvent} from 'react'
import {motion,AnimatePresence} from 'motion/react'
import {Check} from 'lucide-react'
import {cx,Reveal} from './ui'
type S={k:'idle'|'loading'|'ok'|'err';t:string}
export function Newsletter(){const [v,setV]=useState('');const [hp,setHp]=useState('');const [st,setSt]=useState<S>({k:'idle',t:''})
const submit=async(e:FormEvent)=>{e.preventDefault()
if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())){setSt({k:'err',t:'Please enter a valid email address.'});return}
setSt({k:'loading',t:'Sending…'})
try{const r=await fetch('/api/notify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:v.trim(),company:hp})})
if(!r.ok)throw new Error();setSt({k:'ok',t:'You’re on the list. We’ll let you know when FluxTx launches.'});setV('')}
catch{setSt({k:'err',t:'Something went wrong. Please try again later.'})}}
return <section id="notify" className="mx-auto max-w-[1160px] px-6 py-24 text-center"><Reveal className="liquid-glass px-6 py-14">
<h2 className="mb-3 text-[clamp(28px,4.5vw,48px)] leading-tight">THE NEXT BLOCK STARTS HERE.</h2><p className="text-mute">Be the first to experience the future of multi-chain payments.</p>
<form noValidate onSubmit={submit} className="mx-auto mt-6 flex max-w-[520px] flex-wrap justify-center gap-2.5">
<input type="text" name="company" value={hp} onChange={e=>setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]"/>
<input type="email" value={v} onChange={e=>setV(e.target.value)} placeholder="you@company.com" aria-label="Email address" autoComplete="email" className="min-h-12 min-w-[240px] flex-1 rounded-full border border-cyan/25 bg-navy/60 px-5 text-base text-ink focus:outline-2 focus:outline-offset-2 focus:outline-teal"/>
<motion.button whileHover={{scale:1.03}} whileTap={{scale:.97}} type="submit" disabled={st.k==='loading'} className="liquid-glass liquid-glass-button disabled:opacity-60">{st.k==='loading'?'Sending…':'Notify me'}</motion.button></form>
<div role="status" aria-live="polite" className={cx('mt-3.5 min-h-6 text-sm',st.k==='err'?'text-[#ffb4a8]':'text-cyan')}><AnimatePresence mode="wait">{st.k!=='loading'&&st.t&&<motion.span key={st.t} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="inline-flex items-center gap-2">{st.k==='ok'&&<Check className="h-4 w-4"/>}{st.t}</motion.span>}</AnimatePresence></div></Reveal></section>}
