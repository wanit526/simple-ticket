console.log('🔑 ENV CHECK:', {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 25),
  anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅' : '❌',
  service: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅' : '❌'
});


import { supabaseAdmin } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, department, category, priority, description } = body;

  const { data, error } = await supabaseAdmin()
    .from('tickets')
    .insert([
      { name, department, category, priority, description },
    ])
    .select();
  
  if (error) {
    console.error('Supabase insert error:', error);
    return Response.json({ success: false, error }, { status: 400 });
  }

  return Response.json({ success: true, ticket: data[0] });
}
