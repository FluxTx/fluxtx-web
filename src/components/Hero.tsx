import {useRef,useEffect} from 'react'
import type {PointerEvent,ReactNode} from 'react'
import {motion,useScroll,useTransform,useMotionValue,useSpring} from 'motion/react'
import {cx} from './ui'
import {startGlobe} from '../lib/globe'
function Globe(){const r=useRef<HTMLCanvasElement>(null);useEffect(()=>{startGlobe(r.current!)},[]);
return <canvas ref={r} width="1000" height="1000" role="img" aria-label="Rotating 3D globe with connected blockchain network nodes" className="block w-full"/>}
const FL:[string,string,string][]=[['MULTI-CHAIN','Multi-chain infrastructure','top-[8%] -left-[34%]'],['REAL-TIME','Real-time transaction tracking','top-[30%] -right-[38%]'],['NON-CUSTODIAL','Non-custodial architecture','bottom-[22%] -left-[36%]'],['ONE API','Developer-first API','bottom-[6%] -right-[30%]']]
export function FloatingGlassCard({label,text,pos,delay,i}:{label:string;text:string;pos:string;delay:number;i:number}){
return <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2+i*.15,duration:.8}} style={{animationDelay:delay+'s'}} className={cx('float liquid-glass absolute z-[2] hidden max-w-[190px] px-3.5 py-2.5 text-left text-[13px] xl:block',pos)}><b className="block text-xs font-medium tracking-wider text-cyan">{label}</b>{text}</motion.div>}
const EASE=[.22,1,.36,1] as const
const Line=({children,delay,className}:{children:ReactNode;delay:number;className?:string})=><span className="block overflow-hidden pb-1"><motion.span className={cx('block',className)} initial={{y:'110%'}} animate={{y:0}} transition={{duration:.9,delay,ease:EASE}}>{children}</motion.span></span>
export function Hero(){const ref=useRef<HTMLElement>(null)
const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']})
const y=useTransform(scrollYProgress,[0,1],[0,110]),fade=useTransform(scrollYProgress,[0,.85],[1,0])
const mx=useMotionValue(0),my=useMotionValue(0),sp={stiffness:80,damping:18}
const rx=useSpring(useTransform(my,[-.5,.5],[7,-7]),sp),ry=useSpring(useTransform(mx,[-.5,.5],[-9,9]),sp)
const move=(e:PointerEvent<HTMLElement>)=>{const r=e.currentTarget.getBoundingClientRect();mx.set((e.clientX-r.left)/r.width-.5);my.set((e.clientY-r.top)/r.height-.5)}
const leave=()=>{mx.set(0);my.set(0)}
return <section ref={ref} onPointerMove={move} onPointerLeave={leave} className="relative grid min-h-[calc(100vh-70px)] place-items-center overflow-hidden px-6 pb-20 pt-10 text-center">
<motion.div style={{opacity:fade}} className="relative grid w-full max-w-[1000px] justify-items-center">
<motion.div initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}} transition={{duration:.7,ease:EASE}} className="liquid-glass liquid-glass-badge relative z-[3] -mb-[6vmin]"><span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-teal"/>COMING SOON</motion.div>
<motion.div style={{y,rotateX:rx,rotateY:ry,transformPerspective:900}} initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{duration:1.2,ease:EASE}} className="relative w-[min(86vw,560px)]"><Globe/>
{FL.map(([b,t,p],i)=><FloatingGlassCard key={b} i={i} label={b} text={t} pos={p} delay={-i*1.7}/>)}</motion.div>
<h1 className="relative z-[3] text-[clamp(34px,6.4vw,76px)] font-bold leading-[1.02] tracking-wide [text-shadow:0_0_40px_rgba(105,219,200,.25)]">
<Line delay={.4}>ONE API.</Line><Line delay={.55}>EVERY CHAIN.</Line><Line delay={.7} className="text-teal">PAYMENTS IN MOTION.</Line></h1>
<motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.1,duration:.8}} className="relative z-[3] my-4 max-w-[560px] text-mute">Multi-chain blockchain payment infrastructure for developers and businesses. Currently in development.</motion.p>
<motion.a initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.25,duration:.8}} whileHover={{scale:1.05}} whileTap={{scale:.97}} href="#notify" className="liquid-glass liquid-glass-button">Get notified</motion.a>
</motion.div></section>}
