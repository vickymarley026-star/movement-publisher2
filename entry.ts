const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const email = body?.email?.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'A valid email is required' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    const existing = await db.asServiceRole.entities.Newsletter.filter({ email });
    if (existing.length > 0) {
      return Response.json({ success: true, message: 'Already subscribed' });
    }

    await db.asServiceRole.entities.Newsletter.create({ email });
    return Response.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}