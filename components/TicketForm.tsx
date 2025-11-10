
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { dict } from '@/lib/i18n';

type Lang = keyof typeof dict;

export default function TicketForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>('th');

  useEffect(()=>{
    setLang((localStorage.getItem('lang') as Lang) || 'th');
  },[]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setOk(null); setErr(null);

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload: any = Object.fromEntries(form.entries());
    const files = (form.getAll('files') as File[]).filter(Boolean);

    try {
      const metaRes = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          department: payload.department,
          category: payload.category,
          description: payload.description,
          priority: payload.priority
        })
      });
      if (!metaRes.ok) throw new Error(await metaRes.text());
      const resJson = await metaRes.json();
const ticket = resJson?.ticket;

console.log('📦 API response:', resJson);

if (!ticket?.id) {
  throw new Error('ไม่พบ ticket.id จาก API');
}

if (files.length > 0) {
  try {
    for (const f of files) {
      const path = `${ticket.id}/${Date.now()}-${f.name}`;
      const up = await supabase.storage.from('ticket-files').upload(path, f, { upsert: true });
      if (up.error) throw up.error;

      const { data } = supabase.storage.from('ticket-files').getPublicUrl(path);
      await fetch(`/api/tickets/${ticket.id}/attachments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.name, url: data.publicUrl, size: f.size })
      });
    }
  } catch (uploadErr) {
    console.error('⚠️ File upload skipped or failed:', uploadErr);
  }
} else {
  console.log('🟢 No files selected — skipping upload');
}



      setOk(dict[lang].success);
      formEl.reset();
    } catch (e:any) {
      setErr(e.message ?? 'error');
    } finally { setLoading(false); }
  }

  const t = dict[lang];

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl card">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="logo" className="w-8 h-8" />
        <h2 className="text-xl font-semibold">{t.formTitle}</h2>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">{t.formDesc}</p>

      <div>
        <label>{t.name}</label>
        <input name="name" required />
      </div>

      <div>
        <label>{t.dept}</label>
        <input name="department" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>{t.category}</label>
          <select name="category" required>
            <option>Hardware</option>
            <option>Software</option>
            <option>Network</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label>{t.priority}</label>
          <select name="priority" required>
            <option>Normal</option>
            <option>Low</option>
            <option>High</option>
            <option>Urgent</option>
          </select>
        </div>
      </div>

      <div>
        <label>{t.description}</label>
        <textarea name="description" rows={4} required />
      </div>

      <div>
        <label>{t.files}</label>
        <input type="file" name="files" multiple />
      </div>

      <button disabled={loading} className="btn btn-primary">
        {loading ? t.sending : t.submit}
      </button>
      {ok && <p className="text-green-600">{ok}</p>}
      {err && <p className="text-red-600">{err}</p>}
    </form>
  );
}
