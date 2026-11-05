import {resend} from './_resend'
import type {Req,Res} from './_resend'
// Saves a signup as a Resend contact in your segment. Release emails are sent by api/github-release.ts.
export default async function handler(req:Req,res:Res){
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'})
 const body=typeof req.body==='string'?JSON.parse(req.body||'{}'):(req.body||{})
 if(body.company)return res.status(200).json({ok:true}) // honeypot
 const email=String(body.email||'').trim().toLowerCase()
 if(email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))return res.status(400).json({error:'Invalid email'})
 const seg=process.env.RESEND_SEGMENT_ID
 if(!process.env.RESEND_API_KEY||!seg)return res.status(500).json({error:'Server not configured'})
 const c=await resend('/contacts','POST',{email,unsubscribed:false})
 if(!c.ok&&c.status!==409){console.error('Resend contact error',c.status,c.text);return res.status(502).json({error:'Email provider error'})}
 const s=await resend(`/contacts/${encodeURIComponent(email)}/segments/${seg}`,'POST')
 if(!s.ok&&s.status!==409){console.error('Resend segment error',s.status,s.text);return res.status(502).json({error:'Email provider error'})}
 return res.status(200).json({ok:true})}
