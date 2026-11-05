import {createHmac,timingSafeEqual} from 'node:crypto'
import {resend,esc} from './_resend'
import type {Req,Res} from './_resend'
export const config={api:{bodyParser:false}}
const raw=async(req:Req)=>{const c:Buffer[]=[];for await(const x of req)c.push(x as Buffer);return Buffer.concat(c)}
// GitHub webhook (event: Releases). Emails the segment when a release becomes a full release (not pre-release, not draft).
export default async function handler(req:Req,res:Res){
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'})
 const secret=process.env.GITHUB_WEBHOOK_SECRET,seg=process.env.RESEND_SEGMENT_ID,from=process.env.RESEND_FROM
 if(!secret||!seg||!from||!process.env.RESEND_API_KEY)return res.status(500).json({error:'Server not configured'})
 const buf=await raw(req)
 const sig=String(req.headers['x-hub-signature-256']||''),exp='sha256='+createHmac('sha256',secret).update(buf).digest('hex')
 if(sig.length!==exp.length||!timingSafeEqual(Buffer.from(sig),Buffer.from(exp)))return res.status(401).json({error:'Bad signature'})
 if(req.headers['x-github-event']==='ping')return res.status(200).json({ok:true,pong:true})
 if(req.headers['x-github-event']!=='release')return res.status(200).json({ignored:'event'})
 const p=JSON.parse(buf.toString('utf8')),r=p.release
 // 'released' = published, or a pre-release promoted to a release
 if(p.action!=='released'||!r||r.prerelease||r.draft)return res.status(200).json({ignored:'not a full release'})
 const name=esc(String(r.name||r.tag_name)),notes=esc(String(r.body||'').slice(0,1500)).replace(/\n/g,'<br>')
 const html=`<h2>FluxTx ${name} is live</h2><p>Version <b>${esc(String(r.tag_name))}</b> has been released.</p><p>${notes}</p><p><a href="${esc(String(r.html_url))}">View the release on GitHub</a></p><hr><p style="font-size:12px"><a href="{{{RESEND_UNSUBSCRIBE_URL}}}">Unsubscribe</a></p>`
 const b=await resend('/broadcasts','POST',{segment_id:seg,from,subject:`FluxTx ${r.tag_name} is released`,html})
 if(!b.ok){console.error('Broadcast create',b.status,b.text);return res.status(502).json({error:'Create failed'})}
 const s=await resend(`/broadcasts/${b.data.id}/send`,'POST',{})
 if(!s.ok){console.error('Broadcast send',s.status,s.text);return res.status(502).json({error:'Send failed'})}
 return res.status(200).json({ok:true,broadcast:b.data.id})}
