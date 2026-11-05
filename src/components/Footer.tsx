import {useState,useEffect,useRef} from 'react'
import {cx,Reveal,Section,Icon,GRID} from './ui'
import logo from '../assets/fluxtx-logo.png'
import {LINKS} from './Navbar'
export function Footer(){return <footer className="border-t border-cyan/10 px-6 py-10 text-center text-[13px] text-mute">
<img src={logo} alt="FluxTx" className="mx-auto mb-3 h-9 w-auto"/><div>One API. Every Chain. Payments in Motion.</div>
<nav aria-label="Footer" className="my-4 flex flex-wrap justify-center gap-5">{LINKS.map(([t,h])=><a key={h} href={h} className="hover:text-cyan">{t}</a>)}</nav>
<div>Status: in development, not yet launched. © 2026 FluxTx</div></footer>}

