
'use client';
import { useEffect, useMemo, useState } from 'react';
import { dict } from '@/lib/i18n';

type Lang = keyof typeof dict;

export type Ticket = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  department: string;
  category: 'Hardware'|'Software'|'Network'|'Other';
  description: string;
  priority: 'Low'|'Normal'|'High'|'Urgent';
  status: 'New'|'In Progress'|'Done';
  assignee: string | null;
};

export default function TicketList({ adminName, filters }: { adminName: string; filters: {status?:string;priority?:string} }){
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Lang>('th');

  useEffect(()=>{ setLang((localStorage.getItem('lang') as Lang) || 'th'); },[]);

  async function fetchTickets() {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.status) params.set('status', filters.status);
    if (filters.priority) params.set('priority', filters.priority);
    const res = await fetch('/api/tickets?' + params.toString());
    const data = await res.json();
    setTickets(data.tickets ?? []);
    setLoading(false);
  }

  useEffect(()=>{ fetchTickets(); }, [filters.status, filters.priority]);

  useEffect(()=>{
    // basic polling each 5s; Supabase realtime could be added client side if needed
    const id = setInterval(fetchTickets, 5000);
    return ()=>clearInterval(id);
  }, []);

  async function updateStatus(id: string, status: Ticket['status']) {
    await fetch('/api/tickets/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, assignee: adminName }),
    });
    fetchTickets();
  }

  const sorted = useMemo(() => {
    return [...tickets].sort((a,b) =>
      (a.status === 'New' ? -1 : 1) - (b.status === 'New' ? -1 : 1) ||
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [tickets]);

  const t = dict[lang];

  if (loading) return <p>กำลังโหลด...</p>;
  if (!sorted.length) return <p>ไม่พบตั๋ว</p>;

  return (
    <ul className="divide-y dark:divide-zinc-800">
      {sorted.map(ti => (
        <li key={ti.id} className="py-4 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <span className="badge">{ti.status}</span>
              <span className="badge">{ti.priority}</span>
            </div>
            <span className="text-xs text-gray-500">{new Date(ti.created_at).toLocaleString()}</span>
          </div>
          <div className="text-sm font-medium">
            {ti.name} • {ti.department} • {ti.category}
          </div>
          <div className="text-sm whitespace-pre-wrap">{ti.description}</div>
          <div className="flex gap-2">
            {ti.status === 'New' && (
              <button onClick={() => updateStatus(ti.id, 'In Progress')} className="btn">รับงาน</button>
            )}
            {ti.status !== 'Done' && (
              <button onClick={() => updateStatus(ti.id, 'Done')} className="btn">ปิดงาน</button>
            )}
          </div>
          {ti.assignee && <div className="text-xs text-gray-500">ผู้ดูแล: {ti.assignee}</div>}
        </li>
      ))}
    </ul>
  );
}
