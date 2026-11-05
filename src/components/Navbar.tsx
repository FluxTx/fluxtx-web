import {useEffect,useState} from 'react'
import {Dialog} from 'radix-ui'
import {motion} from 'motion/react'
import {Menu,X} from 'lucide-react'
import logo from '../assets/fluxtx-logo.png'
export const LINKS=[['Features','#features'],['Ecosystem','#ecosystem'],['How it works','#how'],['Developers','#developers']]
function useActive(){const [a,setA]=useState('');useEffect(()=>{const o=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setA(e.target.id)),{rootMargin:'-40% 0px -55% 0px'});LINKS.forEach(([,h])=>{const el=document.getElementById(h.slice(1));el&&o.observe(el)});return()=>o.disconnect()},[]);return a}
export function Navbar(){const active=useActive();const [open,setOpen]=useState(false)
return <motion.nav initial={{y:-40,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.7,ease:[.22,1,.36,1]}} aria-label="Main" className="liquid-glass sticky z-20 mx-auto mt-3 flex w-[calc(100%-24px)] max-w-[1160px] items-center justify-between rounded-full px-5 py-2.5" style={{top:'env(safe-area-inset-top,0px)'}}>
<a href="#top" aria-label="FluxTx home"><img src={logo} alt="FluxTx" className="h-9 w-auto"/></a>
<div className="hidden items-center gap-7 text-sm text-mute md:flex">
{LINKS.map(([t,h])=><a key={h} href={h} className={'relative py-1 transition-colors hover:text-cyan '+(active===h.slice(1)?'text-ink':'')}>{t}{active===h.slice(1)&&<motion.span layoutId="nav-active" className="absolute inset-x-0 -bottom-0.5 h-px bg-teal"/>}</a>)}
<motion.a whileHover={{scale:1.04}} whileTap={{scale:.97}} href="#notify" className="liquid-glass liquid-glass-button">Get notified</motion.a></div>
<Dialog.Root open={open} onOpenChange={setOpen}>
<Dialog.Trigger className="grid min-h-11 min-w-11 place-items-center md:hidden" aria-label="Open menu"><Menu/></Dialog.Trigger>
<Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-40 bg-navy/70 backdrop-blur-sm"/>
<Dialog.Content className="dlg liquid-glass fixed inset-x-3 top-3 z-50 p-6" style={{background:'rgba(6,25,35,.96)'}}>
<Dialog.Title className="sr-only">Menu</Dialog.Title><Dialog.Description className="sr-only">Site navigation</Dialog.Description>
<div className="mb-4 flex items-center justify-between"><img src={logo} alt="FluxTx" className="h-8 w-auto"/><Dialog.Close aria-label="Close menu" className="grid min-h-11 min-w-11 place-items-center"><X/></Dialog.Close></div>
<div className="flex flex-col gap-1 text-lg">{LINKS.map(([t,h])=><Dialog.Close asChild key={h}><a href={h} className="rounded-xl px-3 py-3 text-mute hover:bg-teal/10 hover:text-ink">{t}</a></Dialog.Close>)}
<Dialog.Close asChild><a href="#notify" className="liquid-glass liquid-glass-button mt-3">Get notified</a></Dialog.Close></div>
</Dialog.Content></Dialog.Portal></Dialog.Root></motion.nav>}
