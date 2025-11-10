import { supabaseAdmin } from '@/lib/supabaseServer';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();

    const { data, error } = await supabaseAdmin()
      .from('tickets')
      .update({ status })
      .eq('id', params.id)
      .select();

    if (error) {
      console.error('Supabase update error:', error);
      return Response.json({ success: false, error }, { status: 400 });
    }

    return Response.json({ success: true, data });
  } catch (err) {
    console.error('Server error:', err);
    return Response.json({ success: false, message: String(err) }, { status: 500 });
  }
}
