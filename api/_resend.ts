import type {IncomingMessage,ServerResponse} from 'node:http'
export type Req=IncomingMessage&{body?:any}
export type Res=ServerResponse&{status:(n:number)=>Res;json:(b:unknown)=>void}
export const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))
export async function resend(path:string,method:string,body?:unknown){
 const r=await fetch('https://api.resend.com'+path,{method,headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined})
 const text=await r.text();let data:any={};try{data=JSON.parse(text)}catch{}
 return {ok:r.ok,status:r.status,data,text}}
