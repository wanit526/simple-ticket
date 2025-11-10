import { supabaseAdmin } from '@/lib/supabaseServer';


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
const { status } = await req.json();
const { error } = await supabaseAdmin()
.from('tickets')
.update({ status })
.eq('id', params.id);


if (error) return Response.json({ success: false, error }, { status: 400 });
return Response.json({ success: true });
}