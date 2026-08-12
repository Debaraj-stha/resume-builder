import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const durations={monthly:30*86400000,annual:365*86400000,lifetime:null};
export const config={api:{bodyParser:false}};
const readRaw=request=>new Promise((resolve,reject)=>{const chunks=[];request.on("data",chunk=>chunks.push(Buffer.from(chunk)));request.on("end",()=>resolve(Buffer.concat(chunks)));request.on("error",reject)});
export default async function handler(request,response){
 if(request.method!=="POST")return response.status(405).json({error:"Method not allowed"});
 const secret=process.env.RAZORPAY_WEBHOOK_SECRET,dbUrl=process.env.SUPABASE_URL,serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!secret||!dbUrl||!serviceKey)return response.status(503).json({error:"Webhook is not configured"});
 const signature=request.headers["x-razorpay-signature"];const rawBody=await readRaw(request);
 const expected=crypto.createHmac("sha256",secret).update(rawBody).digest("hex");
 if(!signature||expected.length!==signature.length||!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature)))return response.status(401).json({error:"Invalid webhook signature"});
 let event;try{event=JSON.parse(rawBody.toString("utf8"))}catch{return response.status(400).json({error:"Invalid webhook body"})}if(event.event!=="payment.captured")return response.status(200).json({received:true});
 const payment=event.payload?.payment?.entity,notes=payment?.notes||{}; const planId=notes.planId,ownerId=notes.ownerId;
 if(!payment?.id||!durations.hasOwnProperty(planId))return response.status(400).json({error:"Incomplete payment event"});
 const now=new Date(),expires=durations[planId]?new Date(now.getTime()+durations[planId]).toISOString():null;
 const supabase=createClient(dbUrl,serviceKey,{auth:{persistSession:false}});
 const {error}=await supabase.from("subscription_records").upsert({owner_id:ownerId||null,provider_event_id:event.id||payment.id,provider_payment_id:payment.id,provider_order_id:payment.order_id,plan_id:planId,status:"active",starts_at:now.toISOString(),expires_at:expires,amount_minor:payment.amount,currency:payment.currency},{onConflict:"provider_event_id"});
 if(error)return response.status(500).json({error:"Could not record entitlement"});
 return response.status(200).json({received:true});
}
