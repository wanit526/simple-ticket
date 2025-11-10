
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }){
  const id = params.id;
  const body = await req.json();
  const updates: any = {};
  if (body.status) updates.status = body.status;
  if (body.assignee) updates.assignee = String(body.assignee);

  const sb = supabaseAdmin();
  const { data, error } = await sb.from('tickets').update(updates).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ticket: data }, { status: 200 });
}
