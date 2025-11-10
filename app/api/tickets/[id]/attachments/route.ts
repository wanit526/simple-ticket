
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export async function POST(req: NextRequest, { params }: { params: { id: string } }){
  const id = params.id;
  const { name, url, size } = await req.json();
  const sb = supabaseAdmin();

  // store into attachments table or JSONB column; here we will append into ticket_attachments table
  await sb.from('ticket_attachments').insert({ ticket_id: id, name, url, size: Number(size || 0) });
  return NextResponse.json({ ok: true });
}
